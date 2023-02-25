import { MysteryCard } from "../../MysteryCard";
import {
  IMysteryCard,
  ITreasureMysteryCard,
  MYSTERY_CARD_TYPE,
} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../../interfaces/Characters/Character";

export abstract class TreasureMysteryCard
  extends MysteryCard
  implements ITreasureMysteryCard
{
  protected _type = MYSTERY_CARD_TYPE.TREASURE;
  protected _uses: number;

  protected constructor(
    game: IGame,
    name: string,
    namePL: string,
    shuffleable: boolean,
    eventName: string,
    uses: number
  ) {
    super(game, name, namePL, shuffleable, eventName);
    this._uses = uses;
  }

  get renderData() {
    return {
      ...super.getRenderData(),
      uses: this.uses,
    };
  }

  get uses(): number {
    return this._uses;
  }

  use(target: ICharacter | null) {
    this._uses--;
  }
}
