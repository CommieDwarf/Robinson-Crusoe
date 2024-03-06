import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Bats extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "bats", "nietoperze", false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 1, this._namePL);
    }
}
