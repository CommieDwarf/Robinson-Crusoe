import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class UnbelievableEffort
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "obolałe ramiona";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT,
      "niewiarygodny wysiłek",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1(resolver: ICharacter) {}

  option2(resolver: ICharacter) {
    this._game.resourceService.addBasicResourceToOwned("wood", 2, this._namePL);
    //TODO: put wound.
  }

  triggerEventEffect() {
    //TODO: character with wound gets hurt.
    //TODO: discard wound.
  }
}
