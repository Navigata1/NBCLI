import { Command } from 'commander';
import { initCommand } from './commands/init';
import { validateCommand } from './commands/validate';
import { updateCommand } from './commands/update';
import { doctorCommand } from './commands/doctor';

const program = new Command();

program
  .name('northstarbuild')
  .description('North Star Build CLI (nsb)')
  .version('0.1.0');

program.addCommand(initCommand);
program.addCommand(validateCommand);
program.addCommand(updateCommand);
program.addCommand(doctorCommand);

program.parse();
