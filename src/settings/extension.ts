export type ExtensionSetting = {
  uri: string;
  name: string;
  configPath: string;
};

export type ExtensionSettings = {
  extensions: { [uri: string]: ExtensionSetting };
};

export function defaultExtensionSettings(): ExtensionSettings {
  return {
    extensions: {},
  };
}

export function sortExtensions(
  settings: ExtensionSettings
): ExtensionSetting[] {
  const extensions: ExtensionSetting[] = [];
  Object.keys(settings.extensions).forEach((uri) => {
    extensions.push(settings.extensions[uri]);
  });
  return Object.values(extensions).sort((a, b): number => {
    if (a.name !== b.name) {
      return a.name > b.name ? 1 : -1;
    }
    return a.uri > b.uri ? 1 : -1;
  });
}
