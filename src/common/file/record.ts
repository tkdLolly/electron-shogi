import { decodeText, encodeText } from "@/common/helpers/encode";
import {
  ImmutableRecord,
  Record,
  exportCSA,
  exportKI2,
  exportKIF,
  importCSA,
  importKI2,
  importKIF,
  exportJKFString,
  importJKFString,
} from "electron-shogi-core";
import * as iots from "io-ts";

export const RecordFileFormatDef = iots.keyof({
  ".kif": null,
  ".kifu": null,
  ".ki2": null,
  ".ki2u": null,
  ".csa": null,
  ".sfen": null,
  ".jkf": null,
});
export type RecordFileFormat = iots.TypeOf<typeof RecordFileFormatDef>;

export function detectRecordFileFormatByPath(path: string): RecordFileFormat | undefined {
  const lowerCase = path.toLowerCase();
  for (const ext of Object.keys(RecordFileFormatDef.keys)) {
    if (lowerCase.endsWith(ext)) {
      return ext as RecordFileFormat;
    }
  }
}

function getRecommendedEncodingByFileFormat(format: RecordFileFormat): "UTF8" | "SJIS" {
  switch (format) {
    default:
      return "UTF8";
    case ".kif":
    case ".ki2":
      return "SJIS";
  }
}

export function importRecordFromBuffer(
  data: Uint8Array,
  format: RecordFileFormat,
  option?: { autoDetect?: boolean },
): Record | Error {
  const text = decodeText(data, {
    encoding: getRecommendedEncodingByFileFormat(format),
    autoDetect: option?.autoDetect,
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

export type ExportOptions = {
  returnCode?: string;
  detectGarbled?: boolean;
};

export type ExportResult = {
  data: Uint8Array;
  garbled: boolean;
};

export function exportRecordAsBuffer(
  record: ImmutableRecord,
  format: RecordFileFormat,
  opt: ExportOptions,
): ExportResult {
  const encoding = getRecommendedEncodingByFileFormat(format);
  let str: string;
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

export type InitialRecordFileRequest = {
  path: string;
  ply?: number;
} | null;
