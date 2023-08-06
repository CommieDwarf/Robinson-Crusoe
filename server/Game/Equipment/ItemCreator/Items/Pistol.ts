import { Item } from "../Item";
import { IItem, ITEM } from "../../../../../interfaces/Equipment/Item";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/Character";

export class Pistol extends Item implements IItem {
  constructor(game: IGame) {
    super(ITEM.PISTOL, game);
  }

  use(user: IPlayerCharacter, target: IPlayerCharacter) {
    super.use(user);
    //TODO: implement temporary weapon boost.
  }
}
