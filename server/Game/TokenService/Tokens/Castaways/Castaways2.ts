import {Token} from "../Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/Character";

export class Castaways2 extends Token {
  constructor(game: IGame) {
    super(
        game,
        DISCOVERY_TOKEN.SCENARIO_2,
        "2 drewna tylko do odłożenia na stos."
    );
  }

  //TODO: implement usage. Implement scenario stash.
  use(user: IPlayerCharacter, target: IPlayerCharacter | null) {

  }

  autoDiscard() {
    return;
  }
}
