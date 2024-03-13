import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TRAP_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Confused extends TrapMysteryCard {
    constructor(game: IGame) {
        super(game, TRAP_MYSTERY_CARD.CONFUSED);
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement reroll success on Character.
    }
}
