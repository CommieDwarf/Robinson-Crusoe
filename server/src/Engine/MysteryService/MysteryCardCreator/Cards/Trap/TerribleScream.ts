import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

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
