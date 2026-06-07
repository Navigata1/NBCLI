import gradient from 'gradient-string';
import { gradients, colors } from './theme.js';
import { NBCLI_VERSION, NBCLI_TAGLINE } from '../version.js';

const ASCII_ART = `
  _   _            _   _     ____  _
 | \\ | | ___  _ __| |_| |__ / ___|| |_ __ _ _ __
 |  \\| |/ _ \\| '__| __| '_ \\\\___ \\| __/ _\` | '__|
 | |\\  | (_) | |  | |_| | | |___) | || (_| | |
 |_| \\_|\\___/|_|   \\__|_| |_|____/ \\__\\__,_|_|
`;

export const printBanner = () => {
  console.log(gradients.primary(ASCII_ART));
  console.log(
    colors.muted('                                    ') +
      colors.bold(colors.primary('BUILD')) +
      colors.muted(' v' + NBCLI_VERSION),
  );
  console.log();
};

export const printMini = () => {
  console.log(gradients.primary('◆ NorthStar') + colors.muted(' Build v' + NBCLI_VERSION));
  console.log();
};

// ---------------------------------------------------------------------------
// Dynamic home visual
// ---------------------------------------------------------------------------

// "NORTH STAR" in full-block (ANSI Shadow) figlet. Constant 6 lines.
const WORDMARK_FULL = [
  '███╗   ██╗ ██████╗ ██████╗ ████████╗██╗  ██╗   ███████╗████████╗ █████╗ ██████╗',
  '████╗  ██║██╔═══██╗██╔══██╗╚══██╔══╝██║  ██║   ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗',
  '██╔██╗ ██║██║   ██║██████╔╝   ██║   ███████║   ███████╗   ██║   ███████║██████╔╝',
  '██║╚██╗██║██║   ██║██╔══██╗   ██║   ██╔══██║   ╚════██║   ██║   ██╔══██║██╔══██╗',
  '██║ ╚████║╚██████╔╝██║  ██║   ██║   ██║  ██║   ███████║   ██║   ██║  ██║██║  ██║',
  '╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝',
];

// Compact wordmark for narrow terminals. Constant 6 lines.
const WORDMARK_COMPACT = [
  '  ◆  N O R T H   S T A R',
  ' ─────────────────────────',
  '  Bootstrap CLI edition',
  '',
  '',
  '',
];

const SWEEP_PALETTE = [
  '#00d9ff',
  '#22d3ee',
  '#7c3aed',
  '#a855f7',
  '#e040fb',
  '#f0abfc',
  '#00e676',
  '#22d3ee',
];

const TWINKLE = ['✦', '✧', '⋆', '·', '★', '✦'];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sweepGradient = (frame: number) => {
  const rot = ((frame % SWEEP_PALETTE.length) + SWEEP_PALETTE.length) % SWEEP_PALETTE.length;
  const stops = [...SWEEP_PALETTE.slice(rot), ...SWEEP_PALETTE.slice(0, rot)];
  return gradient(stops);
};

// Deterministic, frame-shifted starfield row (no RNG -> testable + smooth).
const starRow = (width: number, frame: number, seed: number): string => {
  let row = '';
  for (let i = 0; i < width; i += 1) {
    const v = (i * 7 + frame * 3 + seed * 13) % 31;
    if (v === 0 || v === 17) row += TWINKLE[(i + frame) % TWINKLE.length];
    else if (v === 5 || v === 23) row += '·';
    else row += ' ';
  }
  return row;
};

export interface HomeStatus {
  version: string;
  initialized: boolean;
  profile?: string;
  hookProfile?: string;
  tools?: string[];
  mcp?: boolean;
}

// eslint-disable-next-line no-control-regex
const ANSI = /\x1b\[[0-9;]*m/g;
const visibleLen = (text: string) => text.replace(ANSI, '').length;
// Pad to a visible width, ignoring ANSI color codes (so bordered rows align).
const padEnd = (text: string, width: number) => {
  const len = visibleLen(text);
  return len >= width ? text : text + ' '.repeat(width - len);
};

/**
 * Compose one constant-height frame of the home visual. `frame` drives the
 * gradient sweep + starfield twinkle so successive frames animate in place.
 * Returns a plain string (with ANSI), so it is unit-testable.
 */
export function composeHome(status: HomeStatus, frame: number, columns = 80): string {
  const width = Math.max(48, Math.min(columns, 100));
  const useFull = width >= 82;
  const wordmark = useFull ? WORDMARK_FULL : WORDMARK_COMPACT;
  const sweep = sweepGradient(frame);

  const lines: string[] = [];
  lines.push(colors.dim(starRow(width, frame, 1)));
  for (const line of wordmark) {
    lines.push(useFull ? sweep(line) : gradients.primary(line));
  }
  lines.push('');
  lines.push(`  ${colors.bold(colors.primary(`NorthStar Bootstrap CLI`))} ${colors.muted(`v${status.version}`)}  ${colors.secondary('★')}  ${colors.dim(NBCLI_TAGLINE)}`);
  lines.push('');

  // Status panel (constant height: 6 lines).
  const inner = Math.min(width, 76) - 4;
  const top = `  ${colors.muted('╭' + '─'.repeat(inner) + '╮')}`;
  const bottom = `  ${colors.muted('╰' + '─'.repeat(inner) + '╯')}`;
  const row = (label: string, value: string) => {
    const text = ` ${label}  ${value}`;
    return `  ${colors.muted('│')}${padEnd(text, inner)}${colors.muted('│')}`;
  };
  const dot = (on: boolean) => (on ? colors.success('●') : colors.muted('○'));

  lines.push(top);
  lines.push(
    row(
      colors.dim('project'),
      status.initialized
        ? `${dot(true)} governed  ${colors.muted('·')} profile ${colors.primary(status.profile ?? '?')} ${colors.muted('·')} hooks ${colors.primary(status.hookProfile ?? '?')}`
        : `${dot(false)} not initialized — run ${colors.secondary('nsb init')}`,
    ),
  );
  lines.push(
    row(
      colors.dim('tools  '),
      status.tools && status.tools.length ? colors.white(status.tools.join(', ')) : colors.muted('(none)'),
    ),
  );
  lines.push(
    row(
      colors.dim('mcp    '),
      `${dot(Boolean(status.mcp))} ${status.mcp ? colors.white('wired') : colors.muted('available (stdio + http)')}`,
    ),
  );
  lines.push(
    row(
      colors.dim('next   '),
      colors.muted(`${colors.secondary('nsb model-route')} · ${colors.secondary('nsb budget')} · ${colors.secondary('nsb skill list')} · ${colors.secondary('nsb --help')}`),
    ),
  );
  lines.push(bottom);
  lines.push(colors.dim(starRow(width, frame + 4, 2)));

  return lines.join('\n');
}

const shouldAnimate = (): boolean =>
  Boolean(process.stdout.isTTY) &&
  !process.env.NSB_NO_MOTION &&
  !process.env.NO_COLOR &&
  !process.env.CI;

const FRAMES = 18;
const FRAME_MS = 70;

/** Render the home visual — animated on an interactive TTY, static otherwise. */
export async function printHome(status: HomeStatus): Promise<void> {
  const columns = process.stdout.columns ?? 80;
  if (!shouldAnimate()) {
    console.log(composeHome(status, 0, columns));
    return;
  }
  const height = composeHome(status, 0, columns).split('\n').length;
  process.stdout.write('\n');
  for (let frame = 0; frame < FRAMES; frame += 1) {
    process.stdout.write(composeHome(status, frame, columns) + '\n');
    if (frame < FRAMES - 1) {
      process.stdout.write(`\x1b[${height + 1}A`);
      await sleep(FRAME_MS);
    }
  }
}
