import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Snake extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.SNAKE, false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.hurt(drawer, 2, this._name);
    }
}
