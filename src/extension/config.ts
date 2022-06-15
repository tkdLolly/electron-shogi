import { PreDefinedVariables, Variable } from "./variable";

export type ExtensionConfig = {
  name: string;
  command: string;
  arguments?: string[];
  workingDirectory?: string;
  encoding?: string;
};

export function listVariableNamesFromArguments(
  config: ExtensionConfig
): string[] {
  if (!config.arguments) {
    return [];
  }
  const variables = [];
  for (const arg of config.arguments) {
    for (const name of PreDefinedVariables) {
      if (arg.indexOf(`{{${name}}}`) !== -1) {
        variables.push(name);
      }
    }
  }
  return variables;
}

export function resolveArguments(
  config: ExtensionConfig,
  variables: Variable[]
): string[] {
  if (!config.arguments) {
    return [];
  }
  const args: string[] = [];
  for (let arg of config.arguments) {
    for (const variable of variables) {
      arg = arg.replaceAll(`{{${variable.name}}}`, variable.value);
    }
    args.push(arg);
  }
  return args;
}
