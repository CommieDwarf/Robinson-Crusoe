import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {CONSTRUCTION} from "../../../../../types/ConstructionService/Construction";
import {ICharacter} from "../../../../../types/Characters/Character";

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
