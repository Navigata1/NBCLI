import { execSync } from 'child_process';

const run = (command: string) => execSync(command, { stdio: 'inherit' });

if (!process.env.NPM_TOKEN) {
  console.warn('NPM_TOKEN is not set. Publishing will fail without it.');
}

run('pnpm install');
run('pnpm build');
run('pnpm -r publish --access public');
