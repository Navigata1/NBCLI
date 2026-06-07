/**
 * Emit a structured result as pretty-printed JSON on stdout — the machine-readable
 * surface for AI agents and scripts consuming NBCLI. Human/banner output is
 * suppressed by the caller when `--json` is set; errors still go to stderr.
 */
export function emitJson(data: unknown): void {
  process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
}
