import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/Character";
import { INVENTION_STARTER } from "../../../../../../interfaces/InventionService/Invention";

export class Poison extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "poison", "trucizna");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
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
