import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class HiddenRope extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "hidden rope", "ukryta lina");
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.WEAPON,
            2,
            this._namePL
        );
    }
}
