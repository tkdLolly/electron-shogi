import { useStore } from "@/store";

type Command = DisplayMessageBoxCommand | SearchKifDB;

type DisplayMessageBoxCommand = {
  type: "displayMessageBox";
  value: string;
};

type SearchKifDB = {
  type: undefined;
  comment: string;
  kif_data: string[];
  kif_info: string[];
};

export function onExtensionInstruction(command: Command) {
  switch (command.type) {
    case "displayMessageBox":
      useStore().enqueueMessage(command.value);
      break;
    default: {
      useStore().setSearchKifDBResult(command);
      break;
    }
  }
}
