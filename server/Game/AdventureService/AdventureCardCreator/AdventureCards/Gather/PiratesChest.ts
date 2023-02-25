import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

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

  option1(resolver: ICharacter) {}

  option2(resolver: ICharacter) {
    this.startDrawingMysteryCards(0, 0, 2, resolver);
  }

  triggerEventEffect() {
    //TODO: every player can use only 1 pawn.
  }
}
