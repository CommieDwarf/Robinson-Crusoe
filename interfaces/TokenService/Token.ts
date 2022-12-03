import { TOKEN_PL } from "../TRANSLATE_PL/CATEGORIES/TOKEN_PL";

export interface IToken {
  name: keyof typeof TOKEN_PL;
  namePL: TOKEN_PL;
  description: string;
  use: () => void;
  autoDiscard: () => void;
  renderData: ITokenRenderData;
}

export interface ITokenRenderData {
  name: keyof typeof TOKEN_PL;
  namePL: TOKEN_PL;
  description: string;
}

export enum DiscoveryTokenName {
  candles = "candles",
  fallenTree = "fallenTree",
  goat = "goat",
  herbs = "herbs",
  healingHerbs = "healingHerbs",
  largeLeaves = "largeLeaves",
  nourishingLarvae = "nourishingLarvae",
  oldMachete = "oldMachete",
  poison = "poison",
  thornyBushes = "thornyBushes",
  tobacco = "tobacco",
  treasure = "treasure",
  vegetables = "vegetables",
  scenario1 = "scenario1",
  scenario2 = "scenario2",
  scenario3 = "scenario3",
  scenario4 = "scenario4",
}
