import {IGame, IGameRenderData} from "../../interfaces/Game";
import {GameClass} from "./Game";
import {ACTION} from "../../interfaces/ACTION";
import {MysteryCardCreator} from "./MysteryService/MysteryCardCreator/MysteryCardCreator";
import {TREASURE_MYSTERY_CARD} from "../../interfaces/MysteryService/MYSTERY_CARD";
import {INVENTION_NORMAL} from "../../interfaces/InventionService/Invention";
import {CONSTRUCTION} from "../../interfaces/ConstructionService/Construction";

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
        this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, "testy")
        this._game.actionService.setAdventureToken(ACTION.GATHER, true, "testy")
        this._game.mysteryService.addTreasureToResources(new MysteryCardCreator(this._game).createTreasureCard(TREASURE_MYSTERY_CARD.COMPASS))
        this._game.inventionService.build(INVENTION_NORMAL.SHIELD, char);
        this._game.beastService.moveBeastFromStackToDeck();
        this._game.tileService.explore(6);
        this._game.tileService.explore(11);
    }

    get renderData() {
        if (this._game) {
            return this._game?.renderData;
        } else {
            return null;
        }
    }
}
