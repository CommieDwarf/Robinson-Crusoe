import {IGame, IGameRenderData} from "../../interfaces/Game";
import {GameClass} from "./Game";
import {Pawn} from "./PawnService/Pawn/Pawn";
import {CONSTRUCTION} from "../../interfaces/ConstructionService/Construction";
import {INVENTION_NORMAL, INVENTION_PERSONAL, INVENTION_STARTER} from "../../interfaces/InventionService/Invention";
import {ItemCreator} from "./Equipment/ItemCreator/ItemCreator";
import {ITEM} from "../../interfaces/Equipment/Item";

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
        // this._game.structuresService.unlockAllStructs();
        // this._game.inventionsService.inventions.forEach(
        //   (inv) => (inv.locked = false)
        // );
        this._game.localPlayer.getCharacter().incrDetermination(10);
        // this._game.beastService.moveBeastFromStackToDeck();
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
        this._game.localPlayer.getCharacter().pawnService.addPawn(new Pawn(this._game.localPlayer.getCharacter()))
        this._game.localPlayer.getCharacter().pawnService.addPawn(new Pawn(this._game.localPlayer.getCharacter()))
        this._game.localPlayer.getCharacter().pawnService.addPawn(new Pawn(this._game.localPlayer.getCharacter()))
        this._game.localPlayer.getCharacter().pawnService.addPawn(new Pawn(this._game.localPlayer.getCharacter()))
        this._game.localPlayer.getCharacter().pawnService.resetFreePawns();
        this._game.weatherService.setToken("snow", true, "TESTY")
        this._game.inventionService.build(INVENTION_STARTER.MAP, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_STARTER.POT, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_NORMAL.CORRAL, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_NORMAL.BASKET, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_NORMAL.CELLAR, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_NORMAL.DIARY, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_NORMAL.DRUMS, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_NORMAL.FURNACE, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_PERSONAL.FIREPLACE, this._game.localPlayer.getCharacter());
        this._game.inventionService.build(INVENTION_STARTER.ROPE, this._game.localPlayer.getCharacter());
        // this._game.inventionService.build(INVENTION_NORMAL.BED, this._game.localPlayer.getCharacter());

        this._game.resourceService.addBasicResourceToOwned("leather", 2, "TESTY")
        // this._game.tileService.getTile(6).setTileModifier("greaterDanger", "test");
        this._game.resourceService.addBasicResourceToOwned("wood", 15, "TESTY");
        // this._game.actionService.setAdventureToken(ACTION.GATHER, true, "TEST")
        // this._game.actionService.setAdventureToken(ACTION.EXPLORE, true, "TEST")
        // this._game.actionService.setAdventureToken(ACTION.BUILD, true, "TEST")
        this._game.beastService.moveBeastFromStackToDeck();
        // this._game.inventionService.build(INVENTION_STARTER.MEDICINE, this._game.localPlayer)
        this._game.characterService.hurt("cook", 4, "TEST");
        this._game.constructionService.lvlUpConstruction(CONSTRUCTION.SHELTER, 3, "test");
        this._game.constructionService.lvlUpConstruction(CONSTRUCTION.PALISADE, 3, "test");
        this._game.tileService.explore(6)

        this._game.mysteryService.startDrawingCards(0, 0, 4, this._game.localPlayer.getCharacter(), Infinity);
        this._game.resourceService.addBasicResourceToOwned("food", 2, "TEST");
        const itemCreator = new ItemCreator(this._game);
        this._game.equipmentService.items.push(itemCreator.create(ITEM.BIBLE));

        // this._game.actionSlotService.setPawn(getDroppableID(ACTION.EXPLORE, "6", "right", 0), this._game.localPlayer.getCharacter().pawnService.pawns[0])
        // this._game.actionSlotService.setPawn(getDroppableID(ACTION.EXPLORE, "6", "right", 1), this._game.localPlayer.getCharacter().pawnService.pawns[0])
        // this._game.actionSlotService.setPawn(getDroppableID(ACTION.GATHER, "6", "left", 0), this._game.localPlayer.getCharacter().pawnService.pawns[0])
        // this._game.actionSlotService.setPawn(getDroppableID(ACTION.GATHER, "6", "left", 1), this._game.localPlayer.getCharacter().pawnService.pawns[0])

        this._game.tokenService.addRandomTokenToOwned();
    }

    get renderData() {
        if (this._game) {
            return this._game?.renderData;
        } else {
            return null;

        }
    }
}
