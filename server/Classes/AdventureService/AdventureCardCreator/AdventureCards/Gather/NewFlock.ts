import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { INVENTION_STARTER } from "../../../../../../interfaces/InventionService/Invention";

export class NewFlock extends GatherAdventureCard implements IAdventureCard {
  protected _eventNamePL = "wszystko przepadło";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_GATHER.NEW_FLOCK, "nowe stado", false, game);
  }

  option1() {
    //TODO: set +1 food on the tile.
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //TODO: deplete all sources on the tile
  }
}
