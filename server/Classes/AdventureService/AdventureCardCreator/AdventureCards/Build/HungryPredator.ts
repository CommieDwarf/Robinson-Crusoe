import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class HungryPredator
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "rewizyta";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.HUNGRY_PREDATOR,
      "wygłodniały drapieżnik",
      true,
      game
    );
  }

  option1() {
    const character = this.getPrimeCharacter();
    this._game.characterService.hurt(character, 2, this._namePL);
    this._game.resourceService.addResourceToOwned("food", 2, this.namePL);
    this._game.resourceService.addResourceToOwned("leather", 1, this.namePL);
  }

  option2() {
    this._game.resourceService.spendResourceOrGetHurt("food", 1, this.namePL);
    this._game.constructionService.lvlDownOrSuffer(
      CONSTRUCTION.PALISADE,
      1,
      this.namePL
    );
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //todo: implement fighting beast by prime player
  }
}
