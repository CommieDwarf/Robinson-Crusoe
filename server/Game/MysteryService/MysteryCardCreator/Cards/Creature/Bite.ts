import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class Bite extends CreatureMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "bite", "ugryzienie", false, "");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.characterService.hurt(drawer, 2, this._namePL);
  }

  triggerEventEffect() {
    //TODO: implement custom beast fight.
  }
}
