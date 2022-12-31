import { Token } from "./Token/Token";
import { IGame } from "../../../../interfaces/Game";
import { DISCOVERY_TOKEN } from "../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../../interfaces/Characters/Character";

export class Treasure extends Token {
  constructor(game: IGame) {
    super(game, DISCOVERY_TOKEN.TREASURE, "pociągnij 1 Skarb z talii Tajemnic");
  }

  use(user: IPlayerCharacter, target: ICharacter | null = null) {
    //TODO: implement Mystery cards
  }

  autoDiscard() {}
}
