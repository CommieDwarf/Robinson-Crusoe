import { IGame } from "../../../interfaces/Game";
import { IMorale } from "../../../interfaces/Morale/Morale";
import { IPlayerCharacter } from "../../../interfaces/Characters/Character";

export class MoraleService implements IMorale {
  private _lvl = 0;
  private _maxLvl = 3;
  private readonly _game: IGame;
  private _diary: boolean = false;
  private _drums: boolean = false;

  constructor(game: IGame) {
    this._game = game;
  }

  get renderData() {
    return {
      lvl: this._lvl,
    };
  }

  get lvl(): number {
    return this._lvl;
  }

  get diary(): boolean {
    return this._diary;
  }

  set diary(value: boolean) {
    this._diary = value;
  }

  get drums(): boolean {
    return this._drums;
  }

  set drums(value: boolean) {
    this._drums = value;
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

  getDetermination(primeCharacter: IPlayerCharacter) {
    if (this._lvl === 0) {
      return;
    }
    if (this._lvl > 0) {
      primeCharacter.incrDetermination(this._lvl);
    } else {
      primeCharacter.decrDetermination(this._lvl);
    }
  }
}
