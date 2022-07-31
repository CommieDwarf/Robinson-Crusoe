import {IResources} from "../../../interfaces/Resources";
import {IBeasts} from "../../../interfaces/Beasts/Beasts";
import {IBeast} from "../../../interfaces/Beasts/Beast";

class Beasts implements IBeasts {
  private _deck: IBeast[] = [];
  private _beasts: IBeast[] = [];
  private _game: unknown;
  private _ownedResources: IResources;

  get deckCount() {
    return this._deck.length;
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
    const beast = this._beasts.pop();
    if (!beast) {
      throw new Error("There is no more beasts to push into the deck");
    }
    this._deck.push(beast);
  }

  killBeast() {
    const beast = this.getBeast();
    this._ownedResources.
  }
}

export default Beasts;
