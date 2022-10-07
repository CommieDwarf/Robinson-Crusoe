import { IBeast, IBeastRenderData } from "./Beast";
import { ICharacter } from "../Characters/Character";

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
  fightBeast: (leader: ICharacter, helper: ICharacter) => void;
  swapDeckTopToBottom: () => void;
  beastStrengthEnchanted: boolean;
}
