import { useStore } from "@/store";

type Command = DisplayMessageBoxCommand;

type DisplayMessageBoxCommand = {
  type: "displayMessageBox";
  value: string;
};

export function onExtensionCommand(sessionID: number, command: Command) {
  switch (command.type) {
    case "displayMessageBox":
      useStore().enqueueMessage({
        text: command.value,
      });
      break;
  }
}
