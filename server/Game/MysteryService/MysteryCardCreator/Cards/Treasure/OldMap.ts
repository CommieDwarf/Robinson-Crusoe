import { TreasureMysteryCard } from "./TreasureMysteryCard/TreasureMysteryCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class OldMap extends TreasureMysteryCard {
  constructor(game: IGame) {
    super(game, "old map", "stara mapa", false, "", 0);
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.characterService.incrDeterminationAllCharacters(1, this._namePL);
  }
}
