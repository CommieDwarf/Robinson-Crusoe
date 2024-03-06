import {ICharEffects} from "@shared/types/Game/Characters/CharEffects";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ISideCharacter} from "@shared/types/Game/Characters/SideCharacter";

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
