import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class BluntSpear extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "blunt spear", "stara dzida");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.hurt(drawer, 2, this._namePL);
    }
}
