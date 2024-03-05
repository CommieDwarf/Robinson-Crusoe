import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class GiantSnake
    extends CreatureMysteryCard
    implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "giant snake", "ogromny wąż", false, "");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement stop drawing cards
        this._game.characterService.decrDeterminationOrGetHurt(
            drawer,
            drawer.determination,
            this._namePL
        );
        this._game.mysteryService.disableFurtherCardDraw();
    }
}
