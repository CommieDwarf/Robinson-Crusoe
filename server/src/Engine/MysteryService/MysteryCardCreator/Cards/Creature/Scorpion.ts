import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {INVENTION_STARTER} from "../../../../../types/InventionService/Invention";
import {ICharacter} from "../../../../../types/Characters/Character";

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
