import { IResources } from "../../../interfaces/Resources/Resources";
import { IBeasts, IBeastsRenderData } from "../../../interfaces/Beasts/Beasts";
import { IBeast } from "../../../interfaces/Beasts/Beast";

export class Beasts implements IBeasts {
  private _deck: IBeast[] = [];
  private _allBeasts: IBeast[] = [];
  private _game: unknown;
  private _ownedResources: IResources;

  get deckCount() {
    return this._deck.length;
  }

  get renderData(): IBeastsRenderData {
    return {
      deckCount: this.deckCount,
    };
  }

  constructor(game: unknown, ownedResources: IResources) {
    this._game = game;
    this._ownedResources = ownedResources;
  }

  getBeast(): IBeast {
    if (this.deckCount === 0) {
      throw new Error("There is no more beasts in the deck");
    }
    return this._deck[this.deckCount - 1];
  }

  moveBeastToDeck() {
    const beast = this._allBeasts.pop();
    if (!beast) {
      throw new Error("There is no more beasts to push into the deck");
    }
    this._deck.push(beast);
  }

  //TODO implement killBeast()
  killBeast() {}
}
