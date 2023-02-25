import {
  IMysteryCard,
  MYSTERY_CARD_TYPE,
} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../../interfaces/Game";
import { MysteryCard } from "../../MysteryCard";

export abstract class TrapMysteryCard
  extends MysteryCard
  implements IMysteryCard
{
  protected _type = MYSTERY_CARD_TYPE.TRAP;

  protected constructor(game: IGame, name: string, namePL: string) {
    super(game, name, namePL, false, "");
  }
}
