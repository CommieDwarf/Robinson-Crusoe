import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class ProtectiveAmulet extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "protective amulet", "amulet ochronny", false, "", 1);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use(): void {
        //todo: implement
    }
}
