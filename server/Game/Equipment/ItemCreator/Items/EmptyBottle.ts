import { Item } from "../Item";
import { IItem, ITEM } from "../../../../../interfaces/Equipment/Item";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../../interfaces/Characters/Character";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class EmptyBottle extends Item implements IItem {
  constructor(game: IGame) {
    super(ITEM.EMPTY_BOTTLE, game);
  }

  use(user: IPlayerCharacter, target: ICharacter) {
    super.use(user);
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.WEAPON,
      1,
      this.name
    );
  }
}
