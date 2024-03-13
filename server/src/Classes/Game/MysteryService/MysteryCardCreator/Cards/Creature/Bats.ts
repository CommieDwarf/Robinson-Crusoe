import {IGame} from "@shared/types/Game/Game";
import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Bats extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.BATS, false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 1, this._name);
    }
}
