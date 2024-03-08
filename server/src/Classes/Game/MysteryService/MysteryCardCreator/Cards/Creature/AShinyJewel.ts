import {IGame} from "@shared/types/Game/Game";
import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class AShinyJewel
    extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.A_SHINY_JEWEL, "wielki klejnot", false, "");
    }

    triggerDrawEffect() {
        this.addCardAsReminder();
        this._game.phaseService.addPhaseEffect(this.phaseEffect)
    }

    private phaseEffect = () => {
        if (this._game.phaseService.phase === "night") {
            this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
            this.removeCardAsReminder();
            this._game.phaseService.removePhaseEffect(this.phaseEffect);
        }
    }
}
