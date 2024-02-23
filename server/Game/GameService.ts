import {IGame, IGameRenderData} from "../../interfaces/Game";
import {GameClass} from "./Game";
import {Pawn} from "./PawnService/Pawn/Pawn";
import {ACTION} from "../../interfaces/ACTION";
import {BasicResources} from "./ResourceService/BasicResources";

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
        char.pawnService.addPawn(new Pawn(char));
        char.pawnService.addPawn(new Pawn(char));
        char.pawnService.addPawn(new Pawn(char));
        char.pawnService.addPawn(new Pawn(char));
        char.pawnService.resetFreePawns();
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, "test");
        this._game.actionService.setAdventureToken(ACTION.GATHER, true, "test");
        this._game.actionService.setAdventureToken(ACTION.BUILD, true, "test");
        this._game.tileService.explore(6);
        // this._game.mysteryService.startDrawingCards(1, 0, 0, char);
        this._game.resourceService.addBasicResourcesToOwned(new BasicResources(0, 0, 6, 2));
        this._game.beastService.moveBeastFromStackToDeck();

        this._game.weatherService.setToken("snow", true, "test")
        this._game.weatherService.setToken("rain", true, "test")
        this._game.weatherService.setToken("storm", true, "test")


        char.setWound("head", ACTION.GATHER, "test");
        char.setWound("arm", ACTION.EXPLORE, "test");
        char.setWound("stomach", ACTION.EXPLORE, "test");
        char.setWound("leg", ACTION.EXPLORE, "test");

        this._game.setNextRound();
        this._game.setNextRound();
        this._game.setNextRound();
        this._game.setNextRound();
        this._game.setNextRound();
        this._game.setNextRound();
        char.incrDetermination(0);

    }

    get renderData() {
        if (this._game) {
            return this._game?.renderData;
        } else {
            return null;

        }
    }
}
