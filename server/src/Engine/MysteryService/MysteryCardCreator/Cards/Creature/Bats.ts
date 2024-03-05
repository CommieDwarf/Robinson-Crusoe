import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Bats extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "bats", "nietoperze", false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 1, this._namePL);
    }
}
