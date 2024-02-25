import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Bite extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "bite", "ugryzienie", false, "");
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this._game.characterService.hurt(drawer, 2, this._namePL);
    }

    triggerEventEffect() {
    }
}
