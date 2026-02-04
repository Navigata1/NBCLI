import path from 'path';

export const ANCHOR_FILES = [
  path.resolve(__dirname, '../anchors/security.yaml'),
  path.resolve(__dirname, '../anchors/infrastructure.yaml'),
  path.resolve(__dirname, '../anchors/data.yaml'),
  path.resolve(__dirname, '../anchors/testing.yaml'),
];

export const getAnchorFiles = () => [...ANCHOR_FILES];
