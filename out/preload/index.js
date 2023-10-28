"use strict";
const electron = require("electron");
var Background = /* @__PURE__ */ ((Background2) => {
  Background2["GET_RECORD_PATH_FROM_PROC_ARG"] = "getRecordPathFromProcArg";
  Background2["UPDATE_APP_STATE"] = "updateAppState";
  Background2["OPEN_EXPLORER"] = "openExplorer";
  Background2["SHOW_OPEN_RECORD_DIALOG"] = "showOpenRecordDialog";
  Background2["OPEN_RECORD"] = "openRecord";
  Background2["SHOW_SAVE_RECORD_DIALOG"] = "showSaveRecordDialog";
  Background2["SAVE_RECORD"] = "saveRecord";
  Background2["SHOW_SELECT_FILE_DIALOG"] = "showSelectFileDialog";
  Background2["SHOW_SELECT_DIRECTORY_DIALOG"] = "showSelectDirectoryDialog";
  Background2["SHOW_SELECT_IMAGE_DIALOG"] = "showSelectImageDialog";
  Background2["SHOW_SAVE_MERGED_RECORD_DIALOG"] = "showSaveMergedRecordDialog";
  Background2["CROP_PIECE_IMAGE"] = "cropPieceImage";
  Background2["EXPORT_CAPTURE_AS_PNG"] = "exportCaptureAsPNG";
  Background2["EXPORT_CAPTURE_AS_JPEG"] = "exportCaptureAsJPEG";
  Background2["CONVERT_RECORD_FILES"] = "convertRecordFiles";
  Background2["LOAD_APP_SETTING"] = "loadAppSetting";
  Background2["SAVE_APP_SETTING"] = "saveAppSetting";
  Background2["LOAD_BATCH_CONVERSION_SETTING"] = "loadBatchConversionSetting";
  Background2["SAVE_BATCH_CONVERSION_SETTING"] = "saveBatchConversionSetting";
  Background2["LOAD_RESEARCH_SETTING"] = "loadResearchSetting";
  Background2["SAVE_RESEARCH_SETTING"] = "saveResearchSetting";
  Background2["LOAD_ANALYSIS_SETTING"] = "loadAnalysisSetting";
  Background2["SAVE_ANALYSIS_SETTING"] = "saveAnalysisSetting";
  Background2["LOAD_GAME_SETTING"] = "loadGameSetting";
  Background2["SAVE_GAME_SETTING"] = "saveGameSetting";
  Background2["LOAD_CSA_GAME_SETTING_HISTORY"] = "loadCSAGameSettingHistory";
  Background2["SAVE_CSA_GAME_SETTING_HISTORY"] = "saveCSAGameSettingHistory";
  Background2["LOAD_MATE_SEARCH_SETTING"] = "loadMateSearchSetting";
  Background2["SAVE_MATE_SEARCH_SETTING"] = "saveMateSearchSetting";
  Background2["LOAD_RECORD_FILE_HISTORY"] = "loadRecordFileHistory";
  Background2["ADD_RECORD_FILE_HISTORY"] = "addRecordFileHistory";
  Background2["CLEAR_RECORD_FILE_HISTORY"] = "clearRecordFileHistory";
  Background2["SAVE_RECORD_FILE_BACKUP"] = "saveRecordFileBackup";
  Background2["LOAD_RECORD_FILE_BACKUP"] = "loadRecordFileBackup";
  Background2["LOAD_USI_ENGINE_SETTING"] = "loadUSIEngineSetting";
  Background2["SAVE_USI_ENGINE_SETTING"] = "saveUSIEngineSetting";
  Background2["SHOW_SELECT_USI_ENGINE_DIALOG"] = "showSelectUSIEngineDialog";
  Background2["GET_USI_ENGINE_INFO"] = "getUSIEngineInfo";
  Background2["SEND_USI_SET_OPTION"] = "sendUSISetOption";
  Background2["LAUNCH_USI"] = "usiLaunch";
  Background2["USI_READY"] = "usiReady";
  Background2["USI_GO"] = "usiGo";
  Background2["USI_GO_PONDER"] = "usiGoPonder";
  Background2["USI_GO_PONDER_HIT"] = "usiGoPonderHit";
  Background2["USI_GO_INFINITE"] = "usiGoInfinite";
  Background2["USI_GO_MATE"] = "usiGoMate";
  Background2["USI_STOP"] = "usiStop";
  Background2["USI_GAMEOVER"] = "usiGameover";
  Background2["USI_QUIT"] = "usiQuit";
  Background2["CSA_LOGIN"] = "csaLogin";
  Background2["CSA_LOGOUT"] = "csaLogout";
  Background2["CSA_AGREE"] = "csaAgree";
  Background2["CSA_MOVE"] = "csaMove";
  Background2["CSA_RESIGN"] = "csaResign";
  Background2["CSA_WIN"] = "csaWin";
  Background2["CSA_STOP"] = "csaStop";
  Background2["IS_ENCRYPTION_AVAILABLE"] = "isEncryptionAvailable";
  Background2["OPEN_LOG_FILE"] = "openLogFile";
  Background2["LOG"] = "log";
  Background2["ON_CLOSABLE"] = "onClosable";
  return Background2;
})(Background || {});
var Renderer = /* @__PURE__ */ ((Renderer2) => {
  Renderer2["CLOSE"] = "close";
  Renderer2["SEND_ERROR"] = "sendError";
  Renderer2["MENU_EVENT"] = "menuEvent";
  Renderer2["UPDATE_APP_SETTING"] = "updateAppSetting";
  Renderer2["OPEN_RECORD"] = "openRecord";
  Renderer2["USI_BEST_MOVE"] = "usiBestMove";
  Renderer2["USI_CHECKMATE"] = "usiCheckmate";
  Renderer2["USI_CHECKMATE_NOT_IMPLEMENTED"] = "usiCheckmateNotImplemented";
  Renderer2["USI_CHECKMATE_TIMEOUT"] = "usiCheckmateTimeout";
  Renderer2["USI_NO_MATE"] = "usiNoMate";
  Renderer2["USI_INFO"] = "usiInfo";
  Renderer2["USI_PONDER_INFO"] = "usiPonderInfo";
  Renderer2["CSA_GAME_SUMMARY"] = "csaGameSummary";
  Renderer2["CSA_REJECT"] = "csaReject";
  Renderer2["CSA_START"] = "csaStart";
  Renderer2["CSA_MOVE"] = "csaMove";
  Renderer2["CSA_GAME_RESULT"] = "csaGameResult";
  Renderer2["CSA_CLOSE"] = "csaClose";
  return Renderer2;
})(Renderer || {});
const api = {
  // NOTICE:
  //   Do NOT publish any libraries or any references to scure objects.
  //   Must create wrapper function and publish only minimum required references.
  //   ライブラリやセキュアなオブジェクトを直接公開しないでください。
  //   必ず関数でラップして、必要最小限の参照だけをレンダラーに公開してください。
  //   See https://www.electronjs.org/docs/latest/tutorial/context-isolation#security-considerations
  async getRecordPathFromProcArg() {
    return await electron.ipcRenderer.invoke(Background.GET_RECORD_PATH_FROM_PROC_ARG);
  },
  updateAppState(appState, bussy) {
    electron.ipcRenderer.send(Background.UPDATE_APP_STATE, appState, bussy);
  },
  openExplorer(path) {
    electron.ipcRenderer.send(Background.OPEN_EXPLORER, path);
  },
  async showOpenRecordDialog() {
    return await electron.ipcRenderer.invoke(Background.SHOW_OPEN_RECORD_DIALOG);
  },
  async openRecord(path) {
    return await electron.ipcRenderer.invoke(Background.OPEN_RECORD, path);
  },
  async showSaveRecordDialog(defaultPath) {
    return await electron.ipcRenderer.invoke(Background.SHOW_SAVE_RECORD_DIALOG, defaultPath);
  },
  async saveRecord(path, data) {
    await electron.ipcRenderer.invoke(Background.SAVE_RECORD, path, data);
  },
  async showSelectFileDialog() {
    return await electron.ipcRenderer.invoke(Background.SHOW_SELECT_FILE_DIALOG);
  },
  async showSelectDirectoryDialog(defaultPath) {
    return await electron.ipcRenderer.invoke(Background.SHOW_SELECT_DIRECTORY_DIALOG, defaultPath);
  },
  async showSelectImageDialog(defaultURL) {
    return await electron.ipcRenderer.invoke(Background.SHOW_SELECT_IMAGE_DIALOG, defaultURL);
  },
  async showSaveMergedRecordDialog(defaultPath) {
    return await electron.ipcRenderer.invoke(Background.SHOW_SAVE_MERGED_RECORD_DIALOG, defaultPath);
  },
  async cropPieceImage(srcURL, deleteMargin) {
    return await electron.ipcRenderer.invoke(Background.CROP_PIECE_IMAGE, srcURL, deleteMargin);
  },
  async exportCaptureAsPNG(json) {
    await electron.ipcRenderer.invoke(Background.EXPORT_CAPTURE_AS_PNG, json);
  },
  async exportCaptureAsJPEG(json) {
    await electron.ipcRenderer.invoke(Background.EXPORT_CAPTURE_AS_JPEG, json);
  },
  async convertRecordFiles(json) {
    return await electron.ipcRenderer.invoke(Background.CONVERT_RECORD_FILES, json);
  },
  async loadAppSetting() {
    return await electron.ipcRenderer.invoke(Background.LOAD_APP_SETTING);
  },
  async saveAppSetting(json) {
    await electron.ipcRenderer.invoke(Background.SAVE_APP_SETTING, json);
  },
  async loadBatchConversionSetting() {
    return await electron.ipcRenderer.invoke(Background.LOAD_BATCH_CONVERSION_SETTING);
  },
  async saveBatchConversionSetting(json) {
    await electron.ipcRenderer.invoke(Background.SAVE_BATCH_CONVERSION_SETTING, json);
  },
  async loadResearchSetting() {
    return await electron.ipcRenderer.invoke(Background.LOAD_RESEARCH_SETTING);
  },
  async saveResearchSetting(json) {
    await electron.ipcRenderer.invoke(Background.SAVE_RESEARCH_SETTING, json);
  },
  async loadAnalysisSetting() {
    return await electron.ipcRenderer.invoke(Background.LOAD_ANALYSIS_SETTING);
  },
  async saveAnalysisSetting(json) {
    await electron.ipcRenderer.invoke(Background.SAVE_ANALYSIS_SETTING, json);
  },
  async loadGameSetting() {
    return await electron.ipcRenderer.invoke(Background.LOAD_GAME_SETTING);
  },
  async saveGameSetting(json) {
    await electron.ipcRenderer.invoke(Background.SAVE_GAME_SETTING, json);
  },
  async loadCSAGameSettingHistory() {
    return await electron.ipcRenderer.invoke(Background.LOAD_CSA_GAME_SETTING_HISTORY);
  },
  async saveCSAGameSettingHistory(json) {
    await electron.ipcRenderer.invoke(Background.SAVE_CSA_GAME_SETTING_HISTORY, json);
  },
  async loadMateSearchSetting() {
    return await electron.ipcRenderer.invoke(Background.LOAD_MATE_SEARCH_SETTING);
  },
  async saveMateSearchSetting(json) {
    await electron.ipcRenderer.invoke(Background.SAVE_MATE_SEARCH_SETTING, json);
  },
  async loadRecordFileHistory() {
    return await electron.ipcRenderer.invoke(Background.LOAD_RECORD_FILE_HISTORY);
  },
  addRecordFileHistory(path) {
    electron.ipcRenderer.send(Background.ADD_RECORD_FILE_HISTORY, path);
  },
  async clearRecordFileHistory() {
    electron.ipcRenderer.invoke(Background.CLEAR_RECORD_FILE_HISTORY);
  },
  async saveRecordFileBackup(kif) {
    await electron.ipcRenderer.invoke(Background.SAVE_RECORD_FILE_BACKUP, kif);
  },
  async loadRecordFileBackup(name) {
    return await electron.ipcRenderer.invoke(Background.LOAD_RECORD_FILE_BACKUP, name);
  },
  async loadUSIEngineSetting() {
    return await electron.ipcRenderer.invoke(Background.LOAD_USI_ENGINE_SETTING);
  },
  async saveUSIEngineSetting(json) {
    await electron.ipcRenderer.invoke(Background.SAVE_USI_ENGINE_SETTING, json);
  },
  async showSelectUSIEngineDialog() {
    return await electron.ipcRenderer.invoke(Background.SHOW_SELECT_USI_ENGINE_DIALOG);
  },
  async getUSIEngineInfo(path, timeoutSeconds) {
    return await electron.ipcRenderer.invoke(Background.GET_USI_ENGINE_INFO, path, timeoutSeconds);
  },
  async sendUSISetOption(path, name, timeoutSeconds) {
    await electron.ipcRenderer.invoke(Background.SEND_USI_SET_OPTION, path, name, timeoutSeconds);
  },
  async usiLaunch(json, timeoutSeconds) {
    return await electron.ipcRenderer.invoke(Background.LAUNCH_USI, json, timeoutSeconds);
  },
  async usiReady(sessionID) {
    await electron.ipcRenderer.invoke(Background.USI_READY, sessionID);
  },
  async usiGo(sessionID, usi, json, blackTimeMs, whiteTimeMs) {
    await electron.ipcRenderer.invoke(Background.USI_GO, sessionID, usi, json, blackTimeMs, whiteTimeMs);
  },
  async usiGoPonder(sessionID, usi, json, blackTimeMs, whiteTimeMs) {
    await electron.ipcRenderer.invoke(
      Background.USI_GO_PONDER,
      sessionID,
      usi,
      json,
      blackTimeMs,
      whiteTimeMs
    );
  },
  async usiPonderHit(sessionID) {
    await electron.ipcRenderer.invoke(Background.USI_GO_PONDER_HIT, sessionID);
  },
  async usiGoInfinite(sessionID, usi) {
    await electron.ipcRenderer.invoke(Background.USI_GO_INFINITE, sessionID, usi);
  },
  async usiGoMate(sessionID, usi) {
    await electron.ipcRenderer.invoke(Background.USI_GO_MATE, sessionID, usi);
  },
  async usiStop(sessionID) {
    await electron.ipcRenderer.invoke(Background.USI_STOP, sessionID);
  },
  async usiGameover(sessionID, result) {
    await electron.ipcRenderer.invoke(Background.USI_GAMEOVER, sessionID, result);
  },
  async usiQuit(sessionID) {
    await electron.ipcRenderer.invoke(Background.USI_QUIT, sessionID);
  },
  async csaLogin(json) {
    return await electron.ipcRenderer.invoke(Background.CSA_LOGIN, json);
  },
  async csaLogout(sessionID) {
    return await electron.ipcRenderer.invoke(Background.CSA_LOGOUT, sessionID);
  },
  async csaAgree(sessionID, gameID) {
    return await electron.ipcRenderer.invoke(Background.CSA_AGREE, sessionID, gameID);
  },
  async csaMove(sessionID, move, score, pv) {
    return await electron.ipcRenderer.invoke(Background.CSA_MOVE, sessionID, move, score, pv);
  },
  async csaResign(sessionID) {
    return await electron.ipcRenderer.invoke(Background.CSA_RESIGN, sessionID);
  },
  async csaWin(sessionID) {
    return await electron.ipcRenderer.invoke(Background.CSA_WIN, sessionID);
  },
  async csaStop(sessionID) {
    return await electron.ipcRenderer.invoke(Background.CSA_STOP, sessionID);
  },
  async isEncryptionAvailable() {
    return await electron.ipcRenderer.invoke(Background.IS_ENCRYPTION_AVAILABLE);
  },
  openLogFile(logType) {
    electron.ipcRenderer.invoke(Background.OPEN_LOG_FILE, logType);
  },
  log(level, message) {
    electron.ipcRenderer.send(Background.LOG, level, message);
  },
  onClosable() {
    electron.ipcRenderer.send(Background.ON_CLOSABLE);
  },
  onClose(callback) {
    electron.ipcRenderer.on(Renderer.CLOSE, callback);
  },
  onSendError(callback) {
    electron.ipcRenderer.on(Renderer.SEND_ERROR, (_, e) => {
      callback(e);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMenuEvent(callback) {
    electron.ipcRenderer.on(Renderer.MENU_EVENT, (_, event, ...args) => callback(event, ...args));
  },
  onUpdateAppSetting(callback) {
    electron.ipcRenderer.on(Renderer.UPDATE_APP_SETTING, (_, json) => callback(json));
  },
  onOpenRecord(callback) {
    electron.ipcRenderer.on(Renderer.OPEN_RECORD, (_, path) => callback(path));
  },
  onUSIBestMove(callback) {
    electron.ipcRenderer.on(Renderer.USI_BEST_MOVE, (_, sessionID, usi, usiMove, ponder) => {
      callback(sessionID, usi, usiMove, ponder);
    });
  },
  onUSICheckmate(callback) {
    electron.ipcRenderer.on(Renderer.USI_CHECKMATE, (_, sessionID, usi, moves) => {
      callback(sessionID, usi, moves);
    });
  },
  onUSICheckmateNotImplemented(callback) {
    electron.ipcRenderer.on(Renderer.USI_CHECKMATE_NOT_IMPLEMENTED, (_, sessionID) => {
      callback(sessionID);
    });
  },
  onUSICheckmateTimeout(callback) {
    electron.ipcRenderer.on(Renderer.USI_CHECKMATE_TIMEOUT, (_, sessionID, usi) => {
      callback(sessionID, usi);
    });
  },
  onUSINoMate(callback) {
    electron.ipcRenderer.on(Renderer.USI_NO_MATE, (_, sessionID, usi) => {
      callback(sessionID, usi);
    });
  },
  onUSIInfo(callback) {
    electron.ipcRenderer.on(Renderer.USI_INFO, (_, sessionID, usi, json) => {
      callback(sessionID, usi, json);
    });
  },
  onUSIPonderInfo(callback) {
    electron.ipcRenderer.on(Renderer.USI_PONDER_INFO, (_, sessionID, usi, json) => {
      callback(sessionID, usi, json);
    });
  },
  onCSAGameSummary(callback) {
    electron.ipcRenderer.on(Renderer.CSA_GAME_SUMMARY, (_, sessionID, gameSummary) => {
      callback(sessionID, gameSummary);
    });
  },
  onCSAReject(callback) {
    electron.ipcRenderer.on(Renderer.CSA_REJECT, (_, sessionID) => {
      callback(sessionID);
    });
  },
  onCSAStart(callback) {
    electron.ipcRenderer.on(Renderer.CSA_START, (_, sessionID, playerStates) => {
      callback(sessionID, playerStates);
    });
  },
  onCSAMove(callback) {
    electron.ipcRenderer.on(Renderer.CSA_MOVE, (_, sessionID, move, playerStates) => {
      callback(sessionID, move, playerStates);
    });
  },
  onCSAGameResult(callback) {
    electron.ipcRenderer.on(Renderer.CSA_GAME_RESULT, (_, sessionID, specialMove, gameResult) => {
      callback(sessionID, specialMove, gameResult);
    });
  },
  onCSAClose(callback) {
    electron.ipcRenderer.on(Renderer.CSA_CLOSE, (_, sessionID) => {
      callback(sessionID);
    });
  }
};
electron.contextBridge.exposeInMainWorld("electronShogiAPI", api);
