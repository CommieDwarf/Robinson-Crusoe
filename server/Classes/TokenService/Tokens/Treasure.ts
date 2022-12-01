import {Token} from "../Token";
import {IGame} from "../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";

export class Treasure extends Token {
  constructor(game: IGame, character: IPlayerCharacter) {
    super(game, character, "treasure", "pociągnij 1 Skarb z talii Tajemnic");
  }

  use() {
    //TODO: implement Mystery cards
  }

  autoDiscard() {
  }
}
