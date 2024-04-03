import { RecordFileFormat } from "@/common/file/record";
import { ImmutableRecord } from "electron-shogi-core";

export type RecordProperties = {
  branch: boolean;
  comment: boolean;
  bookmark: boolean;
  time: boolean;
};

export function detectUnsupportedRecordProperties(
  record: ImmutableRecord,
  fileType: RecordFileFormat,
): RecordProperties {
  const props: RecordProperties = {
    branch: false,
    comment: false,
    bookmark: false,
    time: false,
  };
  if (fileType === ".kif" || fileType === ".kifu") {
    return props;
  }
  record.forEach((node) => {
    if (node.branch) {
      props.branch = true;
    }
    if (node.comment) {
      props.comment = true;
    }
    if (node.bookmark) {
      props.bookmark = true;
    }
    if (node.elapsedMs) {
      props.time = true;
    }
  });
  switch (fileType) {
    case ".ki2":
    case ".ki2u":
      props.branch = false;
      props.comment = false;
      props.bookmark = false;
      break;
    case ".csa":
      props.comment = false;
      props.time = false;
      break;
    case ".sfen":
      break;
    case ".jkf":
      props.branch = false;
      props.comment = false;
      props.time = false;
      break;
  }
  return props;
}
