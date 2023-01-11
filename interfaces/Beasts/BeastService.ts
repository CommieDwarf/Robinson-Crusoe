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
  killBeast: (leader: ICharacter) => void;
  fightBeast: (leader: ICharacter) => void;
  removeBeastFromDeck: () => void;
  swapDeckTopToBottom: () => void;
  beastStrengthEnchanted: boolean;
}
