import { IBeast } from "./Beast";
import { IPlayerCharacter } from "../Characters/Character";

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
  killBeast: (leader: IPlayerCharacter) => void;
  fightBeast: (leader: IPlayerCharacter) => void;
  removeBeastFromDeck: () => void;
  swapDeckTopToBottom: () => void;
  beastStrengthEnchanted: boolean;
}
