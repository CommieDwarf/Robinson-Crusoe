import { MysteryCard } from "../../MysteryCard";
import { MYSTERY_CARD_TYPE } from "../../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../../interfaces/Characters/Character";

export abstract class TreasureMysteryCard extends MysteryCard {
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

  use(...args: any[]): void {
    this._uses--;
  }

  addToResources() {
    if (this._game.phaseService.phase === "action") {
      this._game.resourceService.addTreasureToFuture(this);
    } else {
      this._game.resourceService.addTreasureToOwned(this);
    }
  }
}
