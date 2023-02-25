import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Shortage extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.MUSHROOMS,
      "końcówka",
      false,
      game,
      "discard",
      ""
    );
  }

  option1(resolver: ICharacter) {
    //TODO: get another resource and deplete it's source.
  }
}
