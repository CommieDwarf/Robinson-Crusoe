import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Spider extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "ugryzienie w kark";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_GATHER.SPIDER, "pająk", false, game, "shuffle", "");
  }

  option1(resolver: ICharacter) {
    //TODO: wound
  }

  triggerEventEffect() {
    //TODO: guy with wound can use only 1 pawn. discard wound.
  }
}
