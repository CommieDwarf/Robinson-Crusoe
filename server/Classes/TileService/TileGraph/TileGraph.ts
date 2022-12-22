import { Graph } from "../../Utility/Graph/Graph";
import { ITile } from "../../../../interfaces/TileService/ITile";
import { Tile } from "./Tile";
import { tilePositions } from "../../../../constants/tilePositions";
import { starterTile } from "../../../../constants/tilleTypes";
import { ITileGraph } from "../../../../interfaces/TileService/ITileGraph";
import { IVertex } from "../../../../interfaces/Graph/Vertex";

export class TileGraph extends Graph<ITile> implements ITileGraph {
  campTileID: number;
  previousCampTileID: number | null = null;

  constructor(campTileID: number) {
    super();
    this.campTileID = campTileID;
    this.initVertices(campTileID);
    this.addEdges(campTileID);
    this.updateRequiredHelpers();
  }

  get campTileVertex(): IVertex<ITile> {
    return this.getVertex(this.campTileID);
  }

  get previousCampTileVertex(): IVertex<ITile> | null {
    if (this.previousCampTileID) {
      return this.getVertex(this.previousCampTileID);
    } else {
      return null;
    }
  }

  moveCamp(tileID) {
    this.previousCampTileID = this.campTileID;
    this.campTileID = tileID;
    this.updateRequiredHelpers();
  }

  private initVertices(campTileID) {
    for (let i = 0; i < 15; i++) {
      if (i === campTileID) {
        this.addVertex(
          new Tile(tilePositions[i], i, true, true, starterTile, 0),
          i
        );
      } else {
        this.addVertex(new Tile(tilePositions[i], i, false, false, null, 0), i);
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
      const shortestPath = this.getShortestPath(this.campTileID, data.id);
      if (shortestPath.length > 0) {
        data.helpersRequired = shortestPath.length - 1;
      }
    });
  }
}
