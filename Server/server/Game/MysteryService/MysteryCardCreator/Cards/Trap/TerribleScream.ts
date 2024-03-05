import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

export class TerribleScream extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "terrible scream", "przeraźliwy krzyk");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(
            drawer,
            drawer.determination,
            this._namePL
        );
    }
}
