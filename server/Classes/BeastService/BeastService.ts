import {
  IBeastService,
  IBeastServiceRenderData,
} from "../../../interfaces/Beasts/BeastService";
import { IBeast } from "../../../interfaces/Beasts/Beast";
import { ICharacter } from "../../../interfaces/Characters/Character";
import { IGame } from "../../../interfaces/Game";

export class BeastService implements IBeastService {
  private _deck: IBeast[] = [];
  // TODO: implement init
  private _allBeasts: IBeast[] = [];
  private _game: IGame;
  private beastBeingFought: IBeast | null = null;
  private _beastStrengthEnchanted = false;

  constructor(game: IGame) {
    this._game = game;
  }

  get renderData(): IBeastServiceRenderData {
    return {
      deckCount: this.deckCount,
    };
  }

  // --------------------------------------
  get deckCount() {
    return this._deck.length;
  }

  get beastStrengthEnchanted(): boolean {
    return this._beastStrengthEnchanted;
  }

  set beastStrengthEnchanted(value: boolean) {
    this._beastStrengthEnchanted = value;
  }

  // --------------------------------------------

  getBeastFromDeck(): IBeast {
    if (this.deckCount === 0) {
      throw new Error("There is no more beasts in the deck");
    }
    return this._deck[this.deckCount - 1];
  }

  moveBeastFromStackToDeck() {
    const beast = this._allBeasts.pop();
    if (!beast) {
      throw new Error("There is no more beasts to push into the deck");
    }
    this._deck.push(beast);
  }

  addBeastToDeck(beast: IBeast) {
    this._deck.push(beast);
  }

  swapDeckTopToBottom() {
    let beastFromTop = this._deck.pop();
    if (beastFromTop) {
      this._deck.unshift(beastFromTop);
    }
  }

  getBeastsFromStack(amount: number) {
    let beasts: IBeast[] = [];
    for (let i = 0; i < amount; i++) {
      let beast = this._allBeasts.pop();
      if (beast) {
        beasts.push(beast);
      }
    }
    return beasts;
  }

  fightBeast(leader: ICharacter) {
    const beast = this._deck[0];
    if (beast) {
      this.beastBeingFought = beast;
    }
  }

  //TODO implement killBeast()
  killBeast(leader: ICharacter) {}

  static getStrongestBeast(beasts: IBeast[]) {
    let strength = 0;
    let current: null | IBeast = null;
    beasts.forEach((beast) => {
      if (beast.strength > strength) {
        current = beast;
      }
    });

    return current;
  }
}
