import { ActionCubeSide } from "../../../../../interfaces/RollDice/RollDice";

const hurt: ActionCubeSide[] = [
  "hurt",
  "blank",
  "blank",
  "hurt",
  "blank",
  "hurt",
];
const mystery: ActionCubeSide[] = [
  "mystery",
  "mystery",
  "blank",
  "mystery",
  "mystery",
  "mystery",
];
const success: ActionCubeSide[] = [
  "success",
  "success",
  "determination",
  "success",
  "success",
  "success",
];

export const explore = { hurt, mystery, success };
