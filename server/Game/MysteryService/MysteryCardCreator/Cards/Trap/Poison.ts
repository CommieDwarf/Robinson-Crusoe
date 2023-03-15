import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class Poison extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "poison", "trucizna");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.characterService.hurt(drawer, 1, this._namePL);
    //TODO: implement wound at night if no medicine is built
  }
}
