"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventionCreator = void 0;
const Invention_1 = require("../../../../shared/types/Game/InventionService/Invention");
const Bricks_1 = require("./Inventions/Starter/Bricks");
const Dam_1 = require("./Inventions/Starter/Dam");
const Fire_1 = require("./Inventions/Starter/Fire");
const Knife_1 = require("./Inventions/Starter/Knife");
const Map_1 = require("./Inventions/Starter/Map");
const Medicine_1 = require("./Inventions/Starter/Medicine");
const Pot_1 = require("./Inventions/Starter/Pot");
const Rope_1 = require("./Inventions/Starter/Rope");
const Shovel_1 = require("./Inventions/Starter/Shovel");
const Basket_1 = require("./Inventions/Normal/Basket");
const Bed_1 = require("./Inventions/Normal/Bed");
const Belts_1 = require("./Inventions/Normal/Belts");
const Bow_1 = require("./Inventions/Normal/Bow");
const Cellar_1 = require("./Inventions/Normal/Cellar");
const Corral_1 = require("./Inventions/Normal/Corral");
const Diary_1 = require("./Inventions/Normal/Diary");
const Drums_1 = require("./Inventions/Normal/Drums");
const Furnace_1 = require("./Inventions/Normal/Furnace");
const Lantern_1 = require("./Inventions/Normal/Lantern");
const Moat_1 = require("./Inventions/Normal/Moat");
const Pit_1 = require("./Inventions/Normal/Pit");
const Raft_1 = require("./Inventions/Normal/Raft");
const Sack_1 = require("./Inventions/Normal/Sack");
const Shield_1 = require("./Inventions/Normal/Shield");
const Wall_1 = require("./Inventions/Normal/Wall");
const Fireplace_1 = require("./Inventions/Personal/Fireplace");
const Shortcut_1 = require("./Inventions/Personal/Shortcut");
const Snare_1 = require("./Inventions/Personal/Snare");
const Spear_1 = require("./Inventions/Personal/Spear");
const Sling_1 = require("./Inventions/Normal/Sling");
const Axe_1 = require("./Inventions/Scenario/Axe");
const Mast_1 = require("./Inventions/Scenario/Mast");
class InventionCreator {
    constructor(game) {
        this.implemented = {
            starter: Object.entries(Invention_1.INVENTION_STARTER).map(([value, key]) => key),
            normal: [
                Invention_1.INVENTION_NORMAL.BASKET,
                Invention_1.INVENTION_NORMAL.BED,
                Invention_1.INVENTION_NORMAL.BELTS,
                Invention_1.INVENTION_NORMAL.BOW,
                Invention_1.INVENTION_NORMAL.CELLAR,
                Invention_1.INVENTION_NORMAL.CORRAL,
                Invention_1.INVENTION_NORMAL.DIARY,
                Invention_1.INVENTION_NORMAL.DRUMS,
                Invention_1.INVENTION_NORMAL.FURNACE,
                Invention_1.INVENTION_NORMAL.LANTERN,
                Invention_1.INVENTION_NORMAL.MOAT,
                Invention_1.INVENTION_NORMAL.SACK,
                Invention_1.INVENTION_NORMAL.SHIELD,
                Invention_1.INVENTION_NORMAL.SLING,
                Invention_1.INVENTION_NORMAL.WALL,
            ],
            scenario: [],
            personal: [],
        };
        this._game = game;
    }
    create(invention) {
        switch (invention) {
            case Invention_1.INVENTION_STARTER.BRICKS:
                return new Bricks_1.Bricks(this._game);
            case Invention_1.INVENTION_STARTER.DAM:
                return new Dam_1.Dam(this._game);
            case Invention_1.INVENTION_STARTER.FIRE:
                return new Fire_1.Fire(this._game);
            case Invention_1.INVENTION_STARTER.KNIFE:
                return new Knife_1.Knife(this._game);
            case Invention_1.INVENTION_STARTER.MAP:
                return new Map_1.Map(this._game);
            case Invention_1.INVENTION_STARTER.MEDICINE:
                return new Medicine_1.Medicine(this._game);
            case Invention_1.INVENTION_STARTER.POT:
                return new Pot_1.Pot(this._game);
            case Invention_1.INVENTION_STARTER.ROPE:
                return new Rope_1.Rope(this._game);
            case Invention_1.INVENTION_STARTER.SHOVEL:
                return new Shovel_1.Shovel(this._game);
            case Invention_1.INVENTION_NORMAL.BASKET:
                return new Basket_1.Basket(this._game);
            case Invention_1.INVENTION_NORMAL.BED:
                return new Bed_1.Bed(this._game);
            case Invention_1.INVENTION_NORMAL.BELTS:
                return new Belts_1.Belts(this._game);
            case Invention_1.INVENTION_NORMAL.BOW:
                return new Bow_1.Bow(this._game);
            case Invention_1.INVENTION_NORMAL.CELLAR:
                return new Cellar_1.Cellar(this._game);
            case Invention_1.INVENTION_NORMAL.CORRAL:
                return new Corral_1.Corral(this._game);
            case Invention_1.INVENTION_NORMAL.DIARY:
                return new Diary_1.Diary(this._game);
            case Invention_1.INVENTION_NORMAL.DRUMS:
                return new Drums_1.Drums(this._game);
            case Invention_1.INVENTION_NORMAL.FURNACE:
                return new Furnace_1.Furnace(this._game);
            case Invention_1.INVENTION_NORMAL.LANTERN:
                return new Lantern_1.Lantern(this._game);
            case Invention_1.INVENTION_NORMAL.MOAT:
                return new Moat_1.Moat(this._game);
            case Invention_1.INVENTION_NORMAL.PIT:
                return new Pit_1.Pit(this._game);
            case Invention_1.INVENTION_NORMAL.RAFT:
                return new Raft_1.Raft(this._game);
            case Invention_1.INVENTION_NORMAL.SACK:
                return new Sack_1.Sack(this._game);
            case Invention_1.INVENTION_NORMAL.SHIELD:
                return new Shield_1.Shield(this._game);
            case Invention_1.INVENTION_NORMAL.SLING:
                return new Sling_1.Sling(this._game);
            case Invention_1.INVENTION_NORMAL.WALL:
                return new Wall_1.Wall(this._game);
            case Invention_1.INVENTION_PERSONAL.FIREPLACE:
                return new Fireplace_1.Fireplace(this._game);
            case Invention_1.INVENTION_PERSONAL.SHORTCUT:
                return new Shortcut_1.Shortcut(this._game);
            case Invention_1.INVENTION_PERSONAL.SNARE:
                return new Snare_1.Snare(this._game);
            case Invention_1.INVENTION_PERSONAL.SPEAR:
                return new Spear_1.Spear(this._game);
            case Invention_1.INVENTION_CASTAWAYS.AXE:
                return new Axe_1.Axe(this._game);
            case Invention_1.INVENTION_CASTAWAYS.MAST:
                return new Mast_1.Mast(this._game);
        }
    }
}
exports.InventionCreator = InventionCreator;
//# sourceMappingURL=InventionCreator.js.map