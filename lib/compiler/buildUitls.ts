import { ImportFile } from '@resolver-engine/imports';

export function buildSourcesObject(files: ImportFile[]): Record<string, { content: string}> {
  const result: Record<string, { content: string}> = {};
  files.map((file) => result[file.url] = {content: file.source});
  return result;
}

export function buildInputObject(files: ImportFile[], remappings?: any) {
  const sources = buildSourcesObject(files);
  return {
    language: 'Solidity',
    sources,
    settings: {
      remappings,
      outputSelection: {'*': {'*': ['abi', 'evm.bytecode', 'evm.deployedBytecode']}}
    }
  };
}
