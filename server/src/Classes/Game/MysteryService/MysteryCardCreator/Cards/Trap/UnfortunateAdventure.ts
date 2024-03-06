import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class UnfortunateAdventure
    extends TrapMysteryCard
    implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "unfortunate adventure", "nieszczęśliwa przygoda");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement book effect.
    }
}
