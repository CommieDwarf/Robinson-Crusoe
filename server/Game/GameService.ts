import {IGame, IGameRenderData} from "../../interfaces/Game";
import {GameClass} from "./Game";
import {INVENTION_STARTER} from "../../interfaces/InventionService/Invention";
import {Pawn} from "./PawnService/Pawn/Pawn";

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
        char.pawnService.addPawn(new Pawn(char));
        char.pawnService.addPawn(new Pawn(char));
        char.pawnService.addPawn(new Pawn(char));
        char.pawnService.addPawn(new Pawn(char));
        char.pawnService.resetFreePawns();
    }

    get renderData() {
        if (this._game) {
            return this._game?.renderData;
        } else {
            return null;

        }
    }
}
