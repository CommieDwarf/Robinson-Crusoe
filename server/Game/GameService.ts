import {IGame, IGameRenderData} from "../../interfaces/Game";
import {GameClass} from "./Game";
import {INVENTION_NORMAL, INVENTION_PERSONAL} from "../../interfaces/InventionService/Invention";

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
        this._game.tileService.explore(6);
        this._game.inventionService.build(INVENTION_NORMAL.RAFT, char);
        this._game.inventionService.build(INVENTION_NORMAL.SHIELD, char);
        this._game.inventionService.build(INVENTION_NORMAL.FURNACE, char);
        this._game.inventionService.build(INVENTION_PERSONAL.FIREPLACE, char);
        
    }

    get renderData() {
        if (this._game) {
            return this._game?.renderData;
        } else {
            return null;
        }
    }
}
