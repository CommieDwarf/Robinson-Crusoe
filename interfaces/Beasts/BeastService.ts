import { IBeast } from "./Beast";
import { ICharacter } from "../Characters/Character";

export interface IBeastServiceRenderData {
  deckCount: number;
}

export interface IBeastService {
  getBeastFromDeck: () => IBeast;
  deckCount: number;
  renderData: IBeastServiceRenderData;
  moveBeastFromStackToDeck: () => void;
  addBeastToDeck: (beast: IBeast) => void;
  getBeastsFromStack: (amount: number) => IBeast[];
  killBeast: () => void;
  fightBeast: (leader: ICharacter, helper: ICharacter) => void;
  swapDeckTopToBottom: () => void;
  beastStrengthEnchanted: boolean;
}
