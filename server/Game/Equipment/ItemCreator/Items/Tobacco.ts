import { Item } from "../Item";
import { IItem, ITEM } from "../../../../../interfaces/Equipment/Item";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/Character";

export class Tobacco extends Item implements IItem {
  constructor(game: IGame) {
    super(ITEM.TOBACCO, game);
  }

  use(user: IPlayerCharacter, target: IPlayerCharacter) {
    super.use(user);
    this._game.characterService.incrDetermination(target, 2, this.name);
  }
}
