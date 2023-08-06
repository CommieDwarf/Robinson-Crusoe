import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class BottleOfWine extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "bottle of wine", "butelka wina", false, "", 1);
  }

  //
  // use(target): void {
  //   super.use(target);
  //   if (!target) {
  //     throw new Error(
  //       "target must be specified with this treasure: " + this._name
  //     );
  //   }
  //   this._game.characterService.heal(target, 2, this._namePL);
  // }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this.addToResources();
  }
}
