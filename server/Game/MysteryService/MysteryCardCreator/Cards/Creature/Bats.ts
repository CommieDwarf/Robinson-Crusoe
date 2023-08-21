import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/Character";

export class Bats extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "bats", "nietoperze", false, "");
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 1, this._namePL);
    }
}
