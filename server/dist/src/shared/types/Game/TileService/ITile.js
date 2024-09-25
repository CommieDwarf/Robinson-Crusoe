"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TILE_ACTION = exports.TERRAIN_TYPE = void 0;
var TERRAIN_TYPE;
(function (TERRAIN_TYPE) {
    TERRAIN_TYPE["BEACH"] = "beach";
    TERRAIN_TYPE["HILLS"] = "hills";
    TERRAIN_TYPE["MOUNTAINS"] = "mountains";
    TERRAIN_TYPE["RIVER"] = "river";
    TERRAIN_TYPE["PLAINS"] = "plains";
})(TERRAIN_TYPE || (exports.TERRAIN_TYPE = TERRAIN_TYPE = {}));
var TILE_ACTION;
(function (TILE_ACTION) {
    TILE_ACTION["SET_TIME_CONSUMING_ACTION"] = "set time consuming action";
    TILE_ACTION["UNSET_TIME_CONSUMING_ACTON"] = "unset time consuming action";
    TILE_ACTION["SET_GREATER_DANGER"] = "set greater danger";
    TILE_ACTION["UNSET_GREATER_DANGER"] = "unset greater danger";
    TILE_ACTION["DEPLETE_TERRAIN_TYPE"] = "unset terrain type";
    TILE_ACTION["FLIP"] = "flip";
    TILE_ACTION["UN_FLIP"] = "un flip";
})(TILE_ACTION || (exports.TILE_ACTION = TILE_ACTION = {}));
//# sourceMappingURL=ITile.js.map