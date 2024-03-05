import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Spiders extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "spiders", "pająki", false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 2, this._namePL);
    }
}
