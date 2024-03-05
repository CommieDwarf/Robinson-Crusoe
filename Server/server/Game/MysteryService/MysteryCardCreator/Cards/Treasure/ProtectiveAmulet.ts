import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

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
