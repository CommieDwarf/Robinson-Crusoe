import { Graph } from "../../Utility/Graph/Graph";
import { ITile } from "../../../../interfaces/TileService/ITile";
import { Tile } from "./Tile";
import { tilePositions } from "../../../../constants/tilePositions";
import { starterTile } from "../../../../constants/tileResourceServices";
import { ITileGraph } from "../../../../interfaces/TileService/ITileGraph";
import { IVertex } from "../../../../interfaces/Graph/Vertex";
import { IGame } from "../../../../interfaces/Game";

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
    this.updateRequiredHelpers();
  }

  public moveCamp(tileID: number) {
    this.previousCampTileVertex = this.campTileVertex;
    this.previousCampTileVertex.data.camp = false;
    this.campTileVertex = this.getVertex(tileID);
    this.campTileVertex.data.camp = true;
    this.updateRequiredHelpers();
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
        this.addVertex(
          new Tile(tilePositions[i], i, true, starterTile, this._game),
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

  public updateRequiredHelpers() {
    this.vertices.forEach(({ data }) => {
      const shortestPath = this.getShortestPath(
        this.campTileVertex.id,
        data.id
      );
      if (shortestPath.length > 0) {
        data.requiredHelperAmount = shortestPath.length - 1;
      }
    });
  }

  public getBorderVertices(id: number) {
    return this.vertices.filter((vertex) =>
      vertex.edges.filter((edge) => edge.end.id === id)
    );
  }
}
