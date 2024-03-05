import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {INVENTION_STARTER} from "../../../../../../../interfaces/InventionService/Invention";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

export class Scorpion extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "scorpion", "skorpion", false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(drawer, 3, this._namePL);
        }
    }
}
