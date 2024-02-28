import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {PAWN_HELPER_ACTION} from "../../../../../../interfaces/Pawns/Pawn";

export class Compass extends TreasureMysteryCard {


    constructor(game: IGame) {
        super(game, "compass", "kompas", false, "", 0, "", "");
    }


    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
        this._pawnService.initPawns(1, false, PAWN_HELPER_ACTION.EXPLORE);
    }
}
