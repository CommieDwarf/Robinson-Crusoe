import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class StrangeDisease extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "strange disease", "dziwne schorzenie");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement
    }
}
