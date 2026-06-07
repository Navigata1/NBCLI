import { Command } from 'commander';
import { initCommand } from './commands/init';
import { validateCommand } from './commands/validate';
import { updateCommand } from './commands/update';
import { doctorCommand } from './commands/doctor';
import { previewCommand } from './commands/preview';
import { homeCommand, runHome } from './commands/home';
import { modelRouteCommand } from './commands/model-route';
import { budgetCommand } from './commands/budget';
import { skillCommand } from './commands/skill';
import { workflowCommand } from './commands/workflow';
import { worktreeCommand } from './commands/worktree';
import { checkCommand } from './commands/check';
import { hooksCommand } from './commands/hooks';
import { adaptersCommand } from './commands/adapters';
import { evalCommand } from './commands/eval';
import { auditCommand } from './commands/audit';
import { statsCommand } from './commands/stats';
import { policyCommand } from './commands/policy';
import { NBCLI_VERSION } from './version';

const program = new Command();

program
  .name('northstarbuild')
  .description('NorthStar Bootstrap CLI (nsb) — governed autonomy for AI-native development')
  .version(NBCLI_VERSION);

program.addCommand(initCommand);
program.addCommand(validateCommand);
program.addCommand(updateCommand);
program.addCommand(previewCommand);
program.addCommand(adaptersCommand);
program.addCommand(doctorCommand);
program.addCommand(modelRouteCommand);
program.addCommand(workflowCommand);
program.addCommand(worktreeCommand);
program.addCommand(checkCommand);
program.addCommand(hooksCommand);
program.addCommand(evalCommand);
program.addCommand(budgetCommand);
program.addCommand(auditCommand);
program.addCommand(statsCommand);
program.addCommand(policyCommand);
program.addCommand(skillCommand);
program.addCommand(homeCommand);

// No subcommand → show the dynamic home screen.
program.action(async () => {
  await runHome();
});

program.parseAsync();
