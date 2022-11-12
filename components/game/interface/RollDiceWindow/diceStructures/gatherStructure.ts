import { RollResult } from "../../../../../interfaces/RollDice/RollDice";

const hurt: RollResult[] = [
  "blank",
  "blank",
  "blank",
  "hurt",
  "blank",
  "blank",
];
const mystery: RollResult[] = [
  "mystery",
  "mystery",
  "blank",
  "mystery",
  "blank",
  "blank",
];
const success: RollResult[] = [
  "success",
  "success",
  "determination",
  "success",
  "success",
  "success",
];

export const gatherStructure = { hurt, mystery, success };
