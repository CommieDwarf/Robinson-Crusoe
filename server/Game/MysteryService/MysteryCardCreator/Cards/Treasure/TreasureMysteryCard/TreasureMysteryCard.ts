import { MysteryCard } from "../../MysteryCard";
import { MYSTERY_CARD_TYPE } from "../../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../../interfaces/Game";

export abstract class TreasureMysteryCard extends MysteryCard {
  protected _type = MYSTERY_CARD_TYPE.TREASURE;
  protected _uses: number;

  protected constructor(
    game: IGame,
    name: string,
    namePL: string,
    shuffleable: boolean,
    eventName: string,
    uses: number,
    eventLabel: string = "",
    drawLabel: string = ""
  ) {
    super(game, name, namePL, shuffleable, eventName, eventLabel, drawLabel);
    this._uses = uses;
  }

  getRenderData() {
    return {
      ...super.getRenderData(),
      uses: this.uses,
    };
  }

  get uses(): number {
    return this._uses;
  }



  addToResources() {
    if (this._game.phaseService.phase === "action") {
      this._game.resourceService.addTreasureToFuture(this);
    } else {
      this._game.resourceService.addTreasureToOwned(this);
    }
  }

  removeFromOwnedResources() {
    this._game.resourceService.removeTreasureFromOwned(this);
  }
}
