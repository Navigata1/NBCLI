import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const schemaPath = path.resolve('packages/schema/src/mbf-governance.schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));

const lines: string[] = [];
lines.push('# MBF Governance Schema');
lines.push('');
lines.push('Generated from `mbf-governance.schema.json`.');
lines.push('');

const renderProps = (properties: Record<string, any>, depth = 0) => {
  const indent = '  '.repeat(depth);
  for (const [key, value] of Object.entries(properties)) {
    const type = value.type ?? 'object';
    lines.push(`${indent}- **${key}** (${type})`);
    if (value.properties) {
      renderProps(value.properties, depth + 1);
    }
  }
};

if (schema.properties) {
  lines.push('## Properties');
  renderProps(schema.properties as Record<string, any>);
}

const outputPath = path.resolve('docs/schema.md');
writeFileSync(outputPath, lines.join('\n') + '\n');

console.log(`Schema docs generated at ${outputPath}`);
