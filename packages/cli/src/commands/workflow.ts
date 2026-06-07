import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { stringify } from 'yaml';
import { writeFileSafe } from '../utils/files';
import { log } from '../utils/logger';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';

/**
 * A bounded parallel sub-agent plan. NBCLI emits this spec; a harness (Claude
 * Code, Codex, etc.) executes it. The executor is intentionally out of scope
 * for the CLI (see CAPABILITY_ASSESSMENT.md) — NBCLI never runs models.
 */
export interface WorkflowPlan {
  name: string;
  goal: string;
  concurrency_cap: number;
  total_agent_cap: number;
  keep_plan_out_of_context: boolean;
  stages: {
    id: string;
    description: string;
    input: string;
    output: string;
    parallel: boolean;
    adversarial_verify: boolean;
  }[];
}

export function buildWorkflowPlan(name: string, goal: string): WorkflowPlan {
  return {
    name,
    goal,
    concurrency_cap: 8,
    total_agent_cap: 64,
    keep_plan_out_of_context: true,
    stages: [
      {
        id: 'fan-out',
        description: 'Decompose the goal and run independent workers in parallel.',
        input: 'goal + work-list',
        output: 'array<finding>',
        parallel: true,
        adversarial_verify: false,
      },
      {
        id: 'verify',
        description: 'Each finding is checked by an independent skeptic prompted to refute it.',
        input: 'finding',
        output: '{ finding, confirmed: boolean }',
        parallel: true,
        adversarial_verify: true,
      },
      {
        id: 'synthesize',
        description: 'Merge confirmed findings into a single result; drop the rest.',
        input: 'array<{ finding, confirmed }>',
        output: 'result',
        parallel: false,
        adversarial_verify: false,
      },
    ],
  };
}

/** Lint a workflow plan spec (shape + caps). Pure + testable. */
export function validateWorkflowPlan(plan: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!plan || typeof plan !== 'object') return { valid: false, errors: ['plan is not an object'] };
  const p = plan as Partial<WorkflowPlan>;
  if (typeof p.name !== 'string' || !p.name) errors.push('name: required non-empty string');
  if (typeof p.goal !== 'string' || !p.goal) errors.push('goal: required non-empty string');
  if (typeof p.concurrency_cap !== 'number' || p.concurrency_cap < 1) errors.push('concurrency_cap: positive number required');
  if (typeof p.total_agent_cap !== 'number' || p.total_agent_cap < 1) errors.push('total_agent_cap: positive number required');
  if (
    typeof p.concurrency_cap === 'number' &&
    typeof p.total_agent_cap === 'number' &&
    p.concurrency_cap > p.total_agent_cap
  ) {
    errors.push('concurrency_cap must not exceed total_agent_cap');
  }
  if (!Array.isArray(p.stages) || p.stages.length === 0) {
    errors.push('stages: non-empty array required');
  } else {
    p.stages.forEach((s, i) => {
      if (!s || typeof s.id !== 'string' || !s.id) errors.push(`stages[${i}].id: required`);
      if (!s || typeof s.description !== 'string') errors.push(`stages[${i}].description: required`);
      if (!s || typeof s.parallel !== 'boolean') errors.push(`stages[${i}].parallel: boolean required`);
    });
  }
  return { valid: errors.length === 0, errors };
}

export const workflowCommand = new Command('workflow')
  .description('Emit/validate a bounded parallel sub-agent plan (typed IO, caps, adversarial verify)')
  .argument('[action]', 'plan | show | validate', 'show')
  .option('-n, --name <name>', 'workflow name', 'review')
  .option('-g, --goal <goal>', 'one-line goal', 'Review the current diff for correctness and risk')
  .option('-f, --file <file>', 'validate: path to a plan JSON (default .mbf/workflows/<name>.json)')
  .action((action: string, options) => {
    printMini();
    const root = process.cwd();

    if (action === 'validate') {
      const file = options.file
        ? path.resolve(root, options.file)
        : path.resolve(root, '.mbf', 'workflows', `${options.name}.json`);
      if (!existsSync(file)) {
        log.error(`No plan at ${path.relative(root, file)}`);
        process.exitCode = 1;
        return;
      }
      let parsed: unknown;
      try {
        parsed = JSON.parse(readFileSync(file, 'utf-8'));
      } catch {
        log.error('Plan is not valid JSON.');
        process.exitCode = 1;
        return;
      }
      const result = validateWorkflowPlan(parsed);
      if (result.valid) {
        log.success(`Plan valid: ${path.relative(root, file)}`);
      } else {
        log.error(`Plan invalid (${result.errors.length} issue(s)):`);
        result.errors.forEach((e) => console.log(`  - ${e}`));
        process.exitCode = 1;
      }
      return;
    }

    const plan = buildWorkflowPlan(options.name, options.goal);

    if (action === 'plan') {
      const outPath = path.resolve(root, '.mbf', 'workflows', `${plan.name}.json`);
      writeFileSafe(outPath, `${JSON.stringify(plan, null, 2)}\n`, true);
      log.success(`Wrote plan ${colors.dim(path.relative(root, outPath))}`);
      log.dim('Hand this spec to your agent harness to execute (NBCLI emits, it does not run models).');
      return;
    }

    log.subheader(`Workflow: ${plan.name}`);
    log.dim(plan.goal);
    log.blank();
    log.keyValue('concurrency cap', `${plan.concurrency_cap}`);
    log.keyValue('total agent cap', `${plan.total_agent_cap}`);
    log.keyValue('plan kept out of context', plan.keep_plan_out_of_context ? 'yes' : 'no');
    log.blank();
    console.log(stringify({ stages: plan.stages }));
    log.dim('Run `nsb workflow plan` to write this spec to .mbf/workflows/.');
  });
