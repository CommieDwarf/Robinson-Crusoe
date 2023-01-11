import { AdventureCard } from "../../../AdventureCard";
import { ACTION } from "../../../../../../../interfaces/ACTION";
import {
  ADVENTURE_CARD_BUILD,
  ADVENTURE_CARD_EXPLORE,
} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { IGame } from "../../../../../../../interfaces/Game";

export abstract class ExploreAdventureCard extends AdventureCard {
  protected readonly _action = ACTION.EXPLORE;

  protected constructor(
    name: ADVENTURE_CARD_EXPLORE,
    namePL: string,
    decide: boolean,
    game: IGame
  ) {
    super(name, namePL, decide, game);
  }

  get action(): ACTION.EXPLORE {
    return this._action;
  }
}
