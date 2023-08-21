import { IGame } from "../../../../../../interfaces/Game";
import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";

export class AmuletWithPortraitOfBeautifulLady
  extends TreasureMysteryCard
  implements IMysteryCard
{
  protected readonly _requiresTargeting = true;

  constructor(game: IGame) {
    super(
      game,
      "amulet with portrait of beautiful lady",
      "medalion z portretem pięknej damy",
      false,
      "",
      0
    );
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this._game.characterService.markThresholdsForRemoval(2);
  }

}
