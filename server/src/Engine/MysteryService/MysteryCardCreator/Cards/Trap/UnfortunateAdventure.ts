import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

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
