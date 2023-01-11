import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../../../interfaces/Game";
import {TERRAIN_TYPE} from "../../../../../../interfaces/TileService/ITile";
import {HelperPawnInvention} from "../../HelperPawnInvention";
import {PAWN_HELPER_ACTION} from "../../../../../../interfaces/Pawns/Pawn";

export class Map extends HelperPawnInvention implements IInvention {
  protected readonly _namePL = "mapa";

  constructor(game: IGame) {
    super(
        INVENTION_STARTER.MAP,
        {terrainType: TERRAIN_TYPE.RIVER, inventions: null},
        INVENTION_TYPE.STARTER,
        null,
        game,
        PAWN_HELPER_ACTION.EXPLORE
    );
  }

  onBuild() {
    super.onBuild();
  }

  onDestruction() {
    super.onDestruction();
  }
}
