import shuffle from "../../../utils/shuffleArray";
import { TileType, tileTypes } from "../../../constants/tilleTypes";
import {
  ITileService,
  ITilesServiceRenderData,
} from "../../../interfaces/TileService/ITileService";
import { ITile, TERRAIN_TYPE } from "../../../interfaces/TileService/ITile";
import { IGame } from "../../../interfaces/Game";
import { TileGraph } from "./TileGraph/TileGraph";
import { ITileGraph } from "../../../interfaces/TileService/ITileGraph";

export class TileService implements ITileService {
  _tileGraph: ITileGraph;
  _tileTypeStack: TileType[];
  private readonly _terrainTypesExplored: Set<TERRAIN_TYPE>;
  private _campTransition = {
    status: false,
    forced: false,
  };
  _game: IGame;
  private _campJustMoved = false;
  basket: boolean = false;
  sack: boolean = false;
  axe: boolean = false;
  resourceAmountToDeplete: number = 0;

  constructor(game: IGame, campTileID: number) {
    this._game = game;
    this._tileTypeStack = shuffle(tileTypes);
    this._terrainTypesExplored = new Set<TERRAIN_TYPE>([TERRAIN_TYPE.BEACH]);
    this._tileGraph = new TileGraph(campTileID, game);
    this.showAdjacentTiles(campTileID);
  }

  get renderData(): ITilesServiceRenderData {
    return {
      tiles: this._tileGraph.vertices.map((vertex) => vertex.data.renderData),
      campJustMoved: this.campJustMoved,
      campTile: this.campTile.renderData,
      resourceAmountToDeplete: this.resourceAmountToDeplete,
    };
  }

  get campJustMoved(): boolean {
    return this._campJustMoved;
  }

  set campJustMoved(value: boolean) {
    this._campJustMoved = value;
  }

  get tiles() {
    return this._tileGraph.vertices.map((vertex) => vertex.data);
  }

  get terrainTypesExplored(): Set<TERRAIN_TYPE> {
    return this._terrainTypesExplored;
  }

  get campTransition(): { forced: boolean; status: boolean } {
    return this._campTransition;
  }

  get previousCampTile(): ITile | null {
    const tile = this._tileGraph.previousCampTileVertex?.data;
    if (tile) {
      return tile;
    } else {
      return null;
    }
  }

  get campTile() {
    return this._tileGraph.campTileVertex.data;
  }

  get tilesAroundCamp() {
    return this._tileGraph
      .getBorderVertices(this.campTile.id)
      .map((vertex) => vertex.data);
  }

  public clearMarkedForDepletion() {
    this.tiles.forEach((tile) => tile.clearMarkedForDepletion());
  }

  markTileForAnyResourceDepletion(tileID: number) {
    this.getTile(tileID).markForDepletion("left");
    this.getTile(tileID).markForDepletion("right");
  }

  markTilesAroundCampForResourceDepletion() {
    this.tilesAroundCamp.forEach((tile) => {
      tile.markForDepletion("left");
      tile.markForDepletion("right");
    });
  }

  markClosestResourceForDepletion(resource: "food" | "wood") {
    const closestTiles = this._tileGraph.getClosestTilesWIthResource(resource);
    closestTiles.forEach((tile) => {
      const side = tile.getSideByResource(resource);
      if (!side) {
        throw new Error(`there is no ${resource} on tile: ${tile.id}`);
      }
      tile.markForDepletion(side);
    });
  }

  countMarkedResourceForDepletion() {
    let counter = 0;
    this.tiles.forEach((tile) => {
      if (tile.tileType?.resources.left.markedForDepletion) {
        counter++;
      }
      if (tile.tileType?.resources.right.markedForDepletion) {
        counter++;
      }
    });
    return counter;
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

    const resource = tile.tileType?.resources[side].resource;

    if (!resource || resource === "beast") {
      throw new Error("can't gather" + resource);
    }
    this._game.resourceService.addResourceToFuture(resource, 1, logSource);
  }

  explore(id: number) {
    const tileType = this._tileTypeStack.pop();
    if (!tileType) {
      throw new Error("Empty tile type stack!");
    }
    const tile = this.getTile(id);
    tile.reveal(tileType);
    if (tile.position.borderTiles.includes(this.campTile.id)) {
      tile.canCampBeSettled = true;
    }
    this.terrainTypesExplored.add(tileType.terrainType);
    this.showAdjacentTiles(id);
    this._tileGraph.addEdges(id);
    this._tileGraph.updateRequiredHelpers();
  }

  public canCampBeMoved(): boolean {
    return this._tileGraph.canCampBeMoved();
  }

  public getTile(id: number) {
    return this._tileGraph.getVertex(id).data;
  }

  public moveCamp(tileID: number) {
    if (
      this._game.phaseService.phase === "night" &&
      this.getTile(tileID).canCampBeSettled
    ) {
      this._tileGraph.moveCamp(tileID);
      this.campJustMoved = true;
      this._game.chatLog.addMessage(
        "Obóz został przeniesiony.",
        "green",
        "Noc"
      );
    } else {
      throw Error(`Cant transfer camp. tileID: ${tileID}`);
    }
  }

  public forceCampMovement() {
    this.campTransition.forced = true;
    this.campTransition.status = true;
  }

  public depleteResource(tileID: number, side: "left" | "right") {
    this.getTile(tileID).depleteResource(side);
    this.resourceAmountToDeplete--;
    if (this.resourceAmountToDeplete === 0) {
      this.clearMarkedForDepletion();
    }
  }

  private showAdjacentTiles(id: number) {
    const tile = this.getTile(id);
    tile.position.borderTiles.forEach((id) => {
      this.getTile(id).show = true;
    });
  }
}
