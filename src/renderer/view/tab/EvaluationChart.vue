<template>
  <div>
    <div class="full root" :style="style">
      <canvas ref="canvas" class="full"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
export enum EvaluationChartType {
  RAW = "raw",
  WIN_RATE = "winRate",
}
</script>

<script setup lang="ts">
import { RectSize } from "@/common/assets/geometry.js";
import { useStore } from "@/renderer/store";
import { RecordCustomData, SearchInfo } from "@/renderer/store/record";
import { computed, onMounted, onUnmounted, PropType, ref, watch } from "vue";
import { ActiveElement, Chart, ChartEvent, Color as ChartColor, ChartDataset } from "chart.js";
import { Color, ImmutableNode, ImmutableRecord } from "electron-shogi-core";
import { scoreToPercentage } from "@/renderer/store/score";
import { Thema } from "@/common/settings/app";
import { useAppSetting } from "@/renderer/store/setting";
import { t } from "@/common/i18n";
import { Lazy } from "@/renderer/helpers/lazy";

const MATE_SCORE = 1000000;
const MAX_SCORE = 2000;
const MIN_SCORE = -MAX_SCORE;

type ChartConfig = {
  thema: Thema;
  coefficientInSigmoid: number;
};

enum Series {
  BLACK_PLAYER,
  WHITE_PLAYER,
  RESEARCHER,
  RESEARCHER_2,
  RESEARCHER_3,
  RESEARCHER_4,
}

function getSeriesName(series: Series): string {
  switch (series) {
    case Series.BLACK_PLAYER:
      return t.sente;
    case Series.WHITE_PLAYER:
      return t.gote;
    case Series.RESEARCHER:
      return t.research;
    case Series.RESEARCHER_2:
      return t.research + "2";
    case Series.RESEARCHER_3:
      return t.research + "3";
    case Series.RESEARCHER_4:
      return t.research + "4";
  }
}

function getSearchInfo(node: ImmutableNode, series: Series): SearchInfo | undefined {
  const data = node.customData as RecordCustomData;
  if (!data) {
    return;
  }
  switch (series) {
    case Series.BLACK_PLAYER:
      if (node.nextColor === Color.BLACK) {
        return;
      }
      return data.playerSearchInfo;
    case Series.WHITE_PLAYER:
      if (node.nextColor === Color.WHITE) {
        return;
      }
      return data.playerSearchInfo;
    case Series.RESEARCHER:
      return data.researchInfo;
    case Series.RESEARCHER_2:
      return data.researchInfo2;
    case Series.RESEARCHER_3:
      return data.researchInfo3;
    case Series.RESEARCHER_4:
      return data.researchInfo4;
  }
}

function getScore(
  searchInfo: SearchInfo,
  type: EvaluationChartType,
  coefficientInSigmoid: number,
): number | undefined {
  let score = searchInfo.score;
  // mateがある場合はMATE_SCOREを代わりに使用する。
  if (searchInfo.mate !== undefined) {
    score = searchInfo.mate > 0 ? MATE_SCORE : -MATE_SCORE;
  }
  if (score === undefined) {
    return;
  }
  switch (type) {
    case EvaluationChartType.RAW:
      return Math.min(Math.max(score, MIN_SCORE), MAX_SCORE);
    case EvaluationChartType.WIN_RATE:
      return scoreToPercentage(score, coefficientInSigmoid);
  }
}

type ColorPalette = {
  main: string;
  ticks: string;
  grid: string;
  head: string;
  blackPlayer: string;
  whitePlayer: string;
  researcher: string;
  researcher2: string;
  researcher3: string;
  researcher4: string;
};

function getColorPalette(thema: Thema): ColorPalette {
  switch (thema) {
    default:
      return {
        main: "black",
        ticks: "dimgray",
        grid: "lightgray",
        head: "red",
        blackPlayer: "#1480C9",
        whitePlayer: "#FB7D00",
        researcher: "#349393",
        researcher2: "#FF1F4E",
        researcher3: "#6C22FF",
        researcher4: "#FFB912",
      };
    case Thema.DARK_GREEN:
    case Thema.DARK:
      return {
        main: "white",
        ticks: "darkgray",
        grid: "dimgray",
        head: "red",
        blackPlayer: "#36A2EB",
        whitePlayer: "#FF9F40",
        researcher: "#4BC0C0",
        researcher2: "#FF6384",
        researcher3: "#9966FF",
        researcher4: "#FFCD56",
      };
  }
}

const props = defineProps({
  size: {
    type: RectSize,
    required: true,
  },
  type: {
    type: String as PropType<EvaluationChartType>,
    required: true,
  },
});

const canvas = ref();
const store = useStore();
let chart: Chart;
let maxScore = MAX_SCORE;
let minScore = MIN_SCORE;
if (props.type === EvaluationChartType.WIN_RATE) {
  maxScore = 100;
  minScore = 0;
}

const buildDataset = (
  borderColor: ChartColor,
  series: Series,
  record: ImmutableRecord,
  config: ChartConfig,
) => {
  const dataPoints: { x: number; y: number }[] = [];
  const nodes = record.moves;
  for (const node of nodes) {
    const searchInfo = getSearchInfo(node, series);
    if (!searchInfo) {
      continue;
    }
    const score = getScore(searchInfo, props.type, config.coefficientInSigmoid);
    if (score !== undefined) {
      dataPoints.push({
        x: node.ply,
        y: score,
      });
    }
  }
  const lastNode = nodes[nodes.length - 1];
  if (
    (series === Series.BLACK_PLAYER && lastNode.nextColor === Color.BLACK) ||
    (series === Series.WHITE_PLAYER && lastNode.nextColor === Color.WHITE)
  ) {
    const data = lastNode.customData as RecordCustomData;
    if (data && data.opponentSearchInfo) {
      const score = getScore(data.opponentSearchInfo, props.type, config.coefficientInSigmoid);
      if (score !== undefined) {
        dataPoints.push({
          x: lastNode.ply + 1,
          y: score,
        });
      }
    }
  }
  return {
    label: getSeriesName(series),
    borderColor,
    data: dataPoints,
    showLine: true,
  };
};

const verticalLine = (record: ImmutableRecord, palette: ColorPalette) => {
  return {
    label: t.currentPosition,
    borderColor: palette.head,
    data: [
      { x: record.current.ply, y: maxScore },
      { x: record.current.ply, y: minScore },
    ],
    showLine: true,
    pointBorderWidth: 0,
    pointRadius: 0,
  };
};

const buildDatasets = (record: ImmutableRecord, config: ChartConfig, palette: ColorPalette) => {
  const series = [
    { borderColor: palette.blackPlayer, type: Series.BLACK_PLAYER },
    { borderColor: palette.whitePlayer, type: Series.WHITE_PLAYER },
    { borderColor: palette.researcher, type: Series.RESEARCHER },
    { borderColor: palette.researcher2, type: Series.RESEARCHER_2 },
    { borderColor: palette.researcher3, type: Series.RESEARCHER_3 },
    { borderColor: palette.researcher4, type: Series.RESEARCHER_4 },
  ];
  const datasets: ChartDataset[] = [verticalLine(record, palette)];
  for (const s of series) {
    const dataset = buildDataset(s.borderColor, s.type, record, config);
    if (dataset.data.length > 0) {
      datasets.push(dataset);
    }
  }
  return datasets;
};

const buildScalesOption = (record: ImmutableRecord, palette: ColorPalette) => {
  return {
    x: {
      min: 0,
      max: record.length + 10,
      ticks: { color: palette.ticks },
      grid: { color: palette.grid },
    },
    y: {
      min: minScore,
      max: maxScore,
      ticks: { color: palette.ticks },
      grid: { color: palette.grid },
    },
  };
};

const updateChart = (config: ChartConfig) => {
  const palette = getColorPalette(config.thema);
  chart.data.datasets = buildDatasets(store.record, config, palette);
  chart.options.color = palette.main;
  chart.options.scales = buildScalesOption(store.record, palette);
  chart.update();
};

const onClick = (event: ChartEvent, _: ActiveElement[], chart: Chart) => {
  if (event.x === null) {
    return;
  }
  const width = chart.scales.x.max - chart.scales.x.min;
  const displayWidth = chart.scales.x.right - chart.scales.x.left;
  const x = ((event.x - chart.scales.x.left) / displayWidth) * width + chart.scales.x.min;
  const ply = Math.round(x);
  store.changePly(ply);
};

const appSetting = useAppSetting();
const config = computed(() => {
  return {
    thema: appSetting.thema,
    coefficientInSigmoid: appSetting.coefficientInSigmoid,
  };
});

const lazy = new Lazy();
const updateChartLazy = () => {
  lazy.after(() => {
    updateChart(config.value);
  }, 100);
};

onMounted(() => {
  const element = canvas.value as HTMLCanvasElement;
  const context = element.getContext("2d") as CanvasRenderingContext2D;
  chart = new Chart(context, {
    type: "scatter",
    data: {
      datasets: [],
    },
    options: {
      animation: {
        duration: 0,
      },
      responsive: true,
      maintainAspectRatio: false,
      events: ["click"],
      onClick,
    },
  });
  chart.draw();
  updateChart(config.value);

  watch(
    () => config,
    (config) => {
      updateChart(config.value);
    },
    { deep: true },
  );
  store.addEventListener("resetRecord", updateChartLazy);
  store.addEventListener("changePosition", updateChartLazy);
  store.addEventListener("updateRecordTree", updateChartLazy);
  store.addEventListener("updateCustomData", updateChartLazy);
  store.addEventListener("updateFollowingMoves", updateChartLazy);
});

onUnmounted(() => {
  chart.destroy();
  lazy.clear();
  store.removeEventListener("resetRecord", updateChartLazy);
  store.removeEventListener("changePosition", updateChartLazy);
  store.removeEventListener("updateRecordTree", updateChartLazy);
  store.removeEventListener("updateCustomData", updateChartLazy);
  store.removeEventListener("updateFollowingMoves", updateChartLazy);
});

const style = computed(() => {
  return {
    height: `${props.size.height}px`,
    width: `${props.size.width}px`,
  };
});
</script>

<style scoped>
.root {
  background-color: var(--chart-bg-color);
}
</style>
