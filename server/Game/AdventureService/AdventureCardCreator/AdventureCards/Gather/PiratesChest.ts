import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class PiratesChest
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "klątwa";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.PIRATES_CHEST,
      "skrzynia piratów",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1() {}

  option2() {
    //TODO: implement mystery cards
  }

  triggerEffect() {
    //TODO: every play can use only 1 pawn.
  }
}
