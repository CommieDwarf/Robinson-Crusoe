import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class TwistedAnkle
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "spuchnięta kostka";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_GATHER.TWISTED_ANKLE, "skręcona kostka", false, game);
  }

  option1() {
    //TODO: set wound
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //TODO: character with wound can only rest, arrange camp and build.
    //TODO: discard wound
  }
}
