import { AdventureCard } from "../../../AdventureCard";
import { ACTION } from "../../../../../../../interfaces/ACTION";
import {
  ADVENTURE_CARD_BUILD,
  ADVENTURE_CARD_EXPLORE,
  ADVENTURE_CARD_GATHER,
} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { IGame } from "../../../../../../../interfaces/Game";

export abstract class GatherAdventureCard extends AdventureCard {
  protected readonly _action = ACTION.GATHER;

  protected constructor(
    name: ADVENTURE_CARD_GATHER,
    namePL: string,
    decide: boolean,
    game: IGame
  ) {
    super(name, namePL, decide, game);
  }

  get action(): ACTION.GATHER {
    return this._action;
  }
}
