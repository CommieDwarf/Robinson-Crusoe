import { Item } from "../Item";
import { IItem, ITEM } from "../../../../../interfaces/Equipment/Item";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/Character";

export class Bible extends Item implements IItem {
  constructor(game: IGame) {
    super(ITEM.BIBLE, game);
  }

  use(user: IPlayerCharacter, target: IPlayerCharacter) {
    super.use(user);
    this._game.characterService.incrDetermination(user, 3, this._name);
    this._game.characterService.heal(user, 1, this._name);
  }
}
