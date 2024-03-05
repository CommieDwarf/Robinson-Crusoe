import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Bite extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "bite", "ugryzienie", false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.hurt(drawer, 2, this._namePL);
    }

    triggerEventEffect() {
    }
}
