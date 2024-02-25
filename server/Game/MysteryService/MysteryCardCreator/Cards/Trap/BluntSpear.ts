import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class BluntSpear extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "blunt spear", "stara dzida");
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this._game.characterService.hurt(drawer, 2, this._namePL);
    }
}
