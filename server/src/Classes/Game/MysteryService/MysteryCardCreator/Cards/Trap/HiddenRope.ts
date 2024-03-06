import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class HiddenRope extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "hidden rope", "ukryta lina");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.WEAPON,
            2,
            this._namePL
        );
    }
}
