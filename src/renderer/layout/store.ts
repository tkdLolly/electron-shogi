import {
  appendCopiedCustomLayoutProfile,
  appendNewCustomLayoutProfile,
  emptyLayoutProfileConfig,
  LayoutProfile,
  removeCustomLayoutProfile,
} from "@/common/settings/layout";
import { UnwrapNestedRefs, reactive } from "vue";
import api from "@/renderer/ipc/api";
import * as uri from "@/common/uri";

export class Store {
  private _reactive: UnwrapNestedRefs<Store>;
  private _currentProfileURI = uri.ES_STANDARD_LAYOUT_PROFILE;
  private _customProfileConfig = emptyLayoutProfileConfig();

  constructor() {
    this._reactive = reactive(this);
  }

  get reactive(): UnwrapNestedRefs<Store> {
    return this._reactive;
  }

  get currentProfileURI() {
    return this._currentProfileURI;
  }

  get customLayoutProfiles() {
    return this._customProfileConfig.profiles;
  }

  selectProfile(profileURI: string) {
    this._currentProfileURI = profileURI;
    api.updateLayout(this._currentProfileURI, this._customProfileConfig);
  }

  addCustomProfile() {
    const uri = appendNewCustomLayoutProfile(this._customProfileConfig);
    this._currentProfileURI = uri;
    api.updateLayout(this._currentProfileURI, this._customProfileConfig);
  }

  copyCustomProfile(profileURI: string) {
    const uri = appendCopiedCustomLayoutProfile(this._customProfileConfig, profileURI);
    if (!uri) {
      return;
    }
    this._currentProfileURI = uri;
    api.updateLayout(this._currentProfileURI, this._customProfileConfig);
  }

  removeCustomProfile(profileURI: string) {
    removeCustomLayoutProfile(this._customProfileConfig, profileURI);
    this._currentProfileURI = uri.ES_STANDARD_LAYOUT_PROFILE;
    api.updateLayout(this._currentProfileURI, this._customProfileConfig);
  }

  updateCustomProfile(profileURI: string, profile: LayoutProfile) {
    for (let i = 0; i < this._customProfileConfig.profiles.length; i++) {
      if (this._customProfileConfig.profiles[i].uri === profileURI) {
        this._customProfileConfig.profiles[i] = profile;
        this._currentProfileURI = profileURI;
        break;
      }
    }
    api.updateLayout(this._currentProfileURI, this._customProfileConfig);
  }

  async setup(): Promise<void> {
    [this._currentProfileURI, this._customProfileConfig] = await api.loadLayoutConfig();
  }
}

export function createStore(): UnwrapNestedRefs<Store> {
  return new Store().reactive;
}

let store: UnwrapNestedRefs<Store>;

export function useStore(): UnwrapNestedRefs<Store> {
  if (!store) {
    store = createStore();
  }
  return store;
}
