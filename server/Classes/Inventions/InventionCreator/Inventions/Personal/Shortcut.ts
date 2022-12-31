import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";

export class Shortcut extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "shortcut",
      { terrainType: null, inventions: [INVENTION_STARTER.MAP] },
      INVENTION_TYPE.PERSONAL,
      null,
      game
    );
  }

  use() {
    // TODO : implement
  }

  onDestruction() {
    // TODO: implement
  }
}
