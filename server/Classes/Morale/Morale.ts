import { IGame } from "../../../interfaces/Game";
import { IMorale } from "../../../interfaces/Morale/Morale";

export class Morale implements IMorale {
  get lvl(): number {
    return this._lvl;
  }

  get renderData() {
    return {
      lvl: this._lvl,
    };
  }

  private _lvl = 0;
  private _maxLvl = 3;
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  lvlUp(by: number, logSource: string) {
    if (this._lvl < 3) {
      this._lvl += by;
      this._game.chatLog.addMessage(
        "podwyższenie morali o " + by,
        "green",
        logSource
      );
    }
  }

  lvlDown(by: number, logSource: string) {
    //TODO: maybe im going to implement here punishment for negative morale threshold. dunno yet.
    if (this._lvl > -3) {
      this._lvl -= by;
      this._game.chatLog.addMessage(
        "obniżenie morali o " + by,
        "red",
        logSource
      );
    }
  }

  getDetermination() {}
}
