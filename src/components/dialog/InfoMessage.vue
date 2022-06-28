<template>
  <div>
    <dialog ref="dialog">
      <div class="content">
        <ButtonIcon class="icon" :icon="Icon.INFO" />
        <div class="message">
          <div v-for="line of lines" :key="line.index" class="message-line">
            {{ line.text }}
          </div>
        </div>
      </div>
      <div class="dialog-main-buttons">
        <button @click="onClose()">閉じる</button>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import { showModalDialog } from "@/helpers/dialog";
import { useStore } from "@/store";
import { computed, defineComponent, onMounted, ref, Ref } from "vue";
import ButtonIcon from "@/components/primitive/ButtonIcon.vue";
import { Icon } from "@/assets/icons";

export default defineComponent({
  name: "InfoMessage",
  components: {
    ButtonIcon,
  },
  setup() {
    const store = useStore();
    const dialog: Ref = ref(null);

    onMounted(() => {
      showModalDialog(dialog.value);
    });

    const lines = computed(() => {
      return store.message.split("\n").map((text, index) => {
        return {
          index,
          text,
        };
      });
    });

    const onClose = () => {
      store.dequeueMessage();
    };

    return {
      dialog,
      lines,
      onClose,
      Icon,
    };
  },
});
</script>

<style scoped>
.message-line {
  text-align: left;
}
</style>
