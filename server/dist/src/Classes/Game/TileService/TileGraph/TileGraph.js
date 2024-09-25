"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileGraph = void 0;
const Graph_1 = require("../../Utility/Graph/Graph");
const Tile_1 = require("../Tile/Tile");
const tilePositions_1 = require("@shared/constants/tilePositions");
const tileResourceServices_1 = require("@shared/constants/tileResourceServices");
const TileResourceService_1 = require("../Tile/TileResourceService/TileResourceService");
class TileGraph extends Graph_1.Graph {
    constructor(campTileID, game) {
        super();
        this.previousCampTileVertex = null;
        this._game = game;
        this.initVertices(campTileID);
        this.campTileVertex = this.getVertex(campTileID);
        this.addEdges(campTileID);
        this.updateDistance();
    }
    moveCamp(tileID) {
        this.previousCampTileVertex = this.campTileVertex;
        this.previousCampTileVertex.data.camp = false;
        this.campTileVertex = this.getVertex(tileID);
        this.campTileVertex.data.camp = true;
        this.updateDistance();
        this.updateCanCampBeSettled();
    }
    canCampBeMoved() {
        return this.vertices.some((vertex) => vertex.data.canCampBeSettled);
    }
    updateCanCampBeSettled() {
        this.vertices.forEach((vertex) => {
            vertex.data.canCampBeSettled = vertex.edges.some((edge) => edge.end === this.campTileVertex);
        });
    }
    getClosestTilesWIthResource(resource) {
        let closest = Infinity;
        let tiles = [];
        this.vertices.forEach((vertex) => {
            if (vertex.data.id === this.campTileVertex.id) {
                return;
            }
            if (vertex.data.hasBasicResource(resource)) {
                let path = this.getShortestPath(this.campTileVertex.id, vertex.id);
                if (path.length < closest) {
                    closest = path.length;
                    tiles = [vertex.data];
                }
                else if (path.length === closest) {
                    tiles.push(vertex.data);
                }
            }
        });
        return tiles;
    }
    initVertices(campTileID) {
        for (let i = 0; i < 15; i++) {
            if (i === campTileID) {
                const tile = this.addVertex(new Tile_1.Tile(tilePositions_1.tilePositions[i], i, true, new TileResourceService_1.TileResourceService(this._game, tileResourceServices_1.starterTile.id, tileResourceServices_1.starterTile.terrainType, tileResourceServices_1.starterTile.resources, tileResourceServices_1.starterTile.extras), this._game), i);
            }
            else {
                this.addVertex(new Tile_1.Tile(tilePositions_1.tilePositions[i], i, false, null, this._game), i);
            }
        }
    }
    addEdges(tileID) {
        const vertex = this.getVertex(tileID);
        vertex.data.position.borderTiles.forEach((tileID) => {
            const borderVertex = this.getVertex(tileID);
            vertex.addEdge(borderVertex, null);
        });
    }
    updateDistance() {
        this.vertices.forEach(({ data }) => {
            const shortestPath = this.getShortestPath(this.campTileVertex.id, data.id);
            if (shortestPath.length > 0) {
                data.distance = shortestPath.length;
            }
            else {
                data.distance = null;
            }
        });
    }
    getBorderVertices(id) {
        const vertex = this.getVertex(id);
        return vertex.edges.map((edge) => {
            if (edge.end === vertex) {
                return edge.start;
            }
            else {
                return edge.end;
            }
        });
    }
}
exports.TileGraph = TileGraph;
//# sourceMappingURL=TileGraph.js.map