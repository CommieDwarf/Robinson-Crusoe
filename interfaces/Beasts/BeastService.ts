import {BeastStats} from "../../Server/server/Game/BeastService/BeastCreator/BeastCreator";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";
import {IBeast} from "./Beast";
import {ICharacter} from "../Characters/Character";

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
    fightBeast: (leader: ICharacter, beast: IBeast) => void;
    fightCustomBeast: (leader: ICharacter, beastStats: BeastStats) => void;
    removeBeastFromDeck: () => void;
    swapDeckTopToBottom: () => void;
}
