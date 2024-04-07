<template>
  <div>
    <div class="full column">
      <EngineAnalyticsElement
        v-for="monitor in store.usiMonitors"
        :key="monitor.sessionID"
        :history-mode="historyMode"
        :info="monitor"
        :height="elementHeight"
        :show-header="showHeader"
        :show-time-column="showTimeColumn"
        :show-multi-pv-column="showMultiPvColumn"
        :show-depth-column="showDepthColumn"
        :show-nodes-column="showNodesColumn"
        :show-score-column="showScoreColumn"
        :show-play-button="showPlayButton"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/renderer/store";
import { computed } from "vue";
import EngineAnalyticsElement from "@/renderer/view/tab/EngineAnalyticsElement.vue";
import { RectSize } from "@/common/assets/geometry.js";

const props = defineProps({
  size: { type: RectSize, required: true },
  historyMode: { type: Boolean, required: true },
  showHeader: { type: Boolean, default: true },
  showTimeColumn: { type: Boolean, default: true },
  showMultiPvColumn: { type: Boolean, default: true },
  showDepthColumn: { type: Boolean, default: true },
  showNodesColumn: { type: Boolean, default: true },
  showScoreColumn: { type: Boolean, default: true },
  showPlayButton: { type: Boolean, default: true },
});

const store = useStore();
const elementHeight = computed(() => {
  const rows = store.usiMonitors.length;
  return rows !== 0 ? props.size.height / rows : 0;
});
</script>
