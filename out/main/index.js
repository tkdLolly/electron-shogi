"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const path = require("path");
const require$$0 = require("electron");
const fs = require("fs");
const url = require("url");
const encodingJapanese = require("encoding-japanese");
const log4js = require("log4js");
const os = require("os");
const child_process = require("child_process");
const readline = require("readline");
const net = require("net");
const crypto = require("crypto");
const Jimp = require("jimp");
const AsyncLock = require("async-lock");
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
const ES_HUMAN = "es://human";
const ES_USI_ENGINE = "es://usi-engine/";
function isUSIEngine(uri) {
  return uri.startsWith(ES_USI_ENGINE);
}
function issueEngineURI() {
  const now = Date.now();
  const rand = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
  return ES_USI_ENGINE + `${now}/${rand}`;
}
import("dayjs/locale/en");
import("dayjs/locale/ja");
import("dayjs/locale/zh-tw");
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["JA"] = "ja";
  Language2["EN"] = "en";
  Language2["ZH_TW"] = "zh_tw";
  return Language2;
})(Language || {});
function appendLine(base, newLine) {
  return (base ? appendReturnIfNotExists(base) : "") + appendReturnIfNotExists(newLine);
}
function appendReturnIfNotExists(str) {
  return str + (str.endsWith("\n") ? "" : "\n");
}
function ordinal(n) {
  switch (n % 100) {
    case 11:
    case 12:
    case 13:
      return n + "th";
  }
  switch (n % 10) {
    case 1:
      return n + "st";
    case 2:
      return n + "nd";
    case 3:
      return n + "rd";
    default:
      return n + "th";
  }
}
const en = {
  electronShogi: "Electron Shogi",
  clear: "Clear",
  open: "Open",
  saveOverwrite: "Overwrite",
  newRecord: "New Record",
  openRecord: "Open Record",
  saveRecord: "Save Record",
  saveRecordAs: "Save Record As",
  openAutoSavingDirectory: "Open Auto-Saving Directory",
  exportPositionImage: "Export Position Image",
  positionImage: "Position Image",
  batchConversion: "Batch Conversion",
  recordFileBatchConversion: "Record File Batch Conversion",
  close: "Close",
  quit: "Quit",
  editing: "Edit",
  copyAsKIF: "Copy (KIF)",
  copyAsKI2: "Copy (KI2)",
  copyAsCSA: "Copy (CSA)",
  copyAsUSI: "Copy (USI)",
  copyAsSFEN: "Copy (SFEN)",
  copyAsJKF: "Copy (JKF)",
  paste: "Paste",
  copyRecord: "Copy Record",
  asKIF: "as KIF",
  asKI2: "as KI2",
  asCSA: "as CSA",
  asUSIUntilCurrentMove: "as USI (until current move)",
  asUSIAll: "as USI (all)",
  asJSONKifuFormat: "as JSON Kifu Format",
  copyPositionAsSFEN: "Copy Position (as SFEN)",
  pasteRecordOrPosition: "Paste Record/Position",
  appendSpecialMove: "Append Special Move",
  deleteMoves: "Delete Current Move and Following Moves",
  view: "View",
  toggleFullScreen: "Toggle Full Screen",
  defaultFontSize: "Default Font Size",
  largerFontSize: "Larger Font Size",
  smallerFontSize: "Smaller Font Size",
  settings: "Settings",
  config: "Config",
  debug: "Debug",
  toggleDevTools: "Toggle Developer Tools",
  openAppDirectory: "Open App Directory",
  openSettingDirectory: "Open Setting Directory",
  openLogDirectory: "Open Log Directory",
  help: "Help",
  openWebSite: "Open Web Site",
  howToUse: "How to Use",
  checkForUpdates: "Check for Updates",
  inputs: "Inputs",
  outputs: "Outputs",
  format: "Format",
  formats: "Formats",
  subdirectories: "Subdirectories",
  separately: "Separately",
  merge: "Merge",
  createSubdirectories: "Create Subdirectories",
  nameConflictAction: "Name Conflict Action",
  numberSuffix: "Number Suffix",
  skip: "Skip",
  convert: "Convert",
  openLogFile: "Open Log File",
  succeeded: "Succeeded",
  failed: "Failed",
  skipped: "Skipped",
  game: "Game",
  player: "Player",
  selectFromHistory: "Select from History",
  noHistory: "Empty",
  saveHistory: "Save History",
  version: "Version",
  gameProgress: "Game Progress",
  allGamesCompleted: "All Games Completed",
  gameEnded: "Game Ended",
  offlineGame: "Offline Game",
  csaOnlineGame: "CSA Online Game",
  csaProtocolOnlineGame: "Online Game (CSA Protocol)",
  csaProtocolV121: "CSA Protocol 1.2.1 Standard",
  csaProtocolV121WithPVComment: "CSA Protocol 1.2.1 with PV Comment",
  hostToConnect: "Hostname",
  portNumber: "Port",
  password: "Password",
  showPassword: "Show Password",
  logout: "Logout",
  displayGameResults: "Display Results",
  interrupt: "Stop",
  stopGame: "Stop",
  resign: "Resign",
  draw: "Draw",
  impass: "Impass",
  repetitionDraw: "Repetition Draw",
  mate: "Mate",
  noMate: "No Mate",
  mateSearch: "Mate Search",
  startMateSearch: "Start Mate Search",
  stopMateSearch: "Stop Mate Search",
  noMateFound: "No mate.",
  timeout: "Timeout",
  foulWin: "Foul Win",
  foulLose: "Foul Lose",
  enteringOfKing: "Entering of King",
  winByDefault: "Win by Default",
  loseByDefault: "Lose by Default",
  winByDeclaration: "Win by Declaration",
  declareWinning: "Declare Winning",
  research: "Research",
  startResearch: "Start Research",
  endResearch: "End Research",
  recordAnalysis: "Record Analysis",
  analysis: "Analyze",
  analyze: "Analyze",
  stopAnalysis: "Stop Analysis",
  setupPosition: "Setup Position",
  startPositionSetup: "Start Position Setup",
  completePositionSetup: "Complete Setup",
  changeTurn: "Change Turn",
  initializePosition: "Initialize Position",
  appSettings: "Preferences",
  language: "Languages",
  theme: "Theme",
  standard: "Standard",
  green: "Green",
  cherryBlossom: "Cherry Blossom",
  customImage: "Custom Image",
  autumn: "Autumn",
  snow: "Snow",
  darkGreen: "Dark Green",
  dark: "Dark",
  piece: "Piece",
  singleKanjiPiece: "Single Kanji",
  singleKanjiGothicPiece: "Single Kanji (Gothic)",
  singleKanjiDarkPiece: "Single Kanji (Dark)",
  singleKanjiGothicDarkPiece: "Single Kanji (Gothic, Dark)",
  imageHasMarginsRemoveToDisplayLarger: "The image has margins (remove it to display larger)",
  backgroundImage: "Background Image",
  board: "Board Image",
  pieceStand: "Piece Stand",
  lightWoodyTexture: "Woody Texture (Light)",
  warmWoodTexture: "Woody Texture (Warm)",
  regin: "Regin",
  transparent: "Transparent",
  boardOpacity: "Board Opacity",
  pieceStandOpacity: "Piece Stand Opacity",
  recordOpacity: "Record Opacity",
  displayFileAndRank: "Display File & Rank",
  displayLeftControls: "Display Left Controls",
  displayRightControls: "Display Right Controls",
  tabViewStyle: "Tab View Style",
  oneColumn: "1 Column",
  twoColumns: "2 Columns",
  sounds: "Sounds",
  pieceLoudness: "Piece Loudness",
  clockLoudness: "Clock Loudness",
  clockPitch: "Clock Pitch",
  clockSoundTarget: "Clock Sound Target",
  anyTurn: "Any",
  onlyHumanTurn: "Human",
  defaultRecordFileFormat: "Default Record Format",
  textEncoding: "Text Encoding",
  strict: "Strict",
  autoDetect: "Auto Detect",
  newlineCharacter: "Newline Character",
  old90sMac: "90's Mac",
  autoSavingDirectory: "Auto-Saving Directory",
  select: "Select",
  positionOfUSIOutput: "Position of USI Output",
  movesOfUSIOutput: "Moves of USI Output",
  onlySFEN: "Only SFEN",
  usiProtocol: "USI Protocol",
  translateOptionName: "Translate Option Name",
  functionalOnJapaneseOnly: "Functional on Japanese Only",
  maxStartupTime: "Max Startup Time",
  forDevelopers: "For Developers",
  enableAppLog: "Enable App Log",
  enableUSILog: "Enable USI Log",
  enableCSALog: "Enable CSA Log",
  logLevel: "Log Level",
  engineSettings: "Engine Settings",
  flipBoard: "Flip Board",
  file: "File",
  recordFile: "Record File",
  executableFile: "Executable",
  imageFile: "Image",
  unsaved: "Unsaved",
  remove: "Remove",
  deleteMove: "Delete Move",
  recordProperties: "Record Properties",
  comments: "Comments",
  commentsAndBookmarks: "Comments & Bookmarks",
  branches: "Branches",
  bookmark: "Bookmark",
  bookmarkList: "Bookmarks",
  useBookmarkAsHeader: "Use Bookmark as Header",
  moveComments: "Move Comments",
  searchLog: "Search Log",
  pv: "PV",
  mateShort: "M",
  displayPVShort: "Play",
  evaluation: "Evaluation",
  eval: "Eval",
  estimatedWinRate: "Estimated Win Rate",
  evaluationAndEstimatedWinRate: "Evaluation & Estimated Win Rate",
  swapEachTurnChange: "Swap Each Turn Change",
  alwaysSenteIsPositive: "Always Sente is Positive",
  signOfEvaluation: "Sign of Evaluation",
  winRateCoefficient: "Win Rate Coefficient",
  hideTabView: "Hide",
  expandTabView: "Expand Tab View",
  sente: "Sente",
  senteOrShitate: "Sente (Shitate)",
  shitate: "Shitate",
  gote: "Gote",
  goteOrUwate: "Gote (Uwate)",
  uwate: "Uwate",
  swapSenteGote: "Swap Sente/Gote",
  currentPosition: "Current Position",
  enableEngineTimeout: "Enable Engine Timeout",
  setDifferentTimeForGote: "Set different time for Gote",
  nextTurn: "Next Move",
  elapsedTime: "Elapsed Time",
  elapsed: "Elapsed",
  rank: "Rank",
  depth: "Depth",
  searchEngine: "Search Engine",
  ponder: "Ponder",
  numberOfThreads: "Threads",
  multiPV: "Multi PV",
  startPosition: "Position",
  maxMoves: "Max Moves",
  gameRepetition: "Repeat",
  autoRelogin: "Auto Re-Login",
  swapTurnWhenGameRepetition: "Swap Turns When Repeat",
  outputComments: "Output Comments",
  saveRecordAutomatically: "Save Record Automatically",
  adjustBoardToHumanPlayer: "Adjust Board to Human Player",
  adjustBoardAutomatically: "Adjust Board Automatically",
  startGame: "Start Game",
  cancelGame: "Cancel Game",
  allottedTime: "Allotted Time",
  byoyomi: "Byoyomi",
  increments: "Increments",
  startEndCriteria: "Start/End Criteria",
  endCriteria1Move: "End Criteria for 1 Move",
  outputSettings: "Output Settings",
  noOutputs: "No Outputs",
  insertCommentToTop: "Insert to Top",
  appendCommentToBottom: "Append to Bottom",
  insertToComment: "Ins. to Comment",
  insertToRecord: "Ins. to Record",
  overwrite: "Overwrite",
  fromPrefix: "from",
  fromSuffix: "",
  toPrefix: "to",
  toSuffix: "",
  plyPrefix: "",
  plySuffix: "th move",
  hoursSuffix: "h",
  minutesSuffix: "min",
  secondsSuffix: "sec",
  engineManagement: "Engine Management",
  engineName: "Engine Name",
  author: "Author",
  enginePath: "Engine Path",
  openDirectory: "Open Directory",
  displayName: "Display Name",
  invoke: "Invoke",
  resetToEngineDefaultValues: "Reset to default values",
  defaultValue: "Default Value",
  noEngineRegistered: "No engine",
  duplicate: "Copy",
  add: "Add",
  recommended: "Recommended",
  import: "Import",
  saveAndClose: "Save & Close",
  save: "Save",
  saveAs: "Save As",
  history: "History",
  clearHistory: "Clear History",
  userFile: "User File",
  automaticBackup: "Automatic Backup",
  restore: "Restore",
  cancel: "Cancel",
  back: "Back",
  name: "Name",
  prediction: "Prediction",
  best: "Best",
  nodes: "Nodes",
  hashUsage: "Hash Usage",
  stop: "Stop",
  resume: "Resume",
  nonHandicap: "Non-Handicap",
  lanceHandicap: "Lance Handicap",
  rightLanceHandicap: "Right Lance Handicap",
  bishopHandicap: "Bishop Handicap",
  rookHandicap: "Rook Handicap",
  rookLanceHandicap: "Rook-Lance Handicap",
  twoPiecesHandicap: "2 Pieces Handicap",
  fourPiecesHandicap: "4 Pieces Handicap",
  sixPiecesHandicap: "6 Pieces Handicap",
  eightPiecesHandicap: "8 Pieces Handicap",
  tenPiecesHandicap: "10 Pieces Handicap",
  tsumeShogi: "Tsume Shogi",
  doubleKingTsumeShogi: "2-Kings Tsume Shogi",
  startDateTime: "Start",
  endDateTime: "End",
  gameDate: "Date",
  tournament: "Tournament",
  strategy: "Strategy",
  gameTitle: "Title",
  timeLimit: "Time Limit",
  place: "Place",
  postedOn: "Posted On",
  note: "Note",
  senteShortName: "Sente(short)",
  goteShortName: "Gote(short)",
  opusNo: "Opus No.",
  opusName: "Opus Name",
  publishedBy: "Published By",
  publishedOn: "Published On",
  source: "Source",
  numberOfMoves: "Number of Moves",
  integrity: "Integrity",
  recordCategory: "Category",
  award: "Award",
  filterByOptionName: "Filter by Option Name",
  filterByEngineName: "Filter by Engine Name",
  bookStyle: "Book Style",
  gameStyle: "Game Style",
  playerName: "Player Name",
  typeface: "Typeface",
  handLabel: "Hand Label",
  header: "Header",
  characterAdjustment: "Character Adjustment",
  vertical: "Vertical",
  size: "Size",
  none: "None",
  bgCover: "Cover",
  bgContain: "Contain",
  bgTile: "Tile",
  inaccuracy: "Inaccuracy",
  dubious: "Dubious",
  mistake: "Mistake",
  blunder: "Blunder",
  inaccuracyThreshold: "Inaccuracy Threshold",
  dubiousThreshold: "Dubious Threshold",
  mistakeThreshold: "Mistake Threshold",
  blunderThreshold: "Blunder Threshold",
  gothic: "Gothic",
  mincho: "Mincho",
  typeCustomTitleHere: "Type custom title here",
  displayEmptyElements: "Display Empty Elements",
  waitingForNewGame: "Waiting for new game.",
  insertedComment: "Inserted comment.",
  conversionCompleted: "Conversion completed.",
  tryingToConnectAndLoginToCSAServer: "Trying to connect and login to CSA server.",
  inBrowserLogsOutputToConsoleAndIgnoreThisSetting: "*In web browser version, it will output logs to console and ignore this setting.",
  shouldRestartToApplyLogSettings: "*You should restart this app to apply log settings.",
  canOpenLogDirectoryFromMenu: '*You can open log directory from "Debug" - "Open Log Directory" menu.',
  hasNoOldLogCleanUpFeature: "*This app has no clean-up feature. Please remove old logs manually.",
  processingPleaseWait: "Processing, please wait.",
  importingFollowingRecordOrPosition: "Importing the following record(or position).",
  supportsKIF_KI2_CSA_USI_JKF: "*Supports KIF, KI2, CSA, USI, and JKF.",
  plesePasteRecordIntoTextArea: "*Please paste record data into the text area.",
  desktopVersionPastesAutomatically: "*In desktop version, it will paste automatically from clipboard.",
  someLogsDisabled: "Some log settings are disabled.",
  logsRecommendedForCSAProtocol: "Log settings are recommended for CSA protocol.",
  pleaseEnableLogsAndRestart: "Please enable log settings and restart this app.",
  notSendPVOnStandardCSAProtocol: "Client do not send PV on standard CSA protocol.",
  csaProtocolSendPlaintextPassword: "On CSA protocol, client send plaintext password.",
  passwordWillSavedPlaintextBecauseOSSideEncryptionNotAvailable: "Password will saved as plaintext because OS side encryption is not available.",
  pleaseUncheckSaveHistoryIfNotWantSave: "Please uncheck Save History, if you don't want to save.",
  csaProtocolSendPlaintextPasswordRegardlessOfHistory: "On CSA protocol, client send plaintext password regardless of history.",
  areYouSureWantToQuitGames: "Are you sure you want to quit games?",
  areYouSureWantToRequestQuit: "You have possibility to be loser. Are you sure you want to request quit?",
  areYouSureWantToClearRecord: "Are you sure you want to clear record?",
  areYouSureWantToDiscardPosition: "Are you sure you want to discard the position?",
  areYouSureWantToOpenFileInsteadOfCurrentRecord: "Are you sure you want to open the file instead of current record?",
  areYouSureWantToClearHistory: "Are you sure you want to clear history?",
  youCanNotCloseAppWhileCSAOnlineGame: "You can not close app while CSA online game.",
  fileExtensionNotSupported: "File extension is not supported.",
  errorOccuredWhileDisconnectingFromCSAServer: "An error occured while disconnecting from CSA server.",
  failedToConnectToCSAServer: "Failed to connect to CSA server.",
  errorOccuredWhileLogoutFromCSAServer: "An error occured while logout from CSA server.",
  disconnectedFromCSAServer: "Disconnected from CSA server.",
  csaServerLoginDenied: "CSA server login denied.",
  thisFeatureNotAvailableOnWebApp: "This feature is not available on web app.",
  failedToStartNewGame: "Failed to start new game.",
  errorOccuredWhileEndingGame: "An error occured while ending game.",
  failedToSendGoCommand: "Failed to send go-command.",
  failedToSendPonderCommand: "Failed to send ponder-command.",
  failedToSendStopCommand: "Failed to send stop-command.",
  failedToShutdownEngines: "Failed to shutdown engines.",
  failedToSaveRecord: "Failed to save record.",
  failedToParseSFEN: "Failed to parse SFEN.",
  failedToDetectRecordFormat: "Failed to detect record format.",
  unknownFileExtension: "Unknown file extension.",
  emptyRecordInput: "Empty record input.",
  invalidPieceName: "Invalid piece name",
  invalidTurn: "Invalid turn",
  invalidMove: "Invalid move",
  invalidMoveNumber: "Invalid move number",
  invalidDestination: "Invalid destination",
  pieceNotExists: "Piece not exists",
  invalidLine: "Invalid line",
  invalidHandicap: "Invalid handicap",
  invalidBoard: "Invalid board",
  invalidHandPiece: "Invalid hand piece",
  invalidUSI: "Invalid USI",
  backgroundImageFileNotSelected: "Background image file is not selected.",
  pieceImageFileNotSelected: "Piece image File is not selected.",
  boardImageFileNotSelected: "Board image file is not selected.",
  pieceStandImageFileNotSelected: "Piece stand image file is not selected.",
  pieceVolumeMustBe0To100Percent: "Piece volume must be 0% to 100%.",
  clockVolumeMustBe0To100Percent: "Clock volume must be 0% to 100%.",
  clockPitchMustBe220To880Hz: "Clock pitch must be 220Hz to 880Hz.",
  engineTimeoutMustBe1To300Seconds: "Engine timeout must be 1 to 300 seconds.",
  coefficientInSigmoidMustBeGreaterThan0: "Coefficient in sigmoid must be greater than 0.",
  inaccuracyThresholdMustBe1To100Percent: "Inaccuracy must be 1% to 100%.",
  dubiousThresholdMustBe1To100Percent: "Dubious threshold must be 1% to 100%.",
  mistakeThresholdMustBe1To100Percent: "Mistake threshold must be 1% to 100%.",
  blunderThresholdMustBe1To100Percent: "Blunder threshold must be 1% to 100%.",
  recordSavedWithGarbledCharacters: "The record has saved with some garbled characters.",
  pleaseConsiderToUseKIFU: "Please consider to use KIFU(UTF-8).",
  youCanChangeDefaultRecordFileFormatFromAppSettings: "You can change default record file format from App Settings.",
  inaccuracyThresholdMustBeLessThanDubiousThreshold: "Inaccuracy threshold must be less than dubious threshold.",
  dubiousThresholdMustBeLessThanMistakeThreshold: "Dubious threshold must be less than mistake threshold.",
  mistakeThresholdMustBeLessThanBlunderThreshold: "Mistake threshold must be less than blunder threshold.",
  thisEngineNotSupportsMateSearch: "This engine does not support mate search.",
  pleaseEndActiveFeaturesBeforeOpenRecord: "Please end active features before open record.",
  bothTimeLimitAndByoyomiAreNotSet: "Both time limit and byoyomi are not set.",
  canNotUseByoyomiWithFischer: "You can not use Byoyomi with Fischer.",
  protocolVersionNotSelected: "Protocol version is not selected.",
  hostNameIsEmpty: "Host name is empty.",
  invalidPortNumber: "Invalid port number.",
  idIsEmpty: "ID is empty.",
  engineNotSelected: "Engine is not selected.",
  forExportingConversionLogPleaseEnableAppLogsAndSetLogLevelDebugAndRestart: "For exporting conversion log, please enable app logs, set log level to DEBUG and restart this app.",
  sourceDirectoryNotSpecified: "Source directory is not specified.",
  sourceFormatsNotSpecified: "Source formats are not specified.",
  destinationDirectoryNotSpecified: "Destination directory is not specified.",
  destinationFileNotSpecified: "Destination file is not specified.",
  totalNumber: (n) => `Total: ${n}`,
  number: (n) => "" + n,
  tryToReloginToCSAServerNSecondsLater: (n) => `Try to relogin to CSA server ${n} seconds later.`,
  mateInNPlyDoYouWantToDisplay: (n) => `Mate in ${n} ply. Do you want to display?`,
  insertedNMovesToRecord: (n) => `Inserted ${n} moves to the record.`,
  errorsOccurred: (n) => n >= 2 ? `${n} errors have occurred.` : `${n} error has occurred.`,
  between: (a, b) => `between ${a} and ${b}`,
  addNthEngine: (n) => `Add ${ordinal(n)} engine`,
  copyOf: (name) => `${name} (copy)`,
  keepLatest: (n) => `keep latest ${n}`,
  followingDataNotSavedBecauseNotSupporetedBy: (fileFormat) => `Following data not saved because not supporeted by "${fileFormat}".`,
  areYouSureWantToDeleteFollowingMove: (n) => `Are you sure you want to delete ${n}th move and the following move?`,
  failedToOpenDirectory: (path2) => `Failed to open directory of the file: ${path2}`,
  unexpectedEventSenderPleaseReport(sender) {
    return `Unexpected event sender. Please report this error message to developer. [${sender}]`;
  },
  unexpectedHTTPMethodPleaseReport(method) {
    return `Unexpected HTTP method. Please report this error message to developer. [${method}]`;
  },
  unexpectedRequestURLPleaseReport(url2) {
    return `Unexpected request URL. Please report this error message to developer. [${url2}]`;
  },
  noResponseFromEnginePleaseExtendTimeout(seconds) {
    return `No response from engine while ${seconds} seconds. Please extend timeout at app settings, if your engine is slow.`;
  }
};
const ja$1 = {
  electronShogi: "Electron将棋",
  clear: "初期化",
  open: "開く",
  saveOverwrite: "上書き保存",
  newRecord: "新規棋譜",
  openRecord: "棋譜を開く",
  saveRecord: "棋譜を上書き保存",
  saveRecordAs: "棋譜を名前を付けて保存",
  openAutoSavingDirectory: "自動保存先を開く",
  exportPositionImage: "局面図を出力",
  positionImage: "局面図",
  batchConversion: "一括変換",
  recordFileBatchConversion: "棋譜ファイル一括変換",
  close: "閉じる",
  quit: "終了",
  editing: "編集",
  copyAsKIF: "コピー・KIF",
  copyAsKI2: "コピー・KI2",
  copyAsCSA: "コピー・CSA",
  copyAsUSI: "コピー・USI",
  copyAsSFEN: "コピー・SFEN",
  copyAsJKF: "コピー・JKF",
  paste: "貼り付け",
  copyRecord: "棋譜コピー",
  asKIF: "KIF形式",
  asKI2: "KI2形式",
  asCSA: "CSA形式",
  asUSIUntilCurrentMove: "USI形式(現在の指し手まで)",
  asUSIAll: "USI形式(全て)",
  asJSONKifuFormat: "JSON棋譜フォーマット",
  copyPositionAsSFEN: "局面コピー(SFEN形式)",
  pasteRecordOrPosition: "棋譜・局面貼り付け",
  appendSpecialMove: "特殊な指し手",
  deleteMoves: "現在の位置から棋譜を削除",
  view: "表示",
  toggleFullScreen: "全画面表示切り替え",
  defaultFontSize: "標準の文字サイズ",
  largerFontSize: "文字を拡大",
  smallerFontSize: "文字を縮小",
  settings: "設定",
  config: "設定",
  debug: "デバッグ",
  toggleDevTools: "開発者ツール表示切り替え",
  openAppDirectory: "アプリのフォルダを開く",
  openSettingDirectory: "設定ファイルのフォルダを開く",
  openLogDirectory: "ログファイルのフォルダを開く",
  help: "ヘルプ",
  openWebSite: "Webサイトを開く",
  howToUse: "使い方を開く",
  checkForUpdates: "最新バージョンを確認",
  inputs: "入力",
  outputs: "出力",
  format: "フォーマット",
  formats: "フォーマット",
  subdirectories: "サブディレクトリ",
  separately: "個別",
  merge: "マージ",
  createSubdirectories: "サブディレクトリ作成",
  nameConflictAction: "名前衝突時の動作",
  numberSuffix: "番号付与",
  skip: "スキップ",
  convert: "変換",
  openLogFile: "ログファイルを開く",
  succeeded: "成功",
  failed: "失敗",
  skipped: "スキップ",
  game: "対局",
  player: "プレイヤー",
  selectFromHistory: "履歴から選ぶ",
  noHistory: "履歴がありません",
  saveHistory: "履歴に保存する",
  version: "バージョン",
  gameProgress: "対局の経過",
  allGamesCompleted: "連続対局終了",
  gameEnded: "対局終了",
  offlineGame: "ローカル対局",
  csaOnlineGame: "通信対局（CSA）",
  csaProtocolOnlineGame: "通信対局（CSAプロトコル）",
  csaProtocolV121: "CSAプロトコル1.2.1 標準",
  csaProtocolV121WithPVComment: "CSAプロトコル1.2.1 読み筋コメント付き",
  hostToConnect: "接続先ホスト",
  portNumber: "ポート番号",
  password: "パスワード",
  showPassword: "パスワードを表示する",
  logout: "ログアウト",
  displayGameResults: "戦績確認",
  interrupt: "中断",
  stopGame: "対局中断",
  resign: "投了",
  draw: "引き分け",
  impass: "持将棋",
  repetitionDraw: "千日手",
  mate: "詰み",
  noMate: "不詰",
  mateSearch: "詰み探索",
  startMateSearch: "詰み探索開始",
  stopMateSearch: "詰み探索終了",
  noMateFound: "詰みが見つかりませんでした。",
  timeout: "時間切れ",
  foulWin: "反則勝ち",
  foulLose: "反則負け",
  enteringOfKing: "入玉勝ち",
  winByDefault: "不戦勝",
  loseByDefault: "不戦敗",
  winByDeclaration: "宣言勝ち",
  declareWinning: "勝ち宣言",
  research: "検討",
  startResearch: "検討開始",
  endResearch: "検討終了",
  recordAnalysis: "棋譜解析",
  analysis: "解析",
  analyze: "解析開始",
  stopAnalysis: "解析中断",
  setupPosition: "局面編集",
  startPositionSetup: "局面編集開始",
  completePositionSetup: "局面編集終了",
  changeTurn: "手番変更",
  initializePosition: "局面の初期化",
  appSettings: "アプリ設定",
  language: "言語",
  theme: "テーマ",
  standard: "標準",
  green: "緑",
  cherryBlossom: "桜",
  customImage: "カスタム画像",
  autumn: "紅葉",
  snow: "雪",
  darkGreen: "深緑",
  dark: "ダーク",
  piece: "駒",
  singleKanjiPiece: "一文字駒",
  singleKanjiGothicPiece: "一文字駒（ゴシック体）",
  singleKanjiDarkPiece: "一文字駒（ダーク）",
  singleKanjiGothicDarkPiece: "一文字駒（ゴシック体・ダーク）",
  imageHasMarginsRemoveToDisplayLarger: "画像に余白が含まれている（除去して大きく表示）",
  backgroundImage: "背景画像",
  board: "盤",
  pieceStand: "駒台",
  lightWoodyTexture: "木目（明るい）",
  warmWoodTexture: "木目（暖かい）",
  regin: "樹脂",
  transparent: "透過表示",
  boardOpacity: "盤の不透明度",
  pieceStandOpacity: "駒台の不透明度",
  recordOpacity: "棋譜の不透明度",
  displayFileAndRank: "段・筋を表示",
  displayLeftControls: "左側操作ボタンを表示",
  displayRightControls: "右側操作ボタンを表示",
  tabViewStyle: "タブビューの形式",
  oneColumn: "1列",
  twoColumns: "2列",
  sounds: "音",
  pieceLoudness: "駒音の大きさ",
  clockLoudness: "時計音の大きさ",
  clockPitch: "時計音の高さ",
  clockSoundTarget: "時計音の対象",
  anyTurn: "全ての手番",
  onlyHumanTurn: "人間の手番のみ",
  defaultRecordFileFormat: "デフォルトの保存形式",
  textEncoding: "文字コード",
  strict: "厳格",
  autoDetect: "自動判定",
  newlineCharacter: "改行文字",
  old90sMac: "90年代Mac",
  autoSavingDirectory: "棋譜の自動保存先",
  select: "選択",
  positionOfUSIOutput: "USI の局面表記",
  movesOfUSIOutput: "USI の指し手表記",
  onlySFEN: "SFEN のみ",
  usiProtocol: "USIプロトコル",
  translateOptionName: "オプション名を翻訳",
  functionalOnJapaneseOnly: "日本語選択時のみ有効",
  maxStartupTime: "最大起動待ち時間",
  forDevelopers: "開発者向け",
  enableAppLog: "アプリログを出力",
  enableUSILog: "USI通信ログを出力",
  enableCSALog: "CSA通信ログを出力",
  logLevel: "ログレベル",
  engineSettings: "エンジン設定",
  flipBoard: "盤面反転",
  file: "ファイル",
  recordFile: "棋譜ファイル",
  executableFile: "実行可能ファイル",
  imageFile: "画像ファイル",
  unsaved: "未保存",
  remove: "削除",
  deleteMove: "指し手削除",
  recordProperties: "棋譜情報",
  comments: "コメント",
  commentsAndBookmarks: "コメント・しおり",
  branches: "分岐",
  bookmark: "しおり",
  bookmarkList: "しおり一覧",
  useBookmarkAsHeader: "しおりを見出しに使う",
  moveComments: "指し手コメント",
  searchLog: "思考",
  pv: "読み筋",
  mateShort: "詰",
  displayPVShort: "再現",
  evaluation: "評価値",
  eval: "評価値",
  estimatedWinRate: "期待勝率",
  evaluationAndEstimatedWinRate: "評価値・期待勝率",
  swapEachTurnChange: "手番側有利がプラスの値",
  alwaysSenteIsPositive: "先手有利がプラスの値",
  signOfEvaluation: "評価値の符号",
  winRateCoefficient: "勝率換算係数",
  hideTabView: "最小化",
  expandTabView: "タブビューを再表示",
  sente: "先手",
  senteOrShitate: "先手（下手）",
  shitate: "下手",
  gote: "後手",
  goteOrUwate: "後手（上手）",
  uwate: "上手",
  swapSenteGote: "先後入れ替え",
  currentPosition: "現在の局面",
  enableEngineTimeout: "エンジンの時間切れあり",
  setDifferentTimeForGote: "後手に異なる時間を設定",
  nextTurn: "次の手番",
  elapsedTime: "消費時間",
  elapsed: "経過時間",
  rank: "順位",
  depth: "深さ",
  searchEngine: "エンジン",
  ponder: "先読み(Ponder)",
  numberOfThreads: "スレッド数",
  multiPV: "マルチPV",
  startPosition: "開始局面",
  maxMoves: "最大手数",
  gameRepetition: "連続対局",
  autoRelogin: "自動で再ログインする",
  swapTurnWhenGameRepetition: "1局ごとに手番を入れ替える",
  outputComments: "コメントを出力する",
  saveRecordAutomatically: "棋譜を自動で保存する",
  adjustBoardToHumanPlayer: "人を手前に表示する",
  adjustBoardAutomatically: "盤面の向きを自動調整",
  startGame: "対局開始",
  cancelGame: "対局をキャンセル",
  allottedTime: "持ち時間",
  byoyomi: "秒読み",
  increments: "増加",
  startEndCriteria: "開始・終了条件",
  endCriteria1Move: "局面ごとの終了条件",
  outputSettings: "出力設定",
  noOutputs: "出力しない",
  insertCommentToTop: "前方に加筆する",
  appendCommentToBottom: "末尾に加筆する",
  insertToComment: "コメントに挿入",
  insertToRecord: "棋譜に挿入",
  overwrite: "上書きする",
  fromPrefix: "",
  fromSuffix: "から",
  toPrefix: "",
  toSuffix: "まで",
  plyPrefix: "",
  plySuffix: "手目",
  hoursSuffix: "時間",
  minutesSuffix: "分",
  secondsSuffix: "秒",
  engineManagement: "エンジン管理",
  engineName: "エンジン名",
  author: "作者",
  enginePath: "場所",
  openDirectory: "フォルダを開く",
  displayName: "表示名",
  invoke: "実行",
  resetToEngineDefaultValues: "エンジンの既定値に戻す",
  defaultValue: "既定値",
  noEngineRegistered: "エンジンが登録されていません。",
  duplicate: "複製",
  add: "追加",
  recommended: "推奨",
  import: "取り込む",
  saveAndClose: "保存して閉じる",
  save: "保存",
  saveAs: "保存",
  history: "履歴",
  clearHistory: "履歴をクリア",
  userFile: "ユーザーのファイル",
  automaticBackup: "自動バックアップ",
  restore: "復元",
  cancel: "キャンセル",
  back: "戻る",
  name: "名前",
  prediction: "予想",
  best: "最善",
  nodes: "Node数",
  hashUsage: "Hash使用率",
  stop: "停止",
  resume: "再開",
  nonHandicap: "平手",
  lanceHandicap: "香落ち",
  rightLanceHandicap: "右香落ち",
  bishopHandicap: "角落ち",
  rookHandicap: "飛車落ち",
  rookLanceHandicap: "飛車香落ち",
  twoPiecesHandicap: "二枚落ち",
  fourPiecesHandicap: "四枚落ち",
  sixPiecesHandicap: "六枚落ち",
  eightPiecesHandicap: "八枚落ち",
  tenPiecesHandicap: "十枚落ち",
  tsumeShogi: "詰将棋",
  doubleKingTsumeShogi: "双玉詰将棋",
  startDateTime: "開始日時",
  endDateTime: "終了日時",
  gameDate: "対局日",
  tournament: "棋戦",
  strategy: "戦型",
  gameTitle: "表題",
  timeLimit: "持ち時間",
  place: "場所",
  postedOn: "掲載",
  note: "備考",
  senteShortName: "先手省略名",
  goteShortName: "後手省略名",
  opusNo: "作品番号",
  opusName: "作品名",
  publishedBy: "発表誌",
  publishedOn: "発表年月",
  source: "出典",
  numberOfMoves: "手数",
  integrity: "完全性",
  recordCategory: "分類",
  award: "受賞",
  filterByOptionName: "オプション名で検索",
  filterByEngineName: "エンジン名で検索",
  bookStyle: "書籍風",
  gameStyle: "対局画面風",
  playerName: "対局者名",
  typeface: "書体",
  handLabel: "持ち駒ラベル",
  header: "見出し",
  characterAdjustment: "文字調整",
  vertical: "垂直方向",
  size: "サイズ",
  none: "なし",
  bgCover: "1枚で表示",
  bgContain: "拡大して表示",
  bgTile: "タイル状に表示",
  inaccuracy: "緩手",
  dubious: "疑問手",
  mistake: "悪手",
  blunder: "大悪手",
  inaccuracyThreshold: "緩手の閾値",
  dubiousThreshold: "疑問手の閾値",
  mistakeThreshold: "悪手の閾値",
  blunderThreshold: "大悪手の閾値",
  gothic: "ゴシック体",
  mincho: "明朝体",
  typeCustomTitleHere: "ここに見出しを入力",
  displayEmptyElements: "未入力の項目を表示",
  waitingForNewGame: "対局開始を待っています。",
  insertedComment: "コメントを挿入しました。",
  conversionCompleted: "変換が完了しました。",
  tryingToConnectAndLoginToCSAServer: "CSAサーバーへの接続とログインを試みています。",
  inBrowserLogsOutputToConsoleAndIgnoreThisSetting: "※ブラウザ版ではログがコンソールに出力され、ここでの設定は無視されます。",
  shouldRestartToApplyLogSettings: "※ログ設定の変更を反映するにはアプリの再起動が必要です。",
  canOpenLogDirectoryFromMenu: "※ログの出力先は「デバッグ」-「ログファイルの場所を開く」で開きます。",
  hasNoOldLogCleanUpFeature: "※現在、古いログファイルの自動削除機能はありません。",
  processingPleaseWait: "処理中です。お待ちください。",
  importingFollowingRecordOrPosition: "以下の棋譜(または局面)を取り込みます。",
  supportsKIF_KI2_CSA_USI_JKF: "※KIF形式/KI2形式/CSA形式/SFEN/JKFに対応しています。",
  plesePasteRecordIntoTextArea: "※テキストエリアに棋譜を貼り付けてください。",
  desktopVersionPastesAutomatically: "※インストールアプリ版では自動的に貼り付けられます。",
  someLogsDisabled: "一部のログが無効になっています。",
  logsRecommendedForCSAProtocol: "CSAプロトコルを使用した対局では各種ログの出力を推奨します。",
  pleaseEnableLogsAndRestart: "アプリ設定からログを有効にしてアプリを再起動してください。",
  notSendPVOnStandardCSAProtocol: "標準のCSAプロトコルでは評価値や読み筋が送信されません。",
  csaProtocolSendPlaintextPassword: "CSAプロトコルの規格上パスワードは平文で送信されます。",
  passwordWillSavedPlaintextBecauseOSSideEncryptionNotAvailable: "OSの暗号化機能が利用できないため、入力したパスワードは平文で保存されます。",
  pleaseUncheckSaveHistoryIfNotWantSave: "保存したくない場合は「履歴に保存する」のチェックを外してください。",
  csaProtocolSendPlaintextPasswordRegardlessOfHistory: "なお、履歴の保存に関係なくCSAプロトコルの規格上パスワードは平文で送信されます。",
  areYouSureWantToQuitGames: "連続対局を中断しますか？",
  areYouSureWantToRequestQuit: "中断を要求すると負けになる可能性があります。よろしいですか？",
  areYouSureWantToClearRecord: "現在の棋譜は削除されます。よろしいですか？",
  areYouSureWantToDiscardPosition: "現在の局面は破棄されます。よろしいですか？",
  areYouSureWantToOpenFileInsteadOfCurrentRecord: "現在の棋譜を閉じて別のファイルを開きます。よろしいですか？",
  areYouSureWantToClearHistory: "履歴をクリアします。よろしいですか？",
  youCanNotCloseAppWhileCSAOnlineGame: "CSAプロトコル使用中はアプリを終了できません。",
  fileExtensionNotSupported: "取り扱いできないファイル拡張子です。",
  errorOccuredWhileDisconnectingFromCSAServer: "CSAサーバーからの切断中にエラーが発生しました。",
  failedToConnectToCSAServer: "CSAサーバーに接続できませんでした。",
  errorOccuredWhileLogoutFromCSAServer: "CSAサーバーからのログアウト中にエラーが発生しました。",
  disconnectedFromCSAServer: "CSAサーバーへの接続が切れました。",
  csaServerLoginDenied: "CSAサーバーへのログインが拒否されました。",
  thisFeatureNotAvailableOnWebApp: "Web版では利用できない機能です。",
  failedToStartNewGame: "対局の開始に失敗しました。",
  errorOccuredWhileEndingGame: "対局の終了中にエラーが発生しました。",
  failedToSendGoCommand: "goコマンドを送信できませんでした。",
  failedToSendPonderCommand: "ponderコマンドを送信できませんでした。",
  failedToSendStopCommand: "stopコマンドを送信できませんでした。",
  failedToShutdownEngines: "エンジンを正常に終了できませんでした。",
  failedToSaveRecord: "棋譜の保存に失敗しました。",
  failedToParseSFEN: "SFENの読み込みに失敗しました。",
  failedToDetectRecordFormat: "棋譜形式を判別できませんでした。",
  unknownFileExtension: "不明なファイル形式です。",
  emptyRecordInput: "棋譜が入力されていません。",
  invalidPieceName: "不正な駒",
  invalidTurn: "不正な手番",
  invalidMove: "不正な指し手",
  invalidMoveNumber: "不正な手数",
  invalidDestination: "不正な移動先",
  pieceNotExists: "存在しない駒",
  invalidLine: "不正な行",
  invalidHandicap: "不正な手合",
  invalidBoard: "不正な盤面",
  invalidHandPiece: "不正な持ち駒",
  invalidUSI: "不正なUSI",
  backgroundImageFileNotSelected: "背景画像のファイルが選択されていません。",
  pieceImageFileNotSelected: "駒画像のファイルが選択されていません。",
  boardImageFileNotSelected: "盤面画像のファイルが選択されていません。",
  pieceStandImageFileNotSelected: "駒台画像のファイルが選択されていません。",
  pieceVolumeMustBe0To100Percent: "駒音の大きさには0%～100%の値を指定してください。",
  clockVolumeMustBe0To100Percent: "時計音の大きさには0%～100%の値を指定してください。",
  clockPitchMustBe220To880Hz: "時計音の高さには220Hz～880Hzの値を指定してください。",
  engineTimeoutMustBe1To300Seconds: "エンジンのタイムアウト時間には1秒～300秒の値を指定してください。",
  coefficientInSigmoidMustBeGreaterThan0: "勝率換算係数には0より大きい値を指定してください。",
  inaccuracyThresholdMustBe1To100Percent: "緩手には1%～100%の値を指定してください。",
  dubiousThresholdMustBe1To100Percent: "疑問手には1%～100%の値を指定してください。",
  mistakeThresholdMustBe1To100Percent: "悪手には1%～100%の閾値を指定してください。",
  blunderThresholdMustBe1To100Percent: "大悪手には1%～100%の値を指定してください。",
  recordSavedWithGarbledCharacters: "保存した棋譜の一部が文字化けしている可能性があります。",
  pleaseConsiderToUseKIFU: "KIFU形式(UTF-8)で保存することをお勧めします。",
  youCanChangeDefaultRecordFileFormatFromAppSettings: "デフォルトの棋譜形式はアプリ設定で変更可能です。",
  inaccuracyThresholdMustBeLessThanDubiousThreshold: "緩手には疑問手より小さい値を指定してください。",
  dubiousThresholdMustBeLessThanMistakeThreshold: "疑問手には悪手より小さい値を指定してください。",
  mistakeThresholdMustBeLessThanBlunderThreshold: "悪手には大悪手より小さい値を指定してください。",
  thisEngineNotSupportsMateSearch: "このエンジンは詰将棋探索をサポートしていません。",
  pleaseEndActiveFeaturesBeforeOpenRecord: "棋譜を開くには現在利用している機能を終了してください。",
  bothTimeLimitAndByoyomiAreNotSet: "持ち時間と秒読みが両方とも0です。",
  canNotUseByoyomiWithFischer: "秒読みとフィッシャールールは併用できません。",
  protocolVersionNotSelected: "プロトコルのバージョンを選択してください。",
  hostNameIsEmpty: "ホスト名が空です。",
  invalidPortNumber: "無効なポート番号です。",
  idIsEmpty: "IDが空です。",
  engineNotSelected: "エンジンが選択されていません。",
  forExportingConversionLogPleaseEnableAppLogsAndSetLogLevelDebugAndRestart: "変換ログを出力するにはアプリログを有効にし、ログレベルをデバッグに設定してアプリを再起動してください。",
  sourceDirectoryNotSpecified: "入力ディレクトリが指定されていません。",
  sourceFormatsNotSpecified: "入力の対象フォーマットが指定されていません。",
  destinationDirectoryNotSpecified: "出力ディレクトリが指定されていません。",
  destinationFileNotSpecified: "出力ファイルが指定されていません。",
  totalNumber: (n) => `合計 ${n} 件`,
  number: (n) => `${n} 件`,
  tryToReloginToCSAServerNSecondsLater: (n) => `CSAサーバーへのログインを${n}秒後に再試行します。`,
  mateInNPlyDoYouWantToDisplay: (n) => `${n}手で詰みました。再生画面を表示しますか？`,
  insertedNMovesToRecord: (n) => `${n}手を棋譜に挿入しました。`,
  errorsOccurred: (n) => `${n} 種類のエラーが発生しました。`,
  between: (a, b) => `${a} から ${b} まで`,
  addNthEngine: (n) => `${n} 個目のエンジンを追加`,
  copyOf: (name) => `${name} のコピー`,
  keepLatest: (n) => `最新${n}件まで`,
  followingDataNotSavedBecauseNotSupporetedBy: (fileFormat) => `以下の情報は ${fileFormat} 形式では対応していないため保存されませんでした。`,
  areYouSureWantToDeleteFollowingMove: (n) => `${n}手目以降を削除します。よろしいですか？`,
  failedToOpenDirectory: (path2) => `ファイルの場所を開けませんでした: ${path2}`,
  unexpectedEventSenderPleaseReport(sender) {
    return `予期せぬイベントの送信元です。このエラーメッセージを開発者に報告してください。 [${sender}]`;
  },
  unexpectedHTTPMethodPleaseReport(method) {
    return `予期せぬHTTPメソッドです。このエラーメッセージを開発者に報告してください。 [${method}]`;
  },
  unexpectedRequestURLPleaseReport(url2) {
    return `予期せぬURLへのリクエストです。このエラーメッセージを開発者に報告してください。 [${url2}]`;
  },
  noResponseFromEnginePleaseExtendTimeout(seconds) {
    return `${seconds}秒以内にエンジンから応答がありませんでした。エンジンの起動が重い場合はアプリ設定で待ち時間を延長してください。`;
  }
};
const zh_tw = {
  electronShogi: "Electron將棋",
  clear: "清除",
  open: "開啟",
  saveOverwrite: "覆蓋檔案",
  newRecord: "新棋譜",
  openRecord: "打開棋譜",
  saveRecord: "保存棋譜",
  saveRecordAs: "另存棋譜",
  openAutoSavingDirectory: "打開自動保存目錄",
  exportPositionImage: "輸出局面圖",
  positionImage: "局面圖",
  batchConversion: "棋譜大量轉換",
  recordFileBatchConversion: "棋譜大量轉換",
  close: "關閉",
  quit: "離開",
  editing: "編輯",
  copyAsKIF: "複製KIF棋譜",
  copyAsKI2: "複製KI2棋譜",
  copyAsCSA: "複製CSA棋譜",
  copyAsUSI: "複製USI棋譜",
  copyAsSFEN: "複製SFEN局面",
  copyAsJKF: "複製JKF棋譜",
  paste: "貼上",
  copyRecord: "複製棋譜",
  asKIF: "KIF形式",
  asKI2: "KI2形式",
  asCSA: "CSA形式",
  asUSIUntilCurrentMove: "USI形式(到目前手數為止)",
  asUSIAll: "USI形式(全部)",
  asJSONKifuFormat: "JSON Kifu Format",
  copyPositionAsSFEN: "複製局面(SFEN形式)",
  pasteRecordOrPosition: "貼上棋譜、局面",
  appendSpecialMove: "特殊手",
  deleteMoves: "刪除現在位置後的棋譜",
  view: "表示",
  toggleFullScreen: "切換全螢幕",
  defaultFontSize: "預設字體尺寸",
  largerFontSize: "增加字體尺寸",
  smallerFontSize: "縮小字體尺寸",
  settings: "設定",
  config: "設定",
  debug: "偵錯",
  toggleDevTools: "打開/關閉開發者工具顯示",
  openAppDirectory: "顯示本程式所在資料夾",
  openSettingDirectory: "開啟設定檔案所在資料夾",
  openLogDirectory: "開啟紀錄檔(log)所在資料夾",
  help: "協助",
  openWebSite: "官方網站",
  howToUse: "使用教學",
  checkForUpdates: "檢查最新版本",
  inputs: "輸入目錄",
  outputs: "輸出目錄",
  format: "格式",
  formats: "格式",
  subdirectories: "子目錄",
  separately: "個別",
  // TODO: translate
  merge: "マージ",
  // TODO: translate
  createSubdirectories: "サブディレクトリ作成",
  // TODO: translate
  nameConflictAction: "名稱衝突處理方式",
  numberSuffix: "附加編號",
  skip: "跳過該檔案",
  convert: "開始轉換",
  openLogFile: "打開記錄檔案",
  succeeded: "成功",
  failed: "失敗",
  skipped: "跳過",
  game: "對局",
  player: "玩家",
  selectFromHistory: "從紀錄選取",
  noHistory: "目前沒有紀錄",
  saveHistory: "保存紀錄",
  version: "版本",
  gameProgress: "對局過程",
  allGamesCompleted: "連續對局結束",
  gameEnded: "對局結束",
  offlineGame: "本地（單機）對局",
  csaOnlineGame: "通訊對局（CSA）",
  csaProtocolOnlineGame: "通訊對局（CSA協定）",
  csaProtocolV121: "CSA協定 1.2.1 標準",
  csaProtocolV121WithPVComment: "CSA協定 1.2.1 +思考註解",
  hostToConnect: "連接之伺服器",
  portNumber: "連接埠號碼",
  password: "密碼",
  showPassword: "顯示密碼",
  logout: "登出",
  displayGameResults: "確認戰績",
  interrupt: "中斷",
  stopGame: "對局中斷",
  resign: "投了",
  draw: "平手",
  impass: "持將棋",
  repetitionDraw: "千日手",
  mate: "詰死",
  noMate: "無詰",
  mateSearch: "詰搜尋",
  startMateSearch: "開始詰搜尋",
  stopMateSearch: "結束詰搜尋",
  noMateFound: "在目前的盤面中找不到詰。",
  timeout: "時間耗盡",
  foulWin: "反則勝利",
  foulLose: "反則敗北",
  enteringOfKing: "入玉勝利",
  winByDefault: "不戰勝",
  loseByDefault: "不戰敗",
  winByDeclaration: "宣言勝利",
  declareWinning: "勝利宣言",
  research: "檢討",
  startResearch: "檢討開始",
  endResearch: "結束檢討",
  recordAnalysis: "棋譜解析",
  analysis: "解析",
  analyze: "解析開始",
  stopAnalysis: "中斷解析",
  setupPosition: "編輯局面",
  startPositionSetup: "開始編輯局面",
  completePositionSetup: "結束編輯局面",
  changeTurn: "變更手番",
  initializePosition: "初始化局面",
  appSettings: "程式設定",
  language: "語言",
  theme: "主題",
  standard: "標準",
  green: "綠色",
  cherryBlossom: "櫻花",
  customImage: "自定義圖片",
  autumn: "紅葉",
  snow: "雪",
  darkGreen: "深綠",
  dark: "深色主題",
  piece: "棋駒",
  singleKanjiPiece: "一文字駒",
  singleKanjiGothicPiece: "一文字駒（黑體）",
  singleKanjiDarkPiece: "一文字駒（深色）",
  singleKanjiGothicDarkPiece: "一文字駒（黑體・深色）",
  imageHasMarginsRemoveToDisplayLarger: "画像に余白が含まれている（除去して大きく表示）",
  // TODO: translate
  backgroundImage: "背景圖片",
  board: "棋盤",
  pieceStand: "駒台",
  lightWoodyTexture: "木目（亮色）",
  warmWoodTexture: "木目（暖色）",
  regin: "樹脂",
  transparent: "透過表示",
  // TODO: translate
  boardOpacity: "盤の不透明度",
  // TODO: translate
  pieceStandOpacity: "駒台の不透明度",
  // TODO: translate
  recordOpacity: "棋譜の不透明度",
  // TODO: translate
  displayFileAndRank: "顯示段・筋",
  displayLeftControls: "顯示左側操作按鈕",
  displayRightControls: "顯示右側操作按鈕",
  tabViewStyle: "分頁顯示形式",
  oneColumn: "1列",
  twoColumns: "2列",
  sounds: "音效",
  pieceLoudness: "棋駒音效",
  clockLoudness: "棋鐘音效大小",
  clockPitch: "棋鐘音效頻率",
  clockSoundTarget: "棋鐘音效對象",
  anyTurn: "所有手番",
  onlyHumanTurn: "只有玩家手番",
  defaultRecordFileFormat: "預設保存格式",
  textEncoding: "文字編碼",
  strict: "檔案原始編碼",
  autoDetect: "自動判定",
  newlineCharacter: "換行符號",
  old90sMac: "90年代Mac",
  autoSavingDirectory: "棋譜自動保存地點",
  select: "選擇",
  positionOfUSIOutput: "USI の局面表記",
  // TODO: translate
  movesOfUSIOutput: "USI の指し手表記",
  // TODO: translate
  onlySFEN: "SFEN のみ",
  // TODO: translate
  usiProtocol: "USI協定",
  translateOptionName: "選項名稱翻譯",
  functionalOnJapaneseOnly: "只有在日文選擇時有效",
  maxStartupTime: "最大起動等待時間",
  forDevelopers: "開發者用",
  enableAppLog: "輸出程式 log",
  enableUSILog: "輸出USI通信 log",
  enableCSALog: "輸出CSA通信 log",
  logLevel: "log 等級",
  engineSettings: "引擎設定",
  flipBoard: "盤面反轉",
  file: "檔案",
  recordFile: "棋譜檔案",
  executableFile: "可執行檔案",
  imageFile: "圖片檔案",
  unsaved: "未保存",
  // TODO: translate
  remove: "刪除",
  deleteMove: "刪除該手",
  recordProperties: "棋譜情報",
  comments: "備註",
  commentsAndBookmarks: "備註・書籤",
  branches: "分岐",
  // TODO: translate
  bookmark: "書籤",
  bookmarkList: "書籤一覽",
  useBookmarkAsHeader: "將書籤名稱作為標題",
  moveComments: "棋步備註",
  searchLog: "思考",
  pv: "預測手順",
  mateShort: "詰",
  displayPVShort: "再現",
  evaluation: "評價值",
  eval: "評價値",
  estimatedWinRate: "期待勝率",
  evaluationAndEstimatedWinRate: "評價値・期待勝率",
  swapEachTurnChange: "手番側有利時為正值",
  alwaysSenteIsPositive: "先手有利時為正值",
  signOfEvaluation: "評價值符號",
  winRateCoefficient: "勝率換算係數",
  hideTabView: "最小化",
  expandTabView: "展開分頁",
  sente: "先手",
  senteOrShitate: "先手（下手）",
  shitate: "下手",
  gote: "後手",
  goteOrUwate: "後手（上手）",
  uwate: "上手",
  swapSenteGote: "先後交換",
  currentPosition: "現在局面",
  enableEngineTimeout: "開啟引擎時間限制",
  setDifferentTimeForGote: "先後手時間不相同",
  nextTurn: "手番",
  elapsedTime: "消費時間",
  elapsed: "經過時間",
  rank: "順位",
  depth: "深度",
  searchEngine: "引擎",
  ponder: "對方手番時運算(Ponder)",
  numberOfThreads: "執行緒數",
  multiPV: "多重PV",
  startPosition: "開始局面",
  maxMoves: "最大手數",
  gameRepetition: "連續對局",
  autoRelogin: "自動重新登入",
  swapTurnWhenGameRepetition: "每局交換手番",
  outputComments: "輸出備註",
  saveRecordAutomatically: "自動保存棋譜",
  adjustBoardToHumanPlayer: "調整到玩家所在方向",
  adjustBoardAutomatically: "自動調整盤面方向",
  startGame: "對局開始",
  cancelGame: "取消對局",
  allottedTime: "持時間",
  byoyomi: "讀秒",
  increments: "增秒",
  startEndCriteria: "開始・結束條件",
  endCriteria1Move: "局面結束條件",
  outputSettings: "輸出設定",
  noOutputs: "不輸出",
  insertCommentToTop: "加入到前方",
  appendCommentToBottom: "在後方新增",
  insertToComment: "加入到備註欄",
  insertToRecord: "加入到棋譜",
  overwrite: "覆寫原檔案",
  fromPrefix: "從",
  fromSuffix: "",
  toPrefix: "到",
  toSuffix: "",
  plyPrefix: "第",
  plySuffix: "手",
  hoursSuffix: "時間",
  minutesSuffix: "分",
  secondsSuffix: "秒",
  engineManagement: "引擎管理",
  engineName: "引擎名稱",
  author: "作者",
  enginePath: "場所",
  openDirectory: "開啟資料夾",
  displayName: "表示名稱",
  invoke: "執行",
  resetToEngineDefaultValues: "回復至引擎預設設定",
  defaultValue: "預設値",
  noEngineRegistered: "尚未登錄引擎。",
  duplicate: "複製",
  add: "追加",
  recommended: "推薦",
  import: "匯入",
  saveAndClose: "保存並關閉",
  save: "保存",
  saveAs: "另存為",
  history: "履歴",
  // TODO: translate
  clearHistory: "履歴をクリア",
  // TODO: translate
  userFile: "ユーザーファイル",
  // TODO: translate
  automaticBackup: "自動バックアップ",
  // TODO: translate
  restore: "復元",
  // TODO: translate
  cancel: "取消",
  back: "返回",
  name: "名稱",
  prediction: "預測",
  best: "最善",
  nodes: "Node數",
  hashUsage: "Hash使用率",
  stop: "停止",
  // TODO: translate
  resume: "再開",
  // TODO: translate
  nonHandicap: "平手",
  lanceHandicap: "香落",
  rightLanceHandicap: "右香落",
  bishopHandicap: "角落",
  rookHandicap: "飛車落",
  rookLanceHandicap: "飛車香落",
  twoPiecesHandicap: "二枚落",
  fourPiecesHandicap: "四枚落",
  sixPiecesHandicap: "六枚落",
  eightPiecesHandicap: "八枚落",
  tenPiecesHandicap: "十枚落",
  tsumeShogi: "詰將棋",
  doubleKingTsumeShogi: "雙玉詰將棋",
  startDateTime: "開始日時",
  endDateTime: "結束日時",
  gameDate: "對局日",
  tournament: "棋戰",
  strategy: "戰型",
  gameTitle: "標題",
  timeLimit: "持時間",
  place: "場所",
  postedOn: "登錄於",
  note: "備註",
  senteShortName: "先手省略名",
  goteShortName: "後手省略名",
  opusNo: "作品編號",
  opusName: "作品名",
  publishedBy: "發表於",
  publishedOn: "發表年月",
  source: "來源",
  numberOfMoves: "手數",
  integrity: "完全性",
  recordCategory: "分類",
  award: "受賞",
  filterByOptionName: "搜尋設定名稱",
  filterByEngineName: "搜尋引擎名稱",
  bookStyle: "書籍風",
  gameStyle: "對局畫面風",
  playerName: "対局者名",
  // TODO: translate
  typeface: "書体",
  // TODO: translate
  handLabel: "持ち駒ラベル",
  // TODO: translate
  header: "見出し",
  // TODO: translate
  characterAdjustment: "文字調整",
  // TODO: translate
  vertical: "垂直方向",
  // TODO: translate
  size: "サイズ",
  // TODO: translate
  none: "無",
  bgCover: "圖片置中",
  bgContain: "擴大表示",
  bgTile: "磁磚狀表示",
  inaccuracy: "緩手",
  dubious: "疑問手",
  mistake: "惡手",
  blunder: "大惡手",
  inaccuracyThreshold: "緩手閾値",
  dubiousThreshold: "疑問手閾値",
  mistakeThreshold: "惡手閾値",
  blunderThreshold: "大惡手閾値",
  gothic: "ゴシック体",
  // TODO: translate
  mincho: "明朝体",
  // TODO: translate
  typeCustomTitleHere: "輸入自定義標題",
  displayEmptyElements: "顯示未定義資料",
  waitingForNewGame: "正在等待下一場對局開始。",
  insertedComment: "已加入備註。",
  conversionCompleted: "轉換完成。",
  tryingToConnectAndLoginToCSAServer: "正在連接並登入CSA伺服器。",
  inBrowserLogsOutputToConsoleAndIgnoreThisSetting: "※在瀏覽器版本中 log 會於 console 中顯示，並無視此處的設定。",
  shouldRestartToApplyLogSettings: "※您需要重新啟動本程式以使用變更後的 log 設定。",
  canOpenLogDirectoryFromMenu: "※log 的輸出檔案可以在「偵錯」-「開啟紀錄檔案資料夾」開啟。",
  hasNoOldLogCleanUpFeature: "※現在並沒有舊 log 的自動刪除機制。",
  processingPleaseWait: "現在處理中。請稍待一會。",
  importingFollowingRecordOrPosition: "將匯入以下棋譜（局面）。",
  supportsKIF_KI2_CSA_USI_JKF: "※支援KIF/KI2/CSA/SFEN/JKF形式。",
  plesePasteRecordIntoTextArea: "※請在文字輸入區域貼上您的棋譜。",
  desktopVersionPastesAutomatically: "※安裝程式版將會自動貼上棋譜。",
  someLogsDisabled: "部份 log 已被無效化。",
  logsRecommendedForCSAProtocol: "若使用CSA協定對局，建議輸出各項 log 。",
  pleaseEnableLogsAndRestart: "請在程式設定中開啟 log 並重新啟動本程式。",
  notSendPVOnStandardCSAProtocol: "在標準的CSA協定中不會送出評價值以及思考棋步。",
  csaProtocolSendPlaintextPassword: "在CSA協定中，密碼為明文傳輸。",
  passwordWillSavedPlaintextBecauseOSSideEncryptionNotAvailable: "由於無法使用系統的加密機能，輸入的密碼將會以明文保存。",
  pleaseUncheckSaveHistoryIfNotWantSave: "若不想保存密碼，請不要將「保存紀錄」勾選。",
  csaProtocolSendPlaintextPasswordRegardlessOfHistory: "不過，CSA協定仍會以明文傳輸您的密碼。",
  areYouSureWantToQuitGames: "要中斷連續對局嗎？",
  areYouSureWantToRequestQuit: "若提出中斷要求，可能會被判負。請問您要繼續嗎？",
  areYouSureWantToClearRecord: "將會刪除現在的棋譜。請問您要繼續嗎？",
  areYouSureWantToDiscardPosition: "將不會保存現在的局面。請問您要繼續嗎？",
  areYouSureWantToOpenFileInsteadOfCurrentRecord: "會將現在的棋譜關閉並開啟別的檔案，請問您要繼續嗎？",
  areYouSureWantToClearHistory: "履歴をクリアします。よろしいですか？",
  // TODO: translate
  youCanNotCloseAppWhileCSAOnlineGame: "由於CSA協定正在使用中，本程式無法被關閉。",
  fileExtensionNotSupported: "無法支援的副檔名。",
  errorOccuredWhileDisconnectingFromCSAServer: "在與CSA伺服器中斷連線時發生錯誤。",
  failedToConnectToCSAServer: "無法連接CSA伺服器。",
  errorOccuredWhileLogoutFromCSAServer: "在登出 CSA 伺服器時發生錯誤。",
  disconnectedFromCSAServer: "與CSA伺服器的連接結束。",
  csaServerLoginDenied: "您對CSA伺服器的登入被拒絕。",
  thisFeatureNotAvailableOnWebApp: "Web版無法使用本機能",
  failedToStartNewGame: "對局開始失敗。",
  errorOccuredWhileEndingGame: "在對局結束時發生錯誤。",
  failedToSendGoCommand: "無法送出go指令。",
  failedToSendPonderCommand: "無法送出ponder指令。",
  failedToSendStopCommand: "無法送出stop指令。",
  failedToShutdownEngines: "引擎無法正常結束。",
  failedToSaveRecord: "棋譜保存失敗。",
  failedToParseSFEN: "SFEN讀取失敗。",
  failedToDetectRecordFormat: "無法判別棋譜形式。",
  unknownFileExtension: "未知的檔案形式。",
  emptyRecordInput: "您尚未輸入棋譜。",
  invalidPieceName: "不合法的棋駒",
  invalidTurn: "不合法的手番",
  invalidMove: "不合法的棋步",
  invalidMoveNumber: "不合法的手數",
  invalidDestination: "不合法的移動目的地",
  pieceNotExists: "不存在的棋駒",
  invalidLine: "不存在的行",
  invalidHandicap: "不合法的手合配置",
  invalidBoard: "不合法的盤面",
  invalidHandPiece: "不合法的持駒",
  invalidUSI: "不合法的USI",
  backgroundImageFileNotSelected: "尚未選取背景圖片。",
  pieceImageFileNotSelected: "尚未選取棋駒圖片。",
  boardImageFileNotSelected: "尚未選取盤面圖片。",
  pieceStandImageFileNotSelected: "尚未選取駒台圖片。",
  pieceVolumeMustBe0To100Percent: "請在0%～100%之間指定棋駒音效大小。",
  clockVolumeMustBe0To100Percent: "請在0%～100%之間指定棋鐘音效大小。",
  clockPitchMustBe220To880Hz: "請在220Hz～880Hz之間指定棋鐘音效頻率。",
  engineTimeoutMustBe1To300Seconds: "請在1秒～300秒之間指定引擎執行最長時間。",
  coefficientInSigmoidMustBeGreaterThan0: "請將勝率換算係數填為大於0之值。",
  inaccuracyThresholdMustBe1To100Percent: "請在0%～100%之間指定緩手門檻。",
  dubiousThresholdMustBe1To100Percent: "請在0%～100%之間指定疑問手門檻。",
  mistakeThresholdMustBe1To100Percent: "請在0%～100%之間指定惡手門檻。",
  blunderThresholdMustBe1To100Percent: "請在0%～100%之間指定大惡手門檻。",
  recordSavedWithGarbledCharacters: "保存的棋譜有部分可能會造成亂碼。",
  pleaseConsiderToUseKIFU: "建議您使用KIFU形式(UTF-8)儲存您的棋譜。",
  youCanChangeDefaultRecordFileFormatFromAppSettings: "預設棋譜檔案格式可以在程式設定中進行更動。",
  inaccuracyThresholdMustBeLessThanDubiousThreshold: "緩手門檻應小於疑問手門檻。",
  dubiousThresholdMustBeLessThanMistakeThreshold: "疑問手門檻應小於惡手門檻。",
  mistakeThresholdMustBeLessThanBlunderThreshold: "惡手門檻應小於大惡手門檻。",
  thisEngineNotSupportsMateSearch: "這個引擎不支援詰將棋搜索。",
  pleaseEndActiveFeaturesBeforeOpenRecord: "請關閉現正運行的功能再開啟棋譜。",
  bothTimeLimitAndByoyomiAreNotSet: "持時間與讀秒尚未設置。",
  canNotUseByoyomiWithFischer: "讀秒與 Fischer 選項無法同時併用。",
  protocolVersionNotSelected: "請選擇協定版本。",
  hostNameIsEmpty: "主機名稱為空。",
  invalidPortNumber: "不可用的連接埠號碼。",
  idIsEmpty: "ID 為空。",
  engineNotSelected: "尚未選擇引擎。",
  forExportingConversionLogPleaseEnableAppLogsAndSetLogLevelDebugAndRestart: "如要監看轉換紀錄，請在程式設定內設定 log level 到 Debug 並重新啟動本程式。",
  sourceDirectoryNotSpecified: "入力ディレクトリが指定されていません。",
  // TODO: translate
  sourceFormatsNotSpecified: "入力の対象フォーマットが指定されていません。",
  // TODO: translate
  destinationDirectoryNotSpecified: "出力ディレクトリが指定されていません。",
  // TODO: translate
  destinationFileNotSpecified: "出力ファイルが指定されていません。",
  // TODO: translate
  totalNumber: (n) => `總計 ${n} 筆`,
  number: (n) => `${n} 筆`,
  tryToReloginToCSAServerNSecondsLater: (n) => `請在${n}秒後再次嘗試登入 CSA 伺服器。`,
  mateInNPlyDoYouWantToDisplay: (n) => `尋找到${n}手詰。要顯示結果嗎？`,
  insertedNMovesToRecord: (n) => `已加入${n}手到棋譜。`,
  errorsOccurred: (n) => `發生 ${n} 種類的錯誤。`,
  between: (a, b) => `自 ${a} 到 ${b} `,
  addNthEngine: (n) => `追加第 ${n} 個引擎`,
  copyOf: (name) => `${name} 的拷貝`,
  keepLatest: (n) => `到最新${n}件`,
  followingDataNotSavedBecauseNotSupporetedBy: (fileFormat) => `以下の情報は ${fileFormat} 形式では対応していないため保存されませんでした。`,
  // TODO: translate
  areYouSureWantToDeleteFollowingMove: (n) => `將會刪除${n}手目以後的棋譜。請問您要繼續嗎？`,
  failedToOpenDirectory: (path2) => `無法開啟檔案目錄：${path2}`,
  unexpectedEventSenderPleaseReport(sender) {
    return `無法預期的事件發送方已發生。請將該錯誤訊息告知開發者，謝謝。 [${sender}]`;
  },
  unexpectedHTTPMethodPleaseReport(method) {
    return `無法預期的 HTTP 方法。請將該錯誤訊息告知開發者，謝謝。 [${method}]`;
  },
  unexpectedRequestURLPleaseReport(url2) {
    return `無法從 URL 獲取資訊。請將該錯誤訊息告知開發者，謝謝。 [${url2}]`;
  },
  noResponseFromEnginePleaseExtendTimeout(seconds) {
    return `引擎在${seconds}秒内沒有回應。若引擎的啟動時間稍長，請在設定中調整引擎最長等待時間。`;
  }
};
const t = ja$1;
function getTranslationTable(language) {
  switch (language) {
    case Language.JA:
      return ja$1;
    case Language.EN:
      return en;
    case Language.ZH_TW:
      return zh_tw;
    default:
      return ja$1;
  }
}
function setLanguage$2(lang) {
  Object.entries(getTranslationTable(lang)).forEach(([key, value]) => {
    t[key] = value;
  });
}
const ja = {
  USI_Ponder: "相手番思考",
  Ponder: "相手番思考",
  USI_Hash: "ハッシュ",
  Hash: "ハッシュ",
  Clear_Hash: "ハッシュクリア",
  Threads: "スレッド",
  NumberOfThreads: "スレッド数",
  thread_num_per_gpu: "GPUあたりのスレッド数",
  ThreadIdOffset: "スレッドIDオフセット",
  MultiPV: "マルチPV",
  BookFile: "定跡ファイル",
  Book_File: "定跡ファイル",
  Book_Enable: "定跡あり",
  BookEvalDiff: "定跡の評価値差",
  book_file_name: "定跡ファイル名",
  use_book: "定跡を使用",
  BookPvMoves: "定跡PV手数",
  TinyBook: "小さい定跡",
  BookMoves: "定跡利用手数",
  BookMaxPly: "定跡最大手数",
  BookIgnoreRate: "定跡不使用率",
  RandomBookSelect: "ランダム定跡選択",
  IgnoreBookPly: "定跡の手数を無視",
  DepthLimit: "最大深さ",
  NarrowBook: "定跡手を限定",
  WriteDebugLog: "デバッグログ出力",
  Write_Debug_Log: "デバッグログ出力",
  ResignValue: "投了基準値",
  ResignScore: "投了基準値",
  PvInterval: "PV出力間隔",
  NodesLimit: "最大ノード数",
  USI_OwnBook: "定跡を使用",
  OwnBook: "定跡を使用",
  EvalDir: "評価関数のフォルダ",
  Eval_Dir: "評価関数のフォルダ",
  EvalFile: "評価関数ファイル",
  EvalHash: "評価値ハッシュ",
  Eval_Hash: "評価値ハッシュ",
  EvalSaveDir: "評価関数保存フォルダ",
  EvalShare: "評価値共有",
  BookDir: "定跡ファイルのフォルダ",
  Stochastic_Ponder: "相手番思考（確率的）",
  MinimumThinkingTime: "最小思考時間",
  Minimum_Thinking_Time: "最小思考時間",
  MinThinkingTime: "最小思考時間",
  MaxMovesToDraw: "強制引き分け手数",
  SlowMover: "長考",
  Slow_Mover: "長考",
  OutputFailLHPV: "Fail Low/Highを出力",
  NetworkDelay: "通信遅延",
  NetworkDelay2: "通信遅延2",
  FV_SCALE: "評価値スケール",
  UseBook: "定跡を使用",
  MaxDepth: "最大深さ",
  MarginMs: "マージン（ミリ秒）",
  Time_Margin: "時間マージン",
  ByoyomiMargin: "秒読みマージン",
  Byoyomi_Margin: "秒読みマージン",
  byoyomi_margin: "秒読みマージン",
  Move_Overhead: "着手オーバーヘッド",
  FischerMargin: "フィッシャーマージン",
  SuddenDeathMargin: "切れ負けマージン",
  Snappy: "素早く指す",
  EnteringKingRule: "入玉ルール",
  Do_YoTsume_Search: "余詰めを探索",
  gpu_num: "GPU数",
  ConsiderationMode: "検討モード",
  ConsiderBookMoveCount: "定跡出現率を使用",
  GenerateAllLegalMoves: "全合法手を生成",
  DrawScore: "引き分けのスコア",
  DrawValue: "引き分けの値",
  DrawValueBlack: "引き分けの値（先手）",
  DrawValueWhite: "引き分けの値（後手）",
  LargePageEnable: "LargePageを使用",
  SkillLevel: "スキルレベル",
  Skill_Level: "スキルレベル"
};
const usiOptionNameMap = {};
function getUSIOptionNameMap(language) {
  switch (language) {
    case Language.JA:
      return ja;
    case Language.EN:
      return {};
    default:
      return {};
  }
}
function setLanguage$1(lang) {
  Object.keys(usiOptionNameMap).forEach((key) => {
    delete usiOptionNameMap[key];
  });
  Object.entries(getUSIOptionNameMap(lang)).forEach(([key, value]) => {
    usiOptionNameMap[key] = value;
  });
}
class InvalidPieceNameError extends Error {
  constructor(data) {
    super(`Invalid piece name: ${data}`);
    this.data = data;
    this.name = "InvalidPieceNameError";
  }
}
class InvalidTurnError extends Error {
  constructor(data) {
    super(`Invalid turn: ${data}`);
    this.data = data;
    this.name = "InvalidTurnError";
  }
}
class InvalidMoveError extends Error {
  constructor(data) {
    super(`Invalid move: ${data}`);
    this.data = data;
    this.name = "InvalidMoveError";
  }
}
class InvalidMoveNumberError extends Error {
  constructor(data) {
    super(`Invalid move number: ${data}`);
    this.data = data;
    this.name = "InvalidMoveNumberError";
  }
}
class InvalidDestinationError extends Error {
  constructor(data) {
    super(`Invalid destination: ${data}`);
    this.data = data;
    this.name = "InvalidDestinationError";
  }
}
class PieceNotExistsError extends Error {
  constructor(data) {
    super(`Piece not exists: ${data}`);
    this.data = data;
    this.name = "PieceNotExistsError";
  }
}
class InvalidLineError extends Error {
  constructor(data) {
    super(`Invalid line: ${data}`);
    this.data = data;
    this.name = "InvalidLineError";
  }
}
class InvalidHandicapError extends Error {
  constructor(data) {
    super(`Invalid handicap: ${data}`);
    this.data = data;
    this.name = "InvalidHandicapError";
  }
}
class InvalidBoardError extends Error {
  constructor(data) {
    super(`Invalid board: ${data}`);
    this.data = data;
    this.name = "InvalidBoardError";
  }
}
class InvalidHandPieceError extends Error {
  constructor(data) {
    super(`Invalid hand piece: ${data}`);
    this.data = data;
    this.name = "InvalidHandPieceError";
  }
}
class InvalidUSIError extends Error {
  constructor(data) {
    super(`Invalid USI: ${data}`);
    this.data = data;
    this.name = "InvalidUSIError";
  }
}
var Color = /* @__PURE__ */ ((Color2) => {
  Color2["BLACK"] = "black";
  Color2["WHITE"] = "white";
  return Color2;
})(Color || {});
function reverseColor(color) {
  return color === "black" ? "white" : "black";
}
function colorToSFEN(color) {
  return color === "black" ? "b" : "w";
}
function isValidSFENColor(sfen) {
  return sfen === "b" || sfen === "w";
}
function parseSFENColor(sfen) {
  return sfen === "b" ? "black" : "white";
}
var PieceType = /* @__PURE__ */ ((PieceType2) => {
  PieceType2["PAWN"] = "pawn";
  PieceType2["LANCE"] = "lance";
  PieceType2["KNIGHT"] = "knight";
  PieceType2["SILVER"] = "silver";
  PieceType2["GOLD"] = "gold";
  PieceType2["BISHOP"] = "bishop";
  PieceType2["ROOK"] = "rook";
  PieceType2["KING"] = "king";
  PieceType2["PROM_PAWN"] = "promPawn";
  PieceType2["PROM_LANCE"] = "promLance";
  PieceType2["PROM_KNIGHT"] = "promKnight";
  PieceType2["PROM_SILVER"] = "promSilver";
  PieceType2["HORSE"] = "horse";
  PieceType2["DRAGON"] = "dragon";
  return PieceType2;
})(PieceType || {});
const promotable = {
  pawn: true,
  lance: true,
  knight: true,
  silver: true,
  gold: false,
  bishop: true,
  rook: true,
  king: false,
  promPawn: false,
  promLance: false,
  promKnight: false,
  promSilver: false,
  horse: false,
  dragon: false
};
function isPromotable(pieceType) {
  return !!promotable[pieceType];
}
const promoteMap = {
  pawn: "promPawn",
  lance: "promLance",
  knight: "promKnight",
  silver: "promSilver",
  bishop: "horse",
  rook: "dragon"
  /* DRAGON */
};
function promotedPieceType(pieceType) {
  return promoteMap[pieceType] || pieceType;
}
const unpromoteMap = {
  promPawn: "pawn",
  promLance: "lance",
  promKnight: "knight",
  promSilver: "silver",
  horse: "bishop",
  dragon: "rook"
  /* ROOK */
};
const toSFENCharBlack = {
  pawn: "P",
  lance: "L",
  knight: "N",
  silver: "S",
  gold: "G",
  bishop: "B",
  rook: "R",
  king: "K",
  promPawn: "+P",
  promLance: "+L",
  promKnight: "+N",
  promSilver: "+S",
  horse: "+B",
  dragon: "+R"
};
function pieceTypeToSFEN(type) {
  return toSFENCharBlack[type];
}
const toSFENCharWhite = {
  pawn: "p",
  lance: "l",
  knight: "n",
  silver: "s",
  gold: "g",
  bishop: "b",
  rook: "r",
  king: "k",
  promPawn: "+p",
  promLance: "+l",
  promKnight: "+n",
  promSilver: "+s",
  horse: "+b",
  dragon: "+r"
};
const sfenCharToTypeMap = {
  P: "pawn",
  L: "lance",
  N: "knight",
  S: "silver",
  G: "gold",
  B: "bishop",
  R: "rook",
  K: "king",
  "+P": "promPawn",
  "+L": "promLance",
  "+N": "promKnight",
  "+S": "promSilver",
  "+B": "horse",
  "+R": "dragon",
  p: "pawn",
  l: "lance",
  n: "knight",
  s: "silver",
  g: "gold",
  b: "bishop",
  r: "rook",
  k: "king",
  "+p": "promPawn",
  "+l": "promLance",
  "+n": "promKnight",
  "+s": "promSilver",
  "+b": "horse",
  "+r": "dragon"
  /* DRAGON */
};
const sfenCharToColorMap = {
  P: Color.BLACK,
  L: Color.BLACK,
  N: Color.BLACK,
  S: Color.BLACK,
  G: Color.BLACK,
  B: Color.BLACK,
  R: Color.BLACK,
  K: Color.BLACK,
  "+P": Color.BLACK,
  "+L": Color.BLACK,
  "+N": Color.BLACK,
  "+S": Color.BLACK,
  "+B": Color.BLACK,
  "+R": Color.BLACK,
  p: Color.WHITE,
  l: Color.WHITE,
  n: Color.WHITE,
  s: Color.WHITE,
  g: Color.WHITE,
  b: Color.WHITE,
  r: Color.WHITE,
  k: Color.WHITE,
  "+p": Color.WHITE,
  "+l": Color.WHITE,
  "+n": Color.WHITE,
  "+s": Color.WHITE,
  "+b": Color.WHITE,
  "+r": Color.WHITE
};
const rotateMap = /* @__PURE__ */ new Map();
rotateMap.set("pawn", {
  type: "promPawn",
  reverseColor: false
});
rotateMap.set("lance", {
  type: "promLance",
  reverseColor: false
});
rotateMap.set("knight", {
  type: "promKnight",
  reverseColor: false
});
rotateMap.set("silver", {
  type: "promSilver",
  reverseColor: false
});
rotateMap.set("gold", { type: "gold", reverseColor: true });
rotateMap.set("bishop", { type: "horse", reverseColor: false });
rotateMap.set("rook", { type: "dragon", reverseColor: false });
rotateMap.set("king", { type: "king", reverseColor: true });
rotateMap.set("promPawn", {
  type: "pawn",
  reverseColor: true
});
rotateMap.set("promLance", {
  type: "lance",
  reverseColor: true
});
rotateMap.set("promKnight", {
  type: "knight",
  reverseColor: true
});
rotateMap.set("promSilver", {
  type: "silver",
  reverseColor: true
});
rotateMap.set("horse", { type: "bishop", reverseColor: true });
rotateMap.set("dragon", { type: "rook", reverseColor: true });
class Piece {
  constructor(color, type) {
    this.color = color;
    this.type = type;
  }
  black() {
    return this.withColor(Color.BLACK);
  }
  white() {
    return this.withColor(Color.WHITE);
  }
  withColor(color) {
    return new Piece(color, this.type);
  }
  equals(piece) {
    return this.type === piece.type && this.color === piece.color;
  }
  promoted() {
    const type = promoteMap[this.type];
    return new Piece(this.color, type || this.type);
  }
  unpromoted() {
    const type = unpromoteMap[this.type];
    return new Piece(this.color, type || this.type);
  }
  isPromotable() {
    return isPromotable(this.type);
  }
  rotate() {
    const r = rotateMap.get(this.type);
    const piece = new Piece(this.color, r ? r.type : this.type);
    if (r && r.reverseColor) {
      piece.color = reverseColor(this.color);
    }
    return piece;
  }
  get id() {
    return this.color + "_" + this.type;
  }
  get sfen() {
    switch (this.color) {
      default:
      case Color.BLACK:
        return toSFENCharBlack[this.type];
      case Color.WHITE:
        return toSFENCharWhite[this.type];
    }
  }
  static isValidSFEN(sfen) {
    return !!sfenCharToTypeMap[sfen];
  }
  static newBySFEN(sfen) {
    const type = sfenCharToTypeMap[sfen];
    if (!type) {
      return null;
    }
    const color = sfenCharToColorMap[sfen];
    if (!color) {
      return null;
    }
    return new Piece(color, type);
  }
}
var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2["UP"] = "up";
  Direction2["DOWN"] = "down";
  Direction2["LEFT"] = "left";
  Direction2["RIGHT"] = "right";
  Direction2["LEFT_UP"] = "left_up";
  Direction2["RIGHT_UP"] = "right_up";
  Direction2["LEFT_DOWN"] = "left_down";
  Direction2["RIGHT_DOWN"] = "right_down";
  Direction2["LEFT_UP_KNIGHT"] = "left_up_knight";
  Direction2["RIGHT_UP_KNIGHT"] = "right_up_knight";
  Direction2["LEFT_DOWN_KNIGHT"] = "left_down_knight";
  Direction2["RIGHT_DOWN_KNIGHT"] = "right_down_knight";
  return Direction2;
})(Direction || {});
const reverseMap = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
  left_up: "right_down",
  right_up: "left_down",
  left_down: "right_up",
  right_down: "left_up",
  left_up_knight: "right_down_knight",
  right_up_knight: "left_down_knight",
  left_down_knight: "right_up_knight",
  right_down_knight: "left_up_knight"
  /* LEFT_UP_KNIGHT */
};
function reverseDirection(dir) {
  return reverseMap[dir];
}
const directions = [
  "up",
  "down",
  "left",
  "right",
  "left_up",
  "right_up",
  "left_down",
  "right_down",
  "left_up_knight",
  "right_up_knight",
  "left_down_knight",
  "right_down_knight"
  /* RIGHT_DOWN_KNIGHT */
];
var MoveType = /* @__PURE__ */ ((MoveType2) => {
  MoveType2["SHORT"] = "short";
  MoveType2["LONG"] = "long";
  return MoveType2;
})(MoveType || {});
const movableDirectionMap = {
  black: {
    pawn: {
      up: "short"
      /* SHORT */
    },
    lance: {
      up: "long"
      /* LONG */
    },
    knight: {
      left_up_knight: "short",
      right_up_knight: "short"
      /* SHORT */
    },
    silver: {
      left_up: "short",
      up: "short",
      right_up: "short",
      left_down: "short",
      right_down: "short"
      /* SHORT */
    },
    gold: {
      left_up: "short",
      up: "short",
      right_up: "short",
      left: "short",
      right: "short",
      down: "short"
      /* SHORT */
    },
    bishop: {
      left_up: "long",
      right_up: "long",
      left_down: "long",
      right_down: "long"
      /* LONG */
    },
    rook: {
      up: "long",
      left: "long",
      right: "long",
      down: "long"
      /* LONG */
    },
    king: {
      left_down: "short",
      right_down: "short",
      left_up: "short",
      right_up: "short",
      down: "short",
      left: "short",
      right: "short",
      up: "short"
      /* SHORT */
    },
    promPawn: {
      left_up: "short",
      up: "short",
      right_up: "short",
      left: "short",
      right: "short",
      down: "short"
      /* SHORT */
    },
    promLance: {
      left_up: "short",
      up: "short",
      right_up: "short",
      left: "short",
      right: "short",
      down: "short"
      /* SHORT */
    },
    promKnight: {
      left_up: "short",
      up: "short",
      right_up: "short",
      left: "short",
      right: "short",
      down: "short"
      /* SHORT */
    },
    promSilver: {
      left_up: "short",
      up: "short",
      right_up: "short",
      left: "short",
      right: "short",
      down: "short"
      /* SHORT */
    },
    horse: {
      left_up: "long",
      right_up: "long",
      left_down: "long",
      right_down: "long",
      up: "short",
      left: "short",
      right: "short",
      down: "short"
      /* SHORT */
    },
    dragon: {
      up: "long",
      left: "long",
      right: "long",
      down: "long",
      left_up: "short",
      right_up: "short",
      left_down: "short",
      right_down: "short"
      /* SHORT */
    }
  },
  white: {
    pawn: {
      down: "short"
      /* SHORT */
    },
    lance: {
      down: "long"
      /* LONG */
    },
    knight: {
      left_down_knight: "short",
      right_down_knight: "short"
      /* SHORT */
    },
    silver: {
      left_down: "short",
      down: "short",
      right_down: "short",
      left_up: "short",
      right_up: "short"
      /* SHORT */
    },
    gold: {
      left_down: "short",
      down: "short",
      right_down: "short",
      left: "short",
      right: "short",
      up: "short"
      /* SHORT */
    },
    bishop: {
      left_down: "long",
      right_down: "long",
      left_up: "long",
      right_up: "long"
      /* LONG */
    },
    rook: {
      down: "long",
      left: "long",
      right: "long",
      up: "long"
      /* LONG */
    },
    king: {
      left_down: "short",
      right_down: "short",
      left_up: "short",
      right_up: "short",
      down: "short",
      left: "short",
      right: "short",
      up: "short"
      /* SHORT */
    },
    promPawn: {
      left_down: "short",
      down: "short",
      right_down: "short",
      left: "short",
      right: "short",
      up: "short"
      /* SHORT */
    },
    promLance: {
      left_down: "short",
      down: "short",
      right_down: "short",
      left: "short",
      right: "short",
      up: "short"
      /* SHORT */
    },
    promKnight: {
      left_down: "short",
      down: "short",
      right_down: "short",
      left: "short",
      right: "short",
      up: "short"
      /* SHORT */
    },
    promSilver: {
      left_down: "short",
      down: "short",
      right_down: "short",
      left: "short",
      right: "short",
      up: "short"
      /* SHORT */
    },
    horse: {
      left_down: "long",
      right_down: "long",
      left_up: "long",
      right_up: "long",
      down: "short",
      left: "short",
      right: "short",
      up: "short"
      /* SHORT */
    },
    dragon: {
      down: "long",
      left: "long",
      right: "long",
      up: "long",
      left_down: "short",
      right_down: "short",
      left_up: "short",
      right_up: "short"
      /* SHORT */
    }
  }
};
function movableDirections(piece) {
  return Object.keys(movableDirectionMap[piece.color][piece.type]);
}
function resolveMoveType(piece, direction) {
  return movableDirectionMap[piece.color][piece.type][direction];
}
const directionToDeltaMap = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  left_up: { x: -1, y: -1 },
  right_up: { x: 1, y: -1 },
  left_down: { x: -1, y: 1 },
  right_down: { x: 1, y: 1 },
  left_up_knight: { x: -1, y: -2 },
  right_up_knight: { x: 1, y: -2 },
  left_down_knight: { x: -1, y: 2 },
  right_down_knight: { x: 1, y: 2 }
};
function vectorToDirectionAndDistance(x, y) {
  if (x === 1 && y === -2) {
    return { direction: "right_up_knight", distance: 1, ok: true };
  }
  if (x === -1 && y === -2) {
    return { direction: "left_up_knight", distance: 1, ok: true };
  }
  if (x === 1 && y === 2) {
    return { direction: "right_down_knight", distance: 1, ok: true };
  }
  if (x === -1 && y === 2) {
    return { direction: "left_down_knight", distance: 1, ok: true };
  }
  if (x !== 0 && y !== 0 && Math.abs(x) !== Math.abs(y)) {
    return { direction: "", distance: 0, ok: false };
  }
  let dx = x;
  let dy = y;
  let distance = 0;
  if (dx !== 0) {
    distance = Math.abs(dx);
    dx /= distance;
  }
  if (dy !== 0) {
    distance = Math.abs(dy);
    dy /= distance;
  }
  if (dx === -1 && dy === -1) {
    return { direction: "left_up", distance, ok: true };
  }
  if (dx === 0 && dy === -1) {
    return { direction: "up", distance, ok: true };
  }
  if (dx === 1 && dy === -1) {
    return { direction: "right_up", distance, ok: true };
  }
  if (dx === -1 && dy === 0) {
    return { direction: "left", distance, ok: true };
  }
  if (dx === 1 && dy === 0) {
    return { direction: "right", distance, ok: true };
  }
  if (dx === -1 && dy === 1) {
    return { direction: "left_down", distance, ok: true };
  }
  if (dx === 0 && dy === 1) {
    return { direction: "down", distance, ok: true };
  }
  if (dx === 1 && dy === 1) {
    return { direction: "right_down", distance, ok: true };
  }
  return { direction: "", distance: 0, ok: false };
}
var VDirection = /* @__PURE__ */ ((VDirection2) => {
  VDirection2["UP"] = "up";
  VDirection2["NONE"] = "none";
  VDirection2["DOWN"] = "down";
  return VDirection2;
})(VDirection || {});
function directionToVDirection(direction) {
  switch (direction) {
    case "up":
    case "left_up":
    case "right_up":
    case "left_up_knight":
    case "right_up_knight":
      return "up";
    case "down":
    case "left_down":
    case "right_down":
    case "left_down_knight":
    case "right_down_knight":
      return "down";
    default:
      return "none";
  }
}
var HDirection = /* @__PURE__ */ ((HDirection2) => {
  HDirection2["LEFT"] = "left";
  HDirection2["NONE"] = "none";
  HDirection2["RIGHT"] = "right";
  return HDirection2;
})(HDirection || {});
function directionToHDirection(direction) {
  switch (direction) {
    case "left":
    case "left_up":
    case "left_down":
    case "left_up_knight":
    case "left_down_knight":
      return "left";
    case "right":
    case "right_up":
    case "right_down":
    case "right_up_knight":
    case "right_down_knight":
      return "right";
    default:
      return "none";
  }
}
function sfenFileToNumber(sfen) {
  switch (sfen) {
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    default:
      return null;
  }
}
function sfenRankToNumber(sfen) {
  switch (sfen) {
    case "a":
      return 1;
    case "b":
      return 2;
    case "c":
      return 3;
    case "d":
      return 4;
    case "e":
      return 5;
    case "f":
      return 6;
    case "g":
      return 7;
    case "h":
      return 8;
    case "i":
      return 9;
    default:
      return null;
  }
}
const sfenRanks = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
class Square {
  constructor(file, rank) {
    this.file = file;
    this.rank = rank;
  }
  get x() {
    return 9 - this.file;
  }
  get y() {
    return this.rank - 1;
  }
  get index() {
    return this.y * 9 + this.x;
  }
  get opposite() {
    return new Square(10 - this.file, 10 - this.rank);
  }
  neighbor(arg0, arg1) {
    switch (arg0) {
      case Direction.UP:
        return new Square(this.file, this.rank - 1);
      case Direction.DOWN:
        return new Square(this.file, this.rank + 1);
      case Direction.LEFT:
        return new Square(this.file + 1, this.rank);
      case Direction.RIGHT:
        return new Square(this.file - 1, this.rank);
      case Direction.LEFT_UP:
        return new Square(this.file + 1, this.rank - 1);
      case Direction.RIGHT_UP:
        return new Square(this.file - 1, this.rank - 1);
      case Direction.LEFT_DOWN:
        return new Square(this.file + 1, this.rank + 1);
      case Direction.RIGHT_DOWN:
        return new Square(this.file - 1, this.rank + 1);
      case Direction.LEFT_UP_KNIGHT:
        return new Square(this.file + 1, this.rank - 2);
      case Direction.RIGHT_UP_KNIGHT:
        return new Square(this.file - 1, this.rank - 2);
      case Direction.LEFT_DOWN_KNIGHT:
        return new Square(this.file + 1, this.rank + 2);
      case Direction.RIGHT_DOWN_KNIGHT:
        return new Square(this.file - 1, this.rank + 2);
    }
    const dx = arg0;
    const dy = arg1;
    return new Square(this.file - dx, this.rank + dy);
  }
  directionTo(square) {
    return vectorToDirectionAndDistance(square.x - this.x, square.y - this.y).direction;
  }
  get valid() {
    return this.file >= 1 && this.file <= 9 && this.rank >= 1 && this.rank <= 9;
  }
  equals(square) {
    return !!square && this.file === square.file && this.rank === square.rank;
  }
  static newByXY(x, y) {
    return new Square(9 - x, y + 1);
  }
  static newByIndex(index) {
    return new Square(9 - index % 9, Math.trunc(index / 9) + 1);
  }
  static all = [];
  get sfen() {
    return this.file + sfenRanks[this.rank - 1];
  }
  static parseSFENSquare(sfen) {
    const file = sfenFileToNumber(sfen[0]);
    const rank = sfenRankToNumber(sfen[1]);
    if (!file || !rank) {
      return null;
    }
    return new Square(file, rank);
  }
}
for (let index = 0; index < 81; index += 1) {
  Square.all.push(Square.newByIndex(index));
}
class Move {
  constructor(from, to, promote, color, pieceType, capturedPieceType) {
    this.from = from;
    this.to = to;
    this.promote = promote;
    this.color = color;
    this.pieceType = pieceType;
    this.capturedPieceType = capturedPieceType;
  }
  equals(move) {
    if (!move) {
      return false;
    }
    return (this.from instanceof Square && move.from instanceof Square && this.from.equals(move.from) || !(this.from instanceof Square) && !(move.from instanceof Square) && this.from === move.from) && this.to.equals(move.to) && this.promote === move.promote && this.color === move.color && this.pieceType === move.pieceType && this.capturedPieceType === move.capturedPieceType;
  }
  withPromote() {
    return new Move(this.from, this.to, true, this.color, this.pieceType, this.capturedPieceType);
  }
  get usi() {
    let ret = "";
    if (this.from instanceof Square) {
      ret += this.from.sfen;
    } else {
      ret += pieceTypeToSFEN(this.from) + "*";
    }
    ret += this.to.sfen;
    if (this.promote) {
      ret += "+";
    }
    return ret;
  }
}
function parseUSIMove(usiMove) {
  let from;
  if (usiMove[1] === "*") {
    const piece = Piece.newBySFEN(usiMove[0]);
    if (!piece) {
      return null;
    }
    from = piece.type;
  } else {
    const square = Square.parseSFENSquare(usiMove);
    if (!square) {
      return null;
    }
    from = square;
  }
  const to = Square.parseSFENSquare(usiMove.substring(2));
  if (!to) {
    return null;
  }
  const promote = usiMove.length >= 5 && usiMove[4] === "+";
  return { from, to, promote };
}
var SpecialMoveType = /* @__PURE__ */ ((SpecialMoveType2) => {
  SpecialMoveType2["START"] = "start";
  SpecialMoveType2["INTERRUPT"] = "interrupt";
  SpecialMoveType2["RESIGN"] = "resign";
  SpecialMoveType2["IMPASS"] = "impass";
  SpecialMoveType2["DRAW"] = "draw";
  SpecialMoveType2["REPETITION_DRAW"] = "repetitionDraw";
  SpecialMoveType2["MATE"] = "mate";
  SpecialMoveType2["NO_MATE"] = "noMate";
  SpecialMoveType2["TIMEOUT"] = "timeout";
  SpecialMoveType2["FOUL_WIN"] = "foulWin";
  SpecialMoveType2["FOUL_LOSE"] = "foulLose";
  SpecialMoveType2["ENTERING_OF_KING"] = "enteringOfKing";
  SpecialMoveType2["WIN_BY_DEFAULT"] = "winByDefault";
  SpecialMoveType2["LOSE_BY_DEFAULT"] = "loseByDefault";
  return SpecialMoveType2;
})(SpecialMoveType || {});
function specialMove(type) {
  return { type };
}
function anySpecialMove(name) {
  return { type: "any", name };
}
function isKnownSpecialMove(move) {
  return !(move instanceof Move) && move.type !== "any";
}
function sfenCharToNumber(sfen) {
  switch (sfen) {
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    default:
      return null;
  }
}
class Board {
  squares;
  constructor() {
    this.squares = new Array();
    for (let i = 0; i < 81; i += 1) {
      this.squares.push(null);
    }
    this.resetBySFEN("lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL");
  }
  at(square) {
    return this.squares[square.index];
  }
  set(square, piece) {
    this.squares[square.index] = piece;
  }
  swap(square1, square2) {
    const tmp = this.squares[square1.index];
    this.squares[square1.index] = this.squares[square2.index];
    this.squares[square2.index] = tmp;
  }
  remove(square) {
    const removed = this.squares[square.index];
    this.squares[square.index] = null;
    return removed;
  }
  listNonEmptySquares() {
    return Square.all.filter((square) => {
      return this.squares[square.index];
    });
  }
  listSquaresByColor(color) {
    return Square.all.filter((square) => {
      const piece = this.squares[square.index];
      return piece && piece.color === color;
    });
  }
  listSquaresByPiece(target) {
    return Square.all.filter((square) => {
      const piece = this.squares[square.index];
      return piece && target.equals(piece);
    });
  }
  clear() {
    Square.all.forEach((square) => {
      this.squares[square.index] = null;
    });
  }
  get sfen() {
    let ret = "";
    let empty = 0;
    for (let y = 0; y < 9; y += 1) {
      for (let x = 0; x < 9; x += 1) {
        const piece = this.at(Square.newByXY(x, y));
        if (piece) {
          if (empty) {
            ret += empty;
            empty = 0;
          }
          ret += piece.sfen;
        } else {
          empty += 1;
        }
      }
      if (empty) {
        ret += empty;
        empty = 0;
      }
      if (y !== 8) {
        ret += "/";
      }
    }
    return ret;
  }
  resetBySFEN(sfen) {
    if (!Board.isValidSFEN(sfen)) {
      return false;
    }
    this.clear();
    const rows = sfen.split("/");
    for (let y = 0; y < 9; y += 1) {
      let x = 0;
      for (let i = 0; i < rows[y].length; i += 1) {
        let c = rows[y][i];
        if (c === "+") {
          i += 1;
          c += rows[y][i];
        }
        const n = sfenCharToNumber(c);
        if (n) {
          x += n;
        } else {
          this.set(Square.newByXY(x, y), Piece.newBySFEN(c));
          x += 1;
        }
      }
    }
    return true;
  }
  findKing(color) {
    const king = new Piece(color, PieceType.KING);
    return Square.all.find((square) => {
      const piece = this.at(square);
      if (piece && king.equals(piece)) {
        return true;
      }
      return;
    });
  }
  hasPower(target, color, option) {
    return !!directions.find((dir) => {
      let step = 0;
      for (let square = target.neighbor(dir); square.valid; square = square.neighbor(dir)) {
        step += 1;
        if (option && option.filled && square.equals(option.filled)) {
          break;
        }
        if (option && option.ignore && square.equals(option.ignore)) {
          continue;
        }
        const piece = this.at(square);
        if (piece) {
          if (piece.color !== color) {
            return false;
          }
          const rdir = reverseDirection(dir);
          const type = resolveMoveType(piece, rdir);
          return type === MoveType.LONG || type === MoveType.SHORT && step === 1;
        }
      }
      return false;
    });
  }
  isChecked(kingColor, option) {
    const square = this.findKing(kingColor);
    if (!square) {
      return false;
    }
    return this.hasPower(square, reverseColor(kingColor), {
      filled: option && option.filled,
      ignore: option && option.ignore
    });
  }
  static isValidSFEN(sfen) {
    const rows = sfen.split("/");
    if (rows.length !== 9) {
      return false;
    }
    for (let y = 0; y < 9; y += 1) {
      let x = 0;
      for (let i = 0; i < rows[y].length; i += 1) {
        let c = rows[y][i];
        if (c === "+") {
          i += 1;
          c += rows[y][i];
        }
        const n = sfenCharToNumber(c);
        if (n) {
          x += n;
        } else if (Piece.isValidSFEN(c)) {
          x += 1;
        } else {
          return false;
        }
      }
      if (x !== 9) {
        return false;
      }
    }
    return true;
  }
  copyFrom(board) {
    Square.all.forEach((square) => {
      this.squares[square.index] = board.at(square);
    });
  }
}
function buildSFEN(n, piece) {
  if (n === 0) {
    return "";
  }
  return (n !== 1 ? n : "") + piece.sfen;
}
class Hand {
  pieces;
  constructor() {
    this.pieces = /* @__PURE__ */ new Map();
    this.pieces.set(PieceType.PAWN, 0);
    this.pieces.set(PieceType.LANCE, 0);
    this.pieces.set(PieceType.KNIGHT, 0);
    this.pieces.set(PieceType.SILVER, 0);
    this.pieces.set(PieceType.GOLD, 0);
    this.pieces.set(PieceType.BISHOP, 0);
    this.pieces.set(PieceType.ROOK, 0);
  }
  get counts() {
    return [
      { type: PieceType.ROOK, count: this.count(PieceType.ROOK) },
      { type: PieceType.BISHOP, count: this.count(PieceType.BISHOP) },
      { type: PieceType.GOLD, count: this.count(PieceType.GOLD) },
      { type: PieceType.SILVER, count: this.count(PieceType.SILVER) },
      { type: PieceType.KNIGHT, count: this.count(PieceType.KNIGHT) },
      { type: PieceType.LANCE, count: this.count(PieceType.LANCE) },
      { type: PieceType.PAWN, count: this.count(PieceType.PAWN) }
    ];
  }
  count(pieceType) {
    return this.pieces.get(pieceType);
  }
  set(pieceType, count) {
    this.pieces.set(pieceType, count);
  }
  add(pieceType, n) {
    let c = this.pieces.get(pieceType);
    c += n;
    this.pieces.set(pieceType, c);
    return c;
  }
  reduce(pieceType, n) {
    let c = this.pieces.get(pieceType);
    c -= n;
    this.pieces.set(pieceType, c);
    return c;
  }
  forEach(handler) {
    handler(PieceType.PAWN, this.pieces.get(PieceType.PAWN));
    handler(PieceType.LANCE, this.pieces.get(PieceType.LANCE));
    handler(PieceType.KNIGHT, this.pieces.get(PieceType.KNIGHT));
    handler(PieceType.SILVER, this.pieces.get(PieceType.SILVER));
    handler(PieceType.GOLD, this.pieces.get(PieceType.GOLD));
    handler(PieceType.BISHOP, this.pieces.get(PieceType.BISHOP));
    handler(PieceType.ROOK, this.pieces.get(PieceType.ROOK));
  }
  get sfenBlack() {
    return this.formatSFEN(Color.BLACK);
  }
  get sfenWhite() {
    return this.formatSFEN(Color.WHITE);
  }
  formatSFEN(color) {
    let ret = "";
    ret += buildSFEN(this.count(PieceType.ROOK), new Piece(color, PieceType.ROOK));
    ret += buildSFEN(this.count(PieceType.BISHOP), new Piece(color, PieceType.BISHOP));
    ret += buildSFEN(this.count(PieceType.GOLD), new Piece(color, PieceType.GOLD));
    ret += buildSFEN(this.count(PieceType.SILVER), new Piece(color, PieceType.SILVER));
    ret += buildSFEN(this.count(PieceType.KNIGHT), new Piece(color, PieceType.KNIGHT));
    ret += buildSFEN(this.count(PieceType.LANCE), new Piece(color, PieceType.LANCE));
    ret += buildSFEN(this.count(PieceType.PAWN), new Piece(color, PieceType.PAWN));
    if (ret === "") {
      return "-";
    }
    return ret;
  }
  static formatSFEN(black, white) {
    const b = black.sfenBlack;
    const w = white.sfenWhite;
    if (b === "-" && w === "-") {
      return "-";
    }
    if (w === "-") {
      return b;
    }
    if (b === "-") {
      return w;
    }
    return b + w;
  }
  static isValidSFEN(sfen) {
    if (sfen === "-") {
      return true;
    }
    return !!sfen.match(/^(?:[0-9]*[PLNSGBRplnsgbr])*$/);
  }
  static parseSFEN(sfen) {
    if (sfen === "-") {
      return { black: new Hand(), white: new Hand() };
    }
    if (!sfen.match(/^(?:[0-9]*[PLNSGBRplnsgbr])*$/)) {
      return null;
    }
    const sections = sfen.match(/([0-9]*[PLNSGBRplnsgbr])/g);
    const black = new Hand();
    const white = new Hand();
    for (let i = 0; i < sections.length; i += 1) {
      const section = sections[i];
      let n = 1;
      if (section.length >= 2) {
        n = Number(section.substring(0, section.length - 1));
      }
      const piece = Piece.newBySFEN(section[section.length - 1]);
      if (piece.color === Color.BLACK) {
        black.add(piece.type, n);
      } else {
        white.add(piece.type, n);
      }
    }
    return { black, white };
  }
  copyFrom(hand) {
    hand.pieces.forEach((n, pieceType) => {
      this.pieces.set(pieceType, n);
    });
  }
}
var InitialPositionSFEN = /* @__PURE__ */ ((InitialPositionSFEN2) => {
  InitialPositionSFEN2["STANDARD"] = "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1";
  InitialPositionSFEN2["EMPTY"] = "9/9/9/9/9/9/9/9/9 b - 1";
  InitialPositionSFEN2["HANDICAP_LANCE"] = "lnsgkgsn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_RIGHT_LANCE"] = "1nsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_BISHOP"] = "lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_ROOK"] = "lnsgkgsnl/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_ROOK_LANCE"] = "lnsgkgsn1/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_2PIECES"] = "lnsgkgsnl/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_4PIECES"] = "1nsgkgsn1/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_6PIECES"] = "2sgkgs2/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_8PIECES"] = "3gkg3/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["HANDICAP_10PIECES"] = "4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1";
  InitialPositionSFEN2["TSUME_SHOGI"] = "4k4/9/9/9/9/9/9/9/9 b 2r2b4g4s4n4l18p 1";
  InitialPositionSFEN2["TSUME_SHOGI_2KINGS"] = "4k4/9/9/9/9/9/9/9/4K4 b 2r2b4g4s4n4l18p 1";
  return InitialPositionSFEN2;
})(InitialPositionSFEN || {});
function initialPositionTypeToSFEN(type) {
  return {
    [
      "standard"
      /* STANDARD */
    ]: "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1",
    [
      "empty"
      /* EMPTY */
    ]: "9/9/9/9/9/9/9/9/9 b - 1",
    [
      "handicapLance"
      /* HANDICAP_LANCE */
    ]: "lnsgkgsn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicapRightLance"
      /* HANDICAP_RIGHT_LANCE */
    ]: "1nsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicapBishop"
      /* HANDICAP_BISHOP */
    ]: "lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicapRook"
      /* HANDICAP_ROOK */
    ]: "lnsgkgsnl/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicapRookLance"
      /* HANDICAP_ROOK_LANCE */
    ]: "lnsgkgsn1/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicap2Pieces"
      /* HANDICAP_2PIECES */
    ]: "lnsgkgsnl/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicap4Pieces"
      /* HANDICAP_4PIECES */
    ]: "1nsgkgsn1/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicap6Pieces"
      /* HANDICAP_6PIECES */
    ]: "2sgkgs2/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicap8Pieces"
      /* HANDICAP_8PIECES */
    ]: "3gkg3/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "handicap10Pieces"
      /* HANDICAP_10PIECES */
    ]: "4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
    [
      "tsumeShogi"
      /* TSUME_SHOGI */
    ]: "4k4/9/9/9/9/9/9/9/9 b 2r2b4g4s4n4l18p 1",
    [
      "tsumeShogi2Kings"
      /* TSUME_SHOGI_2KINGS */
    ]: "4k4/9/9/9/9/9/9/9/4K4 b 2r2b4g4s4n4l18p 1"
    /* TSUME_SHOGI_2KINGS */
  }[type];
}
const invalidRankMap = {
  black: {
    pawn: { 1: true },
    lance: { 1: true },
    knight: { 1: true, 2: true }
  },
  white: {
    pawn: { 9: true },
    lance: { 9: true },
    knight: { 9: true, 8: true }
  }
};
function isInvalidRank(color, type, rank) {
  const rule = invalidRankMap[color][type];
  return rule ? rule[rank] : false;
}
function isPromotableRank(color, rank) {
  if (color === Color.BLACK) {
    return rank <= 3;
  }
  return rank >= 7;
}
function pawnExists(color, board, file) {
  for (let rank = 1; rank <= 9; rank += 1) {
    const piece = board.at(new Square(file, rank));
    if (piece && piece.type === PieceType.PAWN && piece.color === color) {
      return true;
    }
  }
  return false;
}
class Position {
  _board = new Board();
  _color = Color.BLACK;
  _blackHand = new Hand();
  _whiteHand = new Hand();
  get board() {
    return this._board;
  }
  get color() {
    return this._color;
  }
  get blackHand() {
    return this._blackHand;
  }
  get whiteHand() {
    return this._whiteHand;
  }
  hand(color) {
    return this._hand(color);
  }
  _hand(color) {
    if (color === Color.BLACK) {
      return this._blackHand;
    }
    return this._whiteHand;
  }
  get checked() {
    return this._board.isChecked(this.color);
  }
  createMove(from, to) {
    let pieceType;
    if (from instanceof Square) {
      const piece = this._board.at(from);
      if (!piece) {
        return null;
      }
      pieceType = piece.type;
    } else {
      pieceType = from;
    }
    const capturedPiece = this._board.at(to);
    return new Move(
      from,
      to,
      false,
      this.color,
      pieceType,
      capturedPiece ? capturedPiece.type : null
    );
  }
  createMoveByUSI(usiMove) {
    const m = parseUSIMove(usiMove);
    if (!m) {
      return null;
    }
    let move = this.createMove(m.from, m.to);
    if (!move) {
      return null;
    }
    if (m.promote) {
      move = move.withPromote();
    }
    return move;
  }
  isPawnDropMate(move) {
    if (move.from instanceof Square) {
      return false;
    }
    if (move.pieceType !== PieceType.PAWN) {
      return false;
    }
    const kingSquare = move.to.neighbor(move.color === Color.BLACK ? Direction.UP : Direction.DOWN);
    const king = this.board.at(kingSquare);
    if (!king || king.type !== PieceType.KING || king.color === move.color) {
      return false;
    }
    const movable = movableDirections(king).find((dir) => {
      const to = kingSquare.neighbor(dir);
      if (!to.valid) {
        return false;
      }
      const piece = this.board.at(to);
      if (piece && piece.color == king.color) {
        return false;
      }
      return !this.board.hasPower(to, move.color, { filled: move.to });
    });
    if (movable) {
      return false;
    }
    return !this.board.listSquaresByColor(king.color).find((from) => {
      return !from.equals(kingSquare) && this.isMovable(from, move.to) && !this.board.isChecked(king.color, {
        filled: move.to,
        ignore: from
      });
    });
  }
  listAttackersByPiece(to, piece) {
    return this.board.listSquaresByPiece(piece).filter((from) => {
      return this.isMovable(from, to);
    });
  }
  isValidMove(move) {
    if (move.from instanceof Square) {
      const target = this._board.at(move.from);
      if (!target || target.color !== this.color) {
        return false;
      }
      if (!this.isMovable(move.from, move.to)) {
        return false;
      }
      const captured = this._board.at(move.to);
      if (captured && captured.color === this.color) {
        return false;
      }
      if (move.promote) {
        if (!target.isPromotable()) {
          return false;
        }
        if (!isPromotableRank(this.color, move.from.rank) && !isPromotableRank(this.color, move.to.rank)) {
          return false;
        }
      } else if (isInvalidRank(this.color, target.type, move.to.rank)) {
        return false;
      }
      if (move.pieceType !== PieceType.KING ? this._board.isChecked(this.color, {
        filled: move.to,
        ignore: move.from
      }) : this._board.hasPower(move.to, reverseColor(this.color), {
        ignore: move.from
      })) {
        return false;
      }
    } else {
      if (move.promote) {
        return false;
      }
      if (move.color !== this.color) {
        return false;
      }
      if (this.hand(this.color).count(move.from) === 0) {
        return false;
      }
      if (this._board.at(move.to)) {
        return false;
      }
      if (isInvalidRank(this.color, move.from, move.to.rank)) {
        return false;
      }
      if (move.from === PieceType.PAWN && pawnExists(this.color, this._board, move.to.file)) {
        return false;
      }
      if (this._board.isChecked(this.color, { filled: move.to })) {
        return false;
      }
      if (this.isPawnDropMate(move)) {
        return false;
      }
    }
    return true;
  }
  doMove(move, opt) {
    if (!(opt && opt.ignoreValidation) && !this.isValidMove(move)) {
      return false;
    }
    if (move.from instanceof Square) {
      const target = this._board.at(move.from);
      const captured = this._board.at(move.to);
      this._board.remove(move.from);
      this._board.set(move.to, move.promote ? target.promoted() : target);
      if (captured && captured.type !== PieceType.KING) {
        this._hand(this.color).add(captured.unpromoted().type, 1);
      }
    } else {
      this._hand(this.color).reduce(move.from, 1);
      this._board.set(move.to, new Piece(this.color, move.from));
    }
    this._color = reverseColor(this.color);
    return true;
  }
  undoMove(move) {
    this._color = reverseColor(this.color);
    if (move.from instanceof Square) {
      this._board.set(move.from, new Piece(this.color, move.pieceType));
      if (move.capturedPieceType) {
        const capturedPiece = new Piece(reverseColor(this.color), move.capturedPieceType);
        this._board.set(move.to, capturedPiece);
        if (capturedPiece.type !== PieceType.KING) {
          this._hand(this.color).reduce(capturedPiece.unpromoted().type, 1);
        }
      } else {
        this._board.remove(move.to);
      }
    } else {
      this._hand(this.color).add(move.from, 1);
      this._board.remove(move.to);
    }
  }
  isValidEditing(from, to) {
    if (from instanceof Square) {
      const piece = this._board.at(from);
      if (!piece) {
        return false;
      }
      if (to instanceof Square) {
        if (from.equals(to)) {
          return false;
        }
      } else if (piece.type === PieceType.KING) {
        return false;
      }
    } else {
      if (!from.color) {
        return false;
      }
      if (this.hand(from.color).count(from.type) === 0) {
        return false;
      }
      if (to instanceof Square) {
        if (this._board.at(to)) {
          return false;
        }
      } else if (from.color === to) {
        return false;
      }
    }
    return true;
  }
  edit(change) {
    if (change.move) {
      if (!this.isValidEditing(change.move.from, change.move.to)) {
        return false;
      }
      if (!(change.move.from instanceof Square)) {
        this._hand(change.move.from.color).reduce(change.move.from.type, 1);
        if (change.move.to instanceof Square) {
          this._board.set(change.move.to, change.move.from);
        } else {
          this._hand(change.move.to).add(change.move.from.type, 1);
        }
      } else if (!(change.move.to instanceof Square)) {
        const piece = this._board.remove(change.move.from);
        this._hand(change.move.to).add(piece.unpromoted().type, 1);
      } else {
        this._board.swap(change.move.from, change.move.to);
      }
    }
    if (change.rotate) {
      const piece = this._board.at(change.rotate);
      if (piece) {
        this._board.set(change.rotate, piece.rotate());
      }
    }
    return true;
  }
  // Deprecated: Use resetBySFEN() instead.
  reset(type) {
    this.resetBySFEN(initialPositionTypeToSFEN(type));
  }
  get sfen() {
    return this.getSFEN(1);
  }
  getSFEN(nextPly) {
    let ret = `${this._board.sfen} ${colorToSFEN(this.color)} `;
    ret += Hand.formatSFEN(this._blackHand, this._whiteHand);
    ret += " " + Math.max(nextPly, 1);
    return ret;
  }
  resetBySFEN(sfen) {
    if (!Position.isValidSFEN(sfen)) {
      return false;
    }
    const sections = sfen.split(" ");
    if (sections[0] === "sfen") {
      sections.shift();
    }
    this._board.resetBySFEN(sections[0]);
    this._color = parseSFENColor(sections[1]);
    const hands = Hand.parseSFEN(sections[2]);
    this._blackHand = hands.black;
    this._whiteHand = hands.white;
    return true;
  }
  setColor(color) {
    this._color = color;
  }
  static isValidSFEN(sfen) {
    const sections = sfen.split(" ");
    if (sections.length === 5 && sections[0] === "sfen") {
      sections.shift();
    }
    if (sections.length !== 4) {
      return false;
    }
    if (!Board.isValidSFEN(sections[0])) {
      return false;
    }
    if (!isValidSFENColor(sections[1])) {
      return false;
    }
    if (!Hand.isValidSFEN(sections[2])) {
      return false;
    }
    if (!sections[3].match(/[0-9]+/)) {
      return false;
    }
    return true;
  }
  static newBySFEN(sfen) {
    const position = new Position();
    return position.resetBySFEN(sfen) ? position : null;
  }
  isMovable(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const { direction, distance, ok } = vectorToDirectionAndDistance(dx, dy);
    if (!ok) {
      return false;
    }
    const piece = this._board.at(from);
    if (!piece) {
      return false;
    }
    switch (resolveMoveType(piece, direction)) {
      default:
        return false;
      case MoveType.SHORT:
        return distance === 1;
      case MoveType.LONG: {
        const d = directionToDeltaMap[direction];
        for (let square = from.neighbor(d.x, d.y); square.valid; square = square.neighbor(d.x, d.y)) {
          if (square.equals(to)) {
            return true;
          }
          if (this._board.at(square)) {
            return false;
          }
        }
        return false;
      }
    }
  }
  copyFrom(position) {
    this._board.copyFrom(position._board);
    this._color = position.color;
    this._blackHand.copyFrom(position._blackHand);
    this._whiteHand.copyFrom(position._whiteHand);
  }
  clone() {
    const position = new Position();
    position.copyFrom(this);
    return position;
  }
}
function countExistingPieces(position) {
  const result = {
    pawn: 0,
    lance: 0,
    knight: 0,
    silver: 0,
    gold: 0,
    bishop: 0,
    rook: 0,
    king: 0,
    promPawn: 0,
    promLance: 0,
    promKnight: 0,
    promSilver: 0,
    horse: 0,
    dragon: 0
  };
  Square.all.forEach((square) => {
    const piece = position.board.at(square);
    if (piece) {
      result[piece.type] += 1;
    }
  });
  position.blackHand.forEach((pieceType, n) => {
    result[pieceType] += n;
  });
  position.whiteHand.forEach((pieceType, n) => {
    result[pieceType] += n;
  });
  return result;
}
function countNotExistingPieces(position) {
  const existed = countExistingPieces(position);
  return {
    pawn: 18 - existed.pawn - existed.promPawn,
    lance: 4 - existed.lance - existed.promLance,
    knight: 4 - existed.knight - existed.promKnight,
    silver: 4 - existed.silver - existed.promSilver,
    gold: 4 - existed.gold,
    bishop: 2 - existed.bishop - existed.horse,
    rook: 2 - existed.rook - existed.dragon,
    king: 2 - existed.king,
    promPawn: 0,
    promLance: 0,
    promKnight: 0,
    promSilver: 0,
    horse: 0,
    dragon: 0
  };
}
const stringToNumberMap = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "１": 1,
  "２": 2,
  "３": 3,
  "４": 4,
  "５": 5,
  "６": 6,
  "７": 7,
  "８": 8,
  "９": 9,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
  十一: 11,
  十二: 12,
  十三: 13,
  十四: 14,
  十五: 15,
  十六: 16,
  十七: 17,
  十八: 18
};
const stringToPieceTypeMap = {
  王: PieceType.KING,
  玉: PieceType.KING,
  飛: PieceType.ROOK,
  龍: PieceType.DRAGON,
  竜: PieceType.DRAGON,
  角: PieceType.BISHOP,
  馬: PieceType.HORSE,
  金: PieceType.GOLD,
  銀: PieceType.SILVER,
  成銀: PieceType.PROM_SILVER,
  全: PieceType.PROM_SILVER,
  桂: PieceType.KNIGHT,
  成桂: PieceType.PROM_KNIGHT,
  圭: PieceType.PROM_KNIGHT,
  香: PieceType.LANCE,
  成香: PieceType.PROM_LANCE,
  杏: PieceType.PROM_LANCE,
  歩: PieceType.PAWN,
  と: PieceType.PROM_PAWN
};
function stringToNumber(s) {
  return stringToNumberMap[s];
}
function stringToPieceType(piece) {
  return stringToPieceTypeMap[piece];
}
const kanjiNumberStrings = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
  "十一",
  "十二",
  "十三",
  "十四",
  "十五",
  "十六",
  "十七",
  "十八"
];
const fileStrings = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];
function numberToKanji(n) {
  return kanjiNumberStrings[n - 1];
}
function fileToMultiByteChar(file) {
  return fileStrings[file - 1];
}
function rankToKanji(rank) {
  return kanjiNumberStrings[rank - 1];
}
const pieceTypeToStringForMoveMap = {
  king: "玉",
  rook: "飛",
  dragon: "龍",
  bishop: "角",
  horse: "馬",
  gold: "金",
  silver: "銀",
  promSilver: "成銀",
  knight: "桂",
  promKnight: "成桂",
  lance: "香",
  promLance: "成香",
  pawn: "歩",
  promPawn: "と"
};
function pieceTypeToStringForMove(pieceType) {
  return pieceTypeToStringForMoveMap[pieceType];
}
const pieceTypeToStringForBoardMap = {
  king: "玉",
  rook: "飛",
  dragon: "龍",
  bishop: "角",
  horse: "馬",
  gold: "金",
  silver: "銀",
  promSilver: "全",
  knight: "桂",
  promKnight: "圭",
  lance: "香",
  promLance: "杏",
  pawn: "歩",
  promPawn: "と"
};
function pieceTypeToStringForBoard(pieceType) {
  return pieceTypeToStringForBoardMap[pieceType];
}
const specialMoveToDisplayStringMap = {
  [SpecialMoveType.START]: "開始局面",
  [SpecialMoveType.RESIGN]: "投了",
  [SpecialMoveType.INTERRUPT]: "中断",
  [SpecialMoveType.IMPASS]: "持将棋",
  [SpecialMoveType.DRAW]: "引き分け",
  [SpecialMoveType.REPETITION_DRAW]: "千日手",
  [SpecialMoveType.MATE]: "詰み",
  [SpecialMoveType.NO_MATE]: "不詰",
  [SpecialMoveType.TIMEOUT]: "切れ負け",
  [SpecialMoveType.FOUL_WIN]: "反則勝ち",
  [SpecialMoveType.FOUL_LOSE]: "反則負け",
  [SpecialMoveType.ENTERING_OF_KING]: "入玉",
  [SpecialMoveType.WIN_BY_DEFAULT]: "不戦勝",
  [SpecialMoveType.LOSE_BY_DEFAULT]: "不戦敗"
};
function formatSpecialMove$1(move) {
  if (typeof move === "string") {
    return specialMoveToDisplayStringMap[move];
  }
  if (isKnownSpecialMove(move)) {
    return specialMoveToDisplayStringMap[move.type];
  }
  return move.name;
}
function getDirectionModifier(move, position) {
  const piece = new Piece(move.color, move.pieceType);
  const others = position.listAttackersByPiece(move.to, piece).filter((square) => {
    return !(move.from instanceof Square) || !square.equals(move.from);
  });
  if (move.from instanceof Square) {
    let ret = "";
    let myDir = move.from.directionTo(move.to);
    myDir = move.color === Color.BLACK ? myDir : reverseDirection(myDir);
    const myVDir = directionToVDirection(myDir);
    const myHDir = directionToHDirection(myDir);
    const otherDirs = others.map((square) => {
      const dir = square.directionTo(move.to);
      return move.color === Color.BLACK ? dir : reverseDirection(dir);
    });
    const vDirections = otherDirs.filter((dir) => directionToHDirection(dir) == myHDir).map((dir) => directionToVDirection(dir));
    const hDirections = otherDirs.filter((dir) => directionToVDirection(dir) == myVDir).map((dir) => directionToHDirection(dir));
    let noVertical = false;
    if (hDirections.length) {
      if (move.pieceType === PieceType.HORSE || move.pieceType === PieceType.DRAGON) {
        if (myHDir === HDirection.LEFT || myHDir === HDirection.NONE && hDirections[0] === HDirection.RIGHT) {
          ret += "右";
        } else if (myHDir === HDirection.RIGHT || myHDir === HDirection.NONE && hDirections[0] === HDirection.LEFT) {
          ret += "左";
        }
      } else {
        switch (myHDir) {
          case HDirection.LEFT:
            ret += "右";
            break;
          case HDirection.NONE:
            ret += "直";
            noVertical = true;
            break;
          case HDirection.RIGHT:
            ret += "左";
            break;
        }
      }
    }
    if (!noVertical && (vDirections.length || !hDirections.length && others.length)) {
      switch (myVDir) {
        case VDirection.DOWN:
          ret += "引";
          break;
        case VDirection.NONE:
          ret += "寄";
          break;
        case VDirection.UP:
          ret += "上";
          break;
      }
    }
    return ret;
  } else if (others.length) {
    return "打";
  }
  return "";
}
function formatMove$2(position, move, opt) {
  let ret = "";
  switch (move.color) {
    case Color.BLACK:
      ret += opt?.compatible ? "▲" : "☗";
      break;
    case Color.WHITE:
      ret += opt?.compatible ? "△" : "☖";
      break;
  }
  if (opt?.lastMove && opt.lastMove.to.equals(move.to)) {
    ret += "同　";
  } else {
    ret += fileToMultiByteChar(move.to.file);
    ret += rankToKanji(move.to.rank);
  }
  ret += pieceTypeToStringForMove(move.pieceType);
  ret += getDirectionModifier(move, position);
  if (move.from instanceof Square) {
    if (move.promote) {
      ret += "成";
    } else if (move.from instanceof Square && isPromotable(move.pieceType) && (isPromotableRank(move.color, move.from.rank) || isPromotableRank(move.color, move.to.rank))) {
      ret += "不成";
    }
  }
  return ret;
}
const moveRegExp$1 = /^[▲△▼▽☗☖]?([１２３４５６７８９一二三四五六七八九1-9]{2}|同)(王|玉|飛|龍|竜|角|馬|金|銀|成銀|全|桂|成桂|圭|香|成香|杏|歩|と)(左|直|右|)(引|寄|上|)(成|不成|打|)(\([1-9][1-9]\)|)/;
function parseMoves(position, text, lastMove) {
  const clean = text.replaceAll(/[\s\u3000]/g, "");
  const sections = [];
  let lastIndex = 0;
  for (let i = 1; i <= clean.length; i++) {
    const char = clean[i];
    if (!char || char === "▲" || char === "△" || char === "▼" || char === "▽" || char === "☗" || char === "☖") {
      sections.push(clean.substring(lastIndex, i));
      lastIndex = i;
    }
  }
  const p = position.clone();
  const pv = [];
  for (const section of sections) {
    const result = moveRegExp$1.exec(section);
    if (!result) {
      return [pv, new InvalidMoveError(section)];
    }
    const toStr = result[1];
    const pieceType = stringToPieceType(result[2]);
    const horStr = result[3];
    const verStr = result[4];
    const promOrDropStr = result[5];
    const fromStr = result[6];
    let to;
    if (toStr.startsWith("同")) {
      if (pv.length > 0) {
        to = pv[pv.length - 1].to;
      } else if (lastMove) {
        to = lastMove.to;
      } else {
        return [pv, new InvalidMoveError(section)];
      }
    } else {
      const file = stringToNumber(toStr[0]);
      const rank = stringToNumber(toStr[1]);
      to = new Square(file, rank);
    }
    let from;
    if (promOrDropStr === "打") {
      from = pieceType;
    } else if (fromStr) {
      const file = stringToNumber(fromStr[1]);
      const rank = stringToNumber(fromStr[2]);
      from = new Square(file, rank);
    } else {
      let squares = p.listAttackersByPiece(to, new Piece(p.color, pieceType)).filter((square) => {
        let dir = square.directionTo(to);
        dir = p.color === Color.BLACK ? dir : reverseDirection(dir);
        const vDir = directionToVDirection(dir);
        const hDir = directionToHDirection(dir);
        if (verStr.indexOf("引") >= 0 && vDir !== VDirection.DOWN) {
          return false;
        }
        if (verStr.indexOf("寄") >= 0 && vDir !== VDirection.NONE) {
          return false;
        }
        if ((verStr.indexOf("上") >= 0 || verStr.indexOf("行") >= 0) && vDir !== VDirection.UP) {
          return false;
        }
        if (horStr.indexOf("直") >= 0 && (hDir !== HDirection.NONE || vDir !== VDirection.UP)) {
          return false;
        }
        if (pieceType === PieceType.HORSE || pieceType === PieceType.DRAGON) {
          if (horStr.indexOf("左") >= 0 && hDir === HDirection.LEFT) {
            return false;
          }
          if (horStr.indexOf("右") >= 0 && hDir === HDirection.RIGHT) {
            return false;
          }
        } else {
          if (horStr.indexOf("左") >= 0 && hDir !== HDirection.RIGHT) {
            return false;
          }
          if (horStr.indexOf("右") >= 0 && hDir !== HDirection.LEFT) {
            return false;
          }
        }
        return true;
      });
      if (squares.length === 2 && (pieceType === PieceType.HORSE || pieceType === PieceType.DRAGON)) {
        squares = squares.filter((square) => {
          let dir = square.directionTo(to);
          dir = p.color === Color.BLACK ? dir : reverseDirection(dir);
          const hDir = directionToHDirection(dir);
          return hDir !== HDirection.NONE;
        });
      }
      if (squares.length === 1) {
        from = squares[0];
      } else if (squares.length === 0 && p.hand(p.color).count(pieceType) !== 0) {
        from = pieceType;
      } else {
        return [pv, new InvalidMoveError(section)];
      }
    }
    let move = p.createMove(from, to);
    if (!move) {
      return [pv, new InvalidMoveError(section)];
    }
    if (promOrDropStr === "成") {
      move = move.withPromote();
    }
    if (!p.doMove(move, { ignoreValidation: true })) {
      return [pv, new InvalidMoveError(section)];
    }
    pv.push(move);
  }
  return [pv, void 0];
}
function millisecondsToHHMMSS(ms) {
  return secondsToHHMMSS(Math.floor(ms / 1e3));
}
function millisecondsToMSS(ms) {
  return secondsToMSS(Math.floor(ms / 1e3));
}
function secondsToHHMMSS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = seconds % 60;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}
function secondsToMSS(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return String(m).padStart(2, " ") + ":" + String(s).padStart(2, "0");
}
var RecordMetadataKey = /* @__PURE__ */ ((RecordMetadataKey2) => {
  RecordMetadataKey2["TITLE"] = "title";
  RecordMetadataKey2["BLACK_NAME"] = "blackName";
  RecordMetadataKey2["WHITE_NAME"] = "whiteName";
  RecordMetadataKey2["SHITATE_NAME"] = "shitateName";
  RecordMetadataKey2["UWATE_NAME"] = "uwateName";
  RecordMetadataKey2["START_DATETIME"] = "startDatetime";
  RecordMetadataKey2["END_DATETIME"] = "endDatetime";
  RecordMetadataKey2["DATE"] = "date";
  RecordMetadataKey2["TOURNAMENT"] = "tournament";
  RecordMetadataKey2["STRATEGY"] = "strategy";
  RecordMetadataKey2["TIME_LIMIT"] = "timeLimit";
  RecordMetadataKey2["BYOYOMI"] = "byoyomi";
  RecordMetadataKey2["TIME_SPENT"] = "timeSpent";
  RecordMetadataKey2["PLACE"] = "place";
  RecordMetadataKey2["POSTED_ON"] = "postedOn";
  RecordMetadataKey2["NOTE"] = "note";
  RecordMetadataKey2["BLACK_SHORT_NAME"] = "blackShortName";
  RecordMetadataKey2["WHITE_SHORT_NAME"] = "whiteShortName";
  RecordMetadataKey2["OPUS_NO"] = "opusNo";
  RecordMetadataKey2["OPUS_NAME"] = "opusName";
  RecordMetadataKey2["AUTHOR"] = "author";
  RecordMetadataKey2["PUBLISHED_BY"] = "publishedBy";
  RecordMetadataKey2["PUBLISHED_AT"] = "publishedAt";
  RecordMetadataKey2["SOURCE"] = "source";
  RecordMetadataKey2["LENGTH"] = "length";
  RecordMetadataKey2["INTEGRITY"] = "integrity";
  RecordMetadataKey2["CATEGORY"] = "category";
  RecordMetadataKey2["AWARD"] = "award";
  return RecordMetadataKey2;
})(RecordMetadataKey || {});
class RecordMetadata {
  standard = /* @__PURE__ */ new Map();
  custom = /* @__PURE__ */ new Map();
  get standardMetadataKeys() {
    return this.standard.keys();
  }
  getStandardMetadata(key) {
    return this.standard.get(key);
  }
  setStandardMetadata(key, value) {
    if (value) {
      this.standard.set(key, value);
    } else {
      this.standard.delete(key);
    }
  }
  get customMetadataKeys() {
    return this.custom.keys();
  }
  getCustomMetadata(key) {
    return this.custom.get(key);
  }
  setCustomMetadata(key, value) {
    if (value) {
      this.custom.set(key, value);
    } else {
      this.custom.delete(key);
    }
  }
}
class NodeImpl {
  constructor(ply, prev, branchIndex, activeBranch, nextColor, move, isCheck, displayText) {
    this.ply = ply;
    this.prev = prev;
    this.branchIndex = branchIndex;
    this.activeBranch = activeBranch;
    this.nextColor = nextColor;
    this.move = move;
    this.isCheck = isCheck;
    this.displayText = displayText;
  }
  next = null;
  branch = null;
  comment = "";
  customData;
  elapsedMs = 0;
  totalElapsedMs = 0;
  bookmark = "";
  get timeText() {
    const elapsed = millisecondsToMSS(this.elapsedMs);
    const totalElapsed = millisecondsToHHMMSS(this.totalElapsedMs);
    return `${elapsed} / ${totalElapsed}`;
  }
  get hasBranch() {
    return !!this.prev && !!this.prev.next && !!this.prev.next.branch;
  }
  get isFirstBranch() {
    return !this.prev || this.prev.next === this;
  }
  get isLastMove() {
    if (!this.next) {
      return true;
    }
    for (let p = this.next; p; p = p.branch) {
      if (p.move instanceof Move) {
        return false;
      }
    }
    return true;
  }
  updateTotalElapsedMs() {
    this.totalElapsedMs = this.elapsedMs;
    if (this.prev && this.prev.prev) {
      this.totalElapsedMs += this.prev.prev.totalElapsedMs;
    }
  }
  setElapsedMs(elapsedMs) {
    this.elapsedMs = elapsedMs;
    this.updateTotalElapsedMs();
    let p = this.next;
    const stack = [];
    while (p) {
      p.updateTotalElapsedMs();
      if (p.branch) {
        stack.push(p.branch);
      }
      if (p.next) {
        p = p.next;
      } else {
        p = stack.pop() || null;
      }
    }
  }
  static newRootEntry(color) {
    return new NodeImpl(
      0,
      // ply
      null,
      // prev
      0,
      // branchIndex
      true,
      // activeBranch
      color,
      // color
      specialMove(SpecialMoveType.START),
      // move
      false,
      // isCheck
      "開始局面"
      // displayText
    );
  }
}
class Record {
  metadata;
  _initialPosition;
  _position;
  _first;
  _current;
  repetitionCounts = {};
  repetitionStart = {};
  onChangePosition = () => {
  };
  constructor(position) {
    this.metadata = new RecordMetadata();
    this._initialPosition = position ? position.clone() : new Position();
    this._position = this.initialPosition.clone();
    this._first = NodeImpl.newRootEntry(this._initialPosition.color);
    this._current = this._first;
    this.incrementRepetition();
  }
  get initialPosition() {
    return this._initialPosition;
  }
  get position() {
    return this._position;
  }
  get first() {
    return this._first;
  }
  get current() {
    return this._current;
  }
  get moves() {
    const moves = this.movesBefore;
    for (let p = this._current.next; p; p = p.next) {
      while (!p.activeBranch) {
        p = p.branch;
      }
      moves.push(p);
    }
    return moves;
  }
  get movesBefore() {
    return this._movesBefore;
  }
  get _movesBefore() {
    const moves = new Array();
    moves.unshift(this._current);
    for (let p = this._current.prev; p; p = p.prev) {
      moves.unshift(p);
    }
    return moves;
  }
  get length() {
    let len = this._current.ply;
    for (let p = this._current.next; p; p = p.next) {
      while (!p.activeBranch) {
        p = p.branch;
      }
      len = p.ply;
    }
    return len;
  }
  get branchBegin() {
    return this._current.prev ? this._current.prev.next : this._current;
  }
  clear(position) {
    this.metadata = new RecordMetadata();
    if (position) {
      this._initialPosition = position.clone();
    }
    this._position = this.initialPosition.clone();
    this._first = NodeImpl.newRootEntry(this._initialPosition.color);
    this._current = this._first;
    this.repetitionCounts = {};
    this.repetitionStart = {};
    this.incrementRepetition();
    this.onChangePosition();
  }
  goBack() {
    if (this._goBack()) {
      this.onChangePosition();
      return true;
    }
    return false;
  }
  _goBack() {
    if (this._current.prev) {
      if (this._current.move instanceof Move) {
        this.decrementRepetition();
        this._position.undoMove(this._current.move);
      }
      this._current = this._current.prev;
      return true;
    }
    return false;
  }
  goForward() {
    if (this._goForward()) {
      this.onChangePosition();
      return true;
    }
    return false;
  }
  _goForward() {
    if (this._current.next) {
      this._current = this._current.next;
      while (!this._current.activeBranch) {
        this._current = this._current.branch;
      }
      if (this._current.move instanceof Move) {
        this._position.doMove(this._current.move, {
          ignoreValidation: true
        });
        this.incrementRepetition();
      }
      return true;
    }
    return false;
  }
  goto(ply) {
    const orgPly = this._current.ply;
    while (ply < this._current.ply) {
      if (!this._goBack()) {
        break;
      }
    }
    while (ply > this._current.ply) {
      if (!this._goForward()) {
        break;
      }
    }
    if (orgPly !== this._current.ply) {
      this.onChangePosition();
    }
  }
  resetAllBranchSelection() {
    this._forEach((node) => {
      node.activeBranch = node.isFirstBranch;
    });
  }
  switchBranchByIndex(index) {
    if (this.current.branchIndex === index) {
      return true;
    }
    if (!this._current.prev) {
      return false;
    }
    let ok = false;
    for (let p = this._current.prev.next; p; p = p.branch) {
      if (p.branchIndex === index) {
        p.activeBranch = true;
        if (this._current.move instanceof Move) {
          this.decrementRepetition();
          this._position.undoMove(this._current.move);
        }
        this._current = p;
        if (this._current.move instanceof Move) {
          this._position.doMove(this._current.move, {
            ignoreValidation: true
          });
          this.incrementRepetition();
        }
        ok = true;
      } else {
        p.activeBranch = false;
      }
    }
    if (ok) {
      this.onChangePosition();
    }
    return ok;
  }
  append(move, opt) {
    if (typeof move === "string") {
      move = specialMove(move);
    }
    const lastMove = this.current.move instanceof Move ? this.current.move : void 0;
    const displayText = move instanceof Move ? formatMove$2(this.position, move, { lastMove }) : formatSpecialMove$1(move);
    let isCheck = false;
    if (move instanceof Move) {
      if (!this._position.doMove(move, opt)) {
        return false;
      }
      this.incrementRepetition();
      isCheck = this.position.checked;
    }
    if (this._current !== this.first && !(this._current.move instanceof Move)) {
      this.goBack();
    }
    if (!this._current.next) {
      this._current.next = new NodeImpl(
        this._current.ply + 1,
        // number
        this._current,
        // prev
        0,
        // branchIndex
        true,
        // activeBranch
        this.position.color,
        // nextColor
        move,
        isCheck,
        displayText
      );
      this._current = this._current.next;
      this._current.setElapsedMs(0);
      this.onChangePosition();
      return true;
    }
    let p;
    for (p = this._current.next; p; p = p.branch) {
      p.activeBranch = false;
    }
    let lastBranch = this._current.next;
    for (p = this._current.next; p; p = p.branch) {
      if (p.move instanceof Move && move instanceof Move && move.equals(p.move) || move === p.move) {
        this._current = p;
        this._current.activeBranch = true;
        this.onChangePosition();
        return true;
      }
      lastBranch = p;
    }
    this._current = new NodeImpl(
      this._current.ply + 1,
      // number
      this._current,
      // prev
      lastBranch.branchIndex + 1,
      // branchIndex
      true,
      // activeBranch
      this.position.color,
      // nextColor
      move,
      isCheck,
      displayText
    );
    this._current.setElapsedMs(0);
    lastBranch.branch = this._current;
    this.onChangePosition();
    return true;
  }
  swapWithNextBranch() {
    if (!this._current.branch) {
      return false;
    }
    return Record.swapWithPreviousBranch(this._current.branch);
  }
  swapWithPreviousBranch() {
    return Record.swapWithPreviousBranch(this._current);
  }
  static swapWithPreviousBranch(target) {
    const prev = target.prev;
    if (!prev || !prev.next || prev.next == target) {
      return false;
    }
    if (prev.next.branch === target) {
      const pair = prev.next;
      pair.branch = target.branch;
      target.branch = pair;
      prev.next = target;
      [target.branchIndex, pair.branchIndex] = [pair.branchIndex, target.branchIndex];
      return true;
    }
    for (let p = prev.next; p.branch; p = p.branch) {
      if (p.branch.branch === target) {
        const pair = p.branch;
        pair.branch = target.branch;
        target.branch = pair;
        p.branch = target;
        [target.branchIndex, pair.branchIndex] = [pair.branchIndex, target.branchIndex];
        return true;
      }
    }
    return false;
  }
  removeCurrentMove() {
    const target = this._current;
    if (!this.goBack()) {
      if (!this._current.next) {
        return false;
      }
      this._current.next = null;
      return true;
    }
    if (this._current.next === target) {
      this._current.next = target.branch;
    } else {
      for (let p = this._current.next; p; p = p.branch) {
        if (p.branch === target) {
          p.branch = target.branch;
          break;
        }
      }
    }
    let branchIndex = 0;
    for (let p = this._current.next; p; p = p.branch) {
      p.branchIndex = branchIndex;
      branchIndex += 1;
    }
    if (this._current.next) {
      this._current.next.activeBranch = true;
    }
    this.onChangePosition();
    return true;
  }
  removeNextMove() {
    if (this._current.next) {
      this._current.next = null;
      return true;
    }
    return false;
  }
  jumpToBookmark(bookmark) {
    if (this._current.bookmark === bookmark) {
      return true;
    }
    const node = this.find((node2) => node2.bookmark === bookmark);
    if (!node) {
      return false;
    }
    const route = [];
    for (let p = node; p; p = p.prev) {
      route[p.ply] = p;
    }
    while (this._current !== route[this._current.ply]) {
      this.goBack();
    }
    while (route.length > this._current.ply + 1) {
      this.append(route[this._current.ply + 1].move);
    }
    this.onChangePosition();
    return true;
  }
  incrementRepetition() {
    const sfen = this.position.sfen;
    if (this.repetitionCounts[sfen]) {
      this.repetitionCounts[sfen] += 1;
    } else {
      this.repetitionCounts[sfen] = 1;
      this.repetitionStart[sfen] = this.current.ply;
    }
  }
  decrementRepetition() {
    const sfen = this.position.sfen;
    this.repetitionCounts[sfen] -= 1;
    if (this.repetitionCounts[sfen] === 0) {
      delete this.repetitionCounts[sfen];
      delete this.repetitionStart[sfen];
    }
  }
  get repetition() {
    return this.repetitionCounts[this.position.sfen] >= 4;
  }
  get perpetualCheck() {
    if (!this.repetition) {
      return null;
    }
    const sfen = this.position.sfen;
    const since = this.repetitionStart[sfen];
    let black = true;
    let white = true;
    let color = this.position.color;
    for (let p = this.current; p.ply >= since; p = p.prev) {
      color = reverseColor(color);
      if (p.isCheck) {
        continue;
      }
      if (color === Color.BLACK) {
        black = false;
      } else {
        white = false;
      }
    }
    return black ? Color.BLACK : white ? Color.WHITE : null;
  }
  /**
   * getUSI をオプション無しで呼び出した場合と同じ値を返します。
   */
  get usi() {
    return this.getUSI();
  }
  getUSI(opts) {
    const sfen = this.initialPosition.sfen;
    const useStartpos = (opts?.startpos === void 0 || opts.startpos) && sfen === InitialPositionSFEN.STANDARD;
    let ret = "position " + (useStartpos ? "startpos" : "sfen " + this.initialPosition.sfen) + " moves";
    for (let p = this.first; ; p = p.next) {
      while (!p.activeBranch) {
        p = p.branch;
      }
      if (p.move instanceof Move) {
        ret += " " + p.move.usi;
      } else if (opts?.resign && p.move.type === SpecialMoveType.RESIGN) {
        ret += " resign";
      }
      if (!p.next || !opts?.allMoves && p === this.current) {
        break;
      }
    }
    return ret;
  }
  get sfen() {
    return this.position.getSFEN(this._current.ply + 1);
  }
  get bookmarks() {
    const bookmarks = [];
    const existed = {};
    this.forEach((node) => {
      if (node.bookmark && !existed[node.bookmark]) {
        bookmarks.push(node.bookmark);
        existed[node.bookmark] = true;
      }
    });
    return bookmarks;
  }
  // 深さ優先で全てのノードを訪問します。
  forEach(handler) {
    this._forEach(handler);
  }
  _forEach(handler) {
    this.find((node, base) => {
      handler(node, base);
      return false;
    });
  }
  find(handler) {
    let p = this._first;
    const pos = this.initialPosition.clone();
    const stack = [];
    while (true) {
      if (handler(p, pos)) {
        return p;
      }
      if (p.next) {
        stack.push(p);
        if (p.move instanceof Move) {
          pos.doMove(p.move);
        }
        p = p.next;
        continue;
      }
      while (!p.branch) {
        const last = stack.pop();
        if (!last) {
          return null;
        }
        if (last.move instanceof Move) {
          pos.undoMove(last.move);
        }
        p = last;
      }
      p = p.branch;
    }
  }
  on(event, handler) {
    switch (event) {
      case "changePosition":
        this.onChangePosition = handler;
        break;
    }
  }
  static newByUSI(data) {
    const prefixPositionStartpos = "position startpos ";
    const prefixPositionSfen = "position sfen ";
    const prefixStartpos = "startpos ";
    const prefixSfen = "sfen ";
    const prefixMoves = "moves ";
    if (data.startsWith(prefixPositionStartpos)) {
      return Record.newByUSIFromMoves(new Position(), data.slice(prefixPositionStartpos.length));
    } else if (data.startsWith(prefixPositionSfen)) {
      return Record.newByUSIFromSFEN(data.slice(prefixPositionSfen.length));
    } else if (data.startsWith(prefixStartpos)) {
      return Record.newByUSIFromMoves(new Position(), data.slice(prefixStartpos.length));
    } else if (data.startsWith(prefixSfen)) {
      return Record.newByUSIFromSFEN(data.slice(prefixSfen.length));
    } else if (data.startsWith(prefixMoves)) {
      return Record.newByUSIFromMoves(new Position(), data);
    } else {
      return new InvalidUSIError(data);
    }
  }
  static newByUSIFromSFEN(data) {
    const sections = data.split(" ");
    if (sections.length < 4) {
      return new InvalidUSIError(data);
    }
    const position = Position.newBySFEN(sections.slice(0, 4).join(" "));
    if (!position) {
      return new InvalidUSIError(data);
    }
    return Record.newByUSIFromMoves(position, sections.slice(4).join(" "));
  }
  static newByUSIFromMoves(position, data) {
    const record = new Record(position);
    if (data.length === 0) {
      return record;
    }
    const sections = data.split(" ");
    if (sections[0] !== "moves") {
      return new InvalidUSIError(data);
    }
    for (let i = 1; i < sections.length; i++) {
      const parsed = parseUSIMove(sections[i]);
      if (!parsed) {
        break;
      }
      let move = record.position.createMove(parsed.from, parsed.to);
      if (!move) {
        return new InvalidMoveError(sections[i]);
      }
      if (parsed.promote) {
        move = move.withPromote();
      }
      record.append(move, { ignoreValidation: true });
    }
    return record;
  }
}
const metadataKeyMap = {
  先手: RecordMetadataKey.BLACK_NAME,
  後手: RecordMetadataKey.WHITE_NAME,
  下手: RecordMetadataKey.SHITATE_NAME,
  上手: RecordMetadataKey.UWATE_NAME,
  開始日時: RecordMetadataKey.START_DATETIME,
  終了日時: RecordMetadataKey.END_DATETIME,
  対局日: RecordMetadataKey.DATE,
  棋戦: RecordMetadataKey.TOURNAMENT,
  戦型: RecordMetadataKey.STRATEGY,
  表題: RecordMetadataKey.TITLE,
  持ち時間: RecordMetadataKey.TIME_LIMIT,
  秒読み: RecordMetadataKey.BYOYOMI,
  消費時間: RecordMetadataKey.TIME_SPENT,
  場所: RecordMetadataKey.PLACE,
  掲載: RecordMetadataKey.POSTED_ON,
  備考: RecordMetadataKey.NOTE,
  先手省略名: RecordMetadataKey.BLACK_SHORT_NAME,
  後手省略名: RecordMetadataKey.WHITE_SHORT_NAME,
  作品番号: RecordMetadataKey.OPUS_NO,
  作品名: RecordMetadataKey.OPUS_NAME,
  作者: RecordMetadataKey.AUTHOR,
  発表誌: RecordMetadataKey.PUBLISHED_BY,
  発表年月: RecordMetadataKey.PUBLISHED_AT,
  出典: RecordMetadataKey.SOURCE,
  手数: RecordMetadataKey.LENGTH,
  完全性: RecordMetadataKey.INTEGRITY,
  分類: RecordMetadataKey.CATEGORY,
  受賞: RecordMetadataKey.AWARD
};
function kakinokiToMetadataKey(key) {
  return metadataKeyMap[key];
}
const metadataNameMap = {
  [RecordMetadataKey.BLACK_NAME]: "先手",
  [RecordMetadataKey.WHITE_NAME]: "後手",
  [RecordMetadataKey.SHITATE_NAME]: "下手",
  [RecordMetadataKey.UWATE_NAME]: "上手",
  [RecordMetadataKey.START_DATETIME]: "開始日時",
  [RecordMetadataKey.END_DATETIME]: "終了日時",
  [RecordMetadataKey.DATE]: "対局日",
  [RecordMetadataKey.TOURNAMENT]: "棋戦",
  [RecordMetadataKey.STRATEGY]: "戦型",
  [RecordMetadataKey.TITLE]: "表題",
  [RecordMetadataKey.TIME_LIMIT]: "持ち時間",
  [RecordMetadataKey.BYOYOMI]: "秒読み",
  [RecordMetadataKey.TIME_SPENT]: "消費時間",
  [RecordMetadataKey.PLACE]: "場所",
  [RecordMetadataKey.POSTED_ON]: "掲載",
  [RecordMetadataKey.NOTE]: "備考",
  [RecordMetadataKey.BLACK_SHORT_NAME]: "先手省略名",
  [RecordMetadataKey.WHITE_SHORT_NAME]: "後手省略名",
  [RecordMetadataKey.OPUS_NO]: "作品番号",
  [RecordMetadataKey.OPUS_NAME]: "作品名",
  [RecordMetadataKey.AUTHOR]: "作者",
  [RecordMetadataKey.PUBLISHED_BY]: "発表誌",
  [RecordMetadataKey.PUBLISHED_AT]: "発表年月",
  [RecordMetadataKey.SOURCE]: "出典",
  [RecordMetadataKey.LENGTH]: "手数",
  [RecordMetadataKey.INTEGRITY]: "完全性",
  [RecordMetadataKey.CATEGORY]: "分類",
  [RecordMetadataKey.AWARD]: "受賞"
};
function metadataKeyToKakinoki(key) {
  return metadataNameMap[key];
}
const linePatterns$1 = [
  {
    prefix: /^#/,
    type: 0,
    removePrefix: false,
    isPosition: false
  },
  {
    prefix: /^手合割[：:]/,
    type: 2,
    removePrefix: true,
    isPosition: true
  },
  {
    prefix: /^(先|下)手の持駒[：:]/,
    type: 3,
    removePrefix: true,
    isPosition: true
  },
  {
    prefix: /^(後|上)手の持駒[：:]/,
    type: 4,
    removePrefix: true,
    isPosition: true
  },
  {
    prefix: /^\|/,
    type: 5,
    removePrefix: false,
    isPosition: true
  },
  {
    prefix: /^(先|下)手番/,
    type: 6,
    removePrefix: false,
    isPosition: true
  },
  {
    prefix: /^(後|上)手番/,
    type: 7,
    removePrefix: false,
    isPosition: true
  },
  {
    prefix: /^ *[0-9]+ +/,
    type: 8,
    removePrefix: false,
    isPosition: false
  },
  {
    prefix: /^[ \u3000]*[▲△▼▽☗☖]/,
    type: 9,
    removePrefix: false,
    isPosition: false
  },
  {
    prefix: /^[ \u3000]*変化[：:][ \u3000]*/,
    type: 10,
    removePrefix: true,
    isPosition: false
  },
  {
    prefix: /^\*/,
    type: 11,
    removePrefix: true,
    isPosition: false
  },
  {
    prefix: /^&/,
    type: 12,
    removePrefix: true,
    isPosition: false
  },
  {
    prefix: /^まで、?([0-9]+手で)?/,
    type: 13,
    removePrefix: true,
    isPosition: false
  }
];
function parseLine$1(line) {
  for (let i = 0; i < linePatterns$1.length; i++) {
    const pattern = linePatterns$1[i];
    const matched = line.match(pattern.prefix);
    if (matched) {
      const begin = pattern.removePrefix ? matched[0].length : 0;
      return {
        type: pattern.type,
        data: line.substring(begin),
        isPosition: pattern.isPosition,
        metadataKey: ""
      };
    }
  }
  const metadataPrefix = line.match(/^[^ ：:]+[：:]/);
  if (metadataPrefix) {
    const prefix = metadataPrefix[0];
    return {
      type: 1,
      data: line.substring(prefix.length),
      isPosition: false,
      metadataKey: prefix.substring(0, prefix.length - 1)
    };
  }
  return {
    type: 14,
    data: line,
    isPosition: false,
    metadataKey: ""
  };
}
function readHandicap(position, data) {
  switch (data.trim()) {
    case "平手":
      position.resetBySFEN(InitialPositionSFEN.STANDARD);
      return;
    case "香落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_LANCE);
      return;
    case "右香落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_RIGHT_LANCE);
      return;
    case "角落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_BISHOP);
      return;
    case "飛車落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_ROOK);
      return;
    case "飛香落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_ROOK_LANCE);
      return;
    case "二枚落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_2PIECES);
      return;
    case "四枚落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_4PIECES);
      return;
    case "六枚落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_6PIECES);
      return;
    case "八枚落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_8PIECES);
      return;
    case "十枚落ち":
      position.resetBySFEN(InitialPositionSFEN.HANDICAP_10PIECES);
      return;
    case "その他":
      position.resetBySFEN(InitialPositionSFEN.EMPTY);
      return;
  }
  return new InvalidHandicapError(data);
}
const stringToSpecialMoveType = {
  中断: SpecialMoveType.INTERRUPT,
  投了: SpecialMoveType.RESIGN,
  持将棋: SpecialMoveType.IMPASS,
  千日手: SpecialMoveType.REPETITION_DRAW,
  詰み: SpecialMoveType.MATE,
  詰: SpecialMoveType.MATE,
  不詰: SpecialMoveType.NO_MATE,
  切れ負け: SpecialMoveType.TIMEOUT,
  反則勝ち: SpecialMoveType.FOUL_WIN,
  反則負け: SpecialMoveType.FOUL_LOSE,
  入玉勝ち: SpecialMoveType.ENTERING_OF_KING,
  不戦勝: SpecialMoveType.WIN_BY_DEFAULT,
  不戦敗: SpecialMoveType.LOSE_BY_DEFAULT
};
const moveRegExp = /^ *([0-9]+) +[▲△▼▽]?([１２３４５６７８９][一二三四五六七八九]|同\u3000*)(王|玉|飛|龍|竜|角|馬|金|銀|成銀|全|桂|成桂|圭|香|成香|杏|歩|と)\u3000*(成?)(打|\([1-9][1-9]\)) *(.*)$/;
const timeRegExp = /\( *([0-9]+):([0-9]+)\/[0-9: ]*\)/;
const specialMoveRegExp = /^ *([0-9]+) +([^ \u3000]+) *(.*)$/;
const branchRegExp = /^ *([0-9]+)/;
function readBoard(board, data) {
  if (data.length < 21) {
    return new InvalidBoardError(data);
  }
  const rankStr = data[20];
  const rank = stringToNumber(rankStr);
  if (!rank) {
    return new InvalidBoardError(data);
  }
  for (let x = 0; x < 9; x += 1) {
    const file = 9 - x;
    const square = new Square(file, rank);
    const index = x * 2 + 1;
    const pieceStr = data[index + 1];
    const pieceType = stringToPieceType(pieceStr);
    if (!pieceType) {
      board.remove(square);
      continue;
    }
    const color = data[index] !== "v" ? Color.BLACK : Color.WHITE;
    board.set(square, new Piece(color, pieceType));
  }
}
function readHand(hand, data) {
  const sections = data.split(/[ 　]/);
  for (const section of sections) {
    if (!section || section === "なし") {
      continue;
    }
    const pieceStr = section[0];
    const numberStr = section.substring(1);
    const pieceType = stringToPieceType(pieceStr);
    const n = stringToNumber(numberStr) || 1;
    if (!pieceType) {
      return new InvalidHandPieceError(section);
    }
    hand.add(pieceType, n);
  }
  return;
}
function readMoveTime(record, data) {
  const timeResult = timeRegExp.exec(data);
  if (timeResult) {
    const minutes = timeResult[1];
    const seconds = timeResult[2];
    const s = Number.parseInt(minutes) * 60 + Number.parseInt(seconds);
    record.current.setElapsedMs(s * 1e3);
  }
}
function readMove(record, data) {
  const result = readRegularMove(record, data);
  if (result instanceof Error) {
    return result;
  } else if (result) {
    return;
  }
  if (readSpecialMove(record, data)) {
    return;
  }
  return new InvalidMoveError(data);
}
function readRegularMove(record, data) {
  const result = moveRegExp.exec(data);
  if (!result) {
    return false;
  }
  const num = Number(result[1]);
  const toStr = result[2];
  const pieceTypeStr = result[3];
  const promStr = result[4];
  const fromStr = result[5];
  const time = result[6];
  if (num === 0) {
    return new InvalidMoveNumberError(data);
  }
  record.goto(num - 1);
  let to;
  let from;
  if (toStr.startsWith("同")) {
    if (!(record.current.move instanceof Move)) {
      return new InvalidDestinationError(data);
    }
    to = record.current.move.to;
  } else {
    const file = stringToNumber(toStr[0]);
    const rank = stringToNumber(toStr[1]);
    to = new Square(file, rank);
  }
  if (fromStr === "打") {
    from = stringToPieceType(pieceTypeStr);
  } else {
    const file = stringToNumber(fromStr[1]);
    const rank = stringToNumber(fromStr[2]);
    from = new Square(file, rank);
  }
  let move = record.position.createMove(from, to);
  if (!move) {
    return new InvalidMoveError(data);
  }
  if (promStr === "成") {
    move = move.withPromote();
  }
  record.append(move, {
    ignoreValidation: true
  });
  readMoveTime(record, time);
  return true;
}
function readSpecialMove(record, data) {
  const result = specialMoveRegExp.exec(data);
  if (!result) {
    return false;
  }
  const num = Number(result[1]);
  const type = stringToSpecialMoveType[result[2]];
  const time = result[3];
  record.goto(num - 1);
  let move;
  if (type) {
    move = specialMove(type);
  } else {
    move = anySpecialMove(result[2]);
  }
  record.append(move, {
    ignoreValidation: true
  });
  readMoveTime(record, time);
  return true;
}
function readMove2(record, data) {
  const lastMove = record.current.move instanceof Move ? record.current.move : void 0;
  const [moves, e] = parseMoves(record.position, data, lastMove);
  if (e) {
    return e;
  }
  for (const move of moves) {
    record.append(move, { ignoreValidation: true });
  }
}
function readBranch(record, data) {
  const result = branchRegExp.exec(data);
  if (!result) {
    return new InvalidMoveNumberError(data);
  }
  const num = Number(result[1]);
  if (num === 0 || num > record.current.ply + 1) {
    return new InvalidMoveNumberError(data);
  }
  record.goto(num - 1);
}
function readEndOfGame(record, data) {
  const clean = data.replaceAll(/[\s\u3000]/g, "");
  if (clean.startsWith("時間切れ")) {
    record.append(specialMove(SpecialMoveType.TIMEOUT));
  } else if (clean.endsWith("反則勝ち")) {
    record.append(specialMove(SpecialMoveType.FOUL_WIN));
  } else if (clean.endsWith("反則負け")) {
    record.append(specialMove(SpecialMoveType.FOUL_LOSE));
  } else if (clean.endsWith("入玉勝ち")) {
    record.append(specialMove(SpecialMoveType.ENTERING_OF_KING));
  } else if (clean.endsWith("勝ち")) {
    record.append(specialMove(SpecialMoveType.RESIGN));
  } else {
    const type = stringToSpecialMoveType[clean];
    if (type) {
      record.append(specialMove(type));
    } else {
      record.append(anySpecialMove(clean));
    }
  }
}
function importKIF(data) {
  return importKakinoki(
    data,
    "KIF"
    /* KIF */
  );
}
function importKI2(data) {
  return importKakinoki(
    data,
    "KI2"
    /* KI2 */
  );
}
function importKakinoki(data, formatType) {
  const metadata = new RecordMetadata();
  const record = new Record();
  const lines = data.split(/\r?\n/);
  const position = new Position();
  let preMoveComment = "";
  let preMoveBookmark = "";
  let isMoveSection = false;
  const startMoveSectionIfNot = () => {
    if (isMoveSection) {
      return;
    }
    record.clear(position);
    record.first.comment = preMoveComment;
    record.first.bookmark = preMoveBookmark;
    isMoveSection = true;
  };
  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const parsed = parseLine$1(line);
    if (isMoveSection && parsed.isPosition) {
      return new InvalidLineError(line);
    }
    let e;
    switch (parsed.type) {
      case 1: {
        const standardKey = metadataKeyMap[parsed.metadataKey];
        if (standardKey) {
          metadata.setStandardMetadata(standardKey, parsed.data);
        } else {
          metadata.setCustomMetadata(parsed.metadataKey, parsed.data);
        }
        break;
      }
      case 2:
        e = readHandicap(position, parsed.data);
        break;
      case 3:
        e = readHand(position.blackHand, parsed.data);
        break;
      case 4:
        e = readHand(position.whiteHand, parsed.data);
        break;
      case 5:
        e = readBoard(position.board, parsed.data);
        break;
      case 6:
        position.setColor(Color.BLACK);
        break;
      case 7:
        position.setColor(Color.WHITE);
        break;
      case 8:
        if (formatType !== "KIF") {
          return new InvalidLineError(line);
        }
        startMoveSectionIfNot();
        e = readMove(record, parsed.data);
        break;
      case 9:
        if (formatType !== "KI2") {
          return new InvalidLineError(line);
        }
        startMoveSectionIfNot();
        e = readMove2(record, parsed.data);
        break;
      case 10:
        if (isMoveSection && formatType === "KI2") {
          e = readBranch(record, parsed.data);
        }
        break;
      case 11:
        if (isMoveSection) {
          record.current.comment = appendLine(record.current.comment, parsed.data);
        } else {
          preMoveComment = appendLine(preMoveComment, parsed.data);
        }
        break;
      case 12:
        if (isMoveSection) {
          record.current.bookmark = parsed.data;
        } else {
          preMoveBookmark = parsed.data;
        }
        break;
      case 13:
        if (formatType === "KI2") {
          startMoveSectionIfNot();
          readEndOfGame(record, parsed.data);
        }
        break;
    }
    if (e) {
      return e;
    }
  }
  startMoveSectionIfNot();
  record.goto(0);
  record.resetAllBranchSelection();
  record.metadata = metadata;
  return record;
}
const specialMoveToString = {
  [SpecialMoveType.START]: "",
  [SpecialMoveType.RESIGN]: "投了",
  [SpecialMoveType.INTERRUPT]: "中断",
  [SpecialMoveType.IMPASS]: "持将棋",
  [SpecialMoveType.DRAW]: "持将棋",
  [SpecialMoveType.REPETITION_DRAW]: "千日手",
  [SpecialMoveType.MATE]: "詰み",
  [SpecialMoveType.NO_MATE]: "不詰",
  [SpecialMoveType.TIMEOUT]: "切れ負け",
  [SpecialMoveType.FOUL_WIN]: "反則勝ち",
  [SpecialMoveType.FOUL_LOSE]: "反則負け",
  [SpecialMoveType.ENTERING_OF_KING]: "入玉勝ち",
  [SpecialMoveType.WIN_BY_DEFAULT]: "不戦勝",
  [SpecialMoveType.LOSE_BY_DEFAULT]: "不戦敗"
};
function formatMetadata$1(metadata, options) {
  let ret = "";
  const returnCode = options.returnCode ? options.returnCode : "\n";
  for (const key of metadata.standardMetadataKeys) {
    ret += metadataNameMap[key] + "：" + metadata.getStandardMetadata(key) + returnCode;
  }
  for (const key of metadata.customMetadataKeys) {
    ret += key + "：" + metadata.getCustomMetadata(key) + returnCode;
  }
  return ret;
}
function formatPosition$1(position, options) {
  const returnCode = options.returnCode || "\n";
  switch (position.sfen) {
    case InitialPositionSFEN.STANDARD:
      return "手合割：平手" + returnCode;
    case InitialPositionSFEN.HANDICAP_LANCE:
      return "手合割：香落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_RIGHT_LANCE:
      return "手合割：右香落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_BISHOP:
      return "手合割：角落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_ROOK:
      return "手合割：飛車落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_ROOK_LANCE:
      return "手合割：飛香落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_2PIECES:
      return "手合割：二枚落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_4PIECES:
      return "手合割：四枚落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_6PIECES:
      return "手合割：六枚落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_8PIECES:
      return "手合割：八枚落ち" + returnCode;
    case InitialPositionSFEN.HANDICAP_10PIECES:
      return "手合割：十枚落ち" + returnCode;
  }
  let ret = "";
  ret += "後手の持駒：" + formatHand$1(position.whiteHand) + returnCode;
  ret += "  ９ ８ ７ ６ ５ ４ ３ ２ １" + returnCode;
  ret += "+---------------------------+" + returnCode;
  for (let y = 0; y < 9; y++) {
    ret += "|";
    for (let x = 0; x < 9; x++) {
      const square = Square.newByXY(x, y);
      const piece = position.board.at(square);
      if (!piece) {
        ret += " ・";
      } else if (piece.color === Color.BLACK) {
        ret += " " + pieceTypeToStringForBoard(piece.type);
      } else {
        ret += "v" + pieceTypeToStringForBoard(piece.type);
      }
    }
    ret += "|" + rankToKanji(y + 1) + returnCode;
  }
  ret += "+---------------------------+" + returnCode;
  ret += "先手の持駒：" + formatHand$1(position.blackHand) + returnCode;
  if (position.color === Color.BLACK) {
    ret += "先手番" + returnCode;
  } else {
    ret += "後手番" + returnCode;
  }
  return ret;
}
function formatMove$1(move, prev) {
  let ret = "";
  if (prev && move.to.equals(prev.to)) {
    ret += "同　";
  } else {
    ret += fileToMultiByteChar(move.to.file);
    ret += rankToKanji(move.to.rank);
  }
  ret += pieceTypeToStringForMove(move.pieceType);
  if (move.promote) {
    ret += "成";
  }
  if (move.from instanceof Square) {
    ret += "(" + move.from.file + move.from.rank + ")" + (ret.length === 3 ? "  " : "");
  } else {
    ret += "打    ";
  }
  return ret;
}
function formatHand$1(hand) {
  let ret = "";
  hand.forEach((pieceType, n) => {
    if (n >= 1) {
      ret += pieceTypeToStringForBoard(pieceType);
      if (n >= 2) {
        ret += numberToKanji(n);
      }
      ret += "　";
    }
  });
  if (ret === "") {
    ret = "なし";
  }
  return ret;
}
function exportKIF(record, options) {
  let ret = "";
  const returnCode = options.returnCode ? options.returnCode : "\n";
  ret += "# KIF形式棋譜ファイル Generated by Electron Shogi" + returnCode;
  ret += formatMetadata$1(record.metadata, options);
  ret += formatPosition$1(record.initialPosition, options);
  ret += "手数----指手---------消費時間--" + returnCode;
  record.forEach((node) => {
    if (node.ply !== 0) {
      if (!node.isFirstBranch) {
        ret += returnCode;
        ret += "変化：" + node.ply + "手" + returnCode;
      }
      ret += String(node.ply).padStart(4, " ") + " ";
      if (node.move instanceof Move) {
        const prev = node.prev?.move instanceof Move ? node.prev.move : void 0;
        ret += formatMove$1(node.move, prev);
      } else if (isKnownSpecialMove(node.move)) {
        const s = specialMoveToString[node.move.type];
        ret += s + " ".repeat(Math.max(12 - s.length * 2, 0));
      } else {
        ret += node.move.name + " ".repeat(Math.max(12 - node.move.name.length * 2, 0));
      }
      const elapsed = millisecondsToMSS(node.elapsedMs);
      const totalElapsed = millisecondsToHHMMSS(node.totalElapsedMs);
      ret += ` (${elapsed}/${totalElapsed})`;
      if (node.branch) {
        ret += "+";
      }
      ret += returnCode;
    }
    if (node.comment.length !== 0) {
      const comment = node.comment.endsWith("\n") ? node.comment.slice(0, -1) : node.comment;
      ret += "*" + comment.replaceAll("\n", returnCode + "*") + returnCode;
    }
    if (node.bookmark.length !== 0) {
      ret += "&" + node.bookmark + returnCode;
    }
  });
  return ret;
}
function exportKI2(record, options) {
  let ret = "";
  let moveCountInLine = 0;
  let lastMoveLength = 0;
  const returnCode = options.returnCode ? options.returnCode : "\n";
  ret += formatMetadata$1(record.metadata, options);
  ret += formatPosition$1(record.initialPosition, options);
  record.forEach((node, pos) => {
    if (node.ply !== 0) {
      if (!node.isFirstBranch) {
        if (!ret.endsWith(returnCode)) {
          ret += returnCode;
        }
        ret += returnCode;
        ret += "変化：" + node.ply + "手" + returnCode;
      }
      if (node.move instanceof Move) {
        const str = formatMove$2(pos, node.move, {
          lastMove: node.prev?.move instanceof Move ? node.prev.move : void 0,
          compatible: true
        });
        if (ret.endsWith(returnCode)) {
          moveCountInLine = 0;
        } else {
          ret += " ".repeat(Math.max(12 - lastMoveLength * 2, 0));
        }
        ret += str;
        lastMoveLength = str.length;
        moveCountInLine++;
        if (moveCountInLine >= 6) {
          ret += returnCode;
        }
      } else {
        if (!ret.endsWith(returnCode)) {
          ret += returnCode;
        }
        ret += `まで${node.ply - 1}手で`;
        if (isKnownSpecialMove(node.move)) {
          const [next, last] = node.nextColor === Color.BLACK ? ["先手", "後手"] : ["後手", "先手"];
          switch (node.move.type) {
            case SpecialMoveType.RESIGN:
              ret += `${last}の勝ち`;
              break;
            case SpecialMoveType.TIMEOUT:
              ret += `時間切れにより${last}の勝ち`;
              break;
            case SpecialMoveType.ENTERING_OF_KING:
              ret += `${next}の入玉勝ち`;
              break;
            case SpecialMoveType.FOUL_WIN:
              ret += `${next}の反則勝ち`;
              break;
            case SpecialMoveType.FOUL_LOSE:
              ret += `${next}の反則負け`;
              break;
            default:
              ret += specialMoveToString[node.move.type];
              break;
          }
        } else {
          ret += node.move.name;
        }
        ret += returnCode;
      }
    }
    if (node.comment.length !== 0) {
      if (!ret.endsWith(returnCode)) {
        ret += returnCode;
      }
      const comment = node.comment.endsWith("\n") ? node.comment.slice(0, -1) : node.comment;
      ret += "*" + comment.replaceAll("\n", returnCode + "*") + returnCode;
    }
    if (node.bookmark.length !== 0) {
      if (!ret.endsWith(returnCode)) {
        ret += returnCode;
      }
      ret += "&" + node.bookmark + returnCode;
    }
  });
  return ret;
}
function getBlackPlayerName(metadata) {
  return metadata.getStandardMetadata(RecordMetadataKey.BLACK_NAME) || metadata.getStandardMetadata(RecordMetadataKey.BLACK_SHORT_NAME) || metadata.getStandardMetadata(RecordMetadataKey.SHITATE_NAME);
}
function getWhitePlayerName(metadata) {
  return metadata.getStandardMetadata(RecordMetadataKey.WHITE_NAME) || metadata.getStandardMetadata(RecordMetadataKey.WHITE_SHORT_NAME) || metadata.getStandardMetadata(RecordMetadataKey.UWATE_NAME);
}
const linePatterns = [
  {
    pattern: /^V/,
    type: 0,
    sectionType: 0
    /* HEADER */
  },
  {
    pattern: /^'\*(.+)$/,
    type: 1,
    sectionType: 2
    /* NEUTRAL */
  },
  {
    pattern: /^'(.+)$/,
    type: 2,
    sectionType: 2
    /* NEUTRAL */
  },
  {
    pattern: /^N\+(.+)$/,
    type: 3,
    sectionType: 0
    /* HEADER */
  },
  {
    pattern: /^N-(.+)$/,
    type: 4,
    sectionType: 0
    /* HEADER */
  },
  {
    pattern: /^\$([^:]+):(.+)$/,
    type: 5,
    sectionType: 0
    /* HEADER */
  },
  {
    pattern: /^PI([1-9]{2}[A-Z]{2})*$/,
    type: 6,
    sectionType: 0
    /* HEADER */
  },
  {
    pattern: /^P[1-9]( \* |[-+][A-Z][A-Z]){9}$/,
    type: 7,
    sectionType: 0
    /* HEADER */
  },
  {
    pattern: /^P[-+]([0-9]{2}[A-Z]{2})*/,
    type: 8,
    sectionType: 0
    /* HEADER */
  },
  {
    pattern: /^[-+]$/,
    type: 9,
    sectionType: 0
    /* HEADER */
  },
  {
    pattern: /^[-+][0-9]{4}[A-Z]{2}/,
    type: 10,
    sectionType: 1
    /* MOVE */
  },
  {
    pattern: /^%[-+A-Z_]+/,
    type: 11,
    sectionType: 1
    /* MOVE */
  },
  {
    pattern: /^T([0-9]+)/,
    type: 12,
    sectionType: 1
    /* MOVE */
  }
];
function parseLine(line) {
  const results = [];
  const lines = line.match(/^['N$]/) ? [line] : line.split(",");
  for (const line2 of lines) {
    for (let i = 0; i < linePatterns.length; i++) {
      const matched = linePatterns[i].pattern.exec(line2);
      if (matched) {
        results.push({
          type: linePatterns[i].type,
          line: line2,
          args: matched.slice(1),
          sectionType: linePatterns[i].sectionType
        });
        break;
      }
    }
  }
  return results;
}
const csaNameToRecordMetadataKey = {
  EVENT: RecordMetadataKey.TITLE,
  SITE: RecordMetadataKey.PLACE,
  START_TIME: RecordMetadataKey.START_DATETIME,
  END_TIME: RecordMetadataKey.END_DATETIME,
  TIME_LIMIT: RecordMetadataKey.TIME_LIMIT,
  OPENING: RecordMetadataKey.STRATEGY
};
const csaNameToPieceType = {
  FU: PieceType.PAWN,
  KY: PieceType.LANCE,
  KE: PieceType.KNIGHT,
  GI: PieceType.SILVER,
  KI: PieceType.GOLD,
  KA: PieceType.BISHOP,
  HI: PieceType.ROOK,
  OU: PieceType.KING,
  TO: PieceType.PROM_PAWN,
  NY: PieceType.PROM_LANCE,
  NK: PieceType.PROM_KNIGHT,
  NG: PieceType.PROM_SILVER,
  UM: PieceType.HORSE,
  RY: PieceType.DRAGON
};
function parsePosition(line, position) {
  position.resetBySFEN(InitialPositionSFEN.STANDARD);
  for (let i = 2; i + 4 <= line.length; i += 4) {
    const file = Number(line[i]);
    const rank = Number(line[i + 1]);
    position.board.remove(new Square(file, rank));
  }
}
function parseRank(line, position) {
  const rank = Number(line[1]);
  for (let x = 0; x < 9; x += 1) {
    const file = 9 - x;
    const begin = x * 3 + 2;
    const section = line.slice(begin, begin + 3);
    if (section[0] === " ") {
      continue;
    }
    const color = section[0] === "+" ? Color.BLACK : Color.WHITE;
    const pieceType = csaNameToPieceType[section.slice(1)];
    if (!pieceType) {
      return new InvalidPieceNameError(section);
    }
    position.board.set(new Square(file, rank), new Piece(color, pieceType));
  }
}
function parsePieces(line, position) {
  const color = line[1] === "+" ? Color.BLACK : Color.WHITE;
  for (let begin = 2; begin + 4 <= line.length; begin += 4) {
    const section = line.slice(begin, begin + 4);
    if (section === "00AL") {
      const counts = countNotExistingPieces(position);
      if (color === Color.BLACK) {
        position.blackHand.forEach((pieceType2) => {
          position.blackHand.add(pieceType2, counts[pieceType2]);
        });
      } else {
        position.whiteHand.forEach((pieceType2) => {
          position.whiteHand.add(pieceType2, counts[pieceType2]);
        });
      }
      return;
    }
    const file = Number(section[0]);
    const rank = Number(section[1]);
    const pieceType = csaNameToPieceType[section.slice(2)];
    if (!pieceType) {
      return new InvalidPieceNameError(section);
    }
    if (file !== 0 && rank !== 0) {
      position.board.set(new Square(file, rank), new Piece(color, pieceType));
    } else if (color === Color.BLACK) {
      position.blackHand.add(pieceType, 1);
    } else {
      position.whiteHand.add(pieceType, 1);
    }
  }
}
function parseMove(line, position) {
  const color = line[0] === "+" ? Color.BLACK : Color.WHITE;
  if (color != position.color) {
    return new InvalidTurnError(line);
  }
  const fromFile = Number(line[1]);
  const fromRank = Number(line[2]);
  const toFile = Number(line[3]);
  const toRank = Number(line[4]);
  const pieceType = csaNameToPieceType[line.slice(5, 7)];
  if (!pieceType) {
    return new InvalidPieceNameError(line);
  }
  const from = fromFile === 0 && fromRank === 0 ? pieceType : new Square(fromFile, fromRank);
  const to = new Square(toFile, toRank);
  let move = position.createMove(from, to);
  if (!move) {
    return new InvalidMoveError(line);
  }
  if (from instanceof Square) {
    const basePiece = position.board.at(from);
    if (!basePiece) {
      return new PieceNotExistsError(line);
    }
    if (basePiece.type !== pieceType) {
      if (basePiece.promoted().type === pieceType) {
        move = move.withPromote();
      } else {
        return new PieceNotExistsError(line);
      }
    }
  }
  return move;
}
function getSpecialMoveByName(name, color) {
  switch (name) {
    case "CHUDAN":
      return SpecialMoveType.INTERRUPT;
    case "TORYO":
      return SpecialMoveType.RESIGN;
    case "JISHOGI":
      return SpecialMoveType.IMPASS;
    case "HIKIWAKE":
      return SpecialMoveType.DRAW;
    case "SENNICHITE":
      return SpecialMoveType.REPETITION_DRAW;
    case "TSUMI":
      return SpecialMoveType.MATE;
    case "FUZUMI":
      return SpecialMoveType.NO_MATE;
    case "TIME_UP":
      return SpecialMoveType.TIMEOUT;
    case "ILLEGAL_MOVE":
      return SpecialMoveType.FOUL_LOSE;
    case "+ILLEGAL_ACTION":
      return color == Color.BLACK ? SpecialMoveType.FOUL_WIN : SpecialMoveType.FOUL_LOSE;
    case "-ILLEGAL_ACTION":
      return color == Color.WHITE ? SpecialMoveType.FOUL_WIN : SpecialMoveType.FOUL_LOSE;
    case "KACHI":
      return SpecialMoveType.ENTERING_OF_KING;
  }
}
function importCSA(data) {
  const metadata = new RecordMetadata();
  const record = new Record();
  const position = new Position();
  position.resetBySFEN(InitialPositionSFEN.EMPTY);
  let preMoveComment = "";
  let inMoveSection = false;
  const lines = data.replace(/\r?\n\/(\r?\n[\s\S]*)?$/, "").split(/\r?\n/);
  for (const line of lines) {
    for (const parsed of parseLine(line)) {
      if (parsed.sectionType === 0 && inMoveSection || parsed.sectionType === 1 && !inMoveSection) {
        return new InvalidLineError(parsed.line);
      }
      switch (parsed.type) {
        case 0:
          break;
        case 1:
          if (inMoveSection) {
            record.current.comment = appendLine(record.current.comment, parsed.args[0]);
          } else {
            preMoveComment = appendLine(preMoveComment, parsed.args[0]);
          }
          break;
        case 2:
          break;
        case 3:
          metadata.setStandardMetadata(RecordMetadataKey.BLACK_NAME, parsed.args[0]);
          break;
        case 4:
          metadata.setStandardMetadata(RecordMetadataKey.WHITE_NAME, parsed.args[0]);
          break;
        case 5: {
          const key = csaNameToRecordMetadataKey[parsed.args[0]];
          if (key) {
            metadata.setStandardMetadata(key, parsed.args[1]);
          } else {
            metadata.setCustomMetadata(parsed.args[0], parsed.args[1]);
          }
          break;
        }
        case 6:
          parsePosition(parsed.line, position);
          break;
        case 7: {
          const error = parseRank(parsed.line, position);
          if (error) {
            return error;
          }
          break;
        }
        case 8: {
          const error = parsePieces(parsed.line, position);
          if (error) {
            return error;
          }
          break;
        }
        case 9:
          if (parsed.line[0] === "+") {
            position.setColor(Color.BLACK);
          } else {
            position.setColor(Color.WHITE);
          }
          record.clear(position);
          record.first.comment = preMoveComment;
          inMoveSection = true;
          break;
        case 10: {
          const moveOrError = parseMove(parsed.line, record.position);
          if (moveOrError instanceof Error) {
            return moveOrError;
          }
          record.append(moveOrError, { ignoreValidation: true });
          break;
        }
        case 11: {
          const specialMove2 = getSpecialMoveByName(parsed.line.slice(1), record.position.color);
          if (specialMove2) {
            record.append(specialMove2, { ignoreValidation: true });
          }
          break;
        }
        case 12:
          record.current.setElapsedMs(Number(parsed.args[0]) * 1e3);
          break;
      }
    }
  }
  if (!inMoveSection) {
    record.clear(position);
    record.first.comment = preMoveComment;
  }
  record.goto(0);
  record.resetAllBranchSelection();
  record.metadata = metadata;
  return record;
}
function formatMetadata(metadata, options) {
  let ret = "";
  const returnCode = options.returnCode ? options.returnCode : "\n";
  const blackName = getBlackPlayerName(metadata);
  if (blackName) {
    ret += "N+" + blackName + returnCode;
  }
  const whiteName = getWhitePlayerName(metadata);
  if (whiteName) {
    ret += "N-" + whiteName + returnCode;
  }
  const event = metadata.getStandardMetadata(RecordMetadataKey.TOURNAMENT) || metadata.getStandardMetadata(RecordMetadataKey.TITLE) || metadata.getStandardMetadata(RecordMetadataKey.OPUS_NAME) || metadata.getStandardMetadata(RecordMetadataKey.PUBLISHED_BY);
  if (event) {
    ret += "$EVENT:" + event + returnCode;
  }
  const site = metadata.getStandardMetadata(RecordMetadataKey.PLACE);
  if (site) {
    ret += "$SITE:" + site + returnCode;
  }
  const startTime = metadata.getStandardMetadata(RecordMetadataKey.START_DATETIME) || metadata.getStandardMetadata(RecordMetadataKey.DATE);
  if (startTime) {
    ret += "$START_TIME:" + startTime.slice(10) + returnCode;
  }
  const endTime = metadata.getStandardMetadata(RecordMetadataKey.DATE);
  if (endTime) {
    ret += "$END_TIME:" + endTime.slice(10) + returnCode;
  }
  const opening = metadata.getStandardMetadata(RecordMetadataKey.STRATEGY);
  if (opening) {
    ret += "$OPENING:" + opening + returnCode;
  }
  return ret;
}
const pieceTypeToString = {
  king: "OU",
  rook: "HI",
  dragon: "RY",
  bishop: "KA",
  horse: "UM",
  gold: "KI",
  silver: "GI",
  promSilver: "NG",
  knight: "KE",
  promKnight: "NK",
  lance: "KY",
  promLance: "NY",
  pawn: "FU",
  promPawn: "TO"
};
function formatHand(hand) {
  let ret = "";
  hand.forEach((pieceType, n) => {
    for (let i = 0; i < n; i++) {
      ret += "00" + pieceTypeToString[pieceType];
    }
  });
  return ret;
}
const sfenToPCommand = {
  [InitialPositionSFEN.STANDARD]: ["PI", "+"],
  [InitialPositionSFEN.HANDICAP_LANCE]: ["PI11KY", "-"],
  [InitialPositionSFEN.HANDICAP_RIGHT_LANCE]: ["PI91KY", "-"],
  [InitialPositionSFEN.HANDICAP_BISHOP]: ["PI22KA", "-"],
  [InitialPositionSFEN.HANDICAP_ROOK]: ["PI82HI", "-"],
  [InitialPositionSFEN.HANDICAP_ROOK_LANCE]: ["PI82HI11KY", "-"],
  [InitialPositionSFEN.HANDICAP_2PIECES]: ["PI82HI22KA", "-"],
  [InitialPositionSFEN.HANDICAP_4PIECES]: ["PI82HI22KA11KY91KY", "-"],
  [InitialPositionSFEN.HANDICAP_6PIECES]: ["PI82HI22KA21KE81KE11KY91KY", "-"],
  [InitialPositionSFEN.HANDICAP_8PIECES]: ["PI82HI22KA31GI71GI21KE81KE11KY91KY", "-"],
  [InitialPositionSFEN.HANDICAP_10PIECES]: ["PI82HI22KA41KI61KI31GI71GI21KE81KE11KY91KY", "-"]
};
function formatPosition(position, options) {
  const returnCode = options.returnCode ? options.returnCode : "\n";
  const p = sfenToPCommand[position.sfen];
  if (p) {
    return p[0] + returnCode + p[1] + returnCode;
  }
  let ret = "";
  for (let rank = 1; rank <= 9; rank += 1) {
    ret += "P" + rank;
    for (let file = 9; file >= 1; file -= 1) {
      const piece = position.board.at(new Square(file, rank));
      if (!piece) {
        ret += " * ";
      } else if (piece.color === Color.BLACK) {
        ret += "+" + pieceTypeToString[piece.type];
      } else {
        ret += "-" + pieceTypeToString[piece.type];
      }
    }
    ret += returnCode;
  }
  ret += "P+" + formatHand(position.blackHand) + returnCode;
  ret += "P-" + formatHand(position.whiteHand) + returnCode;
  ret += (position.color === Color.BLACK ? "+" : "-") + returnCode;
  return ret;
}
function formatSquare(square) {
  return square instanceof Square ? `${square.file}${square.rank}` : "00";
}
function formatMove(move) {
  return (move.color === Color.BLACK ? "+" : "-") + formatSquare(move.from) + formatSquare(move.to) + pieceTypeToString[move.promote ? promotedPieceType(move.pieceType) : move.pieceType];
}
function getSpecialMoveName(move, color) {
  switch (move.type) {
    case SpecialMoveType.INTERRUPT:
      return "CHUDAN";
    case SpecialMoveType.RESIGN:
      return "TORYO";
    case SpecialMoveType.IMPASS:
      return "JISHOGI";
    case SpecialMoveType.DRAW:
      return "HIKIWAKE";
    case SpecialMoveType.REPETITION_DRAW:
      return "SENNICHITE";
    case SpecialMoveType.MATE:
      return "TSUMI";
    case SpecialMoveType.NO_MATE:
      return "FUZUMI";
    case SpecialMoveType.TIMEOUT:
      return "TIME_UP";
    case SpecialMoveType.FOUL_LOSE:
      return "ILLEGAL_MOVE";
    case SpecialMoveType.FOUL_WIN:
      return color == Color.BLACK ? "+ILLEGAL_ACTION" : "-ILLEGAL_ACTION";
    case SpecialMoveType.ENTERING_OF_KING:
      return "KACHI";
  }
}
function formatSpecialMove(move, color) {
  const name = getSpecialMoveName(move, color);
  if (name) {
    return "%" + name;
  }
}
function exportCSA(record, options) {
  let ret = "";
  const returnCode = options.returnCode ? options.returnCode : "\n";
  ret += "' CSA形式棋譜ファイル Generated by Electron Shogi" + returnCode;
  ret += "V2.2" + returnCode;
  ret += formatMetadata(record.metadata, options);
  ret += formatPosition(record.initialPosition, options);
  record.moves.forEach((node) => {
    if (node.ply !== 0) {
      let move;
      if (node.move instanceof Move) {
        move = formatMove(node.move);
      } else {
        move = formatSpecialMove(node.move, reverseColor(node.nextColor));
      }
      if (move) {
        ret += move + returnCode;
        ret += "T" + Math.floor(node.elapsedMs / 1e3) + returnCode;
      }
    }
    if (node.comment) {
      const comment = node.comment.endsWith("\n") ? node.comment.slice(0, -1) : node.comment;
      comment.split("\n").forEach((line) => {
        ret += "'*" + line + returnCode;
      });
    }
  });
  return ret;
}
function setLanguage(lang) {
  setLanguage$2(lang);
  setLanguage$1(lang);
}
const USIPonder = "USI_Ponder";
const USIHash = "USI_Hash";
function getUSIEngineOptionCurrentValue(option) {
  if (!option) {
    return;
  }
  if (option.value !== void 0) {
    return option.value;
  }
  if (option.default !== void 0) {
    if ((option.type === "string" || option.type === "filename") && option.default === "<empty>") {
      return "";
    }
    return option.default;
  }
  return;
}
function emptyUSIEngineSetting() {
  return {
    uri: "",
    name: "",
    defaultName: "",
    author: "",
    path: "",
    options: {},
    labels: {
      game: true,
      research: true,
      mate: true
    }
  };
}
class USIEngineSettings {
  engines = {};
  constructor(json) {
    if (json) {
      const src = JSON.parse(json);
      for (const engineURI in src.engines) {
        if (isUSIEngine(engineURI)) {
          const emptyEngine = emptyUSIEngineSetting();
          const engine = src.engines[engineURI];
          this.engines[engineURI] = {
            ...emptyEngine,
            ...engine,
            uri: engineURI,
            labels: {
              ...emptyEngine.labels,
              ...engine.labels
            }
          };
        }
      }
    }
  }
  hasEngine(uri2) {
    return !!this.engines[uri2];
  }
  addEngine(engine) {
    this.engines[engine.uri] = engine;
  }
  updateEngine(engine) {
    if (!this.engines[engine.uri]) {
      return false;
    }
    this.engines[engine.uri] = engine;
    return true;
  }
  removeEngine(uri2) {
    if (!this.engines[uri2]) {
      return false;
    }
    delete this.engines[uri2];
    return true;
  }
  getEngine(uri2) {
    return this.engines[uri2];
  }
  get engineList() {
    return Object.values(this.engines).sort((a, b) => {
      if (a.name !== b.name) {
        return a.name > b.name ? 1 : -1;
      }
      if (a.defaultName !== b.defaultName) {
        return a.defaultName > b.defaultName ? 1 : -1;
      }
      return a.uri > b.uri ? 1 : -1;
    });
  }
  get json() {
    return JSON.stringify(this);
  }
  get jsonWithIndent() {
    return JSON.stringify(this, void 0, 2);
  }
  getClone() {
    return new USIEngineSettings(this.json);
  }
  filterByLabel(label) {
    const engines = new USIEngineSettings();
    for (const engine of this.engineList) {
      if (engine.labels && engine.labels[label]) {
        engines.addEngine(engine);
      }
    }
    return engines;
  }
}
var LogType = /* @__PURE__ */ ((LogType2) => {
  LogType2["APP"] = "app";
  LogType2["USI"] = "usi";
  LogType2["CSA"] = "csa";
  return LogType2;
})(LogType || {});
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["DEBUG"] = "debug";
  LogLevel2["INFO"] = "info";
  LogLevel2["WARN"] = "warn";
  LogLevel2["ERROR"] = "error";
  return LogLevel2;
})(LogLevel || {});
function encodeText(data, encoding) {
  if (encoding === "ASCII" || encoding === "UTF8") {
    return new TextEncoder().encode(data);
  }
  return new Uint8Array(
    encodingJapanese.convert(data, {
      type: "arraybuffer",
      from: "UNICODE",
      to: encoding
    })
  );
}
function decodeText(data, option) {
  const encoding = option?.autoDetect ? detectTextEncoding(data, option.encoding) : option?.encoding;
  if (encoding === "ASCII" || encoding === "UTF8") {
    return new TextDecoder().decode(data);
  }
  return encodingJapanese.convert(data, {
    type: "string",
    from: encoding,
    to: "UNICODE"
  });
}
function detectTextEncoding(data, defaultEncoding) {
  const detected = encodingJapanese.detect(data);
  if (detected) {
    return detected;
  }
  return defaultEncoding || "UTF8";
}
var JKFKind = /* @__PURE__ */ ((JKFKind2) => {
  JKFKind2["FU"] = "FU";
  JKFKind2["KY"] = "KY";
  JKFKind2["KE"] = "KE";
  JKFKind2["GI"] = "GI";
  JKFKind2["KI"] = "KI";
  JKFKind2["KA"] = "KA";
  JKFKind2["HI"] = "HI";
  JKFKind2["OU"] = "OU";
  JKFKind2["TO"] = "TO";
  JKFKind2["NY"] = "NY";
  JKFKind2["NK"] = "NK";
  JKFKind2["NG"] = "NG";
  JKFKind2["UM"] = "UM";
  JKFKind2["RY"] = "RY";
  return JKFKind2;
})(JKFKind || {});
function msToJKFTimeMS(ms) {
  return {
    m: Math.floor(ms / (60 * 1e3)),
    s: Math.floor(ms / 1e3) % 60
  };
}
function msToJKFTimeHMS(ms) {
  return {
    h: Math.floor(ms / (60 * 60 * 1e3)),
    m: Math.floor(ms / (60 * 1e3)) % 60,
    s: Math.floor(ms / 1e3) % 60
  };
}
function jkfTimeToMs(time) {
  return ((time.h || 0) * 60 * 60 + time.m * 60 + time.s) * 1e3;
}
function colorToJKF(color) {
  switch (color) {
    case Color.BLACK:
      return 0;
    default:
      return 1;
  }
}
function jkfToColor(color) {
  switch (color) {
    default:
      return Color.BLACK;
    case 1:
      return Color.WHITE;
  }
}
function pieceTypeToJKF(type) {
  switch (type) {
    case PieceType.PAWN:
      return "FU";
    case PieceType.LANCE:
      return "KY";
    case PieceType.KNIGHT:
      return "KE";
    case PieceType.SILVER:
      return "GI";
    case PieceType.GOLD:
      return "KI";
    case PieceType.BISHOP:
      return "KA";
    case PieceType.ROOK:
      return "HI";
    case PieceType.KING:
      return "OU";
    case PieceType.PROM_PAWN:
      return "TO";
    case PieceType.PROM_LANCE:
      return "NY";
    case PieceType.PROM_KNIGHT:
      return "NK";
    case PieceType.PROM_SILVER:
      return "NG";
    case PieceType.HORSE:
      return "UM";
    case PieceType.DRAGON:
      return "RY";
  }
}
function jkfToPieceType(kind) {
  switch (kind) {
    case "FU":
      return PieceType.PAWN;
    case "KY":
      return PieceType.LANCE;
    case "KE":
      return PieceType.KNIGHT;
    case "GI":
      return PieceType.SILVER;
    case "KI":
      return PieceType.GOLD;
    case "KA":
      return PieceType.BISHOP;
    case "HI":
      return PieceType.ROOK;
    case "OU":
      return PieceType.KING;
    case "TO":
      return PieceType.PROM_PAWN;
    case "NY":
      return PieceType.PROM_LANCE;
    case "NK":
      return PieceType.PROM_KNIGHT;
    case "NG":
      return PieceType.PROM_SILVER;
    case "UM":
      return PieceType.HORSE;
    case "RY":
      return PieceType.DRAGON;
  }
}
const directionModifierToJKF = {
  左: "L",
  直: "C",
  右: "R",
  上: "U",
  寄: "M",
  引: "D",
  打: "H"
};
function importJKFString(data) {
  try {
    return importJKF(JSON.parse(data));
  } catch (e) {
    return new Error("failed to parse JSON: " + e);
  }
}
function importJKF(jkf) {
  try {
    const position = new Position();
    if (jkf.initial) {
      switch (jkf.initial.preset) {
        case "HIRATE":
          position.resetBySFEN(InitialPositionSFEN.STANDARD);
          break;
        case "KY":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_LANCE);
          break;
        case "KY_R":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_RIGHT_LANCE);
          break;
        case "KA":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_BISHOP);
          break;
        case "HI":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_ROOK);
          break;
        case "HIKY":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_ROOK_LANCE);
          break;
        case "2":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_2PIECES);
          break;
        case "4":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_4PIECES);
          break;
        case "6":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_6PIECES);
          break;
        case "8":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_8PIECES);
          break;
        case "10":
          position.resetBySFEN(InitialPositionSFEN.HANDICAP_10PIECES);
          break;
        case "OTHER":
          position.resetBySFEN(InitialPositionSFEN.EMPTY);
          if (jkf.initial.data) {
            position.setColor(jkfToColor(jkf.initial.data.color));
            if (Array.isArray(jkf.initial.data.board)) {
              for (let x = 1; x <= 9; x++) {
                for (let y = 1; y <= 9; y++) {
                  const piece = jkf.initial.data.board[x - 1][y - 1];
                  if (piece?.kind) {
                    const square = new Square(x, y);
                    const color = jkfToColor(piece.color);
                    const pieceType = jkfToPieceType(piece.kind);
                    position.board.set(square, new Piece(color, pieceType));
                  }
                }
              }
            }
            for (const kind of Object.values(JKFKind)) {
              const b = jkf.initial.data.hands[0][kind] || 0;
              position.blackHand.set(jkfToPieceType(kind), b);
              const w = jkf.initial.data.hands[1][kind] || 0;
              position.whiteHand.set(jkfToPieceType(kind), w);
            }
          }
          break;
        default:
          return new Error("initial position preset not supported: " + jkf.initial.preset);
      }
    }
    const record = new Record(position);
    Object.entries(jkf.header).forEach(([key, value]) => {
      const metadataKey = kakinokiToMetadataKey(key);
      if (metadataKey) {
        record.metadata.setStandardMetadata(metadataKey, value);
      } else {
        record.metadata.setCustomMetadata(key, value);
      }
    });
    const stack = [{ ply: 0, moves: jkf.moves }];
    while (stack.length > 0) {
      const entry = stack.pop();
      record.goto(entry.ply);
      for (const m of entry.moves) {
        const ply = record.current.ply;
        if (m.move) {
          let from;
          if (m.move.from) {
            from = new Square(m.move.from.x, m.move.from.y);
          } else if (m.move.relative && m.move.relative !== "H") {
            return new Error("unnormalized-JKF not supported.");
          } else {
            from = jkfToPieceType(m.move.piece);
          }
          let to;
          if (m.move.to) {
            to = new Square(m.move.to.x, m.move.to.y);
          } else if (m.move.same && record.current.prev?.move instanceof Move) {
            to = record.current.prev.move.to;
          } else {
            return new Error("invalid move: " + JSON.stringify(m.move));
          }
          let move = record.position.createMove(from, to);
          if (!move) {
            return new Error("invalid move: " + JSON.stringify(m.move));
          }
          if (m.move.promote) {
            move = move.withPromote();
          }
          record.append(move, { ignoreValidation: true });
        }
        if (m.special) {
          const move = getSpecialMoveByName(m.special, record.current.nextColor);
          if (move) {
            record.append(move);
          }
        }
        if (m.time) {
          record.current.setElapsedMs(jkfTimeToMs(m.time.now));
        }
        if (m.comments) {
          record.current.comment = m.comments.join("\n");
        }
        if (m.forks) {
          for (let i = m.forks.length - 1; i >= 0; i--) {
            stack.push({ ply, moves: m.forks[i] });
          }
        }
      }
    }
    record.goto(0);
    record.resetAllBranchSelection();
    return record;
  } catch (e) {
    return new Error("failed to  JKF: " + e);
  }
}
function buildJKFMoves(node, basePos) {
  const position = basePos.clone();
  const moves = [];
  for (; node; node = node.next) {
    const entry = {
      time: {
        now: msToJKFTimeMS(node.elapsedMs),
        total: msToJKFTimeHMS(node.totalElapsedMs)
      }
    };
    if (node.move instanceof Move) {
      const move = node.move;
      entry.move = {
        color: colorToJKF(move.color),
        piece: pieceTypeToJKF(move.pieceType),
        to: {
          x: move.to.file,
          y: move.to.rank
        }
      };
      if (move.from instanceof Square) {
        entry.move.from = {
          x: move.from.file,
          y: move.from.rank
        };
        if (node.prev?.move instanceof Move && node.prev.move.to === move.to) {
          entry.move.same = true;
        }
        if (move.promote) {
          entry.move.promote = true;
        } else if (isPromotable(move.pieceType) && (isPromotableRank(move.color, move.from.rank) || isPromotableRank(move.color, move.to.rank))) {
          entry.move.promote = false;
        }
        if (move.capturedPieceType) {
          entry.move.capture = pieceTypeToJKF(move.capturedPieceType);
        }
      }
      const relative = getDirectionModifier(move, position).split("").map((s) => {
        return directionModifierToJKF[s] || "";
      }).join("");
      if (relative) {
        entry.move.relative = relative;
      }
    } else {
      const command = getSpecialMoveName(node.move, reverseColor(node.nextColor));
      if (!command) {
        break;
      }
      entry.special = command;
    }
    if (node.comment) {
      entry.comments = node.comment.trimEnd().split("\n");
    }
    if (node.isFirstBranch) {
      const forks = [];
      for (let branch = node.branch; branch; branch = branch.branch) {
        forks.push(buildJKFMoves(branch, position));
      }
      if (forks.length !== 0) {
        entry.forks = forks;
      }
    }
    moves.push(entry);
    if (node.move instanceof Move) {
      position.doMove(node.move, { ignoreValidation: true });
    }
  }
  return moves;
}
function exportJKFString(record) {
  return JSON.stringify(exportJKF(record));
}
function exportJKF(record) {
  const header = {};
  for (const key of record.metadata.standardMetadataKeys) {
    const value = record.metadata.getStandardMetadata(key);
    if (value) {
      header[metadataKeyToKakinoki(key)] = value;
    }
  }
  for (const key of record.metadata.customMetadataKeys) {
    const value = record.metadata.getCustomMetadata(key);
    if (value) {
      header[key] = value;
    }
  }
  let initial;
  const blackHand = record.initialPosition.blackHand;
  const whiteHand = record.initialPosition.whiteHand;
  switch (record.initialPosition.sfen) {
    case InitialPositionSFEN.STANDARD:
      initial = { preset: "HIRATE" };
      break;
    case InitialPositionSFEN.HANDICAP_LANCE:
      initial = { preset: "KY" };
      break;
    case InitialPositionSFEN.HANDICAP_RIGHT_LANCE:
      initial = { preset: "KY_R" };
      break;
    case InitialPositionSFEN.HANDICAP_BISHOP:
      initial = { preset: "KA" };
      break;
    case InitialPositionSFEN.HANDICAP_ROOK:
      initial = { preset: "HI" };
      break;
    case InitialPositionSFEN.HANDICAP_ROOK_LANCE:
      initial = { preset: "HIKY" };
      break;
    case InitialPositionSFEN.HANDICAP_2PIECES:
      initial = { preset: "2" };
      break;
    case InitialPositionSFEN.HANDICAP_4PIECES:
      initial = { preset: "4" };
      break;
    case InitialPositionSFEN.HANDICAP_6PIECES:
      initial = { preset: "6" };
      break;
    case InitialPositionSFEN.HANDICAP_8PIECES:
      initial = { preset: "8" };
      break;
    case InitialPositionSFEN.HANDICAP_10PIECES:
      initial = { preset: "10" };
      break;
    default:
      initial = {
        preset: "OTHER",
        data: {
          color: colorToJKF(record.initialPosition.color),
          board: function() {
            const board = [[], [], [], [], [], [], [], [], []];
            for (let x = 1; x <= 9; x++) {
              for (let y = 1; y <= 9; y++) {
                const square = new Square(x, y);
                const piece = record.initialPosition.board.at(square);
                board[x - 1][y - 1] = piece ? {
                  color: colorToJKF(piece.color),
                  kind: pieceTypeToJKF(piece.type)
                } : {};
              }
            }
            return board;
          }(),
          hands: [
            {
              FU: blackHand.count(PieceType.PAWN),
              KY: blackHand.count(PieceType.LANCE),
              KE: blackHand.count(PieceType.KNIGHT),
              GI: blackHand.count(PieceType.SILVER),
              KI: blackHand.count(PieceType.GOLD),
              KA: blackHand.count(PieceType.BISHOP),
              HI: blackHand.count(PieceType.ROOK)
            },
            {
              FU: whiteHand.count(PieceType.PAWN),
              KY: whiteHand.count(PieceType.LANCE),
              KE: whiteHand.count(PieceType.KNIGHT),
              GI: whiteHand.count(PieceType.SILVER),
              KI: whiteHand.count(PieceType.GOLD),
              KA: whiteHand.count(PieceType.BISHOP),
              HI: whiteHand.count(PieceType.ROOK)
            }
          ]
        }
      };
      break;
  }
  const moves = [
    record.first.comment ? { comments: record.first.comment.trimEnd().split("\n") } : {},
    ...record.first.next ? buildJKFMoves(record.first.next, record.initialPosition) : []
  ];
  return {
    header,
    initial,
    moves
  };
}
var RecordFileFormat = /* @__PURE__ */ ((RecordFileFormat2) => {
  RecordFileFormat2["KIF"] = ".kif";
  RecordFileFormat2["KIFU"] = ".kifu";
  RecordFileFormat2["KI2"] = ".ki2";
  RecordFileFormat2["KI2U"] = ".ki2u";
  RecordFileFormat2["CSA"] = ".csa";
  RecordFileFormat2["SFEN"] = ".sfen";
  RecordFileFormat2["JKF"] = ".jkf";
  return RecordFileFormat2;
})(RecordFileFormat || {});
function detectRecordFileFormatByPath(path2) {
  for (const ext of Object.values(RecordFileFormat)) {
    if (path2.toLowerCase().endsWith(ext)) {
      return ext;
    }
  }
}
function getRecommendedEncodingByFileFormat(format) {
  switch (format) {
    default:
      return "UTF8";
    case ".kif":
    case ".ki2":
      return "SJIS";
  }
}
function importRecordFromBuffer(data, format, option) {
  const text = decodeText(data, {
    encoding: getRecommendedEncodingByFileFormat(format),
    autoDetect: option?.autoDetect
  });
  switch (format) {
    case ".kif":
    case ".kifu":
      return importKIF(text);
    case ".ki2":
    case ".ki2u":
      return importKI2(text);
    case ".csa":
      return importCSA(text);
    case ".sfen":
      return new Error(".sfen file import is not supported");
    case ".jkf":
      return importJKFString(text);
  }
}
function exportRecordAsBuffer(record, format, opt) {
  const encoding = getRecommendedEncodingByFileFormat(format);
  let str;
  switch (format) {
    case ".kif":
    case ".kifu":
      str = exportKIF(record, opt);
      break;
    case ".ki2":
    case ".ki2u":
      str = exportKI2(record, opt);
      break;
    case ".csa":
      str = exportCSA(record, opt);
      break;
    case ".sfen":
      throw new Error(".sfen file export is not supported");
    case ".jkf":
      str = exportJKFString(record);
  }
  const data = encodeText(str, encoding);
  let garbled = false;
  if (encoding === "SJIS" && opt.detectGarbled) {
    const restored = decodeText(data, { encoding: "SJIS" });
    if (restored !== str) {
      garbled = true;
    }
  }
  return { data, garbled };
}
var TextDecodingRule = /* @__PURE__ */ ((TextDecodingRule2) => {
  TextDecodingRule2["STRICT"] = "strict";
  TextDecodingRule2["AUTO_DETECT"] = "autoDetect";
  return TextDecodingRule2;
})(TextDecodingRule || {});
function defaultAppSetting(opt) {
  return {
    language: Language.JA,
    thema: "standard",
    backgroundImageType: "none",
    pieceImage: "hitomoji",
    kingPieceType: "gyokuAndOsho",
    deletePieceImageMargin: false,
    boardImage: "resin2",
    pieceStandImage: "standard",
    enableTransparent: false,
    boardOpacity: 1,
    pieceStandOpacity: 1,
    recordOpacity: 1,
    boardLabelType: "standard",
    leftSideControlType: "standard",
    rightSideControlType: "standard",
    pieceVolume: 30,
    clockVolume: 30,
    clockPitch: 500,
    clockSoundTarget: "onlyUser",
    boardFlipping: false,
    tabPaneType: "double",
    tab: "recordInfo",
    tab2: "comment",
    topPaneHeightPercentage: 60,
    topPanePreviousHeightPercentage: 60,
    bottomLeftPaneWidthPercentage: 60,
    defaultRecordFileFormat: RecordFileFormat.KIF,
    textDecodingRule: "autoDetect",
    returnCode: opt?.returnCode || "\r\n",
    autoSaveDirectory: opt?.autoSaveDirectory || "",
    enableUSIFileStartpos: true,
    enableUSIFileResign: false,
    translateEngineOptionName: true,
    engineTimeoutSeconds: 10,
    evaluationViewFrom: "each",
    coefficientInSigmoid: 600,
    badMoveLevelThreshold1: 5,
    badMoveLevelThreshold2: 10,
    badMoveLevelThreshold3: 20,
    badMoveLevelThreshold4: 50,
    showElapsedTimeInRecordView: true,
    showCommentInRecordView: true,
    enableAppLog: false,
    enableUSILog: false,
    enableCSALog: false,
    logLevel: LogLevel.INFO,
    positionImageStyle: "book",
    positionImageSize: 500,
    positionImageTypeface: "gothic",
    positionImageHandLabelType: "playerName",
    useBookmarkAsPositionImageHeader: false,
    positionImageHeader: "",
    positionImageCharacterY: 0,
    positionImageFontScale: 1,
    lastRecordFilePath: "",
    lastUSIEngineFilePath: "",
    lastImageExportFilePath: "",
    lastOtherFilePath: "",
    emptyRecordInfoVisibility: true
  };
}
function normalizeAppSetting(setting, opt) {
  const result = {
    ...defaultAppSetting(opt),
    ...setting
  };
  if (result.autoSaveDirectory.endsWith("\\") || result.autoSaveDirectory.endsWith("/")) {
    result.autoSaveDirectory = result.autoSaveDirectory.slice(0, -1);
  }
  if (!setting.pieceStandImage) {
    switch (setting.boardImage) {
      default:
        result.pieceStandImage = "standard";
        break;
      case "dark":
        result.pieceStandImage = "dark";
        break;
      case "green":
        result.pieceStandImage = "green";
        break;
      case "cherry-blossom":
        result.pieceStandImage = "cherry-blossom";
        break;
    }
  }
  if (result.tab === "invisible") {
    result.tab = "recordInfo";
  }
  return result;
}
function defaultWindowSetting() {
  return {
    width: 1e3,
    height: 800,
    maximized: false,
    fullscreen: false
  };
}
function normalizeWindowSetting(setting) {
  return {
    ...defaultWindowSetting(),
    ...setting
  };
}
function buildWindowSetting(latest, win2) {
  const normal = !win2.isMaximized() && !win2.isFullScreen();
  return {
    height: normal ? win2.getBounds().height : latest.height,
    width: normal ? win2.getBounds().width : latest.width,
    maximized: win2.isMaximized(),
    fullscreen: win2.isFullScreen()
  };
}
function defaultPlayerSetting() {
  return {
    name: "人",
    uri: ES_HUMAN
  };
}
function defaultTimeLimitSetting() {
  return {
    timeSeconds: 0,
    byoyomi: 30,
    increment: 0
  };
}
function defaultGameSetting() {
  return {
    black: defaultPlayerSetting(),
    white: defaultPlayerSetting(),
    timeLimit: defaultTimeLimitSetting(),
    enableEngineTimeout: false,
    humanIsFront: true,
    enableComment: true,
    enableAutoSave: true,
    repeat: 1,
    swapPlayers: false,
    maxMoves: 1e3
  };
}
function normalizeGameSetting(setting) {
  return {
    ...defaultGameSetting(),
    ...setting,
    black: {
      ...defaultPlayerSetting(),
      ...setting.black
    },
    white: {
      ...defaultPlayerSetting(),
      ...setting.white
    },
    timeLimit: {
      ...defaultTimeLimitSetting(),
      ...setting.timeLimit
    }
  };
}
function defaultResearchSetting() {
  return {
    enableMaxSeconds: false,
    maxSeconds: 10
  };
}
function normalizeResearchSetting(setting) {
  return {
    ...defaultResearchSetting(),
    ...setting,
    secondaries: setting.secondaries?.filter((secondary) => !!secondary.usi)
  };
}
function defaultStartCriteria() {
  return {
    enableNumber: false,
    number: 20
  };
}
function defaultEndCriteria() {
  return {
    enableNumber: false,
    number: 100
  };
}
function defaultPerMoveCriteria() {
  return {
    maxSeconds: 5
  };
}
function defaultAnalysisSetting() {
  return {
    startCriteria: defaultStartCriteria(),
    endCriteria: defaultEndCriteria(),
    perMoveCriteria: defaultPerMoveCriteria(),
    commentBehavior: "insert"
    /* INSERT */
  };
}
function normalizeAnalysisSetting(setting) {
  return {
    ...defaultAnalysisSetting(),
    ...setting,
    startCriteria: {
      ...defaultStartCriteria(),
      ...setting.startCriteria
    },
    endCriteria: {
      ...defaultEndCriteria(),
      ...setting.endCriteria
    },
    perMoveCriteria: {
      ...defaultPerMoveCriteria(),
      ...setting.perMoveCriteria
    }
  };
}
function getDateTimeString(date) {
  return (date || /* @__PURE__ */ new Date()).toLocaleTimeString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}
function isDevelopment() {
  return process.env.npm_lifecycle_event === "electron:serve" && !isTest();
}
function isPreview() {
  return process.env.npm_lifecycle_event === "electron:preview";
}
function isTest() {
  return process.env.NODE_ENV === "test";
}
function isPortable() {
  return process.env.PORTABLE_EXECUTABLE_DIR !== void 0;
}
function getPortableExeDir() {
  return process.env.PORTABLE_EXECUTABLE_DIR;
}
let tempPathForTesting;
function getTempPathForTesting() {
  if (!tempPathForTesting) {
    tempPathForTesting = fs.mkdtempSync(path.join(os.tmpdir(), "electron-shogi-test-"));
  }
  return tempPathForTesting;
}
function getAppPath(name) {
  if (isTest()) {
    const tempPath = path.join(getTempPathForTesting(), name);
    fs.mkdirSync(tempPath, { recursive: true });
    return tempPath;
  }
  return require$$0.app.getPath(name);
}
const rootDir$1 = getAppPath("logs");
function openLogsDirectory() {
  require$$0.shell.openPath(rootDir$1);
}
const datetime = getDateTimeString().replaceAll(" ", "_").replaceAll("/", "").replaceAll(":", "");
const appLogPath = path.join(rootDir$1, `app-${datetime}.log`);
const usiLogPath = path.join(rootDir$1, `usi-${datetime}.log`);
const csaLogPath = path.join(rootDir$1, `csa-${datetime}.log`);
const config = {
  appenders: {
    stdout: { type: "stdout" },
    recording: { type: "recording" }
  },
  categories: {
    default: { appenders: ["stdout"], level: "info" }
  }
};
function getFilePath(type) {
  switch (type) {
    case LogType.APP:
      return appLogPath;
    case LogType.USI:
      return usiLogPath;
    case LogType.CSA:
      return csaLogPath;
  }
}
function isLogEnabled(type, appSetting) {
  switch (type) {
    case LogType.APP:
      return appSetting.enableAppLog;
    case LogType.USI:
      return appSetting.enableUSILog;
    case LogType.CSA:
      return appSetting.enableCSALog;
  }
}
const loggers = {};
function getLogger(type) {
  if (loggers[type]) {
    return loggers[type];
  }
  if (!config.appenders[type]) {
    const appSetting = loadAppSettingOnce();
    config.appenders[type] = { type: "file", filename: getFilePath(type) };
    config.categories[type] = {
      appenders: isLogEnabled(type, appSetting) ? [type] : !isTest() ? ["stdout"] : ["recording"],
      level: appSetting.logLevel
    };
  }
  const logger = log4js.configure(config).getLogger(type);
  loggers[type] = logger;
  return logger;
}
function getAppLogger() {
  return getLogger(LogType.APP);
}
function getUSILogger() {
  return getLogger(LogType.USI);
}
function getCSALogger() {
  return getLogger(LogType.CSA);
}
function shutdownLoggers() {
  log4js.shutdown((e) => {
    console.error("failed to shutdown loggers:", e);
  });
}
function openLogFile(logType) {
  require$$0.shell.openPath(getFilePath(logType));
}
var CSAProtocolVersion = /* @__PURE__ */ ((CSAProtocolVersion2) => {
  CSAProtocolVersion2["V121"] = "v121";
  CSAProtocolVersion2["V121_FLOODGATE"] = "v121_floodgate";
  return CSAProtocolVersion2;
})(CSAProtocolVersion || {});
function defaultCSAGameSettingHistory() {
  return {
    player: {
      name: "人",
      uri: ES_HUMAN
    },
    serverHistory: [],
    autoFlip: true,
    enableComment: true,
    enableAutoSave: true,
    repeat: 1,
    autoRelogin: true
  };
}
function emptySecureCSAServerSetting() {
  return {
    protocolVersion: "v121",
    host: "",
    port: 0,
    id: ""
  };
}
function defaultSecureCSAGameSettingHistory() {
  return {
    player: {
      name: "人",
      uri: ES_HUMAN
    },
    serverHistory: [],
    autoFlip: true,
    enableComment: true,
    enableAutoSave: true,
    repeat: 1,
    autoRelogin: true
  };
}
function normalizeSecureCSAGameSettingHistory(history) {
  const serverHistory = [];
  for (const setting of history.serverHistory) {
    serverHistory.push({
      ...emptySecureCSAServerSetting(),
      ...setting
    });
  }
  return {
    ...defaultSecureCSAGameSettingHistory(),
    ...history,
    player: {
      ...defaultPlayerSetting(),
      ...history.player
    },
    serverHistory
  };
}
function encryptCSAGameSettingHistory(history, encryptor) {
  const serverHistory = [];
  for (const setting of history.serverHistory) {
    const entry = {
      protocolVersion: setting.protocolVersion,
      host: setting.host,
      port: setting.port,
      id: setting.id
    };
    if (encryptor) {
      entry.encryptedPassword = encryptor(setting.password);
    } else {
      entry.password = setting.password;
    }
    serverHistory.push(entry);
  }
  return {
    player: history.player,
    serverHistory,
    autoFlip: history.autoFlip,
    enableComment: history.enableComment,
    enableAutoSave: history.enableAutoSave,
    repeat: history.repeat,
    autoRelogin: history.autoRelogin
  };
}
function decryptCSAGameSettingHistory(history, decryptor) {
  const serverHistory = [];
  for (const setting of history.serverHistory) {
    serverHistory.push({
      protocolVersion: setting.protocolVersion,
      host: setting.host,
      port: setting.port,
      id: setting.id,
      password: decryptor && setting.encryptedPassword ? decryptor(setting.encryptedPassword) : setting.password || ""
    });
  }
  return {
    player: history.player,
    serverHistory,
    autoFlip: history.autoFlip,
    enableComment: history.enableComment,
    enableAutoSave: history.enableAutoSave,
    repeat: history.repeat,
    autoRelogin: history.autoRelogin
  };
}
function isEncryptionAvailable() {
  return require$$0.safeStorage.isEncryptionAvailable();
}
function EncryptString(plainText) {
  return require$$0.safeStorage.encryptString(plainText).toString("base64");
}
function DecryptString(encrypted, defaultValue) {
  try {
    return require$$0.safeStorage.decryptString(Buffer.from(encrypted, "base64"));
  } catch (e) {
    getAppLogger().error("failed to decrypt CSA server password: %s", e);
    return defaultValue || "";
  }
}
function defaultMateSearchSetting() {
  return {};
}
function normalizeMateSearchSetting(setting) {
  return {
    ...defaultMateSearchSetting(),
    ...setting
  };
}
var DestinationType = /* @__PURE__ */ ((DestinationType2) => {
  DestinationType2["DIRECTORY"] = "directory";
  DestinationType2["SINGLE_FILE"] = "singleFile";
  return DestinationType2;
})(DestinationType || {});
var FileNameConflictAction = /* @__PURE__ */ ((FileNameConflictAction2) => {
  FileNameConflictAction2["OVERWRITE"] = "overwrite";
  FileNameConflictAction2["NUMBER_SUFFIX"] = "numberSuffix";
  FileNameConflictAction2["SKIP"] = "skip";
  return FileNameConflictAction2;
})(FileNameConflictAction || {});
function defaultBatchConversionSetting() {
  return {
    source: "",
    sourceFormats: [
      RecordFileFormat.KIF,
      RecordFileFormat.KIFU,
      RecordFileFormat.KI2,
      RecordFileFormat.KI2U,
      RecordFileFormat.CSA,
      RecordFileFormat.JKF
    ],
    subdirectories: true,
    destinationType: "directory",
    destination: "",
    createSubdirectories: true,
    destinationFormat: RecordFileFormat.KIF,
    fileNameConflictAction: "numberSuffix",
    singleFileDestination: ""
  };
}
function normalizeBatchConversionSetting(setting) {
  return {
    ...defaultBatchConversionSetting(),
    ...setting
  };
}
async function exists(path2) {
  try {
    await fs.promises.lstat(path2);
    return true;
  } catch {
    return false;
  }
}
async function listFiles(dir, maxDepth) {
  const files = [];
  const fdir = await fs.promises.readdir(dir);
  for (const file of fdir) {
    const fullPath = path.join(dir, file);
    const stat = await fs.promises.lstat(fullPath);
    if (stat.isFile()) {
      files.push(fullPath);
    } else if (maxDepth > 0 && stat.isDirectory()) {
      files.push(...await listFiles(fullPath, maxDepth - 1));
    }
  }
  return files;
}
const userDir$1 = getAppPath("userData");
const rootDir = getPortableExeDir() || userDir$1;
const docDir = path.join(getAppPath("documents"), "ElectronShogi");
function openSettingsDirectory() {
  require$$0.shell.openPath(rootDir);
}
async function openAutoSaveDirectory() {
  const appSetting = await loadAppSetting();
  require$$0.shell.openPath(appSetting.autoSaveDirectory || docDir);
}
const windowSettingPath = path.join(userDir$1, "window.json");
function saveWindowSetting(setting) {
  try {
    fs.writeFileSync(windowSettingPath, JSON.stringify(setting, void 0, 2), "utf8");
  } catch (e) {
    getAppLogger().error("failed to write window setting: %s", e);
  }
}
function loadWindowSetting() {
  try {
    return normalizeWindowSetting(JSON.parse(fs.readFileSync(windowSettingPath, "utf8")));
  } catch (e) {
    getAppLogger().error("failed to read window setting: %s", e);
    return defaultWindowSetting();
  }
}
const usiEngineSettingPath = path.join(rootDir, "usi_engine.json");
async function saveUSIEngineSetting(setting) {
  await fs.promises.writeFile(usiEngineSettingPath, setting.jsonWithIndent, "utf8");
}
async function loadUSIEngineSetting() {
  if (!await exists(usiEngineSettingPath)) {
    return new USIEngineSettings();
  }
  return new USIEngineSettings(await fs.promises.readFile(usiEngineSettingPath, "utf8"));
}
const appSettingPath = path.join(userDir$1, "app_setting.json");
async function saveAppSetting(setting) {
  await fs.promises.writeFile(appSettingPath, JSON.stringify(setting, void 0, 2), "utf8");
}
const defaultReturnCode = process.platform === "win32" ? "\r\n" : "\n";
function getDefaultAppSetting() {
  return defaultAppSetting({
    returnCode: defaultReturnCode,
    autoSaveDirectory: docDir
  });
}
function loadAppSettingFromMemory(json) {
  return normalizeAppSetting(JSON.parse(json), {
    returnCode: defaultReturnCode,
    autoSaveDirectory: docDir
  });
}
function loadAppSettingSync() {
  if (!fs.existsSync(appSettingPath)) {
    return getDefaultAppSetting();
  }
  return loadAppSettingFromMemory(fs.readFileSync(appSettingPath, "utf8"));
}
let appSettingCache;
function loadAppSettingOnce() {
  if (!appSettingCache) {
    appSettingCache = loadAppSettingSync();
  }
  return appSettingCache;
}
async function loadAppSetting() {
  if (!await exists(appSettingPath)) {
    return getDefaultAppSetting();
  }
  return loadAppSettingFromMemory(await fs.promises.readFile(appSettingPath, "utf8"));
}
const batchConversionSettingPath = path.join(rootDir, "batch_conversion_setting.json");
async function saveBatchConversionSetting(setting) {
  await fs.promises.writeFile(
    batchConversionSettingPath,
    JSON.stringify(setting, void 0, 2),
    "utf8"
  );
}
async function loadBatchConversionSetting() {
  if (!await exists(batchConversionSettingPath)) {
    return defaultBatchConversionSetting();
  }
  return normalizeBatchConversionSetting(
    JSON.parse(await fs.promises.readFile(batchConversionSettingPath, "utf8"))
  );
}
const gameSettingPath = path.join(rootDir, "game_setting.json");
async function saveGameSetting(setting) {
  await fs.promises.writeFile(gameSettingPath, JSON.stringify(setting, void 0, 2), "utf8");
}
async function loadGameSetting() {
  if (!await exists(gameSettingPath)) {
    return defaultGameSetting();
  }
  return normalizeGameSetting(JSON.parse(await fs.promises.readFile(gameSettingPath, "utf8")));
}
const csaGameSettingHistoryPath = path.join(rootDir, "csa_game_setting_history.json");
async function saveCSAGameSettingHistory(setting) {
  const encrypted = encryptCSAGameSettingHistory(
    setting,
    isEncryptionAvailable() ? EncryptString : void 0
  );
  await fs.promises.writeFile(
    csaGameSettingHistoryPath,
    JSON.stringify(encrypted, void 0, 2),
    "utf8"
  );
}
async function loadCSAGameSettingHistory() {
  if (!await exists(csaGameSettingHistoryPath)) {
    return defaultCSAGameSettingHistory();
  }
  const encrypted = JSON.parse(await fs.promises.readFile(csaGameSettingHistoryPath, "utf8"));
  return decryptCSAGameSettingHistory(
    normalizeSecureCSAGameSettingHistory(encrypted),
    isEncryptionAvailable() ? DecryptString : void 0
  );
}
const researchSettingPath = path.join(rootDir, "research_setting.json");
async function saveResearchSetting(setting) {
  await fs.promises.writeFile(researchSettingPath, JSON.stringify(setting, void 0, 2), "utf8");
}
async function loadResearchSetting() {
  if (!await exists(researchSettingPath)) {
    return defaultResearchSetting();
  }
  return normalizeResearchSetting(
    JSON.parse(await fs.promises.readFile(researchSettingPath, "utf8"))
  );
}
const analysisSettingPath = path.join(rootDir, "analysis_setting.json");
async function saveAnalysisSetting(setting) {
  await fs.promises.writeFile(analysisSettingPath, JSON.stringify(setting, void 0, 2), "utf8");
}
async function loadAnalysisSetting() {
  if (!await exists(analysisSettingPath)) {
    return defaultAnalysisSetting();
  }
  return normalizeAnalysisSetting(
    JSON.parse(await fs.promises.readFile(analysisSettingPath, "utf8"))
  );
}
const mateSearchSettingPath = path.join(rootDir, "mate_search_setting.json");
async function saveMateSearchSetting(setting) {
  await fs.promises.writeFile(mateSearchSettingPath, JSON.stringify(setting, void 0, 2), "utf8");
}
async function loadMateSearchSetting() {
  if (!await exists(mateSearchSettingPath)) {
    return defaultMateSearchSetting();
  }
  return normalizeMateSearchSetting(
    JSON.parse(await fs.promises.readFile(mateSearchSettingPath, "utf8"))
  );
}
var MenuEvent = /* @__PURE__ */ ((MenuEvent2) => {
  MenuEvent2["NEW_RECORD"] = "newRecord";
  MenuEvent2["OPEN_RECORD"] = "openRecord";
  MenuEvent2["SAVE_RECORD"] = "saveRecord";
  MenuEvent2["SAVE_RECORD_AS"] = "saveRecordAs";
  MenuEvent2["HISTORY"] = "history";
  MenuEvent2["BATCH_CONVERSION"] = "batchConversion";
  MenuEvent2["EXPORT_POSITION_IMAGE"] = "exportPositionImage";
  MenuEvent2["COPY_RECORD"] = "copyRecord";
  MenuEvent2["COPY_RECORD_KI2"] = "copyRecordKi2";
  MenuEvent2["COPY_RECORD_CSA"] = "copyRecordCsa";
  MenuEvent2["COPY_RECORD_USI_BEFORE"] = "copyRecordUsiBefore";
  MenuEvent2["COPY_RECORD_USI_ALL"] = "copyRecordUsiAll";
  MenuEvent2["COPY_RECORD_JKF"] = "copyRecordJkf";
  MenuEvent2["COPY_BOARD_SFEN"] = "copyRecordSfen";
  MenuEvent2["PASTE_RECORD"] = "pasteRecord";
  MenuEvent2["INSERT_INTERRUPT"] = "insertInterrupt";
  MenuEvent2["INSERT_RESIGN"] = "insertResign";
  MenuEvent2["INSERT_DRAW"] = "insertDraw";
  MenuEvent2["INSERT_IMPASS"] = "insertImpass";
  MenuEvent2["INSERT_REPETITION_DRAW"] = "insertRepetitionDraw";
  MenuEvent2["INSERT_MATE"] = "insertMate";
  MenuEvent2["INSERT_NO_MATE"] = "insertNoMate";
  MenuEvent2["INSERT_TIMEOUT"] = "insertTimeout";
  MenuEvent2["INSERT_FOUL_WIN"] = "insertFoulWin";
  MenuEvent2["INSERT_FOUL_LOSE"] = "insertFoulLose";
  MenuEvent2["INSERT_ENTERING_OF_KING"] = "insertEnteringOfKing";
  MenuEvent2["INSERT_WIN_BY_DEFAULT"] = "insertWinByDefault";
  MenuEvent2["INSERT_LOSE_BY_DEFAULT"] = "insertLossByDefault";
  MenuEvent2["REMOVE_CURRENT_MOVE"] = "remvoeCurrentMove";
  MenuEvent2["START_POSITION_EDITING"] = "startPositionEditing";
  MenuEvent2["END_POSITION_EDITING"] = "endPositionEditing";
  MenuEvent2["CHANGE_TURN"] = "changeTurn";
  MenuEvent2["INIT_POSITION"] = "initPosition";
  MenuEvent2["START_RESEARCH"] = "startResearch";
  MenuEvent2["STOP_RESEARCH"] = "stopResearch";
  MenuEvent2["START_ANALYSIS"] = "startAnalysis";
  MenuEvent2["STOP_ANALYSIS"] = "stopAnalysis";
  MenuEvent2["START_MATE_SEARCH"] = "startMateSearch";
  MenuEvent2["STOP_MATE_SEARCH"] = "stopMateSearch";
  MenuEvent2["START_GAME"] = "startGame";
  MenuEvent2["START_CSA_GAME"] = "startCSAGame";
  MenuEvent2["STOP_GAME"] = "stopGame";
  MenuEvent2["RESIGN"] = "resign";
  MenuEvent2["WIN"] = "win";
  MenuEvent2["LOGOUT"] = "logout";
  MenuEvent2["FLIP_BOARD"] = "flipBoard";
  MenuEvent2["APP_SETTING_DIALOG"] = "appSetting";
  MenuEvent2["USI_ENGINE_SETTING_DIALOG"] = "usiEngineSetting";
  return MenuEvent2;
})(MenuEvent || {});
var AppState = /* @__PURE__ */ ((AppState2) => {
  AppState2["NORMAL"] = "normal";
  AppState2["PASTE_DIALOG"] = "pasteDialog";
  AppState2["POSITION_EDITING"] = "positionEditing";
  AppState2["EXPORT_POSITION_IMAGE_DIALOG"] = "exportBoardImageDialog";
  AppState2["GAME_DIALOG"] = "gameDialog";
  AppState2["GAME"] = "game";
  AppState2["CSA_GAME_DIALOG"] = "csaGameDialog";
  AppState2["CSA_GAME"] = "csaGame";
  AppState2["RESEARCH"] = "research";
  AppState2["RESEARCH_DIALOG"] = "researchDialog";
  AppState2["ANALYSIS"] = "analysis";
  AppState2["ANALYSIS_DIALOG"] = "analysisDialog";
  AppState2["MATE_SEARCH"] = "mateSearch";
  AppState2["MATE_SEARCH_DIALOG"] = "mateSearchDialog";
  AppState2["USI_ENGINE_SETTING_DIALOG"] = "usiEngineSettingDialog";
  AppState2["RECORD_FILE_HISTORY_DIALOG"] = "recordFileHistoryDialog";
  AppState2["BATCH_CONVERSION_DIALOG"] = "batchConversionDialog";
  return AppState2;
})(AppState || {});
function openWebSite() {
  require$$0.shell.openExternal("https://sunfish-shogi.github.io/electron-shogi/");
}
function openHowToUse() {
  require$$0.shell.openExternal(
    "https://github.com/sunfish-shogi/electron-shogi/wiki/%E4%BD%BF%E3%81%84%E6%96%B9"
  );
}
function checkLatestVersion() {
  require$$0.shell.openExternal("https://github.com/sunfish-shogi/electron-shogi/releases/latest");
}
const isMac = process.platform === "darwin";
const stateChangeCallbacks = [];
function menuItem(label, event, appStates, accelerator, ...args) {
  const index = stateChangeCallbacks.length;
  const id = "menuItem" + index;
  stateChangeCallbacks.push((appState2, bussy) => {
    const menu = require$$0.Menu.getApplicationMenu();
    if (!menu) {
      return;
    }
    const item = menu.getMenuItemById(id);
    if (!item) {
      return;
    }
    item.enabled = bussy ? false : !appStates || appStates.length === 0 ? true : !!appStates.find((value) => value === appState2);
  });
  return {
    id,
    label,
    accelerator,
    click: () => onMenuEvent(event, ...args)
  };
}
function createMenuTemplate() {
  const menuTemplate = [
    {
      label: t.file,
      submenu: [
        menuItem(t.newRecord, MenuEvent.NEW_RECORD, [AppState.NORMAL]),
        menuItem(t.openRecord, MenuEvent.OPEN_RECORD, [AppState.NORMAL], "CmdOrCtrl+O"),
        menuItem(t.saveRecord, MenuEvent.SAVE_RECORD, [AppState.NORMAL], "CmdOrCtrl+S"),
        menuItem(t.saveRecordAs, MenuEvent.SAVE_RECORD_AS, [AppState.NORMAL], "CmdOrCtrl+Shift+S"),
        menuItem(t.history, MenuEvent.HISTORY, [AppState.NORMAL], "CmdOrCtrl+H"),
        { type: "separator" },
        menuItem(t.batchConversion, MenuEvent.BATCH_CONVERSION, [AppState.NORMAL]),
        menuItem(
          t.exportPositionImage,
          MenuEvent.EXPORT_POSITION_IMAGE,
          [AppState.NORMAL],
          "CmdOrCtrl+Shift+E"
        ),
        { type: "separator" },
        {
          label: t.openAutoSavingDirectory,
          click: openAutoSaveDirectory
        },
        { type: "separator" },
        isMac ? { role: "close", label: t.close } : { role: "quit", label: t.quit }
      ]
    },
    {
      label: t.editing,
      submenu: [
        {
          label: t.copyRecord,
          submenu: [
            menuItem(t.asKIF, MenuEvent.COPY_RECORD, null, "CmdOrCtrl+C"),
            menuItem(t.asKI2, MenuEvent.COPY_RECORD_KI2, null),
            menuItem(t.asCSA, MenuEvent.COPY_RECORD_CSA, null),
            menuItem(t.asUSIUntilCurrentMove, MenuEvent.COPY_RECORD_USI_BEFORE, null),
            menuItem(t.asUSIAll, MenuEvent.COPY_RECORD_USI_ALL, null),
            menuItem(t.asJSONKifuFormat, MenuEvent.COPY_RECORD_JKF, null)
          ]
        },
        menuItem(t.copyPositionAsSFEN, MenuEvent.COPY_BOARD_SFEN, null),
        menuItem(t.pasteRecordOrPosition, MenuEvent.PASTE_RECORD, [AppState.NORMAL], "CmdOrCtrl+V"),
        { type: "separator" },
        {
          label: t.appendSpecialMove,
          submenu: [
            menuItem(t.interrupt, MenuEvent.INSERT_INTERRUPT, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.resign, MenuEvent.INSERT_RESIGN, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.draw, MenuEvent.INSERT_DRAW, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.impass, MenuEvent.INSERT_IMPASS, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.repetitionDraw, MenuEvent.INSERT_REPETITION_DRAW, [
              AppState.NORMAL,
              AppState.RESEARCH
            ]),
            menuItem(t.mate, MenuEvent.INSERT_MATE, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.noMate, MenuEvent.INSERT_NO_MATE, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.timeout, MenuEvent.INSERT_TIMEOUT, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.foulWin, MenuEvent.INSERT_FOUL_WIN, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.foulLose, MenuEvent.INSERT_FOUL_LOSE, [AppState.NORMAL, AppState.RESEARCH]),
            menuItem(t.enteringOfKing, MenuEvent.INSERT_ENTERING_OF_KING, [
              AppState.NORMAL,
              AppState.RESEARCH
            ]),
            menuItem(t.winByDefault, MenuEvent.INSERT_WIN_BY_DEFAULT, [
              AppState.NORMAL,
              AppState.RESEARCH
            ]),
            menuItem(t.loseByDefault, MenuEvent.INSERT_LOSE_BY_DEFAULT, [
              AppState.NORMAL,
              AppState.RESEARCH
            ])
          ]
        },
        menuItem(
          t.deleteMoves,
          MenuEvent.REMOVE_CURRENT_MOVE,
          [AppState.NORMAL, AppState.RESEARCH, AppState.MATE_SEARCH],
          "CmdOrCtrl+D"
        ),
        { type: "separator" },
        menuItem(t.startPositionSetup, MenuEvent.START_POSITION_EDITING, [AppState.NORMAL]),
        menuItem(t.completePositionSetup, MenuEvent.END_POSITION_EDITING, [
          AppState.POSITION_EDITING
        ]),
        menuItem(t.changeTurn, MenuEvent.CHANGE_TURN, [AppState.POSITION_EDITING]),
        {
          label: t.initializePosition,
          submenu: [
            menuItem(
              t.nonHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.STANDARD
            ),
            menuItem(
              t.lanceHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_LANCE
            ),
            menuItem(
              t.rightLanceHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_RIGHT_LANCE
            ),
            menuItem(
              t.bishopHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_BISHOP
            ),
            menuItem(
              t.rookHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_ROOK
            ),
            menuItem(
              t.rookLanceHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_ROOK_LANCE
            ),
            menuItem(
              t.twoPiecesHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_2PIECES
            ),
            menuItem(
              t.fourPiecesHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_4PIECES
            ),
            menuItem(
              t.sixPiecesHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_6PIECES
            ),
            menuItem(
              t.eightPiecesHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_8PIECES
            ),
            menuItem(
              t.tenPiecesHandicap,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.HANDICAP_10PIECES
            ),
            menuItem(
              t.tsumeShogi,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.TSUME_SHOGI
            ),
            menuItem(
              t.doubleKingTsumeShogi,
              MenuEvent.INIT_POSITION,
              [AppState.POSITION_EDITING],
              void 0,
              InitialPositionSFEN.TSUME_SHOGI_2KINGS
            )
          ]
        }
      ]
    },
    {
      label: t.game,
      submenu: [
        menuItem(t.game, MenuEvent.START_GAME, [AppState.NORMAL], "CmdOrCtrl+G"),
        menuItem(t.csaOnlineGame, MenuEvent.START_CSA_GAME, [AppState.NORMAL]),
        menuItem(t.interrupt, MenuEvent.STOP_GAME, [AppState.GAME]),
        menuItem(t.resign, MenuEvent.RESIGN, [AppState.GAME, AppState.CSA_GAME]),
        menuItem(t.winByDeclaration, MenuEvent.WIN, [AppState.CSA_GAME]),
        { type: "separator" },
        menuItem(t.logout, MenuEvent.LOGOUT, [AppState.CSA_GAME])
      ]
    },
    {
      label: t.mateSearch,
      submenu: [
        menuItem(t.mateSearch, MenuEvent.START_MATE_SEARCH, [AppState.NORMAL], "CmdOrCtrl+M"),
        menuItem(t.stopMateSearch, MenuEvent.STOP_MATE_SEARCH, [AppState.MATE_SEARCH])
      ]
    },
    {
      label: t.research,
      submenu: [
        menuItem(t.startResearch, MenuEvent.START_RESEARCH, [AppState.NORMAL], "CmdOrCtrl+R"),
        menuItem(t.endResearch, MenuEvent.STOP_RESEARCH, [AppState.RESEARCH]),
        { type: "separator" },
        menuItem(t.analyze, MenuEvent.START_ANALYSIS, [AppState.NORMAL], "CmdOrCtrl+A"),
        menuItem(t.stopAnalysis, MenuEvent.STOP_ANALYSIS, [AppState.ANALYSIS])
      ]
    },
    {
      label: t.view,
      submenu: [
        {
          label: t.toggleFullScreen,
          role: "togglefullscreen"
        },
        menuItem(t.flipBoard, MenuEvent.FLIP_BOARD, null, "CmdOrCtrl+T"),
        {
          label: t.defaultFontSize,
          click: () => {
            getWebContents().setZoomLevel(0);
          },
          accelerator: "CmdOrCtrl+0"
        },
        {
          label: t.largerFontSize,
          click: () => {
            const level = getWebContents().getZoomLevel();
            getWebContents().setZoomLevel(level + 1);
          },
          accelerator: "CmdOrCtrl+Plus"
        },
        {
          label: t.smallerFontSize,
          click: () => {
            const level = getWebContents().getZoomLevel();
            getWebContents().setZoomLevel(level - 1);
          },
          accelerator: "CmdOrCtrl+-"
        }
      ]
    },
    {
      label: t.settings,
      submenu: [
        menuItem(t.appSettings, MenuEvent.APP_SETTING_DIALOG, null, "CmdOrCtrl+,"),
        menuItem(
          t.engineSettings,
          MenuEvent.USI_ENGINE_SETTING_DIALOG,
          [AppState.NORMAL],
          "CmdOrCtrl+."
        )
      ]
    },
    {
      label: t.debug,
      submenu: [
        {
          label: t.toggleDevTools,
          role: "toggleDevTools"
        },
        { type: "separator" },
        {
          label: t.openAppDirectory,
          click: () => {
            require$$0.shell.openPath(path.dirname(getAppPath("exe")));
          }
        },
        {
          label: t.openSettingDirectory,
          click: openSettingsDirectory
        },
        {
          label: t.openLogDirectory,
          click: openLogsDirectory
        }
      ]
    },
    {
      label: t.help,
      submenu: [
        {
          label: t.openWebSite,
          click: openWebSite
        },
        {
          label: t.howToUse,
          click: openHowToUse
        },
        {
          label: t.checkForUpdates,
          click: checkLatestVersion
        }
      ]
    }
  ];
  if (isMac) {
    menuTemplate.unshift({
      label: require$$0.app.name,
      submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }]
    });
  }
  return menuTemplate;
}
function setupMenu() {
  const menu = require$$0.Menu.buildFromTemplate(createMenuTemplate());
  require$$0.Menu.setApplicationMenu(menu);
}
function updateAppState(appState2, bussy) {
  Array.from(stateChangeCallbacks).forEach((callback) => callback(appState2, bussy));
}
const SCORE_MATE_INFINITE = 1e4;
class ChildProcess {
  handle;
  readline = null;
  _lastSended = null;
  constructor(cmd) {
    this.handle = child_process.spawn(cmd, {
      cwd: path.dirname(cmd)
    }).on("close", this.onClose.bind(this));
  }
  get lastSended() {
    return this._lastSended;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event, listener) {
    switch (event) {
      case "receive":
        if (this.readline === null) {
          this.readline = readline.createInterface(this.handle.stdout);
        }
        this.readline.on("line", listener);
        break;
      case "close":
        this.handle.on("close", (code, signal) => {
          this.onClose();
          listener(code, signal);
        });
        break;
      default:
        this.handle.on(event, listener);
        break;
    }
    return this;
  }
  send(line) {
    this.handle.stdin.write(line + "\n");
    this._lastSended = line;
  }
  kill() {
    this.onClose();
    this.handle.kill();
  }
  onClose() {
    if (this.readline !== null) {
      this.readline.close();
    }
  }
}
var GameResult$1 = /* @__PURE__ */ ((GameResult2) => {
  GameResult2["WIN"] = "win";
  GameResult2["LOSE"] = "lose";
  GameResult2["DRAW"] = "draw";
  return GameResult2;
})(GameResult$1 || {});
function parseScoreMate(arg) {
  switch (arg) {
    case "+":
    case "+0":
    case "0":
      return +SCORE_MATE_INFINITE;
    case "-":
    case "-0":
      return -SCORE_MATE_INFINITE;
    default:
      return Number(arg);
  }
}
function parseInfoCommand(args) {
  const result = {};
  const s = args.split(" ");
  for (let i = 0; i < args.length; i += 1) {
    switch (s[i]) {
      case "depth":
        result.depth = Number(s[i + 1]);
        i += 1;
        break;
      case "seldepth":
        result.seldepth = Number(s[i + 1]);
        i += 1;
        break;
      case "time":
        result.timeMs = Number(s[i + 1]);
        i += 1;
        break;
      case "nodes":
        result.nodes = Number(s[i + 1]);
        i += 1;
        break;
      case "pv":
        result.pv = s.slice(i + 1);
        i = s.length;
        break;
      case "multipv":
        result.multipv = Number(s[i + 1]);
        i += 1;
        break;
      case "score":
        switch (s[i + 1]) {
          case "cp":
            result.scoreCP = Number(s[i + 2]);
            i += 2;
            break;
          case "mate":
            result.scoreMate = parseScoreMate(s[i + 2]);
            i += 2;
            break;
        }
        break;
      case "lowerbound":
        result.lowerbound = true;
        break;
      case "upperbound":
        result.upperbound = true;
        break;
      case "currmove":
        result.currmove = s[i + 1];
        i += 1;
        break;
      case "hashfull":
        result.hashfullPerMill = Number(s[i + 1]);
        i += 1;
        break;
      case "nps":
        result.nps = Number(s[i + 1]);
        i += 1;
        break;
      case "string":
        result.string = s.slice(i + 1).join(" ");
        i = s.length;
        break;
    }
  }
  return result;
}
function buildTimeOptions(timeState) {
  if (!timeState) {
    return "infinite";
  }
  return `btime ${timeState.btime} wtime ${timeState.wtime} ` + (timeState.binc !== 0 || timeState.winc !== 0 ? `binc ${timeState.binc} winc ${timeState.winc}` : `byoyomi ${timeState.byoyomi}`);
}
const DefaultTimeout = 10 * 1e3;
const DefaultQuitTimeout = 5 * 1e3;
const USIHashOptionOrder = 1;
const USIPonderOptionOrder = 2;
const UserDefinedOptionOrderStart = 100;
class EngineProcess {
  constructor(_path, sessionID, logger, option) {
    this._path = _path;
    this.sessionID = sessionID;
    this.logger = logger;
    this.option = option;
  }
  process = null;
  _name = "NO NAME";
  _author = "";
  _engineOptions = {};
  state = "waitingForUSIOK";
  currentPosition = "";
  invalidBestMoveCount = 0;
  reservedGoCommand;
  launchTimeout;
  quitTimeout;
  timeoutCallback;
  errorCallback;
  usiOkCallback;
  readyCallback;
  bestMoveCallback;
  checkmateCallback;
  checkmateNotImplementedCallback;
  checkmateTimeoutCallback;
  noMateCallback;
  infoCallback;
  ponderInfoCallback;
  get path() {
    return this._path;
  }
  get name() {
    return this._name;
  }
  get author() {
    return this._author;
  }
  get engineOptions() {
    return this._engineOptions;
  }
  on(event, callback) {
    switch (event) {
      case "timeout":
        this.timeoutCallback = callback;
        break;
      case "error":
        this.errorCallback = callback;
        break;
      case "usiok":
        this.usiOkCallback = callback;
        break;
      case "ready":
        this.readyCallback = callback;
        break;
      case "bestmove":
        this.bestMoveCallback = callback;
        break;
      case "checkmate":
        this.checkmateCallback = callback;
        break;
      case "checkmateNotImplemented":
        this.checkmateNotImplementedCallback = callback;
        break;
      case "checkmateTimeout":
        this.checkmateTimeoutCallback = callback;
        break;
      case "noMate":
        this.noMateCallback = callback;
        break;
      case "info":
        this.infoCallback = callback;
        break;
      case "ponderInfo":
        this.ponderInfoCallback = callback;
        break;
    }
    return this;
  }
  launch() {
    this.logger.info("sid=%d: launch: %s", this.sessionID, this.path);
    this.setLaunchTimeout();
    this.process = new ChildProcess(this.path);
    this.process.on("error", this.onError.bind(this));
    this.process.on("close", this.onClose.bind(this));
    this.process.on("receive", this.onReceive.bind(this));
    this.send("usi");
  }
  quit() {
    if (this.state === "willQuit") {
      return;
    }
    this.state = "willQuit";
    this.clearLaunchTimeout();
    this.logger.info("sid=%d: quit USI engine", this.sessionID);
    if (!this.process) {
      return;
    }
    this.setQuitTimeout();
    this.send("quit");
  }
  setOption(name, value) {
    if (value !== void 0) {
      this.send(`setoption name ${name} value ${value}`);
    } else {
      this.send(`setoption name ${name}`);
    }
  }
  ready() {
    if (this.state === "waitingForReadyOK") {
      return;
    } else if (this.state === "ready" || this.state === "waitingForBestMove" || this.state === "ponder" || this.state === "waitingForPonderBestMove" || this.state === "waitingForCheckmate") {
      this.gameover(
        "draw"
        /* DRAW */
      );
    }
    if (this.state !== "notReady") {
      this.logger.warn("sid=%d: ready: unexpected state: %s", this.sessionID, this.state);
      return new Error("unexpected state");
    }
    this.send("isready");
    this.state = "waitingForReadyOK";
  }
  go(position, timeState) {
    this.reservedGoCommand = {
      position,
      timeState
    };
    switch (this.state) {
      case "ready":
        this.sendReservedGoCommands();
        break;
      case "waitingForBestMove":
      case "ponder":
      case "waitingForCheckmate":
        this.stop();
        break;
    }
  }
  goPonder(position, timeState) {
    this.reservedGoCommand = {
      position,
      timeState,
      ponder: true
    };
    switch (this.state) {
      case "ready":
        this.sendReservedGoCommands();
        break;
      case "waitingForBestMove":
      case "ponder":
      case "waitingForCheckmate":
        this.stop();
        break;
    }
  }
  goMate(position) {
    this.reservedGoCommand = {
      position,
      mate: true
    };
    switch (this.state) {
      case "ready":
        this.sendReservedGoCommands();
        break;
      case "waitingForBestMove":
      case "ponder":
      case "waitingForCheckmate":
        this.stop();
        break;
    }
  }
  ponderHit() {
    if (this.state !== "ponder") {
      this.logger.warn("sid=%d: ponderHit: unexpected state: %s", this.sessionID, this.state);
      return;
    }
    this.send("ponderhit");
    this.state = "waitingForBestMove";
  }
  stop() {
    if (this.state !== "waitingForBestMove" && this.state !== "ponder" && this.state !== "waitingForCheckmate") {
      this.logger.warn("sid=%d: stop: unexpected state: %s", this.sessionID, this.state);
      return;
    }
    if (this.process?.lastSended === "stop") {
      return;
    }
    this.send("stop");
    if (this.state === "ponder") {
      this.state = "waitingForPonderBestMove";
    }
  }
  gameover(gameResult) {
    switch (this.state) {
      case "waitingForUSIOK":
      case "notReady":
      case "waitingForReadyOK":
      case "willQuit":
        this.logger.warn("sid=%d: gameover: unexpected state: %s", this.sessionID, this.state);
        return;
      case "waitingForBestMove":
      case "ponder":
        this.stop();
        this.invalidBestMoveCount++;
        break;
      case "waitingForPonderBestMove":
        this.invalidBestMoveCount++;
        break;
      case "waitingForCheckmate":
        this.stop();
        break;
    }
    this.send("gameover " + gameResult);
    this.state = "notReady";
    this.reservedGoCommand = void 0;
  }
  setLaunchTimeout() {
    this.launchTimeout = setTimeout(() => {
      if (this.timeoutCallback) {
        this.timeoutCallback();
      }
      this.quit();
    }, this.option.timeout || DefaultTimeout);
  }
  clearLaunchTimeout() {
    if (this.launchTimeout) {
      clearTimeout(this.launchTimeout);
      this.launchTimeout = void 0;
    }
  }
  setQuitTimeout() {
    this.quitTimeout = setTimeout(() => {
      if (!this.process) {
        return;
      }
      this.process.kill();
      this.process = null;
    }, DefaultQuitTimeout);
  }
  clearQuitTimeout() {
    if (this.quitTimeout) {
      clearTimeout(this.quitTimeout);
      this.quitTimeout = void 0;
    }
  }
  onError(e) {
    if (this.errorCallback) {
      this.errorCallback(e);
    }
    this.quit();
  }
  onClose(code, signal) {
    this.logger.info(
      "sid=%d: engine process closed: close=%s signal=%s",
      this.sessionID,
      code,
      signal
    );
    if (this.state !== "willQuit" && this.errorCallback) {
      this.errorCallback(new Error("closed unexpectedly"));
    }
    this.clearLaunchTimeout();
    this.clearQuitTimeout();
    this.process = null;
  }
  sendReservedGoCommands() {
    if (!this.reservedGoCommand) {
      return;
    }
    this.send(this.reservedGoCommand.position);
    this.send(
      "go " + (this.reservedGoCommand.ponder ? "ponder " : "") + (this.reservedGoCommand.mate ? "mate " : "") + buildTimeOptions(this.reservedGoCommand.timeState)
    );
    this.currentPosition = this.reservedGoCommand.position;
    this.state = this.reservedGoCommand.ponder ? "ponder" : this.reservedGoCommand.mate ? "waitingForCheckmate" : "waitingForBestMove";
    this.reservedGoCommand = void 0;
  }
  send(command) {
    if (!this.process) {
      return;
    }
    this.process.send(command);
    this.logger.info("sid=%d: > %s", this.sessionID, command);
  }
  onReceive(command) {
    this.logger.info("sid=%d: < %s", this.sessionID, command);
    if (this.state === "willQuit") {
      return;
    }
    if (command.startsWith("id name ")) {
      this.onIDName(command.substring(8));
    } else if (command.startsWith("id author ")) {
      this.onIDAuthor(command.substring(10));
    } else if (command.startsWith("option ")) {
      this.onOption(command.substring(7));
    } else if (command === "usiok") {
      this.onUSIOk();
    } else if (command === "readyok") {
      this.onReadyOk();
    } else if (command.startsWith("bestmove ")) {
      this.onBestMove(command.substring(9));
    } else if (command.startsWith("checkmate ")) {
      this.onCheckmate(command.substring(10));
    } else if (command.startsWith("info ")) {
      this.onInfo(command.substring(5));
    }
  }
  onIDName(name) {
    this._name = name;
  }
  onIDAuthor(author) {
    this._author = author;
  }
  onOption(command) {
    const args = command.split(" ");
    if (args.length < 4 || args[0] !== "name" || args[2] !== "type") {
      this.logger.error("sid=%d: invalid option command", this.sessionID);
      return;
    }
    const option = {
      name: args[1],
      type: args[3],
      order: UserDefinedOptionOrderStart + Object.keys(this._engineOptions).length,
      vars: []
    };
    for (let i = 4; i + 1 < args.length; i = i + 1) {
      switch (args[i]) {
        case "default":
          option.default = option.type === "spin" ? Number(args[i + 1]) : args[i + 1];
          break;
        case "min":
          option.min = Number(args[i + 1]);
          break;
        case "max":
          option.max = Number(args[i + 1]);
          break;
        case "var":
          option.vars.push(args[i + 1]);
          break;
      }
    }
    this._engineOptions[option.name] = option;
  }
  onUSIOk() {
    if (this.state !== "waitingForUSIOK") {
      this.logger.warn("sid=%d: onUSIOk: unexpected state: %s", this.sessionID, this.state);
      return;
    }
    if (!this.engineOptions[USIHash]) {
      this._engineOptions[USIHash] = {
        name: USIHash,
        type: "spin",
        order: USIHashOptionOrder,
        default: 32,
        vars: []
      };
    }
    if (!this.engineOptions[USIPonder]) {
      this._engineOptions[USIPonder] = {
        name: USIPonder,
        type: "check",
        order: USIPonderOptionOrder,
        default: "true",
        vars: []
      };
    }
    if (this.option.engineOptions) {
      this.option.engineOptions.forEach((option) => {
        const value = getUSIEngineOptionCurrentValue(option);
        if (value !== void 0) {
          this.setOption(option.name, value);
        }
      });
    }
    this.clearLaunchTimeout();
    this.state = "notReady";
    if (this.usiOkCallback) {
      this.usiOkCallback();
    }
  }
  onReadyOk() {
    if (this.state !== "waitingForReadyOK") {
      this.logger.warn("sid=%d: onReadyOk: unexpected state: %s", this.sessionID, this.state);
      return;
    }
    this.state = "ready";
    if (this.readyCallback) {
      this.readyCallback();
    }
    this.send("usinewgame");
    this.sendReservedGoCommands();
  }
  onBestMove(args) {
    if (this.invalidBestMoveCount > 0) {
      this.invalidBestMoveCount--;
      this.logger.warn("sid=%d: onBestMove: ignore bestmove: %s", this.sessionID, args);
      return;
    }
    if (this.state !== "waitingForBestMove" && this.state !== "waitingForPonderBestMove") {
      this.logger.warn("sid=%d: onBestMove: unexpected state: %s", this.sessionID, this.state);
      return;
    }
    if (this.bestMoveCallback && this.state === "waitingForBestMove") {
      const a = args.split(" ");
      const move = a[0];
      const ponder = a.length >= 3 && a[1] === "ponder" && a[2] || void 0;
      this.bestMoveCallback(this.currentPosition, move, ponder);
    }
    this.state = "ready";
    this.currentPosition = "";
    this.sendReservedGoCommands();
  }
  onCheckmate(args) {
    if (this.state !== "waitingForCheckmate") {
      this.logger.warn("sid=%d: onCheckmate: unexpected state: %s", this.sessionID, this.state);
      return;
    }
    this.state = "ready";
    if (args.trim() === "notimplemented") {
      if (this.checkmateNotImplementedCallback) {
        this.checkmateNotImplementedCallback();
      }
      return;
    } else if (args.trim() === "timeout") {
      if (this.checkmateTimeoutCallback) {
        this.checkmateTimeoutCallback(this.currentPosition);
      }
      return;
    } else if (args.trim() === "nomate") {
      if (this.noMateCallback) {
        this.noMateCallback(this.currentPosition);
      }
      return;
    }
    if (this.checkmateCallback) {
      this.checkmateCallback(this.currentPosition, args.trim().split(" "));
    }
  }
  onInfo(args) {
    switch (this.state) {
      case "waitingForBestMove":
      case "waitingForCheckmate":
        if (this.infoCallback) {
          this.infoCallback(this.currentPosition, parseInfoCommand(args));
        }
        break;
      case "ponder":
      case "waitingForPonderBestMove":
        if (this.ponderInfoCallback) {
          this.ponderInfoCallback(this.currentPosition, parseInfoCommand(args));
        }
        break;
    }
  }
}
var GameResult = /* @__PURE__ */ ((GameResult2) => {
  GameResult2["WIN"] = "win";
  GameResult2["LOSE"] = "lose";
  GameResult2["DRAW"] = "draw";
  return GameResult2;
})(GameResult || {});
function resolvePath(filepath) {
  const portableExeDir = getPortableExeDir();
  if (portableExeDir) {
    return path.resolve(portableExeDir, filepath);
  }
  return filepath;
}
function getRelativePath(filepath) {
  const portableExeDir = getPortableExeDir();
  if (portableExeDir) {
    const relative = path.relative(portableExeDir, filepath);
    if (!relative.startsWith("..")) {
      return relative;
    }
  }
  return filepath;
}
function newTimeoutError(timeoutSeconds) {
  return new Error(t.noResponseFromEnginePleaseExtendTimeout(timeoutSeconds));
}
function getUSIEngineInfo(path2, timeoutSeconds) {
  const sessionID = issueSessionID$1();
  return new Promise((resolve, reject) => {
    const process2 = new EngineProcess(resolvePath(path2), sessionID, getUSILogger(), {
      timeout: timeoutSeconds * 1e3
    }).on("error", reject).on("timeout", () => reject(newTimeoutError(timeoutSeconds))).on("usiok", () => {
      resolve({
        ...emptyUSIEngineSetting(),
        uri: issueEngineURI(),
        name: process2.name,
        defaultName: process2.name,
        author: process2.author,
        path: path2,
        options: process2.engineOptions
      });
      process2.quit();
    });
    process2.launch();
  });
}
function sendSetOptionCommand(path2, name, timeoutSeconds) {
  const sessionID = issueSessionID$1();
  return new Promise((resolve, reject) => {
    const process2 = new EngineProcess(resolvePath(path2), sessionID, getUSILogger(), {
      timeout: timeoutSeconds * 1e3
    }).on("error", reject).on("timeout", () => {
      reject(newTimeoutError(timeoutSeconds));
    }).on("usiok", () => {
      process2.setOption(name);
      resolve();
      process2.quit();
    });
    process2.launch();
  });
}
let lastSessionID$1 = 0;
function issueSessionID$1() {
  lastSessionID$1 += 1;
  return lastSessionID$1;
}
const sessions = /* @__PURE__ */ new Map();
function isSessionExists(sessionID) {
  return sessions.has(sessionID);
}
function getSession(sessionID) {
  const session = sessions.get(sessionID);
  if (!session) {
    throw new Error("No engine session: SessionID=" + sessionID);
  }
  return session;
}
function setupPlayer(setting, timeoutSeconds) {
  const sessionID = issueSessionID$1();
  const process2 = new EngineProcess(resolvePath(setting.path), sessionID, getUSILogger(), {
    timeout: timeoutSeconds * 1e3,
    engineOptions: Object.values(setting.options)
  });
  sessions.set(sessionID, {
    name: setting.name,
    process: process2,
    setting,
    sessionType: 0
    /* GAME */
  });
  return new Promise((resolve, reject) => {
    process2.on("error", reject).on("timeout", () => reject(newTimeoutError(timeoutSeconds))).on("bestmove", (usi, usiMove, ponder) => onUSIBestMove(sessionID, usi, usiMove, ponder)).on("checkmate", (position, moves) => {
      onUSICheckmate(sessionID, position, moves);
    }).on("checkmateNotImplemented", () => {
      onUSICheckmateNotImplemented(sessionID);
    }).on("checkmateTimeout", (position) => {
      onUSICheckmateTimeout(sessionID, position);
    }).on("noMate", (position) => {
      onUSINoMate(sessionID, position);
    }).on("usiok", () => resolve(sessionID));
    process2.launch();
  });
}
function ready(sessionID) {
  const session = getSession(sessionID);
  return new Promise((resolve, reject) => {
    session.process.on("ready", resolve).on("error", reject);
    const error = session.process.ready();
    if (error) {
      reject(error);
    }
  });
}
function buildTimeState(timeLimit, blackTimeMs, whiteTimeMs) {
  return {
    btime: blackTimeMs - timeLimit.increment * 1e3,
    wtime: whiteTimeMs - timeLimit.increment * 1e3,
    byoyomi: timeLimit.byoyomi * 1e3,
    binc: timeLimit.increment * 1e3,
    winc: timeLimit.increment * 1e3
  };
}
function go(sessionID, usi, timeLimit, blackTimeMs, whiteTimeMs) {
  const session = getSession(sessionID);
  session.process.go(usi, buildTimeState(timeLimit, blackTimeMs, whiteTimeMs));
  session.process.on("info", (usi2, info) => onUSIInfo(sessionID, usi2, info));
}
function goPonder(sessionID, usi, timeLimit, blackTimeMs, whiteTimeMs) {
  const session = getSession(sessionID);
  session.process.goPonder(usi, buildTimeState(timeLimit, blackTimeMs, whiteTimeMs));
  session.process.on("ponderInfo", (usi2, info) => {
    onUSIPonderInfo(sessionID, usi2, info);
  });
}
function goInfinite(sessionID, usi) {
  const session = getSession(sessionID);
  session.process.go(usi);
  session.process.on("info", (usi2, info) => onUSIInfo(sessionID, usi2, info));
}
function goMate(sessionID, usi) {
  const session = getSession(sessionID);
  session.process.goMate(usi);
  session.process.on("info", (usi2, info) => onUSIInfo(sessionID, usi2, info));
}
function ponderHit(sessionID) {
  const session = getSession(sessionID);
  session.process.ponderHit();
}
function stop$1(sessionID) {
  const session = getSession(sessionID);
  session.process.stop();
}
function gameover(sessionID, result) {
  const session = getSession(sessionID);
  switch (result) {
    case GameResult.WIN:
      session.process.gameover(GameResult$1.WIN);
      break;
    case GameResult.LOSE:
      session.process.gameover(GameResult$1.LOSE);
      break;
    case GameResult.DRAW:
      session.process.gameover(GameResult$1.DRAW);
      break;
  }
}
function quit(sessionID) {
  if (!isSessionExists(sessionID)) {
    return;
  }
  const session = getSession(sessionID);
  session.process.quit();
  sessions.delete(sessionID);
}
function quitAll() {
  sessions.forEach((session) => {
    session.process.quit();
  });
  sessions.clear();
}
function emptyCSAGameSummary() {
  return {
    id: "",
    myColor: Color.BLACK,
    toMove: Color.BLACK,
    position: "",
    timeUnitMs: 1e3,
    totalTime: 0,
    byoyomi: 0,
    delay: 0,
    increment: 0
  };
}
function emptyCSAPlayerStates() {
  return {
    black: { time: 0 },
    white: { time: 0 }
  };
}
var CSASpecialMove = /* @__PURE__ */ ((CSASpecialMove2) => {
  CSASpecialMove2["UNKNOWN"] = "unknown";
  CSASpecialMove2["RESIGN"] = "resign";
  CSASpecialMove2["SENNICHITE"] = "sennichite";
  CSASpecialMove2["OUTE_SENNICHITE"] = "oute_sennichite";
  CSASpecialMove2["ILLEGAL_MOVE"] = "illegal_move";
  CSASpecialMove2["ILLEGAL_ACTION"] = "illegal_action";
  CSASpecialMove2["TIME_UP"] = "time_up";
  CSASpecialMove2["JISHOGI"] = "jishogi";
  CSASpecialMove2["MAX_MOVES"] = "max_moves";
  return CSASpecialMove2;
})(CSASpecialMove || {});
var CSAGameResult = /* @__PURE__ */ ((CSAGameResult2) => {
  CSAGameResult2["WIN"] = "win";
  CSAGameResult2["LOSE"] = "lose";
  CSAGameResult2["DRAW"] = "draw";
  CSAGameResult2["CENSORED"] = "censored";
  CSAGameResult2["CHUDAN"] = "chudan";
  return CSAGameResult2;
})(CSAGameResult || {});
class Socket {
  socket;
  readline;
  constructor(host, port, handlers) {
    this.socket = net.createConnection(
      {
        port,
        host
      },
      handlers.onConnect
    ).setKeepAlive(true).on("error", handlers.onError).on("end", handlers.onFIN).on("close", (hadError) => {
      this.closeReadline();
      handlers.onClose(hadError);
    });
    this.readline = readline.createInterface(this.socket);
    this.readline.on("line", handlers.onRead);
  }
  write(line) {
    this.socket.write(line + "\n");
  }
  end() {
    this.socket.end();
  }
  closeReadline() {
    if (this.readline) {
      this.readline.close();
      this.readline = null;
    }
  }
}
class Client {
  constructor(sessionID, setting, logger) {
    this.sessionID = sessionID;
    this.setting = setting;
    this.logger = logger;
  }
  state = 0;
  gameSummaryCallback;
  rejectCallback;
  startCallback;
  moveCallback;
  gameResultCallback;
  closeCallback;
  errorCallback;
  socket;
  gameSummary = emptyCSAGameSummary();
  playerStates = emptyCSAPlayerStates();
  specialMove = CSASpecialMove.UNKNOWN;
  on(event, callback) {
    switch (event) {
      case "gameSummary":
        this.gameSummaryCallback = callback;
        break;
      case "reject":
        this.rejectCallback = callback;
        break;
      case "start":
        this.startCallback = callback;
        break;
      case "move":
        this.moveCallback = callback;
        break;
      case "gameResult":
        this.gameResultCallback = callback;
        break;
      case "close":
        this.closeCallback = callback;
        break;
      case "error":
        this.errorCallback = callback;
        break;
    }
    return this;
  }
  login() {
    this.logger.info(
      "sid=%d: connecting to %s:%d",
      this.sessionID,
      this.setting.host,
      this.setting.port
    );
    this.state = 1;
    this.socket = new Socket(this.setting.host, this.setting.port, {
      onConnect: this.onConnect.bind(this),
      onError: this.onConnectionError.bind(this),
      onFIN: this.onFIN.bind(this),
      onClose: this.onClose.bind(this),
      onRead: this.onRead.bind(this)
    });
  }
  logout() {
    switch (this.setting.protocolVersion) {
      case CSAProtocolVersion.V121_FLOODGATE:
        if (this.socket) {
          this.logger.info("sid=%d: disconnect", this.sessionID);
          this.socket.end();
          this.state = 12;
        }
        break;
      default:
        if (this.state === 3 || this.state === 4 || this.state === 5 || this.state === 6 || this.state === 7) {
          this.send("LOGOUT");
          this.state = 11;
        }
        break;
    }
  }
  agree(gameID) {
    if (this.state !== 7) {
      return;
    }
    if (gameID !== this.gameSummary.id) {
      return;
    }
    this.state = 8;
    this.send(`AGREE ${this.gameSummary.id}`);
  }
  reject(gameID) {
    if (this.state !== 7) {
      return;
    }
    if (gameID !== this.gameSummary.id) {
      return;
    }
    this.state = 9;
    this.send(`REJECT ${this.gameSummary.id}`);
  }
  doMove(move, score, pv) {
    if (this.state !== 10) {
      return;
    }
    let command = move;
    if (score !== void 0) {
      command += `,'* ${Math.round(score)}`;
      if (pv !== void 0) {
        command += ` ${pv}`;
      }
    }
    this.send(command);
  }
  resign() {
    if (this.state !== 10) {
      return;
    }
    this.send("%TORYO");
  }
  win() {
    if (this.state !== 10) {
      return;
    }
    this.send("%KACHI");
  }
  stop() {
    if (this.state !== 10) {
      return;
    }
    this.send("%CHUDAN");
  }
  send(command) {
    if (!this.socket) {
      this.logger.info(
        "sid=%d: failed to send command caused by invalid socket: %s",
        this.sessionID,
        command
      );
      return;
    }
    this.logger.info("sid=%d: > %s", this.sessionID, this.hideSecureValues(command));
    this.socket.write(command);
  }
  hideSecureValues(command) {
    return command.replaceAll(this.setting.password, "*****");
  }
  onConnect() {
    this.logger.info("sid=%d: connected", this.sessionID);
    this.state = 2;
    this.send(`LOGIN ${this.setting.id} ${this.setting.password}`);
  }
  onConnectionError(e) {
    if (this.state === 13) {
      return;
    }
    this.onError(e);
    this.state = 13;
    if (this.closeCallback) {
      this.closeCallback();
    }
  }
  onError(e) {
    this.logger.info("sid=%d: error: %s %s", this.sessionID, e.name, e.message);
    if (this.errorCallback) {
      this.errorCallback(e);
    }
  }
  onFIN() {
    this.logger.info("sid=%d: FIN packet received", this.sessionID);
  }
  onClose(hadError) {
    if (this.state === 13) {
      return;
    }
    switch (this.state) {
      case 3:
      case 11:
      case 12:
        if (!hadError) {
          this.logger.info("sid=%d: socket closed", this.sessionID);
        } else {
          this.onError(new Error(t.errorOccuredWhileDisconnectingFromCSAServer));
        }
        break;
      case 1:
        this.onError(new Error(t.failedToConnectToCSAServer));
        break;
      default:
        this.onError(new Error(t.disconnectedFromCSAServer));
        break;
    }
    this.state = 13;
    if (this.closeCallback) {
      this.closeCallback();
    }
  }
  onRead(command) {
    this.logger.info("sid=%d: < %s", this.sessionID, command);
    if (this.state === 4) {
      this.onGameSummary(command);
    } else if (this.state === 5) {
      this.onGameTime(command);
    } else if (this.state === 6) {
      this.onGamePosition(command);
    } else if (this.state === 10) {
      this.onMove(command);
    } else if (command.match(/^LOGIN:.* OK$/)) {
      this.onLoginOK();
    } else if (command === "LOGIN:incorrect") {
      this.onLoginIncorrect();
    } else if (command === "LOGOUT:completed") {
      this.onLogout();
    } else if (command === "BEGIN Game_Summary") {
      this.onBeginGameSummary();
    } else if (command.startsWith("REJECT:")) {
      this.onReject();
    } else if (command.startsWith("START:")) {
      this.onStart();
    } else {
      this.logger.info("sid=%d: unknown command received", this.sessionID);
    }
  }
  onLoginOK() {
    this.logger.info("sid=%d: login ok", this.sessionID);
    this.state = 3;
  }
  onLoginIncorrect() {
    this.onError(new Error(t.csaServerLoginDenied));
    if (!this.socket) {
      return;
    }
    this.socket.end();
  }
  onLogout() {
    this.logger.info("sid=%d: logout", this.sessionID);
    this.state = 12;
  }
  onBeginGameSummary() {
    this.state = 4;
    this.gameSummary = emptyCSAGameSummary();
  }
  onEndGameSummary() {
    this.playerStates.black.time += this.gameSummary.increment;
    this.playerStates.white.time += this.gameSummary.increment;
    const record = importCSA(this.gameSummary.position);
    if (record instanceof Error) {
      this.onError(new Error("invalid game position received from CSA server"));
      this.logout();
      return;
    }
    for (const entry of record.moves) {
      if (isKnownSpecialMove(entry.move) && entry.move.type === SpecialMoveType.START) {
        continue;
      }
      const color = reverseColor(entry.nextColor);
      this.updateTime(color, entry.elapsedMs);
    }
    this.state = 7;
    if (this.gameSummaryCallback) {
      this.gameSummaryCallback(this.gameSummary);
    }
  }
  onGameSummary(command) {
    if (command === "END Game_Summary") {
      this.onEndGameSummary();
      return;
    }
    if (command === "BEGIN Time") {
      this.state = 5;
      return;
    }
    if (command === "BEGIN Position") {
      this.state = 6;
      return;
    }
    const [key, value] = command.split(":", 2);
    switch (key) {
      case "Protocol_Version":
        break;
      case "Protocol_Mode":
        break;
      case "Format":
        break;
      case "Declaration":
        break;
      case "Rematch_On_Draw":
        break;
      case "Max_Moves":
        break;
      case "Game_ID":
        this.gameSummary.id = value;
        break;
      case "Name+":
        this.gameSummary.blackPlayerName = value;
        break;
      case "Name-":
        this.gameSummary.whitePlayerName = value;
        break;
      case "Your_Turn":
        this.gameSummary.myColor = value === "+" ? Color.BLACK : Color.WHITE;
        break;
      case "To_Move":
        this.gameSummary.toMove = value === "+" ? Color.BLACK : Color.WHITE;
        break;
      default:
        this.logger.info("sid=%d: unknown command received", this.sessionID);
        break;
    }
  }
  onGameTime(command) {
    if (command === "END Time") {
      this.state = 4;
      return;
    }
    const [key, value] = command.split(":", 2);
    switch (key) {
      case "Least_Time_Per_Move":
      case "Time_Roundup":
        break;
      case "Time_Unit":
        if (value.endsWith("msec")) {
          this.gameSummary.timeUnitMs = Number(value.slice(0, -4));
        } else if (value.endsWith("sec")) {
          this.gameSummary.timeUnitMs = Number(value.slice(0, -3)) * 1e3;
        } else if (value.endsWith("min")) {
          this.gameSummary.timeUnitMs = Number(value.slice(0, -3)) * 60 * 1e3;
        }
        break;
      case "Total_Time":
        this.gameSummary.totalTime = Number(value);
        this.playerStates.black.time = this.gameSummary.totalTime;
        this.playerStates.white.time = this.gameSummary.totalTime;
        break;
      case "Byoyomi":
        this.gameSummary.byoyomi = Number(value);
        break;
      case "Delay":
        this.gameSummary.delay = Number(value);
        break;
      case "Increment":
        this.gameSummary.increment = Number(value);
        break;
      default:
        this.logger.info("sid=%d: unknown command received", this.sessionID);
        break;
    }
  }
  onGamePosition(command) {
    if (command === "END Position") {
      this.state = 4;
      return;
    }
    this.gameSummary.position += command + "\n";
  }
  onReject() {
    this.state = 3;
    if (this.rejectCallback) {
      this.rejectCallback();
    }
  }
  onStart() {
    this.state = 10;
    if (this.startCallback) {
      this.startCallback(this.playerStates);
    }
  }
  onMove(command) {
    if (command.startsWith("+")) {
      this.onMoveWithColor(command, Color.BLACK);
    } else if (command.startsWith("-")) {
      this.onMoveWithColor(command, Color.WHITE);
    } else if (command.startsWith("#")) {
      this.onEndingCommand(command);
    } else if (command.startsWith("%"))
      ;
    else {
      this.logger.info("sid=%d: unknown move command received", this.sessionID);
    }
  }
  onMoveWithColor(command, color) {
    const parsed = /^.*,T([0-9]+)$/.exec(command);
    if (parsed) {
      const elapsed = Number(parsed[1]);
      this.updateTime(color, elapsed * 1e3);
    } else {
      this.logger.info("sid=%d: invalid move format", this.sessionID);
    }
    if (this.moveCallback) {
      this.moveCallback(command, this.playerStates);
    }
  }
  updateTime(color, elapsedMs) {
    const elapsed = elapsedMs / this.gameSummary.timeUnitMs;
    const time = this.playerStates[color].time - elapsed + this.gameSummary.increment;
    this.playerStates[color].time = Math.max(time, 0);
  }
  onEndingCommand(command) {
    switch (command) {
      case "#RESIGN":
        this.specialMove = CSASpecialMove.RESIGN;
        break;
      case "#SENNICHITE":
        this.specialMove = CSASpecialMove.SENNICHITE;
        break;
      case "#OUTE_SENNICHITE":
        this.specialMove = CSASpecialMove.OUTE_SENNICHITE;
        break;
      case "#ILLEGAL_MOVE":
        this.specialMove = CSASpecialMove.ILLEGAL_MOVE;
        break;
      case "#ILLEGAL_ACTION":
        this.specialMove = CSASpecialMove.ILLEGAL_ACTION;
        break;
      case "#TIME_UP":
        this.specialMove = CSASpecialMove.TIME_UP;
        break;
      case "#JISHOGI":
        this.specialMove = CSASpecialMove.JISHOGI;
        break;
      case "#MAX_MOVES":
        this.specialMove = CSASpecialMove.MAX_MOVES;
        break;
      case "#WIN":
        this.onGameResult(CSAGameResult.WIN);
        break;
      case "#LOSE":
        this.onGameResult(CSAGameResult.LOSE);
        break;
      case "#DRAW":
        this.onGameResult(CSAGameResult.DRAW);
        break;
      case "#CENSORED":
        this.onGameResult(CSAGameResult.CENSORED);
        break;
      case "#CHUDAN":
        this.onGameResult(CSAGameResult.CHUDAN);
        break;
    }
  }
  onGameResult(gameResult) {
    this.state = 3;
    if (this.gameResultCallback) {
      this.gameResultCallback(this.specialMove, gameResult);
    }
  }
}
let lastSessionID = 0;
function issueSessionID() {
  lastSessionID += 1;
  return lastSessionID;
}
const clients = /* @__PURE__ */ new Map();
function login(setting) {
  const sessionID = issueSessionID();
  const client = new Client(sessionID, setting, getCSALogger()).on("gameSummary", (gameSummary) => onCSAGameSummary(sessionID, gameSummary)).on("reject", () => onCSAReject(sessionID)).on("start", (playerStates) => onCSAStart(sessionID, playerStates)).on("move", (move, playerStates) => onCSAMove(sessionID, move, playerStates)).on(
    "gameResult",
    (specialMove2, gameResult) => onCSAGameResult(sessionID, specialMove2, gameResult)
  ).on("close", () => {
    clients.delete(sessionID);
    onCSAClose(sessionID);
  }).on("error", sendError);
  clients.set(sessionID, client);
  client.login();
  return sessionID;
}
function logout(sessionID) {
  const client = clients.get(sessionID);
  if (client) {
    client.logout();
  }
}
function agree(sessionID, gameID) {
  const client = clients.get(sessionID);
  if (client) {
    client.agree(gameID);
  }
}
function doMove(sessionID, move, score, pv) {
  const client = clients.get(sessionID);
  if (client) {
    client.doMove(move, score, pv);
  }
}
function resign(sessionID) {
  const client = clients.get(sessionID);
  if (client) {
    client.resign();
  }
}
function win(sessionID) {
  const client = clients.get(sessionID);
  if (client) {
    client.win();
  }
}
function stop(sessionID) {
  const client = clients.get(sessionID);
  if (client) {
    client.stop();
  }
}
const allowedIPCSenders = [
  { protocol: "http:", host: /^localhost:[0-9]+$/ },
  { protocol: "file:", host: /^$/ }
];
function validateIPCSender(frame) {
  const u = new URL(frame.url);
  for (const allowed of allowedIPCSenders) {
    if (u.protocol === allowed.protocol && allowed.host.test(u.host)) {
      return;
    }
  }
  const e = new Error(t.unexpectedEventSenderPleaseReport(frame.url));
  getAppLogger().error(e);
  throw e;
}
function validateHTTPRequestMethod(method) {
  if (method === "GET") {
    return;
  }
  const e = new Error(t.unexpectedHTTPMethodPleaseReport(method));
  getAppLogger().error(e);
  throw e;
}
const allowedHTTPRequestURLs = [
  { protocol: "http:", host: /^localhost:[0-9]+$/ },
  { protocol: "ws:", host: /^localhost:[0-9]+$/ },
  { protocol: "file:", host: /^$/ },
  { protocol: "devtools:", host: /^devtools$/ }
];
function validateHTTPRequestURL(url2) {
  if (isDevelopment()) {
    return;
  }
  const u = new URL(url2);
  for (const allowed of allowedHTTPRequestURLs) {
    if (u.protocol === allowed.protocol && allowed.host.test(u.host)) {
      return;
    }
  }
  const e = new Error(t.unexpectedRequestURLPleaseReport(url2));
  getAppLogger().error(e);
  throw e;
}
function validateHTTPRequest(method, url2) {
  validateHTTPRequestMethod(method);
  validateHTTPRequestURL(url2);
}
class Rect {
  x;
  y;
  width;
  height;
  constructor(x, y, width, height) {
    if (y && width && height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    } else {
      const obj = JSON.parse(x);
      this.x = obj.x;
      this.y = obj.y;
      this.width = obj.width;
      this.height = obj.height;
    }
  }
  get json() {
    return JSON.stringify({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    });
  }
}
const jpegQuality = 85;
function exportCapturePNG(rect) {
  return exportCaptureImage(rect, "png");
}
function exportCaptureJPEG(rect) {
  return exportCaptureImage(rect, "jpeg");
}
async function exportCaptureImage(rect, ext) {
  const zoomLevel = getWebContents().getZoomFactor();
  getAppLogger().info(`exportCaptureImage rect=${rect} zoom=${zoomLevel}`);
  const image = await getWebContents().capturePage({
    x: Math.floor(rect.x * zoomLevel),
    y: Math.floor(rect.y * zoomLevel),
    width: Math.floor(rect.width * zoomLevel),
    height: Math.floor(rect.height * zoomLevel)
  });
  const win2 = require$$0.BrowserWindow.getFocusedWindow();
  if (!win2) {
    throw new Error("Failed to open dialog by unexpected error.");
  }
  const appSetting = await loadAppSetting();
  const ret = await require$$0.dialog.showSaveDialog(win2, {
    defaultPath: path.dirname(appSetting.lastImageExportFilePath),
    properties: ["createDirectory", "showOverwriteConfirmation"],
    filters: [{ name: ext.toUpperCase(), extensions: [ext] }]
  });
  if (ret.canceled || !ret.filePath) {
    return;
  }
  const filePath = ret.filePath;
  onUpdateAppSetting({
    lastImageExportFilePath: filePath
  });
  switch (ext) {
    case "png":
      fs.promises.writeFile(filePath, image.toPNG());
      break;
    case "jpeg":
      fs.promises.writeFile(filePath, image.toJPEG(jpegQuality));
      break;
  }
}
const userDataRoot = getPortableExeDir() || getAppPath("userData");
const imageCacheDir = path.join(userDataRoot, "image_cache");
const marginRatio = 0.05;
function getCroppedPieceImageDir(srcURL, opt) {
  let md5 = crypto.createHash("md5").update(srcURL).digest("hex");
  if (opt?.deleteMargin) {
    md5 += "_nmgn";
  }
  return path.join(imageCacheDir, "pieces", md5);
}
const pieces = ["king", "rook", "bishop", "gold", "silver", "knight", "lance", "pawn"];
const promPieces = [
  "king2",
  "dragon",
  "horse",
  "",
  "prom_silver",
  "prom_knight",
  "prom_lance",
  "prom_pawn"
];
async function cropPieceImage(srcURL, opt) {
  const srcPath = url.fileURLToPath(srcURL);
  const destDir = getCroppedPieceImageDir(srcURL, opt);
  getAppLogger().debug(`generate cropped piece images: src=${srcPath} dst=${destDir}`);
  if (!await exists(destDir)) {
    await fs.promises.mkdir(destDir, { recursive: true });
  }
  const pic = await Jimp.read(srcPath);
  let width = pic.getWidth();
  let height = pic.getHeight();
  if (!width || !height) {
    throw new Error("cannot get image metadata");
  } else {
    width = width / 8;
    height = height / 4;
  }
  for (let i = 0; i < 4; i++) {
    let side = "";
    switch (i) {
      case 0:
      case 1:
        side = "black";
        break;
      case 2:
      case 3:
        side = "white";
        break;
    }
    for (let j = 0; j < 8; j++) {
      if (i == 1 && j == 3 || i == 3 && j == 3) {
        continue;
      }
      let piecesSet = [];
      switch (i) {
        case 0:
        case 2:
          piecesSet = pieces;
          break;
        case 1:
        case 3:
          piecesSet = promPieces;
          break;
      }
      const destName = `${side}_${piecesSet[j]}.png`;
      if (!await exists(path.join(destDir, destName))) {
        const image = await Jimp.read(srcPath);
        let x = j * width;
        let y = i * height;
        let w = width;
        let h = height;
        if (opt?.deleteMargin) {
          x += width * marginRatio;
          y += height * marginRatio;
          w *= 1 - marginRatio * 2;
          h *= 1 - marginRatio * 2;
        }
        await image.crop(x, y, w, h).writeAsync(path.join(destDir, destName));
        getAppLogger().debug(`${destName} extracted`);
      } else {
        getAppLogger().debug(`${destName} exists`);
      }
    }
  }
  return url.pathToFileURL(destDir).toString();
}
function fileURLToPath(fileURL, defaultPath) {
  if (fileURL) {
    try {
      return url.fileURLToPath(fileURL);
    } catch (e) {
      getAppLogger().warn(`invalid file URL: ${fileURL}`);
    }
  }
  return defaultPath;
}
async function getAlternativeFilePathWithNumberSuffix(filePath, maxNumber) {
  const parsed = path.parse(filePath);
  let suffix = 2;
  while (await exists(filePath)) {
    if (suffix > maxNumber) {
      throw new Error("Too many files with the same name");
    }
    filePath = path.join(parsed.dir, parsed.name + "-" + suffix + parsed.ext);
    suffix++;
  }
  return filePath;
}
async function convertRecordFiles(setting) {
  const appSetting = await loadAppSetting();
  const result = {
    succeeded: {},
    succeededTotal: 0,
    failed: {},
    failedTotal: 0,
    skipped: {},
    skippedTotal: 0
  };
  getAppLogger().debug(`batch conversion: start ${JSON.stringify(setting)}`);
  const sourceFiles = (await listFiles(setting.source, setting.subdirectories ? Infinity : 0)).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return setting.sourceFormats.includes(ext);
  });
  const writer = setting.destinationType === DestinationType.DIRECTORY ? new DirectoryWriter(setting, appSetting) : new SingleFileWriter(setting, appSetting);
  await writer.open();
  for (const source of sourceFiles) {
    const sourceFormat = detectRecordFileFormatByPath(source);
    try {
      const sourceData = await fs.promises.readFile(source);
      const record = importRecordFromBuffer(sourceData, sourceFormat, {
        autoDetect: appSetting.textDecodingRule === TextDecodingRule.AUTO_DETECT
      });
      if (record instanceof Error) {
        throw record;
      }
      if (await writer.write(record, source)) {
        result.succeededTotal++;
        result.succeeded[sourceFormat] = (result.succeeded[sourceFormat] || 0) + 1;
      } else {
        result.skippedTotal++;
        result.skipped[sourceFormat] = (result.skipped[sourceFormat] || 0) + 1;
      }
    } catch (e) {
      result.failedTotal++;
      result.failed[sourceFormat] = (result.failed[sourceFormat] || 0) + 1;
      getAppLogger().debug(`batch conversion: failed: ${source}: ${e}`);
    }
  }
  await writer.close();
  getAppLogger().debug(`batch conversion: completed`);
  return result;
}
class DirectoryWriter {
  constructor(setting, appSetting) {
    this.setting = setting;
    this.appSetting = appSetting;
  }
  async open() {
  }
  async write(record, source) {
    const parsed = path.parse(path.relative(this.setting.source, source));
    const name = parsed.name + this.setting.destinationFormat;
    let destination = path.join(
      this.setting.destination,
      this.setting.createSubdirectories ? path.join(parsed.dir, name) : name
    );
    if (await exists(destination)) {
      switch (this.setting.fileNameConflictAction) {
        case FileNameConflictAction.OVERWRITE:
          break;
        case FileNameConflictAction.NUMBER_SUFFIX:
          destination = await getAlternativeFilePathWithNumberSuffix(destination, 1e3);
          break;
        case FileNameConflictAction.SKIP:
          getAppLogger().debug(`batch conversion: skipped: ${source}`);
          return false;
      }
    }
    const destinationDir = path.dirname(destination);
    await fs.promises.mkdir(destinationDir, { recursive: true });
    const exportResult = exportRecordAsBuffer(record, this.setting.destinationFormat, {
      returnCode: this.appSetting.returnCode
    });
    await fs.promises.writeFile(destination, exportResult.data);
    getAppLogger().debug(`batch conversion: succeeded: ${source} -> ${destination}`);
    return true;
  }
  async close() {
  }
}
class SingleFileWriter {
  constructor(setting, appSetting) {
    this.setting = setting;
    this.appSetting = appSetting;
  }
  fd;
  async open() {
    this.fd = await fs.promises.open(this.setting.singleFileDestination, "w");
  }
  async write(record, source) {
    await this.writeUSI(record);
    getAppLogger().debug(`batch conversion: succeeded: ${source}`);
    return true;
  }
  async close() {
    await this.fd?.close();
  }
  async writeUSI(record) {
    let position;
    const sfen = record.initialPosition.sfen;
    if (this.appSetting.enableUSIFileStartpos && sfen === InitialPositionSFEN.STANDARD) {
      position = "startpos";
    } else {
      position = "sfen " + sfen;
    }
    const branches = this.getUSIBranches(record);
    for (const moves of branches) {
      if (moves) {
        await this.fd?.write(position + " moves" + moves + this.appSetting.returnCode);
      } else {
        await this.fd?.write(position + this.appSetting.returnCode);
      }
    }
  }
  getUSIBranches(record) {
    const branches = [];
    let moves = "";
    let p = record.first;
    const pos = record.initialPosition.clone();
    const stack = [];
    while (true) {
      if (p.next) {
        stack.push([p, moves]);
        if (p.move instanceof Move) {
          pos.doMove(p.move);
          moves += " " + p.move.usi;
        }
        p = p.next;
        continue;
      }
      if (p.move instanceof Move) {
        branches.push(moves + " " + p.move.usi);
      } else if (this.appSetting.enableUSIFileResign && p.move.type === SpecialMoveType.RESIGN) {
        branches.push(moves + " resign");
      } else {
        branches.push(moves);
      }
      while (!p.branch) {
        const last = stack.pop();
        if (!last) {
          return branches;
        }
        if (last[0].move instanceof Move) {
          pos.undoMove(last[0].move);
        }
        p = last[0];
        moves = last[1];
      }
      p = p.branch;
    }
  }
}
var HistoryClass = /* @__PURE__ */ ((HistoryClass2) => {
  HistoryClass2["USER"] = "user";
  HistoryClass2["BACKUP"] = "backup";
  return HistoryClass2;
})(HistoryClass || {});
function getEmptyHistory() {
  return { entries: [] };
}
const historyMaxLength = 20;
const userDir = getAppPath("userData");
const historyPath = path.join(userDir, "record_file_history.json");
const backupDir = path.join(userDir, "backup/kifu");
const lock = new AsyncLock();
async function getHistoryWithoutLock() {
  try {
    await fs.promises.lstat(historyPath);
    return {
      ...getEmptyHistory(),
      ...JSON.parse(await fs.promises.readFile(historyPath, "utf8"))
    };
  } catch {
    return { entries: [] };
  }
}
function saveHistories(history) {
  return fs.promises.writeFile(historyPath, JSON.stringify(history, void 0, 2), "utf8");
}
function issueEntryID() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
}
function removeBackupFile(fileName) {
  const filePath = path.join(backupDir, fileName);
  fs.promises.rm(filePath).catch((e) => {
    getAppLogger().error("failed to remove backup: [%s]: %s", filePath, e);
  });
}
function trancate(history) {
  while (history.entries.length > historyMaxLength) {
    const entry = history.entries.shift();
    if (entry.class === HistoryClass.BACKUP && entry.backupFileName) {
      removeBackupFile(entry.backupFileName);
    }
  }
}
function getHistory() {
  return lock.acquire("history", async () => {
    return await getHistoryWithoutLock();
  });
}
function addHistory(path2) {
  lock.acquire("history", async () => {
    try {
      const history = await getHistoryWithoutLock();
      history.entries = history.entries.filter((e) => e.userFilePath !== path2);
      history.entries.push({
        id: issueEntryID(),
        time: (/* @__PURE__ */ new Date()).toISOString(),
        class: HistoryClass.USER,
        userFilePath: path2
      });
      trancate(history);
      await saveHistories(history);
    } catch (e) {
      getAppLogger().error("failed to add history: %s", e);
    }
  });
}
function clearHistory() {
  return lock.acquire("history", async () => {
    const history = await getHistoryWithoutLock();
    for (const entry of history.entries) {
      if (entry.class === HistoryClass.BACKUP && entry.backupFileName) {
        removeBackupFile(entry.backupFileName);
      }
    }
    await saveHistories(getEmptyHistory());
  });
}
function saveBackup(kif) {
  return lock.acquire("history", async () => {
    const unixTime = (/* @__PURE__ */ new Date()).getTime();
    const random = Math.floor(Math.random() * 1e4);
    const fileName = `${unixTime}-${random}.kifu`;
    const filePath = path.join(backupDir, fileName);
    const history = await getHistoryWithoutLock();
    await fs.promises.mkdir(backupDir, { recursive: true });
    await fs.promises.writeFile(filePath, kif);
    history.entries.push({
      id: issueEntryID(),
      time: (/* @__PURE__ */ new Date()).toISOString(),
      class: HistoryClass.BACKUP,
      backupFileName: fileName
    });
    while (history.entries.length > historyMaxLength) {
      history.entries.shift();
    }
    trancate(history);
    await saveHistories(history);
  });
}
async function loadBackup(fileName) {
  const filePath = path.join(backupDir, fileName);
  return await fs.promises.readFile(filePath, "utf8");
}
const isWindows = process.platform === "win32";
let initialFilePath = "";
let mainWindow;
let appState = AppState.NORMAL;
let closable = false;
function setInitialFilePath(path2) {
  initialFilePath = path2;
}
function setup(win2) {
  mainWindow = win2;
  setupMenu();
}
function getAppState() {
  return appState;
}
function isClosable() {
  return closable;
}
function getWebContents() {
  return mainWindow.webContents;
}
require$$0.ipcMain.handle(Background.GET_RECORD_PATH_FROM_PROC_ARG, (event) => {
  validateIPCSender(event.senderFrame);
  if (isValidRecordFilePath(initialFilePath)) {
    getAppLogger().debug(`record path from open-file event: ${initialFilePath}`);
    return initialFilePath;
  }
  const path2 = process.argv[process.argv.length - 1];
  if (isValidRecordFilePath(path2)) {
    getAppLogger().debug(`record path from proc arg: ${path2}`);
    return path2;
  }
});
require$$0.ipcMain.on(Background.UPDATE_APP_STATE, (_, state, bussy) => {
  getAppLogger().debug(`change app state: AppState=${state} BussyState=${bussy}`);
  appState = state;
  updateAppState(state, bussy);
});
require$$0.ipcMain.on(Background.OPEN_EXPLORER, async (_, targetPath) => {
  try {
    const fullPath = resolvePath(targetPath);
    const stats = await fs.promises.stat(fullPath);
    if (stats.isDirectory()) {
      require$$0.shell.openPath(fullPath);
    } else {
      require$$0.shell.openPath(path.dirname(fullPath));
    }
  } catch {
    sendError(new Error(t.failedToOpenDirectory(targetPath)));
  }
});
function isValidRecordFilePath(path2) {
  const lowerCasePath = path2.toLowerCase();
  return lowerCasePath.endsWith(".kif") || lowerCasePath.endsWith(".kifu") || lowerCasePath.endsWith(".ki2") || lowerCasePath.endsWith(".ki2u") || lowerCasePath.endsWith(".csa") || lowerCasePath.endsWith(".jkf");
}
require$$0.ipcMain.handle(Background.SHOW_OPEN_RECORD_DIALOG, async (event) => {
  validateIPCSender(event.senderFrame);
  const appSetting = await loadAppSetting();
  getAppLogger().debug(`show open-record dialog`);
  const ret = await showOpenDialog(["openFile"], appSetting.lastRecordFilePath, [
    {
      name: t.recordFile,
      extensions: ["kif", "kifu", "ki2", "ki2u", "csa", "jkf"]
    }
  ]);
  if (ret) {
    onUpdateAppSetting({ lastRecordFilePath: ret });
  }
  return ret;
});
require$$0.ipcMain.handle(Background.OPEN_RECORD, async (event, path2) => {
  validateIPCSender(event.senderFrame);
  if (!isValidRecordFilePath(path2)) {
    throw new Error(t.fileExtensionNotSupported);
  }
  getAppLogger().debug(`open record: ${path2}`);
  return fs.promises.readFile(path2);
});
async function showOpenDialog(properties, defaultPath, filters, buttonLabel) {
  const win2 = require$$0.BrowserWindow.getFocusedWindow();
  if (!win2) {
    throw new Error("Failed to open dialog by unexpected error.");
  }
  const ret = await require$$0.dialog.showOpenDialog(win2, {
    defaultPath,
    properties,
    filters,
    buttonLabel
  });
  getAppLogger().debug(`open dialog result: ${JSON.stringify(ret)}`);
  if (ret.canceled || ret.filePaths.length !== 1) {
    return "";
  }
  return ret.filePaths[0];
}
async function showSaveDialog(defaultPath, filters, buttonLabel) {
  const win2 = require$$0.BrowserWindow.getFocusedWindow();
  if (!win2) {
    throw new Error("failed to open dialog by unexpected error.");
  }
  filters.sort((lhs, rhs) => {
    return defaultPath.endsWith("." + lhs.extensions[0]) ? -1 : defaultPath.endsWith("." + rhs.extensions[0]) ? 1 : 0;
  });
  getAppLogger().debug("show save dialog");
  const ret = await require$$0.dialog.showSaveDialog(win2, {
    defaultPath,
    properties: ["createDirectory", "showOverwriteConfirmation"],
    filters,
    buttonLabel
  });
  getAppLogger().debug(`save dialog result: ${JSON.stringify(ret)}`);
  return !ret.canceled && ret.filePath || "";
}
require$$0.ipcMain.handle(
  Background.SHOW_SAVE_RECORD_DIALOG,
  async (event, defaultPath) => {
    validateIPCSender(event.senderFrame);
    const win2 = require$$0.BrowserWindow.getFocusedWindow();
    if (!win2) {
      throw new Error("failed to open dialog by unexpected error.");
    }
    const appSetting = await loadAppSetting();
    const filters = [
      { name: "KIF (Shift_JIS)", extensions: ["kif"] },
      { name: "KIF (UTF-8)", extensions: ["kifu"] },
      { name: "KI2 (Shift_JIS)", extensions: ["ki2"] },
      { name: "KI2 (UTF-8)", extensions: ["ki2u"] },
      { name: "CSA", extensions: ["csa"] },
      { name: "JSON Kifu Format", extensions: ["jkf"] }
    ];
    const result = await showSaveDialog(
      path.resolve(path.dirname(appSetting.lastRecordFilePath), defaultPath),
      filters
    );
    if (result) {
      onUpdateAppSetting({ lastRecordFilePath: result });
    }
    return result;
  }
);
require$$0.ipcMain.handle(
  Background.SAVE_RECORD,
  async (event, filePath, data) => {
    validateIPCSender(event.senderFrame);
    if (!isValidRecordFilePath(filePath)) {
      throw new Error(t.fileExtensionNotSupported);
    }
    getAppLogger().debug(`save record: ${filePath} (${data.length} bytes)`);
    const dir = path.dirname(filePath);
    await fs.promises.mkdir(dir, { recursive: true });
    await fs.promises.writeFile(filePath, data);
  }
);
require$$0.ipcMain.handle(Background.SHOW_SELECT_FILE_DIALOG, async (event) => {
  validateIPCSender(event.senderFrame);
  const win2 = require$$0.BrowserWindow.getFocusedWindow();
  if (!win2) {
    throw new Error("failed to open dialog by unexpected error.");
  }
  const appSetting = await loadAppSetting();
  getAppLogger().debug("show select-file dialog");
  const ret = await showOpenDialog(["openFile"], appSetting.lastOtherFilePath);
  if (ret) {
    onUpdateAppSetting({ lastOtherFilePath: ret });
  }
  return ret;
});
require$$0.ipcMain.handle(
  Background.SHOW_SELECT_DIRECTORY_DIALOG,
  async (event, defaultPath) => {
    validateIPCSender(event.senderFrame);
    getAppLogger().debug("show select-directory dialog");
    const ret = await showOpenDialog(["createDirectory", "openDirectory"], defaultPath);
    return ret;
  }
);
require$$0.ipcMain.handle(
  Background.SHOW_SELECT_IMAGE_DIALOG,
  async (event, defaultURL) => {
    validateIPCSender(event.senderFrame);
    const win2 = require$$0.BrowserWindow.getFocusedWindow();
    if (!win2) {
      throw new Error("failed to open dialog by unexpected error.");
    }
    getAppLogger().debug("show select-image dialog");
    const ret = await showOpenDialog(
      ["openFile"],
      defaultURL && fileURLToPath(defaultURL, getAppPath("pictures")),
      [{ name: t.imageFile, extensions: ["png", "jpg", "jpeg"] }]
    );
    return ret !== "" ? url.pathToFileURL(ret).toString() : "";
  }
);
require$$0.ipcMain.handle(
  Background.SHOW_SAVE_MERGED_RECORD_DIALOG,
  async (event, defaultPath) => {
    validateIPCSender(event.senderFrame);
    const win2 = require$$0.BrowserWindow.getFocusedWindow();
    if (!win2) {
      throw new Error("failed to open dialog by unexpected error.");
    }
    const filters = [{ name: "SFEN", extensions: ["sfen"] }];
    return await showSaveDialog(path.resolve(defaultPath), filters, "OK");
  }
);
require$$0.ipcMain.handle(
  Background.CROP_PIECE_IMAGE,
  async (event, srcURL, deleteMargin) => {
    validateIPCSender(event.senderFrame);
    return await cropPieceImage(srcURL, { deleteMargin });
  }
);
require$$0.ipcMain.handle(Background.EXPORT_CAPTURE_AS_PNG, async (event, json) => {
  validateIPCSender(event.senderFrame);
  await exportCapturePNG(new Rect(json));
});
require$$0.ipcMain.handle(Background.EXPORT_CAPTURE_AS_JPEG, async (event, json) => {
  validateIPCSender(event.senderFrame);
  await exportCaptureJPEG(new Rect(json));
});
require$$0.ipcMain.handle(Background.CONVERT_RECORD_FILES, async (event, json) => {
  validateIPCSender(event.senderFrame);
  const setting = JSON.parse(json);
  return JSON.stringify(await convertRecordFiles(setting));
});
require$$0.ipcMain.handle(Background.LOAD_APP_SETTING, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load app setting");
  return JSON.stringify(await loadAppSetting());
});
require$$0.ipcMain.handle(Background.SAVE_APP_SETTING, async (event, json) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("save app setting");
  await saveAppSetting(JSON.parse(json));
});
require$$0.ipcMain.handle(Background.LOAD_BATCH_CONVERSION_SETTING, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load batch conversion setting");
  return JSON.stringify(await loadBatchConversionSetting());
});
require$$0.ipcMain.handle(
  Background.SAVE_BATCH_CONVERSION_SETTING,
  async (event, json) => {
    validateIPCSender(event.senderFrame);
    getAppLogger().debug("save batch conversion setting");
    await saveBatchConversionSetting(JSON.parse(json));
  }
);
require$$0.ipcMain.handle(Background.LOAD_RESEARCH_SETTING, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load research setting");
  return JSON.stringify(await loadResearchSetting());
});
require$$0.ipcMain.handle(Background.SAVE_RESEARCH_SETTING, async (event, json) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("save research setting");
  await saveResearchSetting(JSON.parse(json));
});
require$$0.ipcMain.handle(Background.LOAD_ANALYSIS_SETTING, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load analysis setting");
  return JSON.stringify(await loadAnalysisSetting());
});
require$$0.ipcMain.handle(Background.SAVE_ANALYSIS_SETTING, async (event, json) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("save analysis setting");
  await saveAnalysisSetting(JSON.parse(json));
});
require$$0.ipcMain.handle(Background.LOAD_GAME_SETTING, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load game setting");
  return JSON.stringify(await loadGameSetting());
});
require$$0.ipcMain.handle(Background.SAVE_GAME_SETTING, async (event, json) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("save game setting");
  await saveGameSetting(JSON.parse(json));
});
require$$0.ipcMain.handle(Background.LOAD_CSA_GAME_SETTING_HISTORY, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load CSA game setting history");
  return JSON.stringify(await loadCSAGameSettingHistory());
});
require$$0.ipcMain.handle(
  Background.SAVE_CSA_GAME_SETTING_HISTORY,
  async (event, json) => {
    validateIPCSender(event.senderFrame);
    getAppLogger().debug("save CSA game setting history");
    await saveCSAGameSettingHistory(JSON.parse(json));
  }
);
require$$0.ipcMain.handle(Background.LOAD_MATE_SEARCH_SETTING, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load mate search setting");
  return JSON.stringify(await loadMateSearchSetting());
});
require$$0.ipcMain.handle(Background.SAVE_MATE_SEARCH_SETTING, async (event, json) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("save mate search setting");
  await saveMateSearchSetting(JSON.parse(json));
});
require$$0.ipcMain.handle(Background.LOAD_RECORD_FILE_HISTORY, async (event) => {
  validateIPCSender(event.senderFrame);
  return JSON.stringify(await getHistory());
});
require$$0.ipcMain.on(Background.ADD_RECORD_FILE_HISTORY, (event, path2) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("add record file history: %s", path2);
  addHistory(path2);
});
require$$0.ipcMain.handle(Background.CLEAR_RECORD_FILE_HISTORY, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("clear record file history");
  clearHistory();
});
require$$0.ipcMain.handle(Background.SAVE_RECORD_FILE_BACKUP, async (event, kif) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("save record file backup");
  await saveBackup(kif);
});
require$$0.ipcMain.handle(Background.LOAD_RECORD_FILE_BACKUP, async (event, name) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load record file backup: %s", name);
  return await loadBackup(name);
});
require$$0.ipcMain.handle(Background.LOAD_USI_ENGINE_SETTING, async (event) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("load USI engine setting");
  return (await loadUSIEngineSetting()).json;
});
require$$0.ipcMain.handle(Background.SAVE_USI_ENGINE_SETTING, async (event, json) => {
  validateIPCSender(event.senderFrame);
  getAppLogger().debug("save USI engine setting");
  await saveUSIEngineSetting(new USIEngineSettings(json));
});
require$$0.ipcMain.handle(Background.SHOW_SELECT_USI_ENGINE_DIALOG, async (event) => {
  validateIPCSender(event.senderFrame);
  const win2 = require$$0.BrowserWindow.getFocusedWindow();
  if (!win2) {
    throw new Error("failed to open dialog by unexpected error.");
  }
  const appSetting = await loadAppSetting();
  getAppLogger().debug("show select-USI-engine dialog");
  const ret = await showOpenDialog(
    ["openFile", "noResolveAliases"],
    appSetting.lastUSIEngineFilePath,
    isWindows ? [{ name: t.executableFile, extensions: ["exe", "cmd", "bat"] }] : void 0
  );
  if (ret === "") {
    return "";
  }
  const enginePath = getRelativePath(ret);
  onUpdateAppSetting({
    lastUSIEngineFilePath: enginePath
  });
  return enginePath;
});
require$$0.ipcMain.handle(
  Background.GET_USI_ENGINE_INFO,
  async (event, path2, timeoutSeconds) => {
    validateIPCSender(event.senderFrame);
    return JSON.stringify(await getUSIEngineInfo(path2, timeoutSeconds));
  }
);
require$$0.ipcMain.handle(
  Background.SEND_USI_SET_OPTION,
  async (event, path2, name, timeoutSeconds) => {
    validateIPCSender(event.senderFrame);
    await sendSetOptionCommand(path2, name, timeoutSeconds);
  }
);
require$$0.ipcMain.handle(Background.LAUNCH_USI, async (event, json, timeoutSeconds) => {
  validateIPCSender(event.senderFrame);
  const setting = JSON.parse(json);
  return await setupPlayer(setting, timeoutSeconds);
});
require$$0.ipcMain.handle(Background.USI_READY, async (event, sessionID) => {
  validateIPCSender(event.senderFrame);
  return await ready(sessionID);
});
require$$0.ipcMain.handle(
  Background.USI_GO,
  (event, sessionID, usi, json, blackTimeMs, whiteTimeMs) => {
    validateIPCSender(event.senderFrame);
    const timeLimit = JSON.parse(json);
    go(sessionID, usi, timeLimit, blackTimeMs, whiteTimeMs);
  }
);
require$$0.ipcMain.handle(
  Background.USI_GO_PONDER,
  (event, sessionID, usi, json, blackTimeMs, whiteTimeMs) => {
    validateIPCSender(event.senderFrame);
    const timeLimit = JSON.parse(json);
    goPonder(sessionID, usi, timeLimit, blackTimeMs, whiteTimeMs);
  }
);
require$$0.ipcMain.handle(Background.USI_GO_PONDER_HIT, (event, sessionID) => {
  validateIPCSender(event.senderFrame);
  ponderHit(sessionID);
});
require$$0.ipcMain.handle(Background.USI_GO_INFINITE, (event, sessionID, usi) => {
  validateIPCSender(event.senderFrame);
  goInfinite(sessionID, usi);
});
require$$0.ipcMain.handle(Background.USI_GO_MATE, (event, sessionID, usi) => {
  validateIPCSender(event.senderFrame);
  goMate(sessionID, usi);
});
require$$0.ipcMain.handle(Background.USI_STOP, (event, sessionID) => {
  validateIPCSender(event.senderFrame);
  stop$1(sessionID);
});
require$$0.ipcMain.handle(Background.USI_GAMEOVER, (event, sessionID, result) => {
  validateIPCSender(event.senderFrame);
  gameover(sessionID, result);
});
require$$0.ipcMain.handle(Background.USI_QUIT, (event, sessionID) => {
  validateIPCSender(event.senderFrame);
  quit(sessionID);
});
require$$0.ipcMain.handle(Background.CSA_LOGIN, (event, json) => {
  validateIPCSender(event.senderFrame);
  const setting = JSON.parse(json);
  return login(setting);
});
require$$0.ipcMain.handle(Background.CSA_LOGOUT, (event, sessionID) => {
  validateIPCSender(event.senderFrame);
  logout(sessionID);
});
require$$0.ipcMain.handle(Background.CSA_AGREE, (event, sessionID, gameID) => {
  validateIPCSender(event.senderFrame);
  agree(sessionID, gameID);
});
require$$0.ipcMain.handle(
  Background.CSA_MOVE,
  (event, sessionID, move, score, pv) => {
    validateIPCSender(event.senderFrame);
    doMove(sessionID, move, score, pv);
  }
);
require$$0.ipcMain.handle(Background.CSA_RESIGN, (event, sessionID) => {
  validateIPCSender(event.senderFrame);
  resign(sessionID);
});
require$$0.ipcMain.handle(Background.CSA_WIN, (event, sessionID) => {
  validateIPCSender(event.senderFrame);
  win(sessionID);
});
require$$0.ipcMain.handle(Background.CSA_STOP, (event, sessionID) => {
  validateIPCSender(event.senderFrame);
  stop(sessionID);
});
require$$0.ipcMain.handle(Background.IS_ENCRYPTION_AVAILABLE, (event) => {
  validateIPCSender(event.senderFrame);
  return isEncryptionAvailable();
});
require$$0.ipcMain.handle(Background.OPEN_LOG_FILE, (event, logType) => {
  validateIPCSender(event.senderFrame);
  openLogFile(logType);
});
require$$0.ipcMain.on(Background.LOG, (event, level, message) => {
  validateIPCSender(event.senderFrame);
  switch (level) {
    case LogLevel.DEBUG:
      getAppLogger().debug("%s", message);
      break;
    case LogLevel.INFO:
      getAppLogger().info("%s", message);
      break;
    case LogLevel.WARN:
      getAppLogger().warn("%s", message);
      break;
    case LogLevel.ERROR:
      getAppLogger().error("%s", message);
      break;
  }
});
require$$0.ipcMain.on(Background.ON_CLOSABLE, (event) => {
  validateIPCSender(event.senderFrame);
  closable = true;
  mainWindow.close();
});
function onClose() {
  mainWindow.webContents.send(Renderer.CLOSE);
}
function sendError(e) {
  mainWindow.webContents.send(Renderer.SEND_ERROR, e);
}
function onMenuEvent(event, ...args) {
  mainWindow.webContents.send(Renderer.MENU_EVENT, event, ...args);
}
function onUpdateAppSetting(setting) {
  mainWindow.webContents.send(Renderer.UPDATE_APP_SETTING, JSON.stringify(setting));
}
function openRecord(path2) {
  if (isValidRecordFilePath(path2)) {
    mainWindow.webContents.send(Renderer.OPEN_RECORD, path2);
  }
}
function onUSIBestMove(sessionID, usi, usiMove, ponder) {
  mainWindow.webContents.send(Renderer.USI_BEST_MOVE, sessionID, usi, usiMove, ponder);
}
function onUSICheckmate(sessionID, usi, usiMoves) {
  mainWindow.webContents.send(Renderer.USI_CHECKMATE, sessionID, usi, usiMoves);
}
function onUSICheckmateNotImplemented(sessionID) {
  mainWindow.webContents.send(Renderer.USI_CHECKMATE_NOT_IMPLEMENTED, sessionID);
}
function onUSICheckmateTimeout(sessionID, usi) {
  mainWindow.webContents.send(Renderer.USI_CHECKMATE_TIMEOUT, sessionID, usi);
}
function onUSINoMate(sessionID, usi) {
  mainWindow.webContents.send(Renderer.USI_NO_MATE, sessionID, usi);
}
function onUSIInfo(sessionID, usi, info) {
  mainWindow.webContents.send(Renderer.USI_INFO, sessionID, usi, JSON.stringify(info));
}
function onUSIPonderInfo(sessionID, usi, info) {
  mainWindow.webContents.send(Renderer.USI_PONDER_INFO, sessionID, usi, JSON.stringify(info));
}
function onCSAGameSummary(sessionID, gameSummary) {
  mainWindow.webContents.send(Renderer.CSA_GAME_SUMMARY, sessionID, JSON.stringify(gameSummary));
}
function onCSAReject(sessionID) {
  mainWindow.webContents.send(Renderer.CSA_REJECT, sessionID);
}
function onCSAStart(sessionID, playerStates) {
  mainWindow.webContents.send(Renderer.CSA_START, sessionID, JSON.stringify(playerStates));
}
function onCSAMove(sessionID, move, playerStates) {
  mainWindow.webContents.send(Renderer.CSA_MOVE, sessionID, move, JSON.stringify(playerStates));
}
function onCSAGameResult(sessionID, specialMove2, gameResult) {
  mainWindow.webContents.send(Renderer.CSA_GAME_RESULT, sessionID, specialMove2, gameResult);
}
function onCSAClose(sessionID) {
  mainWindow.webContents.send(Renderer.CSA_CLOSE, sessionID);
}
getAppLogger().info("start main process");
getAppLogger().info("process argv: %s", process.argv.join(" "));
if (isPortable()) {
  getAppLogger().info("portable mode: %s", getPortableExeDir());
}
require$$0.protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);
setLanguage(loadAppSettingOnce().language);
function createWindow() {
  let setting = loadWindowSetting();
  getAppLogger().info("create BrowserWindow");
  const win2 = new require$$0.BrowserWindow({
    width: setting.width,
    height: setting.height,
    fullscreen: setting.fullscreen,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      // on development, disable webSecurity to allow mix of "file://" and "http://localhost:5173"
      webSecurity: !isDevelopment()
    }
  });
  win2.setBackgroundColor("#888");
  if (setting.maximized) {
    win2.maximize();
  }
  win2.on("resized", () => {
    setting = buildWindowSetting(setting, win2);
  });
  win2.on("close", (event) => {
    if (getAppState() === AppState.CSA_GAME) {
      event.preventDefault();
      sendError(new Error(t.youCanNotCloseAppWhileCSAOnlineGame));
      return;
    }
    if (!isClosable()) {
      event.preventDefault();
      onClose();
      return;
    }
    setting = buildWindowSetting(setting, win2);
    saveWindowSetting(setting);
  });
  setup(win2);
  if (isDevelopment() || isTest()) {
    getAppLogger().info("load dev server URL");
    const url2 = process.env["ELECTRON_RENDERER_URL"] || "http://localhost:5173";
    win2.loadURL(url2).then(() => {
      if (!process.env.IS_TEST) {
        win2.webContents.openDevTools();
      }
    }).catch((e) => {
      getAppLogger().error(`failed to load dev server URL: ${e}`);
      throw e;
    });
  } else if (isPreview()) {
    getAppLogger().info("load app URL");
    win2.loadFile(path.join(__dirname, "../../index.html")).catch((e) => {
      getAppLogger().error(`failed to load app URL: ${e}`);
      throw e;
    });
  } else {
    getAppLogger().info("load app URL");
    win2.loadFile(path.join(__dirname, "../index.html")).catch((e) => {
      getAppLogger().error(`failed to load app URL: ${e}`);
      throw e;
    });
  }
  win2.once("ready-to-show", () => {
    process.on("uncaughtException", (e, origin) => {
      try {
        sendError(new Error(`${origin}: ${e}`));
      } catch (ipcError) {
        getAppLogger().error(`failed to send error to renderer: ${ipcError}: ${e}`);
      }
    });
    win2.show();
    require$$0.app.on("open-file", (event, path2) => {
      getAppLogger().info("on open-file: %s", path2);
      event.preventDefault();
      if (win2.isMinimized()) {
        win2.restore();
      }
      win2.focus();
      openRecord(path2);
    });
  });
}
require$$0.app.enableSandbox();
require$$0.app.once("will-finish-launching", () => {
  getAppLogger().info("on will-finish-launching");
  require$$0.app.once("open-file", (event, path2) => {
    getAppLogger().info("on open-file: %s", path2);
    event.preventDefault();
    setInitialFilePath(path2);
  });
});
require$$0.app.on("will-quit", () => {
  getAppLogger().info("on will-quit");
  quitAll();
  shutdownLoggers();
});
require$$0.app.on("window-all-closed", () => {
  getAppLogger().info("on window-all-closed");
  require$$0.app.quit();
});
require$$0.app.on("activate", () => {
  if (require$$0.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
require$$0.app.on("web-contents-created", (_, contents) => {
  contents.on("will-navigate", (event) => {
    event.preventDefault();
  });
  contents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
});
async function installElectronDevtools() {
  const installer = await Promise.resolve().then(() => require("./index-474b96cd.js")).then((n) => n.index);
  await installer.default(installer.VUEJS3_DEVTOOLS);
}
require$$0.app.on("ready", () => {
  if (isDevelopment()) {
    getAppLogger().info("install Vue3 Dev Tools");
    installElectronDevtools().catch((e) => {
      getAppLogger().error(`Vue Devtools failed to install: ${e}`);
      throw e;
    });
  }
  require$$0.session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    validateHTTPRequest(details.method, details.url);
    callback({});
  });
  createWindow();
});
if (isDevelopment() || isTest()) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        getAppLogger().info("on graceful-exit message");
        require$$0.app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      getAppLogger().info("on SIGTERM");
      require$$0.app.quit();
    });
  }
}
