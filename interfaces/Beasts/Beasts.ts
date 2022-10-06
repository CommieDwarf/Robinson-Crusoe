import { IBeast, IBeastRenderData } from "./Beast";

export interface IBeastsRenderData {
  deckCount: number;
}

export interface IBeasts {
  getBeastFromDeck: () => IBeast;
  deckCount: number;
  renderData: IBeastsRenderData;
  moveBeastFromStackToDeck: () => void;
  addBeastToDeck: (beast: IBeast) => void;
  getBeastsFromStack: (amount: number) => IBeast[];
  killBeast: () => void;
  fightBeast: () => void;
  swapDeckTopToBottom: () => void;
  beastStrengthEnchanted: boolean;
}
