import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";
import {ITreasureMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";

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
