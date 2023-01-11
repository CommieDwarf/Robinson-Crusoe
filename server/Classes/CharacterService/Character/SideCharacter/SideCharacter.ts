import { Character } from "../Character";
import {
  ISideCharacter,
  ISideCharacterRenderData,
  SideCharacterName,
} from "../../../../../interfaces/Characters/SideCharacter";
import { SideCharEffects } from "../../CharEffects/CharEffects";
import { PawnService } from "../../../PawnService/PawnService";
import { IGame } from "../../../../../interfaces/Game";

export class SideCharacter extends Character implements ISideCharacter {
  get name(): SideCharacterName {
    return this._name;
  }

  protected declare _name: SideCharacterName;

  constructor(
    name: SideCharacterName,
    namePL: string,
    id: number,
    maxHealth: number,
    game: IGame
  ) {
    super(name, namePL, id, maxHealth, game);
    this._pawnService = new PawnService(this, 1);
    this._effects = new SideCharEffects(this);
  }

  get renderData(): ISideCharacterRenderData {
    const renderData = super.getRenderData();
    return {
      ...renderData,
      name: this._name, // overriding CharacterName type into SideCharacterName type.
    };
  }
}
