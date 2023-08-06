import { Item } from "../Item";
import { IItem, ITEM } from "../../../../../interfaces/Equipment/Item";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/Character";

export class StormGlass extends Item implements IItem {
  constructor(game: IGame) {
    super(ITEM.STORM_GLASS, game);
  }

  use(user: IPlayerCharacter, target: IPlayerCharacter) {
    super.use(user);
    //TODO: implement weather dice before action phase.
  }
}
