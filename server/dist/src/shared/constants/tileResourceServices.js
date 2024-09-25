"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.starterTile = exports.fixedTileResources = void 0;
const ITile_1 = require("@shared/types/Game/TileService/ITile");
function createFixedTileResources(id, terrainType, resources, extras) {
    return {
        id,
        terrainType,
        resources,
        extras,
    };
}
exports.fixedTileResources = [
    createFixedTileResources(1, ITile_1.TERRAIN_TYPE.HILLS, { left: "wood", right: "food" }, { discoveryToken: 1, totem: true, naturalShelter: false }),
    createFixedTileResources(2, ITile_1.TERRAIN_TYPE.RIVER, { left: "beast", right: "food" }, { discoveryToken: 3, totem: false, naturalShelter: false }),
    createFixedTileResources(3, ITile_1.TERRAIN_TYPE.PLAINS, { left: "wood", right: "beast" }, { discoveryToken: 2, totem: false, naturalShelter: false }),
    createFixedTileResources(4, ITile_1.TERRAIN_TYPE.PLAINS, { left: "food", right: "beast" }, { discoveryToken: 3, totem: false, naturalShelter: false }),
    createFixedTileResources(5, ITile_1.TERRAIN_TYPE.MOUNTAINS, { left: "wood", right: "beast" }, { discoveryToken: 1, totem: false, naturalShelter: true }),
    createFixedTileResources(6, ITile_1.TERRAIN_TYPE.HILLS, { left: "wood", right: "beast" }, { discoveryToken: 2, totem: true, naturalShelter: false }),
    createFixedTileResources(7, ITile_1.TERRAIN_TYPE.MOUNTAINS, { left: "food", right: "wood" }, { discoveryToken: 1, totem: true, naturalShelter: false }),
    createFixedTileResources(8, ITile_1.TERRAIN_TYPE.MOUNTAINS, { left: "food", right: "beast" }, { discoveryToken: 1, totem: true, naturalShelter: true }),
    createFixedTileResources(9, ITile_1.TERRAIN_TYPE.RIVER, { left: "wood", right: "food" }, { discoveryToken: 1, totem: true, naturalShelter: false }),
    createFixedTileResources(10, ITile_1.TERRAIN_TYPE.PLAINS, { left: "food", right: "wood" }, { discoveryToken: 1, totem: true, naturalShelter: false }),
];
exports.starterTile = createFixedTileResources(0, ITile_1.TERRAIN_TYPE.BEACH, { left: "wood", right: "food" }, { discoveryToken: 0, totem: false, naturalShelter: false });
//# sourceMappingURL=tileResourceServices.js.map