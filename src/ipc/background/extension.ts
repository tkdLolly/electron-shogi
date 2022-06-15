import fs from "fs";
import path from "path";
import iconv from "iconv-lite";
import { createInterface as readline } from "readline";
import { spawn } from "child_process";
import { ExtensionConfig, resolveArguments } from "@/extension/config";
import { Variable } from "@/extension/variable";
import { onExtensionMessage, onExtensionQuit } from ".";

export function loadConfigFile(path: string): ExtensionConfig {
  return JSON.parse(fs.readFileSync(path).toString());
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
  const command = path.join(baseDir, config.command);
  const cwd = config.workingDirectory
    ? path.join(baseDir, config.workingDirectory)
    : baseDir;
  const args = resolveArguments(config, variables);
  const handle = spawn(command, args, {
    cwd: cwd,
  });
  const encoding = config.encoding || "utf8";
  const decoder = iconv.decodeStream(encoding);
  const stream = handle.stdout.pipe(decoder);
  const reader = readline(stream);
  let instruction = "";
  reader.on("line", (line: string) => {
    instruction += line;
  });
  handle.on("close", () => {
    reader.close();
    onExtensionMessage(sessionID, instruction);
    onExtensionQuit(sessionID);
  });
  return sessionID;
}
