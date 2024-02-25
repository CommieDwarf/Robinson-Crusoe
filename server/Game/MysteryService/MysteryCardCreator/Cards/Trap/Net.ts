import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Net extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "net", "sieć");
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        //TODO: implement stop drawing cards.
        //TODO: implement night outside the camp
    }
}
