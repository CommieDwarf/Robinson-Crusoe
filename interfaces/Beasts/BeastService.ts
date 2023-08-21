import { BeastStats } from "../../server/Game/BeastService/BeastCreator/BeastCreator";
import { IPlayerCharacter } from "../Characters/PlayerCharacter";
import { IBeast } from "./Beast";

export interface IBeastServiceRenderData {
  deckCount: number;
}

export interface IBeastService {
  peekBeastFromDeck: () => IBeast;
  deckCount: number;
  renderData: IBeastServiceRenderData;
  moveBeastFromStackToDeck: () => void;
  addBeastToDeck: (beast: IBeast) => void;
  getBeastsFromStack: (amount: number) => IBeast[];
  fightBeast: (leader: IPlayerCharacter, beast: IBeast) => void;
  fightCustomBeast: (leadeR: IPlayerCharacter, beastStats: BeastStats) => void;
  removeBeastFromDeck: () => void;
  swapDeckTopToBottom: () => void;
}
