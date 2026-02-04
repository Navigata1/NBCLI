import Ajv, { type ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import governanceSchema from './mbf-governance.schema.json';
import anchorsSchema from './anchors.schema.json';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

ajv.addSchema(anchorsSchema);

const validateGovernance = ajv.compile(governanceSchema);
const validateAnchors = ajv.compile(anchorsSchema);

export const validateGovernanceConfig = (config: unknown) => {
  const valid = validateGovernance(config);
  return {
    valid: Boolean(valid),
    errors: (validateGovernance.errors ?? []) as ErrorObject[],
  };
};

export const validateAnchorCollection = (anchors: unknown) => {
  const valid = validateAnchors(anchors);
  return {
    valid: Boolean(valid),
    errors: (validateAnchors.errors ?? []) as ErrorObject[],
  };
};

export const formatAjvErrors = (errors: ErrorObject[]) =>
  errors.map((error) => `${error.instancePath || '/'} ${error.message ?? 'invalid'}`);
