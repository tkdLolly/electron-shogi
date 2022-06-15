import api from "@/ipc/api";
import { ExtensionSetting } from "@/settings/extension";
import { useStore } from "@/store";
import { ExtensionConfig, listVariableNamesFromArguments } from "./config";
import { Variable, VAR_POSITION_SFEN, VAR_POSITION_USI } from "./variable";

function resolveVariables(names: string[]): Variable[] {
  const variables: Variable[] = [];
  for (const name of names) {
    switch (name) {
      case VAR_POSITION_USI:
        variables.push({
          name,
          value: useStore().record.usi,
        });
        break;
      case VAR_POSITION_SFEN:
        variables.push({
          name,
          value: useStore().record.position.sfen,
        });
        break;
    }
  }
  return variables;
}

export class Extension {
  private config: ExtensionConfig;
  private setting: ExtensionSetting;
  private _sessionID: number;

  constructor(config: ExtensionConfig, setting: ExtensionSetting) {
    this.setting = setting;
    this.config = config;
    this._sessionID = -1;
  }

  get sessionID(): number {
    return this._sessionID;
  }

  async execute(): Promise<void> {
    const varNames = listVariableNamesFromArguments(this.config);
    const variables = resolveVariables(varNames);
    this._sessionID = await api.executeExtension(
      this.setting.configPath,
      variables
    );
  }
}

export async function buildExtension(
  setting: ExtensionSetting
): Promise<Extension> {
  const config = await api.loadExtensionConfigFile(setting.configPath);
  return new Extension(config, setting);
}
