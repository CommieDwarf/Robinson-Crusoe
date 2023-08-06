import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";
import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/PlayerCharacter";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";

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
      2
    );
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }

  use(character: IPlayerCharacter, moraleThreshold: number): void {
    this._game.characterService.removeMoraleThreshold(
      character,
      moraleThreshold
    );
    super.use();
  }
}
