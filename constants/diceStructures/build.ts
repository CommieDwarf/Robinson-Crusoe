import { ActionDiceSide } from "../../interfaces/RollDice/RollDice";

const hurt: ActionDiceSide[] = [
  "hurt",
  "blank",
  "blank",
  "blank",
  "blank",
  "hurt",
];
const mystery: ActionDiceSide[] = [
  "blank",
  "mystery",
  "blank",
  "mystery",
  "blank",
  "mystery",
];

// const mystery = ["1", "2", "3", "4", "5", "6"];

const success: ActionDiceSide[] = [
  "success",
  "success",
  "determination",
  "determination",
  "success",
  "success",
];

export const build = { hurt, mystery, success };
