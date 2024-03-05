import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../types/Game";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";
import {ICharacter} from "../../../../../types/Characters/Character";

export class AntiqueRapier extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "antique rapier", "zabytkowy rapier", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            2,
            this._namePL
        );
    }
}
