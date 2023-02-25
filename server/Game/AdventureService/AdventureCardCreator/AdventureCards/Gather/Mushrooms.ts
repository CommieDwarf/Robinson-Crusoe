import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { INVENTION_STARTER } from "../../../../../../interfaces/InventionService/Invention";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Mushrooms extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "rozwolnienie";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.MUSHROOMS,
      "grzyby",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1(resolver: ICharacter) {}

  option2(resolver: ICharacter) {
    this._game.resourceService.addResourceToOwned("food", 1, this._namePL);
  }

  triggerEventEffect() {
    if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
      this._game.characterService.hurtAllPlayerCharacters(1, this._eventNamePL);
    }
  }
}
