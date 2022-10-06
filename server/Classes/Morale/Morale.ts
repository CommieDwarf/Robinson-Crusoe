import {IGame} from "../../../interfaces/Game";
import {IMorale} from "../../../interfaces/Morale/Morale";

export class Morale implements IMorale {
  get lvl(): number {
    return this._lvl;
  }

  get renderData() {
    return {
      lvl: this._lvl
    }
  }

  private _lvl = 0;
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  lvlUp(by: number) {
    this._lvl += by;
  }

  lvlDown(by: number) {
    this._lvl -= by;
  }

  getDetermination() {
  }
}
