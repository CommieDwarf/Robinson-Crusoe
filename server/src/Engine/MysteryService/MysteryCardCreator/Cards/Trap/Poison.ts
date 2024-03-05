import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {INVENTION_STARTER} from "../../../../../types/InventionService/Invention";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Poison extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "poison", "trucizna");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.hurt(drawer, 1, this._namePL);
        this._game.phaseService.addPhaseEffect(this.phaseEffect);
        this._game.mysteryService.addCardAsReminder(this);
    }

    private phaseEffect = () => {
        if (this._game.phaseService.phase === "night") {
            if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
                this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
            }
            this._game.phaseService.removePhaseEffect(this.phaseEffect);
            this._game.mysteryService.removeCardAsReminder(this);
        }
    }
}
