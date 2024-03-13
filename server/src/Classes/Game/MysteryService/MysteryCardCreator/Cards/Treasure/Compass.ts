import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Compass extends TreasureMysteryCard {


    constructor(game: IGame) {
        super(game, TREASURE_MYSTERY_CARD.COMPASS, false, "", 0, "", "");
    }


    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
        this._pawnService.initPawns(1, false, PAWN_HELPER_ACTION.EXPLORE);
    }
}
