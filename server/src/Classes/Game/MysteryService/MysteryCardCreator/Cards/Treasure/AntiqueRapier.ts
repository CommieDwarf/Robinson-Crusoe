import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ICharacter} from "@shared/types/Game/Characters/Character";

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
