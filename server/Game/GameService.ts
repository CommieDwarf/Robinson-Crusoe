import {IGame, IGameRenderData} from "../../interfaces/Game";
import {GameClass} from "./Game";
import {CONSTRUCTION} from "../../interfaces/ConstructionService/Construction";
import {INVENTION_CASTAWAYS} from "../../interfaces/InventionService/Invention";

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
        const char = this._game.localPlayer.getCharacter();


    }

    get renderData() {
        if (this._game) {
            return this._game?.renderData;
        } else {
            return null;

        }
    }
}
