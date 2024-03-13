import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TRAP_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class TerribleScream extends TrapMysteryCard {
    constructor(game: IGame) {
        super(game, TRAP_MYSTERY_CARD.TERRIBLE_SCREAM);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.decrDeterminationOrGetHurt(
            drawer,
            drawer.determination,
            this._name
        );
    }
}
