import {
    INVENTION,
    INVENTION_CASTAWAYS,
    INVENTION_NORMAL,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
} from "../../../types/InventionService/Invention";
import {IGame} from "../../../types/Game";
import {Bricks} from "./Inventions/Starter/Bricks";
import {Dam} from "./Inventions/Starter/Dam";
import {Fire} from "./Inventions/Starter/Fire";
import {Knife} from "./Inventions/Starter/Knife";
import {Map} from "./Inventions/Starter/Map";
import {Medicine} from "./Inventions/Starter/Medicine";
import {Pot} from "./Inventions/Starter/Pot";
import {Rope} from "./Inventions/Starter/Rope";
import {Shovel} from "./Inventions/Starter/Shovel";
import {Basket} from "./Inventions/Normal/Basket";
import {Bed} from "./Inventions/Normal/Bed";
import {Belts} from "./Inventions/Normal/Belts";
import {Bow} from "./Inventions/Normal/Bow";
import {Cellar} from "./Inventions/Normal/Cellar";
import {Corral} from "./Inventions/Normal/Corral";
import {Diary} from "./Inventions/Normal/Diary";
import {Drums} from "./Inventions/Normal/Drums";
import {Furnace} from "./Inventions/Normal/Furnace";
import {Lantern} from "./Inventions/Normal/Lantern";
import {Moat} from "./Inventions/Normal/Moat";
import {Pit} from "./Inventions/Normal/Pit";
import {Raft} from "./Inventions/Normal/Raft";
import {Sack} from "./Inventions/Normal/Sack";
import {Shield} from "./Inventions/Normal/Shield";
import {Wall} from "./Inventions/Normal/Wall";
import {Fireplace} from "./Inventions/Personal/Fireplace";
import {Shortcut} from "./Inventions/Personal/Shortcut";
import {Snare} from "./Inventions/Personal/Snare";
import {Spear} from "./Inventions/Personal/Spear";
import {Sling} from "./Inventions/Normal/Sling";
import {Axe} from "./Inventions/Scenario/Axe";
import {Mast} from "./Inventions/Scenario/Mast";

interface Implemented {
    starter: INVENTION_STARTER[],
    normal: INVENTION_NORMAL[],
    personal: INVENTION_PERSONAL[],
    scenario: INVENTION_CASTAWAYS[],
}

export class InventionCreator {
    private readonly _game: IGame;

    public implemented: Implemented = {
        starter: Object.entries(INVENTION_STARTER).map(([value, key]) => key),
        normal: [
            INVENTION_NORMAL.BASKET,
            INVENTION_NORMAL.BED,
            INVENTION_NORMAL.BELTS,
            INVENTION_NORMAL.BOW,
            INVENTION_NORMAL.CELLAR,
            INVENTION_NORMAL.CORRAL,
            INVENTION_NORMAL.DIARY,
            INVENTION_NORMAL.DRUMS,
            INVENTION_NORMAL.FURNACE,
            INVENTION_NORMAL.LANTERN,
            INVENTION_NORMAL.MOAT,
            INVENTION_NORMAL.SACK,
            INVENTION_NORMAL.SHIELD,
            INVENTION_NORMAL.SLING,
            INVENTION_NORMAL.WALL,
        ],
        scenario: [],
        personal: [],
    }

    constructor(game: IGame) {
        this._game = game;
    }

    public create(invention: INVENTION) {
        switch (invention) {
            case INVENTION_STARTER.BRICKS:
                return new Bricks(this._game);
            case INVENTION_STARTER.DAM:
                return new Dam(this._game);
            case INVENTION_STARTER.FIRE:
                return new Fire(this._game);
            case INVENTION_STARTER.KNIFE:
                return new Knife(this._game);
            case INVENTION_STARTER.MAP:
                return new Map(this._game);
            case INVENTION_STARTER.MEDICINE:
                return new Medicine(this._game);
            case INVENTION_STARTER.POT:
                return new Pot(this._game);
            case INVENTION_STARTER.ROPE:
                return new Rope(this._game);
            case INVENTION_STARTER.SHOVEL:
                return new Shovel(this._game);
            case INVENTION_NORMAL.BASKET:
                return new Basket(this._game);
            case INVENTION_NORMAL.BED:
                return new Bed(this._game);
            case INVENTION_NORMAL.BELTS:
                return new Belts(this._game);
            case INVENTION_NORMAL.BOW:
                return new Bow(this._game);
            case INVENTION_NORMAL.CELLAR:
                return new Cellar(this._game);
            case INVENTION_NORMAL.CORRAL:
                return new Corral(this._game);
            case INVENTION_NORMAL.DIARY:
                return new Diary(this._game);
            case INVENTION_NORMAL.DRUMS:
                return new Drums(this._game);
            case INVENTION_NORMAL.FURNACE:
                return new Furnace(this._game);
            case INVENTION_NORMAL.LANTERN:
                return new Lantern(this._game);
            case INVENTION_NORMAL.MOAT:
                return new Moat(this._game);
            case INVENTION_NORMAL.PIT:
                return new Pit(this._game);
            case INVENTION_NORMAL.RAFT:
                return new Raft(this._game);
            case INVENTION_NORMAL.SACK:
                return new Sack(this._game);
            case INVENTION_NORMAL.SHIELD:
                return new Shield(this._game);
            case INVENTION_NORMAL.SLING:
                return new Sling(this._game);
            case INVENTION_NORMAL.WALL:
                return new Wall(this._game);
            case INVENTION_PERSONAL.FIREPLACE:
                return new Fireplace(this._game);
            case INVENTION_PERSONAL.SHORTCUT:
                return new Shortcut(this._game);
            case INVENTION_PERSONAL.SNARE:
                return new Snare(this._game);
            case INVENTION_PERSONAL.SPEAR:
                return new Spear(this._game);
            case INVENTION_CASTAWAYS.AXE:
                return new Axe(this._game);
            case INVENTION_CASTAWAYS.MAST:
                return new Mast(this._game);
        }
    }
}
