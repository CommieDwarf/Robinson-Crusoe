import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

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
