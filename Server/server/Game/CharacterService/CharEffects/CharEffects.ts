import { ICharEffects } from "../../../../../interfaces/Characters/CharEffects";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { ISideCharacter } from "../../../../../interfaces/Characters/SideCharacter";

export class PlayerCharEffects implements ICharEffects {
  character: IPlayerCharacter;

  constructor(character: IPlayerCharacter) {
    this.character = character;
  }

  diceQuestionMark() {}

  getHurt() {}

  death() {}

  starve() {}

  nightBeyondCamp() {}
}

export class SideCharEffects implements ICharEffects {
  character: ISideCharacter;

  constructor(character: ISideCharacter) {
    this.character = character;
  }

  diceQuestionMark() {}

  death() {}

  starve() {}

  nightBeyondCamp() {}

  getHurt() {}
}
