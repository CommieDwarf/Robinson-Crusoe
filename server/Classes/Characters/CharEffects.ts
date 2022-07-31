import {ICharEffects} from "../../../interfaces/Characters/CharEffects";
import {IPlayerCharacter} from "../../../interfaces/Characters/PlayerCharacter";

export class PlayerCharEffects implements ICharEffects {
  character: IPlayerCharacter;

  constructor(character: IPlayerCharacter) {
    this.character = character;
  }

  diceQuestionMark() {
    console.log("adventure");
  }

  getHurt() {

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
  character: IPlayerCharacter;

  constructor(character: IPlayerCharacter) {
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

  getHurt() {

  }
}
