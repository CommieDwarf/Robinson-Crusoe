import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";
import {PAWN_HELPER_ACTION} from "../../../../../types/Pawns/Pawn";
import {ITreasureMysteryCard} from "../../../../../types/MysteryService/MysteryCard";

export class Candles extends TreasureMysteryCard implements ITreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "candles", "świeczki", false, "", 0, "", "");
    }


    addToResources() {
        super.addToResources();
        this._pawnService.initPawns(2, true, PAWN_HELPER_ACTION.BUILD);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
