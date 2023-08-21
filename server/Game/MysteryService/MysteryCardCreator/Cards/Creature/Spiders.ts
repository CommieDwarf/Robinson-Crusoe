import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/Character";

export class Spiders extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "spiders", "pająki", false, "");
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 2, this._namePL);
    }
}
