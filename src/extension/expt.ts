import { useStore } from "@/store";

type Command = DisplayMessageBoxCommand;

type DisplayMessageBoxCommand = {
  type: "displayMessageBox";
  value: string;
};

export function onExtensionInstruction(command: Command) {
  switch (command.type) {
    case "displayMessageBox":
      useStore().enqueueMessage(command.value);
      break;
  }
}
