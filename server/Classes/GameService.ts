import { IGame, IGameRenderData } from "../../interfaces/Game";
import { GameClass } from "./Game";

interface IGameService {
  game: IGame | null;
  createGame: () => void;

  renderData: IGameRenderData | null;
}

export class GameService implements IGameService {
  private _game: IGame | null = null;

  get game(): IGame {
    if (!this._game) {
      throw new Error("Game isn't instantiated");
    }
    return this._game;
  }

  public createGame() {
    this._game = new GameClass("castaways");
    // this._game.structuresService.unlockAllStructs();
    // this._game.inventionsService.inventions.forEach(
    //   (inv) => (inv.locked = false)
    // );
    this._game.actionService.setReRollToken("explore", true, "test");
  }

  get renderData() {
    if (this._game) {
      return this._game?.renderData;
    } else {
      return null;
    }
  }
}
