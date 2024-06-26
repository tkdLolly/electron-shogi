<template>
  <div>
    <BoardView
      :board-image-type="appSetting.boardImage"
      :piece-stand-image-type="appSetting.pieceStandImage"
      :board-label-type="appSetting.boardLabelType"
      :piece-image-url-template="getPieceImageURLTemplate(appSetting)"
      :king-piece-type="appSetting.kingPieceType"
      :custom-board-image-url="appSetting.boardImageFileURL"
      :custom-piece-stand-image-url="appSetting.pieceStandImageFileURL"
      :board-image-opacity="appSetting.enableTransparent ? appSetting.boardOpacity : 1"
      :piece-stand-image-opacity="appSetting.enableTransparent ? appSetting.pieceStandOpacity : 1"
      :max-size="maxSize"
      :position="store.record.position"
      :last-move="lastMove"
      :flip="appSetting.boardFlipping"
      :hide-clock="store.appState !== AppState.GAME && store.appState !== AppState.CSA_GAME"
      :allow-move="store.isMovableByUser"
      :allow-edit="store.appState === AppState.POSITION_EDITING"
      :black-player-name="blackPlayerName"
      :white-player-name="whitePlayerName"
      :black-player-time="clock?.black.time"
      :black-player-byoyomi="clock?.black.byoyomi"
      :white-player-time="clock?.white.time"
      :white-player-byoyomi="clock?.white.byoyomi"
      :next-move-label="t.nextTurn"
      @resize="onResize"
      @move="onMove"
      @edit="onEdit"
    >
      <template #right-control>
        <div
          v-show="appSetting.rightSideControlType !== RightSideControlType.NONE"
          ref="rightControl"
          class="full column top-control"
        >
          <!-- 対局 -->
          <button v-if="store.appState === AppState.NORMAL" class="control-item" @click="onGame">
            <Icon :icon="IconType.GAME" />
            <span>{{ t.game }}</span>
          </button>
          <!-- 持将棋の点数 -->
          <button
            v-if="store.appState === AppState.GAME || store.appState === AppState.CSA_GAME"
            class="control-item"
            @click="onJishogiPoints"
          >
            <Icon :icon="IconType.QUESTION" />
            <span>{{ t.jishogiPoints }}</span>
          </button>
          <!-- 戦績確認 -->
          <button
            v-if="store.appState === AppState.GAME && store.gameSetting.repeat >= 2"
            class="control-item"
            @click="onShowGameResults"
          >
            <Icon :icon="IconType.SCORE" />
            <span>{{ t.displayGameResults }}</span>
          </button>
          <!-- 対局中断 -->
          <button
            v-if="store.appState === AppState.GAME || store.appState === AppState.CSA_GAME"
            class="control-item"
            data-hotkey="Escape"
            @click="onStop"
          >
            <Icon :icon="IconType.STOP" />
            <span>{{ t.stopGame }}</span>
          </button>
          <!-- 勝ち宣言 -->
          <button
            v-if="
              store.isMovableByUser &&
              (store.appState === AppState.CSA_GAME ||
                (store.appState === AppState.GAME &&
                  DeclarableJishogiRules.includes(store.gameSetting.jishogiRule)))
            "
            class="control-item"
            @click="onWin"
          >
            <Icon :icon="IconType.CALL" />
            <span>{{ t.declareWinning }}</span>
          </button>
          <!-- 投了 -->
          <button
            v-if="
              (store.appState === AppState.GAME || store.appState === AppState.CSA_GAME) &&
              store.isMovableByUser
            "
            class="control-item"
            @click="onResign"
          >
            <Icon :icon="IconType.RESIGN" />
            <span>{{ t.resign }}</span>
          </button>
          <!-- 検討 -->
          <button
            v-if="store.appState === AppState.NORMAL"
            class="control-item"
            data-hotkey="Mod+r"
            @click="onResearch"
          >
            <Icon :icon="IconType.RESEARCH" />
            <span>{{ t.research }}</span>
          </button>
          <!-- 検討終了 -->
          <button
            v-if="store.appState === AppState.RESEARCH"
            class="control-item"
            data-hotkey="Escape"
            @click="onEndResearch"
          >
            <Icon :icon="IconType.END" />
            <span>{{ t.endResearch }}</span>
          </button>
          <!-- 解析 -->
          <button
            v-if="store.appState === AppState.NORMAL"
            class="control-item"
            data-hotkey="Mod+a"
            @click="onAnalysis"
          >
            <Icon :icon="IconType.ANALYSIS" />
            <span>{{ t.analysis }}</span>
          </button>
          <!-- 解析中断 -->
          <button
            v-if="store.appState === AppState.ANALYSIS"
            class="control-item"
            data-hotkey="Escape"
            @click="onEndAnalysis"
          >
            <Icon :icon="IconType.STOP" />
            <span>{{ t.stopAnalysis }}</span>
          </button>
          <!-- 詰み探索 -->
          <button
            v-if="store.appState === AppState.NORMAL"
            class="control-item"
            data-hotkey="Mod+m"
            @click="onMateSearch"
          >
            <Icon :icon="IconType.MATE_SEARCH" />
            <span>{{ t.mateSearch }}</span>
          </button>
          <!-- 詰み探索終了 -->
          <button
            v-if="store.appState === AppState.MATE_SEARCH"
            class="control-item"
            data-hotkey="Escape"
            @click="onStopMateSearch"
          >
            <Icon :icon="IconType.END" />
            <span>{{ t.stopMateSearch }}</span>
          </button>
          <!-- 局面編集 -->
          <button
            v-if="store.appState === AppState.NORMAL"
            class="control-item"
            @click="onStartEditPosition"
          >
            <Icon :icon="IconType.EDIT" />
            <span>{{ t.setupPosition }}</span>
          </button>
          <!-- 盤面編集終了 -->
          <button
            v-if="store.appState === AppState.POSITION_EDITING"
            class="control-item"
            data-hotkey="Escape"
            @click="onEndEditPosition"
          >
            <Icon :icon="IconType.CHECK" />
            <span>{{ t.completePositionSetup }}</span>
          </button>
          <!-- 手番変更 -->
          <button
            v-if="store.appState === AppState.POSITION_EDITING"
            class="control-item"
            @click="onChangeTurn"
          >
            <Icon :icon="IconType.SWAP" />
            <span>{{ t.changeTurn }}</span>
          </button>
          <!-- 局面の初期化 -->
          <button
            v-if="store.appState === AppState.POSITION_EDITING"
            class="control-item"
            @click="onInitPosition"
          >
            <span>{{ t.initializePosition }}</span>
          </button>
          <!-- 駒の増減 -->
          <button
            v-if="store.appState === AppState.POSITION_EDITING"
            class="control-item"
            @click="onPieceSetChange"
          >
            <span>{{ t.changePieceSet }}</span>
          </button>
        </div>
      </template>
      <template #left-control>
        <div
          v-show="appSetting.leftSideControlType !== LeftSideControlType.NONE"
          ref="leftControl"
          class="full column reverse bottom-control"
        >
          <!-- アプリ設定 -->
          <button class="control-item" data-hotkey="Mod+," @click="onOpenAppSettings">
            <Icon :icon="IconType.SETTINGS" />
            <span>{{ t.appSettings }}</span>
          </button>
          <!-- エンジン設定 -->
          <button
            class="control-item"
            data-hotkey="Mod+."
            :disabled="store.appState !== AppState.NORMAL"
            @click="onOpenEngineSettings"
          >
            <Icon :icon="IconType.ENGINE_SETTINGS" />
            <span>{{ t.engineSettings }}</span>
          </button>
          <!-- 盤面反転 -->
          <button class="control-item" data-hotkey="Mod+t" @click="onFlip">
            <Icon :icon="IconType.FLIP" />
            <span>{{ t.flipBoard }}</span>
          </button>
          <!-- ファイル -->
          <button class="control-item" @click="onFileAction">
            <Icon :icon="IconType.FILE" />
            <span>{{ t.file }}</span>
          </button>
          <!-- 指し手削除 -->
          <button
            class="control-item"
            data-hotkey="Mod+d"
            :disabled="store.appState !== AppState.NORMAL && store.appState !== AppState.RESEARCH"
            @click="onRemoveCurrentMove"
          >
            <Icon :icon="IconType.DELETE" />
            <span>{{ t.deleteMove }}</span>
          </button>
        </div>
      </template>
    </BoardView>
    <GameMenu v-if="isGameMenuVisible" @close="isGameMenuVisible = false" />
    <FileMenu v-if="isFileMenuVisible" @close="isFileMenuVisible = false" />
    <InitialPositionMenu
      v-if="isInitialPositionMenuVisible"
      @close="isInitialPositionMenuVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { t } from "@/common/i18n";
import { computed, onUpdated, onBeforeUpdate, ref, onMounted, onBeforeUnmount } from "vue";
import BoardView from "@/renderer/view/primitive/BoardView.vue";
import { Move, PositionChange, getBlackPlayerName, getWhitePlayerName } from "electron-shogi-core";
import { RectSize } from "@/common/assets/geometry.js";
import { useStore } from "@/renderer/store";
import Icon from "@/renderer/view/primitive/Icon.vue";
import { AppState } from "@/common/control/state.js";
import { humanPlayer } from "@/renderer/players/human";
import { IconType } from "@/renderer/assets/icons";
import GameMenu from "@/renderer/view/menu/GameMenu.vue";
import FileMenu from "@/renderer/view/menu/FileMenu.vue";
import InitialPositionMenu from "@/renderer/view/menu/InitialPositionMenu.vue";
import { CSAGameState } from "@/renderer/store/csa";
import {
  installHotKeyForMainWindow,
  uninstallHotKeyForMainWindow,
} from "@/renderer/devices/hotkey";
import { useAppSetting } from "@/renderer/store/setting";
import {
  RightSideControlType,
  LeftSideControlType,
  getPieceImageURLTemplate,
} from "@/common/settings/app";
import { DeclarableJishogiRules } from "@/common/settings/game";

defineProps({
  maxSize: {
    type: RectSize,
    required: true,
  },
});

const emit = defineEmits<{
  resize: [RectSize];
}>();

const store = useStore();
const appSetting = useAppSetting();
const rightControl = ref();
const leftControl = ref();
const isGameMenuVisible = ref(false);
const isFileMenuVisible = ref(false);
const isInitialPositionMenuVisible = ref(false);

onMounted(() => {
  installHotKeyForMainWindow(rightControl.value);
  installHotKeyForMainWindow(leftControl.value);
});

onUpdated(() => {
  installHotKeyForMainWindow(rightControl.value);
  installHotKeyForMainWindow(leftControl.value);
});

onBeforeUpdate(() => {
  uninstallHotKeyForMainWindow(rightControl.value);
  uninstallHotKeyForMainWindow(leftControl.value);
});

onBeforeUnmount(() => {
  uninstallHotKeyForMainWindow(rightControl.value);
  uninstallHotKeyForMainWindow(leftControl.value);
});

const onResize = (size: RectSize) => {
  emit("resize", size);
};

const onMove = (move: Move) => {
  if (store.appState === AppState.GAME || store.appState === AppState.CSA_GAME) {
    humanPlayer.doMove(move);
  } else {
    store.doMove(move);
  }
};

const onEdit = (change: PositionChange) => {
  store.editPosition(change);
};

const onGame = () => {
  isGameMenuVisible.value = true;
};

const onShowGameResults = () => {
  store.showGameResults();
};

const onStop = () => {
  store.stopGame();
};

const onWin = () => {
  store.showConfirmation({
    message: t.areYouSureWantToDoDeclaration,
    onOk: () => {
      humanPlayer.win();
    },
  });
};

const onResign = () => {
  store.showConfirmation({
    message: t.areYouSureWantToResign,
    onOk: () => {
      humanPlayer.resign();
    },
  });
};

const onJishogiPoints = () => {
  store.showJishogiPoints();
};

const onResearch = () => {
  store.showResearchDialog();
};

const onEndResearch = () => {
  store.stopResearch();
};

const onAnalysis = () => {
  store.showAnalysisDialog();
};

const onEndAnalysis = () => {
  store.stopAnalysis();
};

const onMateSearch = () => {
  store.showMateSearchDialog();
};

const onStopMateSearch = () => {
  store.stopMateSearch();
};

const onStartEditPosition = () => {
  store.startPositionEditing();
};

const onEndEditPosition = () => {
  store.endPositionEditing();
};

const onInitPosition = () => {
  isInitialPositionMenuVisible.value = true;
};

const onChangeTurn = () => {
  store.changeTurn();
};

const onPieceSetChange = () => {
  store.showPieceSetChangeDialog();
};

const onOpenAppSettings = () => {
  store.showAppSettingDialog();
};

const onOpenEngineSettings = () => {
  store.showUsiEngineManagementDialog();
};

const onFlip = () => {
  appSetting.flipBoard();
};

const onFileAction = () => {
  isFileMenuVisible.value = true;
};

const onRemoveCurrentMove = () => {
  store.removeCurrentMove();
};

const lastMove = computed(() => {
  const move = store.record.current.move;
  return move instanceof Move ? move : undefined;
});

const blackPlayerName = computed(() => getBlackPlayerName(store.record.metadata) || t.sente);
const whitePlayerName = computed(() => getWhitePlayerName(store.record.metadata) || t.gote);

const clock = computed(() => {
  if (store.appState === AppState.GAME || store.csaGameState === CSAGameState.GAME) {
    return {
      black: {
        time: store.blackTime,
        byoyomi: store.blackByoyomi,
      },
      white: {
        time: store.whiteTime,
        byoyomi: store.whiteByoyomi,
      },
    };
  }
  return undefined;
});
</script>

<style scoped>
.control-item {
  width: 100%;
  height: 19%;
  font-size: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  line-height: 200%;
  padding: 0 5% 0 5%;
}
.top-control .control-item:not(:last-child) {
  margin-bottom: 1%;
}
.bottom-control .control-item:not(:last-child) {
  margin-top: 1%;
}
.control-item .icon {
  height: 68%;
}
</style>
