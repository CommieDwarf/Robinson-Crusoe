import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class CaptainStonesSpyglass extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(
            game,
            "captain stones spyglass",
            "luneta kapitana Stone'a",
            false,
            "",
            1
        );
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use(target: number): void {
        super.use(target);
        //TODO: reveal 3 tiles and place them on top of stack in preferred order.
    }
}
