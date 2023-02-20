import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { INVENTION_STARTER } from "../../../../../../interfaces/InventionService/Invention";

export class Viper extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "ukąszenie";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_GATHER.VIPER, "żmija", false, game, "shuffle", "");
  }

  option1() {
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    if (this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
      this._game.characterService.hurt(
        this.getPrimeCharacter(),
        1,
        this._eventNamePL
      );
    } else {
      this._game.characterService.hurt(
        this.getPrimeCharacter(),
        3,
        this._eventNamePL
      );
    }
  }
}
