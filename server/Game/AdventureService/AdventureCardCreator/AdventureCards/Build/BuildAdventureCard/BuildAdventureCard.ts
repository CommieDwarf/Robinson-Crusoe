import { AdventureCard } from "../../../AdventureCard";
import { ADVENTURE_CARD_BUILD } from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { IGame } from "../../../../../../../interfaces/Game";
import { ACTION } from "../../../../../../../interfaces/ACTION";
import {
  AdventureOptionLabel,
  IAdventureCard,
} from "../../../../../../../interfaces/AdventureService/AdventureCard";

export abstract class BuildAdventureCard
  extends AdventureCard
  implements IAdventureCard
{
  protected readonly _action = ACTION.BUILD;

  protected constructor(
    name: ADVENTURE_CARD_BUILD,
    namePL: string,
    decide: boolean,
    game: IGame,
    option1Label: AdventureOptionLabel,
    option2Label: AdventureOptionLabel
  ) {
    super(name, namePL, decide, game, option1Label, option2Label);
  }
}
