import { CommandType } from "@/common/advanced/command";
import { PromptTarget } from "@/common/advanced/prompt";
import { MenuEvent } from "@/common/control/menu";
import { AppState } from "@/common/control/state";
import { CSAGameResult, CSASpecialMove } from "@/common/game/csa";
import { GameResult } from "@/common/game/result";
import { LogLevel, LogType } from "@/common/log";

export interface Bridge {
  // Core
  updateAppState(appState: AppState, bussy: boolean): void;
  onClosable(): void;
  onClose(callback: () => void): void;
  onSendError(callback: (e: Error) => void): void;
  onMenuEvent(callback: (event: MenuEvent) => void): void;

  // Settings
  loadAppSetting(): Promise<string>;
  saveAppSetting(setting: string): Promise<void>;
  loadBatchConversionSetting(): Promise<string>;
  saveBatchConversionSetting(setting: string): Promise<void>;
  loadResearchSetting(): Promise<string>;
  saveResearchSetting(setting: string): Promise<void>;
  loadAnalysisSetting(): Promise<string>;
  saveAnalysisSetting(setting: string): Promise<void>;
  loadGameSetting(): Promise<string>;
  saveGameSetting(setting: string): Promise<void>;
  loadCSAGameSettingHistory(): Promise<string>;
  saveCSAGameSettingHistory(setting: string): Promise<void>;
  loadMateSearchSetting(): Promise<string>;
  saveMateSearchSetting(setting: string): Promise<void>;
  loadUSIEngineSetting(): Promise<string>;
  saveUSIEngineSetting(setting: string): Promise<void>;
  onUpdateAppSetting(callback: (json: string) => void): void;

  // Record File
  fetchInitialRecordFileRequest(): Promise<string>;
  showOpenRecordDialog(): Promise<string>;
  showSaveRecordDialog(defaultPath: string): Promise<string>;
  showSaveMergedRecordDialog(defaultPath: string): Promise<string>;
  openRecord(path: string): Promise<Uint8Array>;
  saveRecord(path: string, data: Uint8Array): Promise<void>;
  loadRecordFileHistory(): Promise<string>;
  addRecordFileHistory(path: string): void;
  clearRecordFileHistory(): Promise<void>;
  saveRecordFileBackup(kif: string): Promise<void>;
  loadRecordFileBackup(name: string): Promise<string>;
  loadRemoteRecordFile(url: string): Promise<string>;
  convertRecordFiles(json: string): Promise<string>;
  onOpenRecord(callback: (path: string) => void): void;

  // USI
  showSelectUSIEngineDialog(): Promise<string>;
  getUSIEngineInfo(path: string, timeoutSeconds: number): Promise<string>;
  sendUSISetOption(path: string, name: string, timeoutSeconds: number): Promise<void>;
  usiLaunch(json: string, timeoutSeconds: number): Promise<number>;
  usiReady(sessionID: number): Promise<void>;
  usiGo(sessionID: number, usi: string, timeStatesJSON: string): Promise<void>;
  usiGoPonder(sessionID: number, usi: string, timeStatesJSON: string): Promise<void>;
  usiPonderHit(sessionID: number, timeStatesJSON: string): Promise<void>;
  usiGoInfinite(sessionID: number, usi: string): Promise<void>;
  usiGoMate(sessionID: number, usi: string): Promise<void>;
  usiStop(sessionID: number): Promise<void>;
  usiGameover(sessionID: number, result: GameResult): Promise<void>;
  usiQuit(sessionID: number): Promise<void>;
  onUSIBestMove(
    callback: (sessionID: number, usi: string, usiMove: string, ponder?: string) => void,
  ): void;
  onUSICheckmate(callback: (sessionID: number, usi: string, usiMoves: string[]) => void): void;
  onUSICheckmateNotImplemented(callback: (sessionID: number) => void): void;
  onUSICheckmateTimeout(callback: (sessionID: number, usi: string) => void): void;
  onUSINoMate(callback: (sessionID: number, usi: string) => void): void;
  onUSIInfo(callback: (sessionID: number, usi: string, json: string) => void): void;
  onUSIPonderInfo(callback: (sessionID: number, usi: string, json: string) => void): void;

  // CSA
  csaLogin(json: string): Promise<number>;
  csaLogout(sessionID: number): Promise<void>;
  csaAgree(sessionID: number, gameID: string): Promise<void>;
  csaMove(sessionID: number, move: string, score?: number, pv?: string): Promise<void>;
  csaResign(sessionID: number): Promise<void>;
  csaWin(sessionID: number): Promise<void>;
  csaStop(sessionID: number): Promise<void>;
  onCSAGameSummary(callback: (sessionID: number, gameSummary: string) => void): void;
  onCSAReject(callback: (sessionID: number) => void): void;
  onCSAStart(callback: (sessionID: number, playerStates: string) => void): void;
  onCSAMove(callback: (sessionID: number, mvoe: string, playerStates: string) => void): void;
  onCSAGameResult(
    callback: (sessionID: number, specialMove: CSASpecialMove, gameResult: CSAGameResult) => void,
  ): void;
  onCSAClose(callback: (sessionID: number) => void): void;

  // Sessions
  collectSessionStates(): Promise<string>;
  setupPrompt(target: PromptTarget, sessionID: number): Promise<string>;
  openPrompt(target: PromptTarget, sessionID: number, name: string): void;
  invokePromptCommand(
    target: PromptTarget,
    sessionID: number,
    type: CommandType,
    command: string,
  ): void;
  onPromptCommand(callback: (command: string) => void): void;

  // Images
  showSelectImageDialog(defaultURL?: string): Promise<string>;
  cropPieceImage(srcURL: string, deleteMargin: boolean): Promise<string>;
  exportCaptureAsPNG(json: string): Promise<void>;
  exportCaptureAsJPEG(json: string): Promise<void>;

  // Layout
  loadLayoutConfig(): Promise<[string, string]>;
  updateLayout(uri: string, profileConfig: string): void;
  onUpdateLayout(callback: (uri: string, json: string) => void): void;

  // Log
  openLogFile(logType: LogType): void;
  log(level: LogLevel, message: string): void;

  // MISC
  showSelectFileDialog(): Promise<string>;
  showSelectDirectoryDialog(defaultPath?: string): Promise<string>;
  openExplorer(path: string): void;
  openWebBrowser(url: string): void;
  isEncryptionAvailable(): Promise<boolean>;
  getVersionStatus(): Promise<string>;
  sendTestNotification(): void;
}
