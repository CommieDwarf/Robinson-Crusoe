import {
  IMysteryCard,
  MYSTERY_CARD_TYPE,
} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../../interfaces/Characters/PlayerCharacter";
import { MysteryCard } from "../../MysteryCard";

export abstract class CreatureMysteryCard
  extends MysteryCard
  implements IMysteryCard
{
  protected _type = MYSTERY_CARD_TYPE.CREATURE;

  protected constructor(
    game: IGame,
    name: string,
    namePL: string,
    shuffleable: boolean,
    eventName: string
  ) {
    super(game, name, namePL, shuffleable, eventName);
  }
}
