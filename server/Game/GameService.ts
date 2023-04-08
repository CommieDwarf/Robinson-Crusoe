import {IGame, IGameRenderData} from "../../interfaces/Game";
import {GameClass} from "./Game";
import {TILE_ACTION} from "../../interfaces/TileService/ITile";
import {Pawn} from "./PawnService/Pawn/Pawn";
import {ACTION} from "../../interfaces/ACTION";

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
        this._game.actionService.setReRollToken(ACTION.EXPLORE, true, "test");
        this._game.localPlayer.getCharacter().incrDetermination(10);
        this._game.beastService.moveBeastFromStackToDeck();
        // this._game.mysteryService.startDrawingCards(
        //     1,
        //     1,
        //     1,
        //     this._game.localPlayer.getCharacter()
        // );
        this._game.tileService.explore(6);
        this._game.tileService.explore(2);
        this._game.tileService.tilesAroundCamp.forEach((tile) => this._game?.tileService.explore(tile.id));


        // this._game.tileService.getTile(6).markTileForActon(TILE_ACTION.SET_TIME_CONSUMING_ACTION, "testy")
        this._game.localPlayer.getCharacter().pawnService.addPawn(new Pawn(this._game.localPlayer.getCharacter(), 7))
        this._game.localPlayer.getCharacter().pawnService.addPawn(new Pawn(this._game.localPlayer.getCharacter(), 8))
        this._game.localPlayer.getCharacter().pawnService.addPawn(new Pawn(this._game.localPlayer.getCharacter(), 9))
        this._game.localPlayer.getCharacter().pawnService.addPawn(new Pawn(this._game.localPlayer.getCharacter(), 10))
        this._game.localPlayer.getCharacter().pawnService.resetFreePawns();
        this._game.tileService.getTile(6).setTileModifier("greaterDanger", "test");


        this._game.actionService.addGlobalCostModifier(ACTION.BUILD, "helper", false, "test");

    }

    get renderData() {

        if (this._game) {
            return this._game?.renderData;
        } else {
            return null;

        }
    }
}
