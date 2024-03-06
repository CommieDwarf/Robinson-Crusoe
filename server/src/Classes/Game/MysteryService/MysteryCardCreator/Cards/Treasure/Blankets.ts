import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Blankets extends TreasureMysteryCard {
    constructor(game: IGame) {
        super(game, "blankets", "koce", false, "", 3);
    }


    use(): void {
        if (this._game.phaseService.phase === "weather") {
            if (this._game.weatherService.getOverallWeather().snow > 0) {
                this._game.weatherService.incrementModifier("snow", -1, this._namePL);
                super.use();
                if (this._usedCount === this.uses) {
                    this.removeFromOwnedResources();
                }
            }
        }
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }
}
