import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Ropes extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "ropes", "liny", false, "", 0);
    }

    triggerDrawEffect(drawer: ICharacter) {
    }
}
