import { Command } from 'commander';
import path from 'path';
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

export const workflowCommand = new Command('workflow')
  .description('Emit a bounded parallel sub-agent plan (typed IO, caps, adversarial verify)')
  .argument('[action]', 'plan | show', 'show')
  .option('-n, --name <name>', 'workflow name', 'review')
  .option('-g, --goal <goal>', 'one-line goal', 'Review the current diff for correctness and risk')
  .action((action: string, options) => {
    printMini();
    const root = process.cwd();
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
