import { GameSetting, JishogiRule, normalizeGameSetting } from "@/common/settings/game";
import { InitialPositionType } from "electron-shogi-core";
import * as uri from "@/common/uri";

describe("settings/game", () => {
  it("normalize", () => {
    const setting: GameSetting = {
      black: {
        name: "先手番",
        uri: uri.ES_HUMAN,
      },
      white: {
        name: "後手番",
        uri: uri.ES_USI_ENGINE_PREFIX + "test-engine",
        usi: {
          uri: uri.ES_USI_ENGINE_PREFIX + "test-engine",
          name: "Test Engine",
          defaultName: "test engine",
          author: "test author",
          path: "/path/to/test-engine",
          options: {
            USI_Hash: { name: "USI_Hash", type: "spin", order: 1 },
          },
          labels: {},
          enableEarlyPonder: false,
        },
      },
      timeLimit: {
        timeSeconds: 1234,
        byoyomi: 10,
        increment: 0,
      },
      startPosition: InitialPositionType.TSUME_SHOGI,
      enableEngineTimeout: true,
      humanIsFront: false,
      enableComment: false,
      enableAutoSave: false,
      repeat: 3,
      swapPlayers: false,
      maxMoves: 80,
      jishogiRule: JishogiRule.NONE,
    };
    const result = normalizeGameSetting(setting);
    expect(result).toStrictEqual(setting);
  });
});
