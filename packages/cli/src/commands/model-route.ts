import { Command } from 'commander';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
import Table from 'cli-table3';
import type { GovernanceConfig, RoutingConfig } from '@nsb/core';
import { log } from '../utils/logger';
import { emitJson } from '../utils/output';
import { printMini } from '../utils/banner';
import { colors } from '../utils/theme';

// Mid-2026 Claude tiers. These are recommendations the operator/harness applies;
// NBCLI does not call models itself.
export const ORCHESTRATOR_MODEL = 'claude-opus-4-8';
export const SUBTASK_MODEL = 'claude-sonnet-4-6';
export const CHEAP_MODEL = 'claude-haiku-4-5';

export type TaskKind = 'plan' | 'implement' | 'review' | 'chat';
export type RiskLevel = 'low' | 'medium' | 'high';
export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'uncertain';
export type Effort = 'high' | 'xhigh' | 'ultracode' | 'max';

export interface RouteInput {
  kind: TaskKind;
  risk: RiskLevel;
  confidence: ConfidenceLevel;
}

export interface RouteDecision {
  model: string;
  effort: Effort;
  fast: boolean;
  rationale: string;
}

/**
 * Deterministic model-tier recommender. Pure + testable.
 * Honours RoutingConfig defaults from .mbf when present.
 */
export function recommendRoute(input: RouteInput, routing?: RoutingConfig): RouteDecision {
  const orchestrator = routing?.orchestrator ?? ORCHESTRATOR_MODEL;
  const subtask = routing?.subtask ?? SUBTASK_MODEL;
  // The cheap tier reads its OWN field; it must NOT fall back to `subtask`,
  // otherwise any config that sets `subtask` makes CHEAP_MODEL unreachable.
  const cheap = routing?.cheap ?? CHEAP_MODEL;

  const highRisk = input.risk === 'high';
  const lowConfidence = input.confidence === 'low' || input.confidence === 'uncertain';

  if (input.kind === 'plan' || input.kind === 'review' || highRisk || lowConfidence) {
    return {
      model: orchestrator,
      effort: highRisk || lowConfidence ? 'ultracode' : 'xhigh',
      fast: false,
      rationale: 'Orchestration / review / high-risk / low-confidence → strongest model, deep effort, no fast mode.',
    };
  }

  if (input.kind === 'chat' || (input.risk === 'low' && input.confidence === 'high')) {
    return {
      model: cheap,
      effort: 'high',
      fast: routing?.fast ?? true,
      rationale: 'Low-risk, high-confidence, routine → cheaper model with fast mode.',
    };
  }

  return {
    model: subtask,
    effort: 'high',
    fast: routing?.fast ?? false,
    rationale: 'Standard implementation subtask → mid-tier model.',
  };
}

function readRouting(root: string): RoutingConfig | undefined {
  const configPath = path.resolve(root, '.mbf', 'mbf-governance.yaml');
  if (!existsSync(configPath)) return undefined;
  try {
    return (parse(readFileSync(configPath, 'utf-8')) as GovernanceConfig).routing;
  } catch {
    return undefined;
  }
}

const RISK = new Set<RiskLevel>(['low', 'medium', 'high']);
const KIND = new Set<TaskKind>(['plan', 'implement', 'review', 'chat']);
const CONF = new Set<ConfidenceLevel>(['high', 'medium', 'low', 'uncertain']);

export const modelRouteCommand = new Command('model-route')
  .description('Recommend a model tier + effort/fast flags for a task (recommends, never executes)')
  .option('-k, --kind <kind>', 'plan | implement | review | chat', 'implement')
  .option('-r, --risk <risk>', 'low | medium | high', 'medium')
  .option('-c, --confidence <level>', 'high | medium | low | uncertain', 'medium')
  .option('--matrix', 'print the full routing matrix instead of a single recommendation', false)
  .option('--json', 'emit machine-readable JSON (no banner)', false)
  .action((options) => {
    if (!options.json) printMini();
    const routing = readRouting(process.cwd());

    if (options.matrix) {
      const rows: Array<{
        kind: TaskKind;
        risk: RiskLevel;
        confidence: ConfidenceLevel;
        model: string;
        effort: Effort;
        fast: boolean;
      }> = [];
      for (const kind of KIND) {
        for (const risk of RISK) {
          const d = recommendRoute({ kind, risk, confidence: 'medium' }, routing);
          rows.push({ kind, risk, confidence: 'medium', model: d.model, effort: d.effort, fast: d.fast });
        }
      }
      if (options.json) {
        emitJson(rows);
        return;
      }
      log.subheader('Model routing matrix');
      const table = new Table({
        head: ['kind', 'risk', 'confidence', 'model', 'effort', 'fast'].map((h) => colors.primary(h)),
        style: { head: [], border: ['gray'] },
      });
      rows.forEach((r) =>
        table.push([r.kind, r.risk, r.confidence, r.model, r.effort, r.fast ? 'yes' : 'no']),
      );
      console.log(table.toString());
      return;
    }

    const kind = (KIND.has(options.kind) ? options.kind : 'implement') as TaskKind;
    const risk = (RISK.has(options.risk) ? options.risk : 'medium') as RiskLevel;
    const confidence = (CONF.has(options.confidence) ? options.confidence : 'medium') as ConfidenceLevel;

    const decision = recommendRoute({ kind, risk, confidence }, routing);
    if (options.json) {
      emitJson({ kind, risk, confidence, ...decision });
      return;
    }
    log.subheader('Recommended route');
    log.keyValue('Task', `${kind} · risk ${risk} · confidence ${confidence}`);
    log.keyValue('Model', colors.primary(decision.model));
    log.keyValue('Effort', decision.effort);
    log.keyValue('Fast mode', decision.fast ? 'on' : 'off');
    log.blank();
    log.dim(decision.rationale);
  });
