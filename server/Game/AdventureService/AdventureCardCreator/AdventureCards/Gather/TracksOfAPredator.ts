import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class TracksOfAPredator
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "atak wygłodniałego drapieżnika";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR,
      "niebezpieczne ślady",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    if (
      this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).lvl <
      3
    ) {
      //TODO deplete food resource on camp tile else hurt everyone.
    }
  }
}
