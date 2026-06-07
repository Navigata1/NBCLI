import boxen from 'boxen';
import { colors, icons, styles, boxenOptions, gradients } from './theme.js';

export const log = {
  info: (message: string) => {
    console.log(`  ${icons.info}  ${message}`);
  },

  success: (message: string) => {
    console.log(`  ${icons.success}  ${colors.success(message)}`);
  },

  // Diagnostics go to stderr so stdout stays clean for `--json` consumers.
  warn: (message: string) => {
    console.error(`  ${icons.warning}  ${colors.warning(message)}`);
  },

  error: (message: string) => {
    console.error(`  ${icons.error}  ${colors.error(message)}`);
  },

  step: (message: string) => {
    console.log(`  ${icons.arrow}  ${message}`);
  },

  bullet: (message: string) => {
    console.log(`  ${icons.bullet}  ${message}`);
  },

  dim: (message: string) => {
    console.log(`     ${colors.dim(message)}`);
  },

  blank: () => {
    console.log();
  },

  header: (text: string) => {
    console.log();
    console.log(`  ${styles.header(text)}`);
    console.log();
  },

  subheader: (text: string) => {
    console.log(`  ${styles.subheader(text)}`);
  },

  divider: () => {
    console.log(colors.muted('  ' + '─'.repeat(50)));
  },

  box: (content: string, type: 'default' | 'success' | 'error' | 'warning' = 'default') => {
    console.log(boxen(content, boxenOptions[type]));
  },

  successBox: (title: string, lines: string[]) => {
    const content = [
      gradients.success(title),
      '',
      ...lines.map((line) => `  ${icons.success}  ${line}`),
    ].join('\n');
    console.log(boxen(content, boxenOptions.success));
  },

  errorBox: (title: string, lines: string[]) => {
    const content = [
      colors.error(title),
      '',
      ...lines.map((line) => `  ${icons.error}  ${line}`),
    ].join('\n');
    console.log(boxen(content, boxenOptions.error));
  },

  list: (items: string[]) => {
    items.forEach((item) => {
      console.log(`     ${icons.dot} ${colors.dim(item)}`);
    });
  },

  keyValue: (key: string, value: string) => {
    console.log(`  ${colors.muted(key + ':')} ${colors.white(value)}`);
  },
};
