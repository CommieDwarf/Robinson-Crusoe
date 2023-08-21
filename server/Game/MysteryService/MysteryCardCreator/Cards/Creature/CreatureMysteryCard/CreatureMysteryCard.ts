import {
  IMysteryCard,
  MYSTERY_CARD_TYPE,
} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {MysteryCard} from "../../MysteryCard";

export abstract class CreatureMysteryCard
    extends MysteryCard
    implements IMysteryCard {
  protected _type = MYSTERY_CARD_TYPE.CREATURE;

  protected constructor(
      game: IGame,
      name: string,
      namePL: string,
      shuffleable: boolean,
      eventName: string,
      eventLabel: string = "",
      drawLabel: string = "",
  ) {
    super(game, name, namePL, shuffleable, eventName, eventLabel, drawLabel);
  }
}
