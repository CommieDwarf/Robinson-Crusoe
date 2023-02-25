import { IInventionRenderData } from "../interfaces/InventionService/Invention";
import { IMysteryCardRenderData } from "../interfaces/MysteryService/MysteryCard";

export const isCardInvention = (
  candidate: IInventionRenderData | IMysteryCardRenderData
): candidate is IInventionRenderData => {
  return "locked" in candidate;
};
