import { ActionDiceSide } from "../../../interfaces/RollDice/RollDice";

const hurt: ActionDiceSide[] = [
  "hurt",
  "blank",
  "blank",
  "hurt",
  "blank",
  "hurt",
];
const mystery: ActionDiceSide[] = [
  "mystery",
  "mystery",
  "blank",
  "mystery",
  "mystery",
  "mystery",
];
const success: ActionDiceSide[] = [
  "success",
  "success",
  "determination",
  "success",
  "success",
  "success",
];

export const explore = { hurt, mystery, success };
