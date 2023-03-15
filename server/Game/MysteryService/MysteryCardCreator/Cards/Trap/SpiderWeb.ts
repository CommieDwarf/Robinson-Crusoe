import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class SpiderWeb extends TrapMysteryCard implements IMysteryCard {
  constructor(game: IGame) {
    super(game, "spider web", "pająk");
  }

  triggerDrawEffect(drawer: ICharacter) {
    this._game.characterService.hurt(drawer, 1, this._namePL);
    //TODO: implement getting hurt every night if no medicine is built
  }
}
