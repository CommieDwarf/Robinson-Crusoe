import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

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
