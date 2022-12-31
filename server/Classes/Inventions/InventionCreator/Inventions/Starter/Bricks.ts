import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Bricks extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "bricks",
      { terrainType: TERRAIN_TYPE.HILLS, inventions: null },
      INVENTION_TYPE.STARTER,
      null,
      game
    );
  }

  onBuild() {
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.PALISADE,
      1,
      this.name
    );
  }

  onDestruction() {
    this._game.constructionService.lvlDownIfPossible(
      CONSTRUCTION.PALISADE,
      1,
      this.name
    );
  }
}
