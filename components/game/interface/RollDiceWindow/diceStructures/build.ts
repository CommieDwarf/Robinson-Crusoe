import { ActionCubeSide } from "../../../../../interfaces/RollDice/RollDice";

const hurt: ActionCubeSide[] = [
  "hurt",
  "blank",
  "blank",
  "blank",
  "blank",
  "hurt",
];
const mystery: ActionCubeSide[] = [
  "blank",
  "mystery",
  "blank",
  "mystery",
  "blank",
  "mystery",
];
const success: ActionCubeSide[] = [
  "success",
  "success",
  "determination",
  "determination",
  "success",
  "success",
];

export const build = { hurt, mystery, success };
