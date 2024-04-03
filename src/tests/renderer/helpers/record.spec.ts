import { Record, SpecialMoveType } from "electron-shogi-core";
import { detectUnsupportedRecordProperties } from "@/renderer/helpers/record";

describe("helpers/record", () => {
  it("detectUnsupportedRecordProperties", () => {
    const record = new Record();
    expect(detectUnsupportedRecordProperties(record, ".kif")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".kifu")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".ki2")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".ki2u")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".csa")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".sfen")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".jkf")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });

    record.append(SpecialMoveType.RESIGN);
    record.append(SpecialMoveType.INTERRUPT);
    record.first.comment = "foo";
    record.first.bookmark = "bar";
    record.current.setElapsedMs(123);
    expect(detectUnsupportedRecordProperties(record, ".kif")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".kifu")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".ki2")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: true,
    });
    expect(detectUnsupportedRecordProperties(record, ".ki2u")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: false,
      time: true,
    });
    expect(detectUnsupportedRecordProperties(record, ".csa")).toStrictEqual({
      branch: true,
      comment: false,
      bookmark: true,
      time: false,
    });
    expect(detectUnsupportedRecordProperties(record, ".sfen")).toStrictEqual({
      branch: true,
      comment: true,
      bookmark: true,
      time: true,
    });
    expect(detectUnsupportedRecordProperties(record, ".jkf")).toStrictEqual({
      branch: false,
      comment: false,
      bookmark: true,
      time: false,
    });
  });
});
