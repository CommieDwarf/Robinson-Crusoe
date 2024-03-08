import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TRAP_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class BlowGun extends TrapMysteryCard {
    constructor(game: IGame) {
        super(game, TRAP_MYSTERY_CARD.BLOW_GUN, "dmuchawka");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement 1 pawn off action.
    }
}
