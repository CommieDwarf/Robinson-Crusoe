import {IGame, IGameRenderData} from "../../interfaces/Game";
import {GameClass} from "./Game";
import {INVENTION_STARTER} from "../../interfaces/InventionService/Invention";
import {Pawn} from "./PawnService/Pawn/Pawn";
import {ACTION} from "../../interfaces/ACTION";
import shuffle from "../../utils/shuffleArray";

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
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, "test");
        this._game.actionService.setAdventureToken(ACTION.GATHER, true, "test");
        this._game.actionService.setAdventureToken(ACTION.BUILD, true, "test");
        this._game.tileService.explore(6);

        let a = [0, 1, 2, 3];
        a.push(4);
        a = shuffle(a);
        console.log(a);
    }

    get renderData() {
        if (this._game) {
            return this._game?.renderData;
        } else {
            return null;

        }
    }
}
