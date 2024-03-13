import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class GiantSnake
    extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.GIANT_SNAKE, false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement stop drawing cards
        this._game.characterService.decrDeterminationOrGetHurt(
            drawer,
            drawer.determination,
            this._name
        );
        this._game.mysteryService.disableFurtherCardDraw();
    }
}
