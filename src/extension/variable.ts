export const VAR_POSITION_USI = "position.usi";
export const VAR_POSITION_SFEN = "position.sfen";

export const PreDefinedVariables = [VAR_POSITION_USI, VAR_POSITION_SFEN];

export type Variable = {
  name: string;
  value: string;
};
