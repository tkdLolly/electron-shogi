<template>
  <div>
    <dialog ref="dialog">
      <div class="content">
        <div class="list">
          <div v-for="entry of list" :key="entry.index" class="element">
            <button v-if="entry.usi">
              <ButtonIcon
                class="icon"
                :icon="Icon.PLAY"
                @click="showPreview(entry)"
              />
              再現
            </button>
            <div>
              {{ entry.text }}
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-main-buttons">
        <button @click="onClose()">閉じる</button>
      </div>
    </dialog>
    <PVPreviewDialog
      v-if="preview"
      :position="preview.position"
      :pv="preview.pv"
      :infos="[preview.message]"
      @close="closePreview"
    />
  </div>
</template>

<script lang="ts">
import { showModalDialog } from "@/helpers/dialog";
import { useStore } from "@/store";
import { computed, defineComponent, onMounted, ref, Ref } from "vue";
import { Icon } from "@/assets/icons";
import ButtonIcon from "@/components/primitive/ButtonIcon.vue";
import PVPreviewDialog from "@/components/dialog/PVPreviewDialog.vue";

type Entry = {
  index: number;
  text: string;
  position?: string;
  usi?: string;
};

type Preview = {
  position: string;
  pv: string[];
  message: string;
};

export default defineComponent({
  name: "SearchKifDBResult",
  components: {
    ButtonIcon,
    PVPreviewDialog,
  },
  setup() {
    const store = useStore();
    const dialog: Ref = ref(null);

    onMounted(() => {
      showModalDialog(dialog.value);
    });

    const list = computed(() => {
      if (!store.searchKifDBResult) {
        return [];
      }
      const list = [] as Entry[];
      list.push(
        ...store.searchKifDBResult.comment.split("\n").map((text, index) => {
          return { index, text };
        })
      );
      list.push(
        ...store.searchKifDBResult.kif_info.map((text, index) => {
          if (!store.searchKifDBResult?.kif_data[index]) {
            return { index: list.length + index, text };
          }
          const position = `${store.record.position.sfen}`;
          const usi = `${store.searchKifDBResult?.kif_data[index]}`;
          return { index: list.length + index, text, position, usi };
        })
      );
      return list;
    });

    const onClose = () => {
      store.clearSearchKifDBResult();
    };

    const preview = ref<Preview | null>(null);
    const showPreview = (entry: Entry) => {
      preview.value = {
        position: entry.position as string,
        pv: (entry.usi as string).split(" "),
        message: entry.text,
      };
    };
    const closePreview = () => {
      preview.value = null;
    };

    return {
      Icon,
      dialog,
      list,
      preview,
      onClose,
      showPreview,
      closePreview,
    };
  },
});
</script>

<style scoped>
.element {
  text-align: left;
  display: flex;
  flex-direction: row;
  padding: 2px 0px 2px 0px;
}
</style>
