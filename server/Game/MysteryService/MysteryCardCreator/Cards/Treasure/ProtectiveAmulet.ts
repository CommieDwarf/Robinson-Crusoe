import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class ProtectiveAmulet extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "protective amulet", "amulet ochronny", false, "", 1);
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        this.addToResources();
    }

    use(): void {
        //todo: implement
    }
}
