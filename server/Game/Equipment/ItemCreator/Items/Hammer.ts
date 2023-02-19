import { Item } from "../Item";
import { IItem, ITEM } from "../../../../../interfaces/Equipment/Item";
import { IGame } from "../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../../interfaces/Characters/Character";
import { HelperPawn } from "../../../PawnService/Pawn/HelperPawn";
import { PAWN_HELPER_ACTION } from "../../../../../interfaces/Pawns/Pawn";

export class Hammer extends Item implements IItem {
  constructor(game: IGame) {
    super(ITEM.HAMMER, game);
  }

  use(user: IPlayerCharacter, target: ICharacter) {
    super.use(user);
    user.pawnService.addPawn(
      new HelperPawn(user, true, PAWN_HELPER_ACTION.BUILD)
    );
  }
}
