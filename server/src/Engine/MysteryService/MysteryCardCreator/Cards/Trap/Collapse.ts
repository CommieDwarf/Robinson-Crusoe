import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Collapse extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "collapse", "zapadło się");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.mysteryService.disableFurtherCardDraw();
    }
}
