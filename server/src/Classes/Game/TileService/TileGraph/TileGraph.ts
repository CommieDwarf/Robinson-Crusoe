import {Graph} from "../../Utility/Graph/Graph";
import {ITile} from "@shared/types/Game/TileService/ITile";
import {Tile} from "./Tile";
import {tilePositions} from "@shared/constants/tilePositions";
import {ITileGraph} from "@shared/types/Game/TileService/ITileGraph";
import {IVertex} from "@shared/types/Game/Graph/Vertex";
import {IGame} from "@shared/types/Game/Game";
import {starterTile} from "@shared/constants/tileResourceServices";
import {TileResourceService} from "./TileResourceService/TileResourceService";

export class TileGraph extends Graph<ITile> implements ITileGraph {
    campTileVertex: IVertex<ITile>;
    previousCampTileVertex: IVertex<ITile> | null = null;
    private readonly _game: IGame;

    constructor(campTileID: number, game: IGame) {
        super();
        this._game = game;
        this.initVertices(campTileID);
        this.campTileVertex = this.getVertex(campTileID);
        this.addEdges(campTileID);
        this.updateDistance();
    }

    public moveCamp(tileID: number) {
        this.previousCampTileVertex = this.campTileVertex;
        this.previousCampTileVertex.data.camp = false;
        this.campTileVertex = this.getVertex(tileID);
        this.campTileVertex.data.camp = true;
        this.updateDistance();
        this.updateCanCampBeSettled();
    }

    public canCampBeMoved(): boolean {
        return this.vertices.some((vertex) => vertex.data.canCampBeSettled);
    }

    private updateCanCampBeSettled() {
        this.vertices.forEach((vertex) => {
            vertex.data.canCampBeSettled = vertex.edges.some(
                (edge) => edge.end === this.campTileVertex
            );
        });
    }

    public getClosestTilesWIthResource(resource: "wood" | "food") {
        let closest = Infinity;
        let tiles: ITile[] = [];
        this.vertices.forEach((vertex) => {
            if (vertex.data.id === this.campTileVertex.id) {
                return;
            }
            if (vertex.data.hasBasicResource(resource)) {
                let path = this.getShortestPath(this.campTileVertex.id, vertex.id);
                if (path.length < closest) {
                    closest = path.length;
                    tiles = [vertex.data];
                } else if (path.length === closest) {
                    tiles.push(vertex.data);
                }
            }
        });
        return tiles;
    }

    private initVertices(campTileID: number) {
        for (let i = 0; i < 15; i++) {
            if (i === campTileID) {
                const tile =
                    this.addVertex(
                        new Tile(tilePositions[i], i, true, new TileResourceService(this._game, starterTile.id, starterTile.terrainType, starterTile.resources, starterTile.extras), this._game),
                        i
                    );
            } else {
                this.addVertex(
                    new Tile(tilePositions[i], i, false, null, this._game),
                    i
                );
            }
        }
    }

    addEdges(tileID: number) {
        const vertex = this.getVertex(tileID);
        vertex.data.position.borderTiles.forEach((tileID) => {
            const borderVertex = this.getVertex(tileID);
            vertex.addEdge(borderVertex, null);
        });
    }

    public updateDistance() {
        this.vertices.forEach(({data}) => {
            const shortestPath = this.getShortestPath(
                this.campTileVertex.id,
                data.id
            );
            if (shortestPath.length > 0) {
                data.distance = shortestPath.length;
            } else {
                data.distance = null;
            }
        });

    }

    public getBorderVertices(id: number) {
        const vertex = this.getVertex(id);
        return vertex.edges.map((edge) => {
                if (edge.end === vertex) {
                    return edge.start;
                } else {
                    return edge.end;
                }
            }
        )
    }
}
