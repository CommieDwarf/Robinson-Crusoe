import { ICharEffects } from "../../../interfaces/Characters/CharEffects";
import { PlayerCharacter } from "./PlayerCharacter";

export class PlayerCharEffects implements ICharEffects {
  character: PlayerCharacter;

  constructor(character: PlayerCharacter) {
    this.character = character;
  }

  diceQuestionMark() {
    console.log("adventure");
  }

  death() {
    console.log("gameover");
  }

  starve() {
    console.log("hurt");
  }

  nightBeyondCamp() {
    console.log("hurt");
  }
}

export class SideCharEffects implements ICharEffects {
  character: PlayerCharacter;

  constructor(character: PlayerCharacter) {
    this.character = character;
  }

  diceQuestionMark() {
    console.log("hurt");
  }

  death() {
    console.log("char dies");
  }

  starve() {
    console.log("nothing");
  }

  nightBeyondCamp() {
    console.log("nothing");
  }
}
