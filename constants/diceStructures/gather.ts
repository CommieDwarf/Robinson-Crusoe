import { ActionCubeSide } from "../../../../../interfaces/RollDice/RollDice";

const hurt: ActionCubeSide[] = [
  "blank",
  "blank",
  "blank",
  "hurt",
  "blank",
  "blank",
];
const mystery: ActionCubeSide[] = [
  "mystery",
  "mystery",
  "blank",
  "mystery",
  "blank",
  "blank",
];
const success: ActionCubeSide[] = [
  "success",
  "success",
  "determination",
  "success",
  "success",
  "success",
];

export const gather = { hurt, mystery, success };
