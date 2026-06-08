import { Command } from 'commander';
import path from 'path';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { parse } from 'yaml';
import { getBuiltInAnchors } from '@nsb/anchors';
import type { AnchorCollection, GovernanceConfig } from '@nsb/core';
import { vetExitCode, vetSkill } from '@nsb/core';
import { generateSkillMd } from '../generators/skill-md';
import { mergeAnchors } from '../utils/anchors';
import { writeFileSafe } from '../utils/files';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors, icons } from '../utils/theme';

const SKILL_REL = path.join('.claude', 'skills', 'north-star', 'SKILL.md');

export interface SkillCheck {
  name: string;
  pass: boolean;
  note: string;
}

export interface SkillEvaluation {
  score: number;
  checks: SkillCheck[];
}

/** Pure static evaluator for a SKILL.md document. Testable; no I/O. */
export function evaluateSkill(content: string): SkillEvaluation {
  const fm = /^---\n([\s\S]*?)\n---/.exec(content);
  const frontmatter = fm?.[1] ?? '';
  const nameMatch = /(^|\n)name:\s*(.+)/.exec(frontmatter);
  const descMatch = /(^|\n)description:\s*(.+)/.exec(frontmatter);
  const name = nameMatch?.[2]?.trim() ?? '';
  const desc = descMatch?.[2]?.trim() ?? '';
  const body = content.slice(fm ? fm[0].length : 0);

  const checks: SkillCheck[] = [
    { name: 'has frontmatter', pass: Boolean(fm), note: fm ? 'present' : 'missing --- block' },
    {
      name: 'name is kebab-case',
      pass: /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name),
      note: name || '(empty)',
    },
    {
      name: 'description has a "use when" trigger',
      pass: /\buse\b/i.test(desc) && desc.length >= 40,
      note: desc ? `${desc.length} chars` : '(empty)',
    },
    {
      name: 'body is substantial',
      pass: body.trim().length >= 200,
      note: `${body.trim().length} chars`,
    },
    {
      name: 'documents a confidence gate',
      pass: /CONFIDENCE ASSESSMENT/.test(body),
      note: /CONFIDENCE ASSESSMENT/.test(body) ? 'present' : 'missing',
    },
  ];
  const passed = checks.filter((c) => c.pass).length;
  return { score: Math.round((passed / checks.length) * 100), checks };
}

function loadConfigAndAnchors(root: string): { config: GovernanceConfig; anchors: AnchorCollection } | null {
  const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
  if (!existsSync(configPath)) return null;
  const config = parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig;
  const builtIn = getBuiltInAnchors();
  const customPath = path.resolve(root, '.mbf', 'custom-anchors.yaml');
  let custom: AnchorCollection = {};
  if (existsSync(customPath)) {
    try {
      const parsed = parse(readFileSync(customPath, 'utf-8'));
      if (parsed && typeof parsed === 'object') custom = parsed as AnchorCollection;
    } catch {
      /* ignore */
    }
  }
  return { config, anchors: mergeAnchors(builtIn, custom).merged };
}

function findSkillFiles(root: string): string[] {
  const skillsDir = path.resolve(root, '.claude', 'skills');
  if (!existsSync(skillsDir)) return [];
  const out: string[] = [];
  // shallow: .claude/skills/<name>/SKILL.md
  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const file = path.join(skillsDir, entry.name, 'SKILL.md');
      if (existsSync(file)) out.push(file);
    }
  }
  return out;
}

export const skillCommand = new Command('skill')
  .description('Manage the generated Claude skill: list | add | eval | stocktake | vet')
  .argument('[action]', 'list | add | eval | stocktake | vet', 'list')
  .argument('[file]', 'skill file (for vet; defaults to the north-star skill)')
  .action((action: string, file: string | undefined) => {
    printMini();
    const root = process.cwd();
    const skillPath = path.resolve(root, SKILL_REL);

    if (action === 'add') {
      const loaded = loadConfigAndAnchors(root);
      if (!loaded) {
        log.error('Missing .mbf/mbf-governance.yaml. Run `nsb init` first.');
        process.exitCode = 1;
        return;
      }
      writeFileSafe(skillPath, generateSkillMd(loaded.config, loaded.anchors), true);
      log.success(`Generated ${path.relative(root, skillPath)}`);
      return;
    }

    if (action === 'eval') {
      if (!existsSync(skillPath)) {
        log.error(`No skill at ${SKILL_REL}. Run \`nsb skill add\` or \`nsb init\`.`);
        process.exitCode = 1;
        return;
      }
      const result = evaluateSkill(readFileSync(skillPath, 'utf-8'));
      log.subheader(`Skill quality: ${result.score}/100`);
      result.checks.forEach((c) => {
        const mark = c.pass ? icons.success : icons.error;
        console.log(`  ${mark} ${c.name} ${colors.dim(`(${c.note})`)}`);
      });
      if (result.score < 100) process.exitCode = 0; // eval is advisory, not a gate
      return;
    }

    if (action === 'vet') {
      const target = file ? path.resolve(root, file) : skillPath;
      if (!existsSync(target)) {
        log.error(`No skill file: ${file ?? SKILL_REL}`);
        process.exitCode = 1;
        return;
      }
      const result = vetSkill(readFileSync(target, 'utf-8'));
      log.subheader(`Skill vet: ${result.verdict} — ${path.relative(root, target)}`);
      result.findings.forEach((f) =>
        console.log(`  ${f.severity === 'FAIL' ? icons.error : icons.warning} [${f.severity}] ${f.label}`),
      );
      if (result.verdict === 'PASS') log.success('PASS — no dangerous patterns.');
      else if (result.verdict === 'WARN') log.warn('WARN — manual review required before inclusion (default-deny).');
      else log.error('FAIL — blocked from inclusion (default-deny).');
      process.exitCode = vetExitCode(result.verdict);
      return;
    }

    if (action === 'stocktake') {
      const files = findSkillFiles(root);
      log.subheader(`Skills stocktake — ${files.length} found`);
      files.forEach((skillFile) => {
        const content = readFileSync(skillFile, 'utf-8');
        const size = statSync(skillFile).size;
        const evalResult = evaluateSkill(content);
        const vet = vetSkill(content);
        log.keyValue(path.relative(root, skillFile), `${size} B · quality ${evalResult.score}/100 · vet ${vet.verdict}`);
      });
      if (files.length === 0) log.dim('(none — run `nsb skill add`)');
      return;
    }

    // default: list
    log.subheader('Skills');
    findSkillFiles(root).forEach((skillFile) => log.step(path.relative(root, skillFile)));
    if (!existsSync(skillPath)) {
      log.dim(`north-star skill not generated yet — run \`nsb skill add\``);
    }
    log.blank();
    log.dim('External skills must pass `nsb skill vet` (default-deny: FAIL blocks, WARN -> review).');
    log.dim('NBCLI bundles only the generated north-star skill above; `vendor/nbb/SKILLS_REGISTRY.md`');
    log.dim('is NBB\'s catalog (source-map + UNPINNED honesty markers), not a bundled local inventory.');
  });
