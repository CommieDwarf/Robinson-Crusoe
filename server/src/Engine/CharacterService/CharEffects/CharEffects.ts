import {ICharEffects} from "../../../types/Characters/CharEffects";
import {IPlayerCharacter} from "../../../types/Characters/PlayerCharacter";
import {ISideCharacter} from "../../../types/Characters/SideCharacter";

export class PlayerCharEffects implements ICharEffects {
    character: IPlayerCharacter;

    constructor(character: IPlayerCharacter) {
        this.character = character;
    }

    diceQuestionMark() {
    }

    getHurt() {
    }

    death() {
    }

    starve() {
    }

    nightBeyondCamp() {
    }
}

export class SideCharEffects implements ICharEffects {
    character: ISideCharacter;

    constructor(character: ISideCharacter) {
        this.character = character;
    }

    diceQuestionMark() {
    }

    death() {
    }

    starve() {
    }

    nightBeyondCamp() {
    }

    getHurt() {
    }
}
