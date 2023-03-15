import { Item } from "../Item";
import { IItem, ITEM } from "../../../../../interfaces/Equipment/Item";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../../interfaces/Characters/Character";

export class Biscuits extends Item implements IItem {
  constructor(game: IGame) {
    super(ITEM.BISCUITS, game);
  }

  use(user: IPlayerCharacter, target: ICharacter) {
    super.use(user);
    this._game.resourceService.addBasicResourceToOwned("dryFood", 1, this.name);
  }
}
