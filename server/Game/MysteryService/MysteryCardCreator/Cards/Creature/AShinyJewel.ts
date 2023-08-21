import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";

export class AShinyJewel
    extends CreatureMysteryCard
    implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "a shiny jewel", "wielki klejnot", false, "");
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
