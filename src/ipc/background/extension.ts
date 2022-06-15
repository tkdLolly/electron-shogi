import fs from "fs";
import path from "path";
import iconv from "iconv-lite";
import { createInterface as readline } from "readline";
import { spawn } from "child_process";
import {
  ExtensionConfig,
  ExtensionConfigSchemeID,
  resolveArguments,
} from "@/extension/config";
import { Variable } from "@/extension/variable";
import { onExtensionCommand, onExtensionQuit } from ".";

export function loadConfigFile(path: string): ExtensionConfig {
  const config = JSON.parse(
    fs.readFileSync(path).toString()
  ) as ExtensionConfig;
  if (config.scheme !== ExtensionConfigSchemeID) {
    throw new Error(`不正なスキームID: ${config.scheme}`);
  }
  if (config.interactive) {
    throw new Error(`対話型の拡張機能は未対応です。`);
  }
  return config;
}

let lastSessionID = 0;

function issueSessionID(): number {
  lastSessionID += 1;
  return lastSessionID;
}

export async function execute(
  configPath: string,
  variables: Variable[]
): Promise<number> {
  const sessionID = issueSessionID();
  const config = loadConfigFile(configPath);
  const baseDir = path.dirname(configPath);
  const execCommand = config.command.startsWith(".")
    ? path.join(baseDir, config.command)
    : config.command;
  const cwd = config.workingDirectory
    ? path.join(baseDir, config.workingDirectory)
    : baseDir;
  const args = resolveArguments(config, variables);
  const handle = spawn(execCommand, args, {
    cwd: cwd,
  });
  const encoding = config.encoding || "utf8";
  const decoder = iconv.decodeStream(encoding);
  const stream = handle.stdout.pipe(decoder);
  const reader = readline(stream);
  let command = "";
  reader.on("line", (line: string) => {
    command += line;
  });
  handle.on("close", () => {
    reader.close();
    onExtensionCommand(sessionID, command);
    onExtensionQuit(sessionID);
  });
  return sessionID;
}
