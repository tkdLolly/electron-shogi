<template>
  <div>
    <dialog ref="dialog">
      <div class="dialog-title">拡張機能</div>
      <div class="dialog-form-area extension-list">
        <div v-if="extensions.length === 0">拡張機能が登録されていません。</div>
        <div
          v-for="extension in extensions"
          :key="extension.uri"
          class="dialog-form-area extension"
        >
          <div class="extension-name">{{ extension.name }}</div>
          <button class="dialog-narrow-button" @click="execute(extension.uri)">
            実行
          </button>
          <button class="dialog-narrow-button" @click="remove(extension.uri)">
            削除
          </button>
        </div>
      </div>
      <button class="dialog-wide-button" @click="add()">追加</button>
      <div class="dialog-main-buttons">
        <button class="dialog-button" @click="close()">閉じる</button>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import api from "@/ipc/api";
import { showModalDialog } from "@/helpers/dialog";
import { useStore } from "@/store";
import { defineComponent, onMounted, ref, Ref } from "vue";
import { defaultExtensionSettings, sortExtensions } from "@/settings/extension";
import { issueExtensionURI } from "@/uri";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "ExtensionDialog",
  setup() {
    const store = useStore();
    const dialog: Ref = ref(null);
    const setting = ref(defaultExtensionSettings());

    store.retainBussyState();

    onMounted(async () => {
      showModalDialog(dialog.value);
      try {
        setting.value = await api.loadExtensionSetting();
      } catch (e) {
        store.pushError(e);
        store.closeDialog();
      } finally {
        store.releaseBussyState();
      }
    });

    const execute = (uri: string) => {
      store.executeExtension(setting.value.extensions[uri]);
    };

    const remove = async (uri: string) => {
      store.retainBussyState();
      const newSetting = {
        extensions: {
          ...setting.value.extensions,
        },
      };
      delete newSetting.extensions[uri];
      try {
        await api.saveExtensionSetting(newSetting);
        setting.value = newSetting;
      } catch (e) {
        store.pushError(e);
      } finally {
        store.releaseBussyState();
      }
    };

    const add = async () => {
      store.retainBussyState();
      try {
        const path = await api.showSelectExtensionDialog();
        if (!path) {
          return;
        }
        const config = await api.loadExtensionConfigFile(path);
        const uri = issueExtensionURI();
        const newSetting = {
          extensions: {
            ...setting.value.extensions,
            [uri]: {
              uri: uri,
              name: config.name,
              configPath: path,
            },
          },
        };
        await api.saveExtensionSetting(newSetting);
        setting.value = newSetting;
      } catch (e) {
        store.pushError(e);
      } finally {
        store.releaseBussyState();
      }
    };

    const close = () => {
      store.closeDialog();
    };

    const extensions = computed(() => {
      return sortExtensions(setting.value);
    });

    return {
      dialog,
      extensions,
      execute,
      remove,
      add,
      close,
    };
  },
});
</script>

<style scoped>
.extension-list {
  width: 620px;
  height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.extension {
  margin: 0px 5px 0px 5px;
  padding: 5px;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: row;
}
.extension-name {
  text-align: left;
  width: 460px;
  margin-top: 5px;
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
