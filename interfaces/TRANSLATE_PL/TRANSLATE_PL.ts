import { CHARACTER_PL } from "./CATEGORIES/CHARACTER_PL";
import { RESOURCE_PL } from "./CATEGORIES/RESOURCE_PL";
import { INVENTION_PL } from "./CATEGORIES/INVENTION_PL";
import { PHASE_PL } from "./CATEGORIES/PHASE_PL";
import { ACTION_PL } from "./CATEGORIES/ACTION_PL";
import { STRUCTURE_PL } from "./CATEGORIES/STRUCTURE_PL";
import { ITEM_TYPE_PL } from "./CATEGORIES/ITEM_TYPE_PL";

export const TRANSLATE_PL = {
  ...CHARACTER_PL,
  ...STRUCTURE_PL,
  ...INVENTION_PL,
  ...ACTION_PL,
  ...RESOURCE_PL,
  ...PHASE_PL,
  ...ITEM_TYPE_PL,
};
export type Translatable = keyof typeof TRANSLATE_PL;
