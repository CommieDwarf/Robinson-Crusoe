import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";

export class Snare extends Invention implements IInvention {
  protected _usable = true;

  constructor(game: IGame) {
    super(
      "snare",
      { terrainType: null, inventions: [INVENTION_STARTER.ROPE] },
      INVENTION_TYPE.PERSONAL,
      null,
      game
    );
  }

  use() {
    //TODO: implement
  }

  onDestruction() {
    //TODO: implement
  }
}
