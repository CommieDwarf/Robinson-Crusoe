import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_PERSONAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";

export class Shortcut extends Invention implements IInvention {
  protected readonly _namePL = "skrót";

  constructor(game: IGame) {
    super(
      INVENTION_PERSONAL.SHORTCUT,
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
