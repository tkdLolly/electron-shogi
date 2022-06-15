import { useStore } from "@/store";

type Result = {
  title: string;
  black: string;
  white: string;
  next_ply: string;
  result: string;
  sfen: string;
};

export function onExtensionInstruction(results: Result[]) {
  let blackWin = 0;
  let whiteWin = 0;
  let other = 0;
  for (const result of results) {
    if (result.result === "black_win") {
      blackWin++;
    } else if (result.result === "white_win") {
      whiteWin++;
    } else {
      other++;
    }
  }
  useStore().enqueueMessage(
    `${results.length}件の棋譜が見つかりました。 ` +
      `先手${blackWin}勝 ` +
      `後手${whiteWin}勝 ` +
      `その他${other}`
  );
}
