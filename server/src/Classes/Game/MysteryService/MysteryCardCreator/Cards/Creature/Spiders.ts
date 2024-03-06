import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Spiders extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "spiders", "pająki", false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 2, this._namePL);
    }
}
