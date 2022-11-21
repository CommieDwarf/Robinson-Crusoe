import { ActionCubeSide } from "../../interfaces/RollDice/RollDice";

const hurt: ActionCubeSide[] = [
  "hurt",
  "blank",
  "blank",
  "blank",
  "blank",
  "hurt",
];
// const mystery: ActionCubeSide[] = [
//   "blank",
//   "mystery",
//   "blank",
//   "mystery",
//   "blank",
//   "mystery",
// ];

const mystery = ["1", "2", "3", "4", "5", "6"];

const success: ActionCubeSide[] = [
  "success",
  "success",
  "determination",
  "determination",
  "success",
  "success",
];

export const build = { hurt, mystery, success };
