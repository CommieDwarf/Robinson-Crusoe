import { AdventureCard } from "../../../AdventureCard";
import {
  ADVENTURE_CARD,
  ADVENTURE_CARD_BUILD,
} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { IGame } from "../../../../../../../interfaces/Game";
import { ACTION } from "../../../../../../../interfaces/ACTION";

export abstract class BuildAdventureCard extends AdventureCard {
  protected readonly _action = ACTION.BUILD;

  protected constructor(
    name: ADVENTURE_CARD_BUILD,
    namePL: string,
    decide: boolean,
    game: IGame
  ) {
    super(name, namePL, decide, game);
  }

  get action(): ACTION.BUILD {
    return this._action;
  }
}
