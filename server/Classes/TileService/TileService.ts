import shuffle from "../../../utils/shuffleArray";
import { tileTypes, TileType } from "../../../constants/tilleTypes";
import {
  ITileService,
  ITilesServiceRenderData,
} from "../../../interfaces/TileService/ITileService";
import { ITile, TerrainType } from "../../../interfaces/TileService/ITile";
import { IGame } from "../../../interfaces/Game";
import { TileGraph } from "./TileGraph/TileGraph";
import { ITileGraph } from "../../../interfaces/TileService/ITileGraph";

export class TileService implements ITileService {
  _tileGraph: ITileGraph;
  _tileTypeStack: TileType[];
  private readonly _terrainTypesExplored: Set<TerrainType>;

  private _campTransition = {
    status: false,
    forced: false,
  };
  _game: IGame;

  constructor(game: IGame, campTileID: number) {
    this._game = game;
    this._tileTypeStack = shuffle(tileTypes);
    this._terrainTypesExplored = new Set<TerrainType>(["beach"]);
    this._tileGraph = new TileGraph(campTileID);
    this.showAdjacentTiles(campTileID);
  }

  get renderData(): ITilesServiceRenderData {
    return {
      tiles: this._tileGraph.vertices.map((vertex) => vertex.data.renderData),
      campTileId: this.campTile.id,
    };
  }

  get tiles() {
    return this._tileGraph.vertices.map((vertex) => vertex.data);
  }

  get terrainTypesExplored(): Set<TerrainType> {
    return this._terrainTypesExplored;
  }

  get campTransition(): { forced: boolean; status: boolean } {
    return this._campTransition;
  }

  get previousCampTile(): ITile | null {
    const vertex = this._tileGraph.previousCampTileVertex;
    if (vertex) {
      return vertex.data;
    } else {
      return null;
    }
  }

  get campTile() {
    return this._tileGraph.campTileVertex.data;
  }

  gather(side: "left" | "right", tileID: number, logSource: string) {
    if (tileID === this.campTile.id) {
      throw new Error("Can't gather from camp tile");
    }
    const tile = this.getTile(tileID);
    const tileType = tile.tileType;
    if (!tile) {
      throw new Error("Can't find tile to gather. id " + tileID);
    }

    if (!tileType) {
      throw new Error("Tile has no tileType");
    }

    const resource = tile.tileType?.resources[side];

    if (!resource || resource === "beast") {
      throw new Error("can't gather" + resource);
    }
    this._game.allResources.addResourceToFuture(resource, 1, logSource);
  }

  explore(id: number) {
    const tileType = this._tileTypeStack.pop();
    if (!tileType) {
      throw new Error("Empty tile type stack!");
    }
    const tile = this.getTile(id);
    tile.reveal(tileType);
    this.terrainTypesExplored.add(tileType.terrainType);
    this.showAdjacentTiles(id);
    this._tileGraph.addEdges(id);
    this._tileGraph.updateRequiredHelpers();
  }

  public getTile(id: number) {
    return this._tileGraph.getVertex(id).data;
  }

  public forceCampTransition() {
    this.campTransition.forced = true;
    this.campTransition.status = true;
  }

  public isCampTransitionAvailable(): boolean {
    return true; // TODO: implement this
  }

  public static getTileIdFromDroppableId(droppableId: string): number {
    const droppableArr = droppableId.split("-");
    const id = parseInt(droppableArr[1]);
    if (!id) {
      throw new Error("Couldnt find tile id from " + droppableId);
    }
    return id;
  }

  private showAdjacentTiles(id: number) {
    const tile = this.getTile(id);
    tile.position.borderTiles.forEach((id) => {
      this.getTile(id).show = true;
    });
  }
}
