import { TrapMysteryCard } from "./TrapMysteryCard/TrapMysteryCard";
import { IMysteryCard } from "../../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { IPlayerCharacter } from "../../../../../../interfaces/Characters/Character";

export class TerribleScream extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "terrible scream", "przeraźliwy krzyk");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this._game.characterService.decrDetermination(
      drawer,
      drawer.determination,
      this._namePL
    );
  }
}
