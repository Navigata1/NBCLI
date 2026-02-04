import { startServer } from './server';

export * from './server';
export * from './tools/check-confidence';
export * from './tools/verify-autonomy';
export * from './tools/log-decision';

if (require.main === module) {
  startServer();
}
