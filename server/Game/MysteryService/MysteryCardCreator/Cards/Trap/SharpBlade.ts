import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/Character";

export class SharpBlade
    extends TrapMysteryCard
    implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "sharp blade", "ostrze");
  }

  triggerDrawEffect(drawer: IPlayerCharacter) {
    this._game.characterService.hurt(drawer, 2, this._namePL);
  }
}
