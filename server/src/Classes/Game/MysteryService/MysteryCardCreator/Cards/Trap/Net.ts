import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Net extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "net", "sieć");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement stop drawing cards.
        //TODO: implement night outside the camp
    }
}
