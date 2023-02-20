import { AdventureCard } from "../../../AdventureCard";
import { ACTION } from "../../../../../../../interfaces/ACTION";
import { ADVENTURE_CARD_GATHER } from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { IGame } from "../../../../../../../interfaces/Game";
import { AdventureOptionLabel } from "../../../../../../../interfaces/AdventureService/AdventureCard";

export abstract class GatherAdventureCard extends AdventureCard {
  protected readonly _action = ACTION.GATHER;

  protected constructor(
    name: ADVENTURE_CARD_GATHER,
    namePL: string,
    decide: boolean,
    game: IGame,
    option1Label: AdventureOptionLabel,
    option2Label: AdventureOptionLabel
  ) {
    super(name, namePL, decide, game, option1Label, option2Label);
  }

  get action(): ACTION.GATHER {
    return this._action;
  }
}
