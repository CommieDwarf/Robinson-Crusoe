import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TRAP_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Poison extends TrapMysteryCard {
    constructor(game: IGame) {
        super(game, TRAP_MYSTERY_CARD.POISON);
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.hurt(drawer, 1, this._name);
        this._game.phaseService.addPhaseEffect(this.phaseEffect);
        this._game.mysteryService.addCardAsReminder(this);
    }

    private phaseEffect = () => {
        if (this._game.phaseService.phase === "night") {
            if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
                this._game.characterService.hurtAllPlayerCharacters(1, this._name);
            }
            this._game.phaseService.removePhaseEffect(this.phaseEffect);
            this._game.mysteryService.removeCardAsReminder(this);
        }
    }
}
