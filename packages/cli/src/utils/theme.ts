import chalk from 'chalk';
import gradient from 'gradient-string';

// gradient-string v3 removed the `GradientFunction` named export. A configured
// gradient is just a string->string colorizer, so we type it by its usage.
type GradientFn = (input: string) => string;

export const colors = {
  primary: chalk.hex('#00d9ff'),
  secondary: chalk.hex('#e040fb'),
  success: chalk.hex('#00e676'),
  warning: chalk.hex('#ffc400'),
  error: chalk.hex('#ff1744'),
  muted: chalk.gray,
  dim: chalk.dim,
  bold: chalk.bold,
  white: chalk.white,
};

export const gradients: Record<string, GradientFn> = {
  primary: gradient(['#00d9ff', '#e040fb']),
  success: gradient(['#00e676', '#00d9ff']),
  error: gradient(['#ff1744', '#e040fb']),
  warm: gradient(['#ffc400', '#ff1744']),
  cool: gradient(['#00d9ff', '#00e676']),
};

export const icons = {
  success: colors.success('✓'),
  error: colors.error('✗'),
  warning: colors.warning('⚠'),
  info: colors.primary('ℹ'),
  bullet: colors.primary('◉'),
  arrow: colors.primary('▸'),
  star: colors.secondary('★'),
  dot: colors.muted('·'),
  line: colors.muted('─'),
};

export const styles = {
  header: (text: string) => gradients.primary(text),
  subheader: (text: string) => colors.bold(colors.primary(text)),
  label: (text: string) => colors.muted(text),
  value: (text: string) => colors.white(text),
  path: (text: string) => colors.dim(text),
  command: (text: string) => colors.secondary(text),
  highlight: (text: string) => colors.primary(text),
};

export const boxenOptions = {
  default: {
    padding: 1,
    margin: 1,
    borderStyle: 'round' as const,
    borderColor: '#00d9ff',
  },
  success: {
    padding: 1,
    margin: 1,
    borderStyle: 'round' as const,
    borderColor: '#00e676',
  },
  error: {
    padding: 1,
    margin: 1,
    borderStyle: 'round' as const,
    borderColor: '#ff1744',
  },
  warning: {
    padding: 1,
    margin: 1,
    borderStyle: 'round' as const,
    borderColor: '#ffc400',
  },
};
