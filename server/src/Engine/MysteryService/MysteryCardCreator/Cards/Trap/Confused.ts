import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Confused extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "confused", "otumaniony");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement reroll success on Character.
    }
}
