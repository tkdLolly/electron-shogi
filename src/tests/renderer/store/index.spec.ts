/* eslint-disable @typescript-eslint/no-non-null-assertion */
import api, { API } from "@/renderer/ipc/api";
import { Move } from "electron-shogi-core";
import { createStore, ResearchState } from "@/renderer/store";
import { RecordCustomData } from "@/renderer/store/record";
import * as audio from "@/renderer/devices/audio";
import { gameSetting10m30s } from "@/tests/mock/game";
import { GameManager } from "@/renderer/store/game";
import { AppState } from "@/common/control/state";
import { AnalysisManager } from "@/renderer/store/analysis";
import { analysisSetting } from "@/tests/mock/analysis";
import { USIPlayer } from "@/renderer/players/usi";
import { researchSetting } from "@/tests/mock/research";
import {
  csaGameSetting,
  emptyCSAGameSettingHistory,
  singleCSAGameSettingHistory,
} from "@/tests/mock/csa";
import { CSAGameManager } from "@/renderer/store/csa";
import { convert } from "encoding-japanese";
import { Mocked, MockedClass } from "vitest";
import { useAppSetting } from "@/renderer/store/setting";
import { defaultAppSetting } from "@/common/settings/app";

vi.mock("@/renderer/devices/audio");
vi.mock("@/renderer/ipc/api");
vi.mock("@/renderer/store/game");
vi.mock("@/renderer/store/csa");
vi.mock("@/renderer/players/usi");
vi.mock("@/renderer/store/analysis");

const mockAudio = audio as Mocked<typeof audio>;
const mockAPI = api as Mocked<API>;
const mockGameManager = GameManager as MockedClass<typeof GameManager>;
const mockCSAGameManager = CSAGameManager as MockedClass<typeof CSAGameManager>;
const mockUSIPlayer = USIPlayer as MockedClass<typeof USIPlayer>;
const mockAnalysisManager = AnalysisManager as MockedClass<typeof AnalysisManager>;

const sampleKIF = `
手合割：平手
手数----指手---------消費時間--
   1 ２六歩(27)   ( 0:00/00:00:00)
*通常コメント
   2 ８四歩(83)   ( 0:00/00:00:00)
*#評価値=108
   3 ７六歩(77)   ( 0:00/00:00:00)
   4 ８五歩(84)   ( 0:00/00:00:00)
   5 ７七角(88)   ( 0:00/00:00:00)
   6 ３二金(41)   ( 0:00/00:00:00)
   7 ６八銀(79)   ( 0:00/00:00:00)
   8 ３四歩(33)   ( 0:00/00:00:00)
   9 ７八金(69)   ( 0:00/00:00:00)
  10 ４二銀(31)   ( 0:00/00:00:00)
`;

const sampleCSA = `V2.2
P1 *  *  *  *  *  *  * -KE * 
P2 *  *  *  *  *  * -KI-OU * 
P3 *  *  *  *  *  * -KI-FU+KE
P4 *  *  *  *  *  *  *  *  * 
P5 *  *  *  *  *  *  *  *  * 
P6 *  *  *  *  *  * -KA * +FU
P7 *  *  *  *  *  *  *  *  * 
P8 *  *  *  *  *  *  *  *  * 
P9 *  *  *  *  *  *  *  *  * 
P+00HI00HI00KI00KI
P-00AL
+
+1321NK,T0
'読み飛ばすコメント
'*初手へのコメント
'** 30011 2b2a
-2221OU,T0
'** 30010
+0013KE,T0
'** 30009
-2122OU,T0
'** 30008
+0012KI,T0
'** 30007
-2212OU,T0
'** 30006
+0011HI,T0
'** 30005
-1211OU,T0
'** 30004
+0021KI,T0
'** 30003
-1112OU,T0
'** 30002
+0011HI,T0
'** 30001
%TSUMI,T0
`;

const sampleBranchKIF = `
手合割：平手
手数----指手---------消費時間--
1 ２六歩(27) ( 0:00/0:00:00)
2 ８四歩(83) ( 0:00/0:00:00)
3 ２五歩(26) ( 0:00/0:00:00)
4 ８五歩(84) ( 0:00/0:00:00)
5 ７八金(69) ( 0:00/0:00:00)
6 ３二金(41) ( 0:00/0:00:00)
7 ３八銀(39) ( 0:00/0:00:00)+
8 ７二銀(71) ( 0:00/0:00:00)
9 中断 ( 0:00/0:00:00)

変化：7手
7 ２四歩(25) ( 0:00/0:00:00)
`;

describe("store/index", () => {
  beforeEach(() => {
    mockGameManager.prototype.on.mockReturnThis();
    mockCSAGameManager.prototype.on.mockReturnThis();
    mockAnalysisManager.prototype.on.mockReturnThis();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    useAppSetting().updateAppSetting(defaultAppSetting());
  });

  it("message", () => {
    const store = createStore();
    expect(store.hasMessage).toBeFalsy();
    store.enqueueMessage({ text: "first message" });
    expect(store.hasMessage).toBeTruthy();
    expect(store.message.text).toBe("first message");
    expect(store.message.attachments).toBeUndefined();
    store.enqueueMessage({
      text: "second message",
      attachments: [
        {
          type: "list",
          items: [{ text: "item1" }, { text: "item2" }],
        },
      ],
    });
    expect(store.hasMessage).toBeTruthy();
    expect(store.message.text).toBe("first message");
    expect(store.message.attachments).toBeUndefined();
    store.dequeueMessage();
    expect(store.hasMessage).toBeTruthy();
    expect(store.message.text).toBe("second message");
    expect(store.message.attachments).toHaveLength(1);
    expect(store.message.attachments![0].type).toBe("list");
    expect(store.message.attachments![0].items).toHaveLength(2);
    expect(store.message.attachments![0].items[0].text).toBe("item1");
    expect(store.message.attachments![0].items[1].text).toBe("item2");
    store.dequeueMessage();
    expect(store.hasMessage).toBeFalsy();
  });

  it("errors", () => {
    const store = createStore();
    expect(store.hasError).toBeFalsy();
    expect(store.errors).toHaveLength(0);
    store.pushError("first error");
    expect(store.hasError).toBeTruthy();
    expect(store.errors).toHaveLength(1);
    expect(store.errors[0].message).toBe("first error");
    store.pushError("second error");
    expect(store.hasError).toBeTruthy();
    expect(store.errors).toHaveLength(2);
    expect(store.errors[0].message).toBe("first error");
    expect(store.errors[1].message).toBe("second error");
    store.clearErrors();
    expect(store.hasError).toBeFalsy();
    expect(store.errors).toHaveLength(0);
  });

  it("showConfirmation", () => {
    const store = createStore();
    const confirmation1 = {
      message: "Are you ready?",
      onOk: vi.fn(),
    };
    store.showConfirmation(confirmation1);
    expect(store.confirmation).toBe("Are you ready?");
    store.confirmationOk();
    expect(store.confirmation).toBeUndefined();
    expect(confirmation1.onOk).toBeCalledTimes(1);
    const confirmation2 = {
      message: "Do you really want to delete?",
      onOk: vi.fn(),
    };
    store.showConfirmation(confirmation2);
    expect(store.confirmation).toBe("Do you really want to delete?");
    store.confirmationCancel();
    expect(store.confirmation).toBeUndefined();
    expect(confirmation2.onOk).toBeCalledTimes(0);
  });

  it("updateUSIInfo", () => {
    vi.useFakeTimers();
    const usi = "position startpos moves 7g7f";
    const store = createStore();
    store.pasteRecord(usi);
    store.updateUSIInfo(101, usi, "Engine A", {
      depth: 8,
      scoreCP: 138,
      pv: ["8c8d", "2g2f", "foo", "bar"],
    });
    vi.runOnlyPendingTimers();
    expect(store.usiMonitors).toHaveLength(1);
    expect(store.usiMonitors[0].sfen).toBe(
      "lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL w - 1",
    );
    expect(store.usiMonitors[0].iterations.length).toBe(1);
    expect(store.usiMonitors[0].iterations[0].depth).toBe(8);
    expect(store.usiMonitors[0].iterations[0].score).toBe(138);
    expect(store.usiMonitors[0].iterations[0].pv).toEqual(["8c8d", "2g2f", "foo", "bar"]);
    expect(store.usiMonitors[0].iterations[0].text).toBe("☖８四歩☗２六歩 foo bar");
    store.updateUSIInfo(101, usi, "Engine A", {
      depth: 10,
      scoreCP: 213,
    });
    store.updateUSIPonderInfo(102, usi, "Engine B", {
      depth: 9,
      scoreCP: -89,
    });
    vi.runOnlyPendingTimers();
    expect(store.usiMonitors).toHaveLength(2);
    expect(store.usiMonitors[0].iterations.length).toBe(2);
    expect(store.usiMonitors[0].iterations[0].depth).toBe(10);
    expect(store.usiMonitors[0].iterations[0].score).toBe(213);
    expect(store.usiMonitors[1].iterations.length).toBe(1);
    expect(store.usiMonitors[1].iterations[0].depth).toBe(9);
    expect(store.usiMonitors[1].iterations[0].score).toBe(-89);
  });

  it("updateUSIPonderInfo", () => {
    vi.useFakeTimers();
    const usi = "position startpos moves 7g7f";
    const usi2 = "position startpos moves 7g7f 3c3d";
    const store = createStore();
    store.pasteRecord(usi);
    store.updateUSIPonderInfo(101, usi2, "Engine A", {
      depth: 8,
      scoreCP: 138,
    });
    vi.runOnlyPendingTimers();
    expect(store.usiMonitors[0].sfen).toBe(
      "lnsgkgsnl/1r5b1/pppppp1pp/6p2/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL b - 1",
    );
    expect(store.usiMonitors[0].ponderMove).toBe("☖３四歩");
    expect(store.usiMonitors[0].iterations.length).toBe(1);
    expect(store.usiMonitors[0].iterations[0].depth).toBe(8);
    expect(store.usiMonitors[0].iterations[0].score).toBe(138);
  });

  it("startGame/success", async () => {
    mockAPI.saveGameSetting.mockResolvedValue();
    mockGameManager.prototype.start.mockResolvedValue();
    const store = createStore();
    store.showGameDialog();
    store.startGame(gameSetting10m30s);
    expect(store.isBussy).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.GAME);
    expect(mockAPI.saveGameSetting).toBeCalledTimes(1);
    expect(mockAPI.saveGameSetting.mock.calls[0][0]).toBe(gameSetting10m30s);
    expect(mockGameManager.prototype.start).toBeCalledTimes(1);
    expect(mockGameManager.prototype.start.mock.calls[0][0]).toBe(gameSetting10m30s);
  });

  it("startGame/invalidState", () => {
    const store = createStore();
    store.startGame(gameSetting10m30s);
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.NORMAL);
  });

  it("loginCSAGame/success", async () => {
    mockAPI.loadCSAGameSettingHistory.mockResolvedValue(emptyCSAGameSettingHistory);
    mockAPI.saveCSAGameSettingHistory.mockResolvedValue();
    mockCSAGameManager.prototype.login.mockResolvedValue();
    const store = createStore();
    store.showCSAGameDialog();
    store.loginCSAGame(csaGameSetting, { saveHistory: true });
    expect(store.isBussy).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.CSA_GAME);
    expect(mockAPI.loadCSAGameSettingHistory).toBeCalledTimes(1);
    expect(mockAPI.saveCSAGameSettingHistory).toBeCalledTimes(1);
    expect(mockAPI.saveCSAGameSettingHistory.mock.calls[0][0]).toStrictEqual(
      singleCSAGameSettingHistory,
    );
    expect(mockCSAGameManager.prototype.login).toBeCalledTimes(1);
    expect(mockCSAGameManager.prototype.login.mock.calls[0][0]).toBe(csaGameSetting);
  });

  it("loginCSAGame/doNotSaveHistory", async () => {
    mockAPI.loadCSAGameSettingHistory.mockResolvedValue(emptyCSAGameSettingHistory);
    mockAPI.saveCSAGameSettingHistory.mockResolvedValue();
    mockCSAGameManager.prototype.login.mockResolvedValue();
    const store = createStore();
    store.showCSAGameDialog();
    store.loginCSAGame(csaGameSetting, { saveHistory: false });
    expect(store.isBussy).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.CSA_GAME);
    expect(mockAPI.loadCSAGameSettingHistory).toBeCalledTimes(0);
    expect(mockAPI.saveCSAGameSettingHistory).toBeCalledTimes(0);
    expect(mockCSAGameManager.prototype.login).toBeCalledTimes(1);
    expect(mockCSAGameManager.prototype.login.mock.calls[0][0]).toBe(csaGameSetting);
  });

  it("loginCSAGame/invalidState", () => {
    const store = createStore();
    store.loginCSAGame(csaGameSetting, { saveHistory: true });
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.NORMAL);
  });

  it("startResearch/success", async () => {
    mockAPI.saveResearchSetting.mockResolvedValue();
    mockUSIPlayer.prototype.launch.mockResolvedValue();
    mockUSIPlayer.prototype.startResearch.mockResolvedValue();
    const store = createStore();
    store.showResearchDialog();
    store.startResearch(researchSetting);
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.researchState).toBe(ResearchState.RUNNING);
    expect(mockAPI.saveResearchSetting).toBeCalledTimes(1);
    expect(mockUSIPlayer).toBeCalledTimes(1);
    expect(mockUSIPlayer.mock.calls[0][0]).toBe(researchSetting.usi);
    expect(mockUSIPlayer.prototype.launch).toBeCalledTimes(1);
    // FIXME: 遅延実行の導入によってすぐに呼ばれなくなった。
    //expect(mockUSIPlayer.prototype.startResearch).toBeCalledTimes(1);
    mockUSIPlayer.prototype.close.mockResolvedValue();
    store.stopResearch();
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.NORMAL);
    expect(mockUSIPlayer.prototype.close).toBeCalledTimes(1);
  });

  it("startResearch/invalidState", () => {
    const store = createStore();
    store.startResearch(researchSetting);
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.NORMAL);
  });

  it("startAnalysis/success", async () => {
    mockAPI.saveAnalysisSetting.mockResolvedValue();
    mockAnalysisManager.prototype.start.mockResolvedValue();
    const store = createStore();
    store.showAnalysisDialog();
    store.startAnalysis(analysisSetting);
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.ANALYSIS);
    expect(mockAPI.saveAnalysisSetting).toBeCalledTimes(1);
    expect(mockAPI.saveAnalysisSetting.mock.calls[0][0]).toBe(analysisSetting);
    expect(mockAnalysisManager).toBeCalledTimes(1);
    expect(mockAnalysisManager.prototype.start).toBeCalledTimes(1);
    expect(mockAnalysisManager.prototype.start.mock.calls[0][0]).toBe(analysisSetting);
  });

  it("startAnalysis/invalidState", () => {
    const store = createStore();
    store.startAnalysis(analysisSetting);
    expect(store.isBussy).toBeFalsy();
    expect(store.appState).toBe(AppState.NORMAL);
  });

  it("doMove", () => {
    mockAudio.playPieceBeat.mockReturnValue();
    const store = createStore();
    store.doMove(store.record.position.createMoveByUSI("7g7f") as Move);
    store.doMove(store.record.position.createMoveByUSI("3c3d") as Move);
    store.doMove(store.record.position.createMoveByUSI("2g2f") as Move);
    expect(store.record.current.ply).toBe(3);
    expect(store.record.position.sfen).toBe(
      "lnsgkgsnl/1r5b1/pppppp1pp/6p2/9/2P4P1/PP1PPPP1P/1B5R1/LNSGKGSNL w - 1",
    );
  });

  it("resetRecord", async () => {
    mockAPI.showOpenRecordDialog.mockResolvedValueOnce("/test/sample.kif");
    mockAPI.openRecord.mockResolvedValueOnce(
      convert(sampleKIF, { type: "arraybuffer", to: "SJIS" }) as Uint8Array,
    );
    const store = createStore();
    store.openRecord();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.record.moves.length).not.toBe(1);
    expect(store.recordFilePath).not.toBeUndefined();
    store.resetRecord();
    expect(store.confirmation).toBe("現在の棋譜は削除されます。よろしいですか？");
    store.confirmationOk();
    expect(store.record.moves.length).toBe(1);
    expect(store.recordFilePath).toBeUndefined();
  });

  it("removeCurrentMove", () => {
    const store = createStore();
    store.pasteRecord(sampleBranchKIF);
    store.changePly(8);
    store.removeCurrentMove();
    expect(store.confirmation).toBeUndefined();
    expect(store.record.current.ply).toBe(7);
    expect(store.record.moves.length).toBe(8);
    store.removeCurrentMove();
    expect(store.confirmation).toBeUndefined();
    expect(store.record.current.ply).toBe(6);
    expect(store.record.moves.length).toBe(8);
    store.removeCurrentMove();
    expect(store.confirmation).toBe("6手目以降を削除します。よろしいですか？");
    store.confirmationCancel();
    expect(store.record.current.ply).toBe(6);
    expect(store.record.moves.length).toBe(8);
    store.removeCurrentMove();
    expect(store.confirmation).toBe("6手目以降を削除します。よろしいですか？");
    store.confirmationOk();
    expect(store.record.current.ply).toBe(5);
    expect(store.record.moves.length).toBe(6);
  });

  it("copyRecordKIF", () => {
    const writeText = vi.fn();
    vi.spyOn(global, "navigator", "get").mockReturnValueOnce(
      Object.assign(navigator, {
        clipboard: {
          writeText,
        },
      }),
    );
    const store = createStore();
    store.copyRecordKIF();
    expect(writeText).toBeCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toBe(
      "# KIF形式棋譜ファイル Generated by Electron Shogi\r\n" +
        "手合割：平手\r\n" +
        "手数----指手---------消費時間--\r\n",
    );
  });

  it("copyRecordCSA", () => {
    const writeText = vi.fn();
    vi.spyOn(global, "navigator", "get").mockReturnValueOnce(
      Object.assign(navigator, {
        clipboard: {
          writeText,
        },
      }),
    );
    const store = createStore();
    store.copyRecordCSA();
    expect(writeText).toBeCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toBe(
      "' CSA形式棋譜ファイル Generated by Electron Shogi\r\nV2.2\r\nPI\r\n+\r\n",
    );
  });

  it("copyRecordCSA/v3", async () => {
    const writeText = vi.fn();
    vi.spyOn(global, "navigator", "get").mockReturnValueOnce(
      Object.assign(navigator, {
        clipboard: {
          writeText,
        },
      }),
    );
    await useAppSetting().updateAppSetting({ useCSAV3: true });
    const store = createStore();
    store.copyRecordCSA();
    expect(writeText).toBeCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toBe(
      "'CSA encoding=UTF-8\r\n' CSA形式棋譜ファイル Generated by Electron Shogi\r\nV3.0\r\nPI\r\n+\r\n",
    );
  });

  it("pasteRecord/kif/success", () => {
    const store = createStore();
    store.pasteRecord(sampleKIF);
    const moves = store.record.moves;
    expect(moves.length).toBe(11);
    expect(moves[1].comment).toBe("通常コメント\n");
    expect(moves[1].customData).toStrictEqual({});
    expect(moves[2].comment).toBe("#評価値=108\n");
    const customData = moves[2].customData as RecordCustomData;
    expect(customData.researchInfo?.score).toBe(108);
    expect(store.hasError).toBeFalsy();
    expect(store.isRecordFileUnsaved).toBeTruthy();
  });

  it("pasteRecord/csa/success", () => {
    const store = createStore();
    store.pasteRecord(sampleCSA);
    const moves = store.record.moves;
    expect(moves.length).toBe(13);
    store.changePly(1);
    expect(store.record.current.comment).toBe("初手へのコメント\n* 30011 2b2a\n");
    const customData1 = store.record.current.customData as RecordCustomData;
    expect(customData1.playerSearchInfo?.score).toBe(30011);
    store.changePly(2);
    expect(store.record.current.comment).toBe("* 30010\n");
    const customData2 = store.record.current.customData as RecordCustomData;
    expect(customData2.playerSearchInfo?.score).toBe(30010);
    expect(store.hasError).toBeFalsy();
    expect(store.isRecordFileUnsaved).toBeTruthy();
  });

  it("pasteRecord/invalidState", () => {
    const store = createStore();
    store.showGameDialog();
    store.pasteRecord(sampleKIF);
    const moves = store.record.moves;
    expect(moves.length).toBe(1);
    expect(store.hasError).toBeFalsy();
    expect(store.isRecordFileUnsaved).toBeFalsy();
  });

  it("openRecord/kif/success", async () => {
    mockAPI.showOpenRecordDialog.mockResolvedValueOnce("/test/sample.kif");
    mockAPI.openRecord.mockResolvedValueOnce(
      convert(sampleKIF, { type: "arraybuffer", to: "SJIS" }) as Uint8Array,
    );
    const store = createStore();
    store.openRecord();
    expect(store.isBussy).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.errors).toStrictEqual([]);
    expect(store.recordFilePath).toBe("/test/sample.kif");
    const moves = store.record.moves;
    expect(moves.length).toBe(11);
    expect(moves[1].comment).toBe("通常コメント\n");
    expect(moves[1].customData).toStrictEqual({});
    expect(moves[2].comment).toBe("#評価値=108\n");
    const customData = moves[2].customData as RecordCustomData;
    expect(customData.researchInfo?.score).toBe(108);
    expect(store.hasError).toBeFalsy();
    expect(store.isRecordFileUnsaved).toBeFalsy();
  });

  it("openRecord/kif-utf8/success", async () => {
    mockAPI.showOpenRecordDialog.mockResolvedValueOnce("/test/sample.kif");
    mockAPI.openRecord.mockResolvedValueOnce(
      new Uint8Array(convert(sampleKIF, { type: "arraybuffer", to: "UTF8" })),
    );
    const store = createStore();
    store.openRecord();
    expect(store.isBussy).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.errors).toStrictEqual([]);
    expect(store.recordFilePath).toBe("/test/sample.kif");
    const moves = store.record.moves;
    expect(moves.length).toBe(11);
    expect(moves[1].comment).toBe("通常コメント\n");
    expect(moves[1].customData).toStrictEqual({});
    expect(moves[2].comment).toBe("#評価値=108\n");
    const customData = moves[2].customData as RecordCustomData;
    expect(customData.researchInfo?.score).toBe(108);
    expect(store.hasError).toBeFalsy();
    expect(store.isRecordFileUnsaved).toBeFalsy();
  });

  it("openRecord/kifu/success", async () => {
    mockAPI.showOpenRecordDialog.mockResolvedValueOnce("/test/sample.kifu");
    mockAPI.openRecord.mockResolvedValueOnce(
      new Uint8Array(convert(sampleKIF, { type: "arraybuffer", to: "UTF8" })),
    );
    const store = createStore();
    store.openRecord();
    expect(store.isBussy).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.errors).toStrictEqual([]);
    expect(store.recordFilePath).toBe("/test/sample.kifu");
    const moves = store.record.moves;
    expect(moves.length).toBe(11);
    expect(moves[1].comment).toBe("通常コメント\n");
    expect(moves[1].customData).toStrictEqual({});
    expect(moves[2].comment).toBe("#評価値=108\n");
    const customData = moves[2].customData as RecordCustomData;
    expect(customData.researchInfo?.score).toBe(108);
    expect(store.hasError).toBeFalsy();
    expect(store.isRecordFileUnsaved).toBeFalsy();
  });

  it("openRecord/csa/success", async () => {
    mockAPI.showOpenRecordDialog.mockResolvedValueOnce("/test/sample.csa");
    mockAPI.openRecord.mockResolvedValueOnce(new TextEncoder().encode(sampleCSA));
    const store = createStore();
    store.openRecord();
    expect(store.isBussy).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.errors).toStrictEqual([]);
    expect(store.recordFilePath).toBe("/test/sample.csa");
    const moves = store.record.moves;
    expect(moves.length).toBe(13);
    expect(store.hasError).toBeFalsy();
    expect(mockAPI.showOpenRecordDialog).toBeCalledTimes(1);
    expect(mockAPI.openRecord).toBeCalledTimes(1);
    expect(mockAPI.openRecord.mock.calls[0][0]).toBe("/test/sample.csa");
    expect(store.isRecordFileUnsaved).toBeFalsy();
  });

  it("openRecord/invalidState", () => {
    const store = createStore();
    store.showGameDialog();
    store.openRecord();
    const moves = store.record.moves;
    expect(moves.length).toBe(1);
    expect(store.hasError).toBeTruthy();
    expect(store.recordFilePath).toBeUndefined();
  });

  it("openRecord/cancel", async () => {
    mockAPI.showOpenRecordDialog.mockResolvedValueOnce("");
    const store = createStore();
    store.openRecord();
    expect(store.isBussy).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.recordFilePath).toBeUndefined();
    expect(store.hasError).toBeFalsy();
  });

  it("saveRecord/success", async () => {
    mockAPI.showSaveRecordDialog.mockResolvedValueOnce("/test/sample.csa");
    mockAPI.saveRecord.mockResolvedValueOnce();
    const store = createStore();
    store.saveRecord();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.recordFilePath).toBe("/test/sample.csa");
    expect(store.hasError).toBeFalsy();
    expect(mockAPI.showSaveRecordDialog).toBeCalledTimes(1);
    expect(mockAPI.saveRecord).toBeCalledTimes(1);
    expect(mockAPI.saveRecord.mock.calls[0][0]).toBe("/test/sample.csa");
    const data = new TextDecoder().decode(mockAPI.saveRecord.mock.calls[0][1]);
    expect(data).toMatch(/^' CSA形式棋譜ファイル Generated by Electron Shogi\r\n/);
    expect(store.isRecordFileUnsaved).toBeFalsy();
  });

  it("saveRecord/invalidState", () => {
    const store = createStore();
    store.showGameDialog();
    store.saveRecord();
    expect(store.hasError).toBeFalsy();
    expect(store.recordFilePath).toBeUndefined();
  });

  it("saveRecord/cancel", async () => {
    mockAPI.showSaveRecordDialog.mockResolvedValueOnce("");
    const store = createStore();
    store.saveRecord();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.recordFilePath).toBeUndefined();
    expect(store.hasError).toBeFalsy();
    expect(mockAPI.showSaveRecordDialog).toBeCalledTimes(1);
    expect(mockAPI.saveRecord).toBeCalledTimes(0);
  });

  it("saveRecord/noOverwrite", async () => {
    mockAPI.openRecord.mockResolvedValueOnce(
      new Uint8Array(convert(sampleKIF, { type: "arraybuffer", to: "SJIS" })),
    );
    mockAPI.showSaveRecordDialog.mockResolvedValueOnce("/test/sample2.csa");
    mockAPI.saveRecord.mockResolvedValueOnce();
    const store = createStore();
    store.openRecord("/test/sample1.csa");
    await new Promise((resolve) => setTimeout(resolve));
    store.saveRecord();
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.recordFilePath).toBe("/test/sample2.csa");
    expect(store.hasError).toBeFalsy();
    expect(store.isRecordFileUnsaved).toBeFalsy();
    expect(mockAPI.showSaveRecordDialog).toBeCalledTimes(1);
    expect(mockAPI.saveRecord).toBeCalledTimes(1);
  });

  it("saveRecord/overwrite", async () => {
    mockAPI.openRecord.mockResolvedValueOnce(
      new Uint8Array(convert(sampleKIF, { type: "arraybuffer", to: "SJIS" })),
    );
    mockAPI.showSaveRecordDialog.mockResolvedValueOnce("/test/sample2.csa");
    mockAPI.saveRecord.mockResolvedValueOnce();
    const store = createStore();
    store.openRecord("/test/sample1.csa");
    await new Promise((resolve) => setTimeout(resolve));
    store.saveRecord({ overwrite: true });
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.isBussy).toBeFalsy();
    expect(store.recordFilePath).toBe("/test/sample1.csa");
    expect(store.hasError).toBeFalsy();
    expect(store.isRecordFileUnsaved).toBeFalsy();
    expect(mockAPI.showSaveRecordDialog).toBeCalledTimes(0);
    expect(mockAPI.saveRecord).toBeCalledTimes(1);
  });

  it("showJishogiPoints", () => {
    const store = createStore();
    // https://denryu-sen.jp/denryusen/dr3_production/dist/#/dr3prd+t_test1_test2-600-2F+aobazero+aobazerotest+20221201210630
    store.pasteRecord(
      "2GK1+L3/2+P+S+R1G+N1/3+B1GG2/9/+r8/1+bs6/+p+p3+n3/2+n2k3/6+p2 b 2SN7P3l7p 375",
    );
    store.showJishogiPoints();
    expect(store.message).toStrictEqual({
      text: "持将棋の点数",
      attachments: [
        {
          type: "list",
          items: [
            {
              text: "先手",
              children: [
                "Points (Total): 28",
                "Points (Declaration): 28",
                "Rule-24: DRAW",
                "Rule-27: WIN",
              ],
            },
            {
              text: "後手",
              children: [
                "Points (Total): 26",
                "Points (Declaration): 15",
                "Rule-24: LOSE",
                "Rule-27: LOSE",
              ],
            },
          ],
        },
      ],
    });
  });
});
