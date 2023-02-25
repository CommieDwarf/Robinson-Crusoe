import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class PredatorInTheCamp
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "nosił wilk razy kilka...";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP,
      "bestia w obozie",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    //TODO: fight beast
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    this._game.resourceService.addResourceToOwned("food", 2, this.eventNamePL);
    this._game.resourceService.addResourceToOwned(
      "leather",
      1,
      this.eventNamePL
    );
  }
}
