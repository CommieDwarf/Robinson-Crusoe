import { TrapMysteryCard } from "../Trap/TrapMysteryCard/TrapMysteryCard";
import {
  IMysteryCard,
  ITreasureMysteryCard,
} from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";
import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";

export class AmuletWithPortraitOfBeautifulLady
  extends TreasureMysteryCard
  implements ITreasureMysteryCard
{
  constructor(game: IGame) {
    super(
      game,
      "amulet with portrait of beautiful lady",
      "medalion z portretem pięknej damy",
      false,
      "",
      1
    );
  }

  use(target: ICharacter | null) {
    super.use(target);
    //TODO: implement
  }
}
