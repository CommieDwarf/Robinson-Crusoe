"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const PlayerCharacter_1 = require("./Characters/Character/PlayerCharacter/PlayerCharacter");
const Character_1 = require("@shared/types/Game/Characters/Character");
const Dog_1 = require("./Characters/Dog");
const Friday_1 = require("./Characters/Friday");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
const TERMS_1 = require("@shared/types/Terms/TERMS");
class CharacterService {
    constructor(characters, game) {
        this._thresholdAmountForRemoval = 0;
        this.dog = new Dog_1.Dog("male", game);
        this.friday = new Friday_1.Friday("male", game);
        this._game = game;
        this._allCharacters = [this.dog, this.friday, ...characters];
    }
    get renderData() {
        return {
            playerCharacters: this.playerCharacters.map((player) => player.renderData),
            dog: this.dog.renderData,
            friday: this.friday.renderData,
            thresholdAmountForRemoval: this._thresholdAmountForRemoval,
            areSomePawnsUnassigned: this.areSomePawnsUnassigned(),
        };
    }
    // ------------------------------------------------------------
    get allCharacters() {
        return this._allCharacters;
    }
    get healableCharacters() {
        return this._allCharacters
            .filter((char) => char.name !== Character_1.CHARACTER.DOG && char.health !== char.maxHealth);
    }
    get playerCharacters() {
        return this._allCharacters.filter((char) => char instanceof PlayerCharacter_1.PlayerCharacter);
    }
    get thresholdAmountForRemoval() {
        return this._thresholdAmountForRemoval;
    }
    // -------------------------------------------
    removeMoraleThreshold(character, threshold) {
        const char = typeof character === "string"
            ? this.getPlayerCharacter(character)
            : character;
        if (!char.moraleThresholds.includes(threshold)) {
            throw new Error(`Character ${char.name} doesn't have morale threshold: ${threshold}`);
        }
        if (this._thresholdAmountForRemoval > 0) {
            char.moraleThresholdsRemoved.push(threshold);
            this._thresholdAmountForRemoval--;
        }
    }
    markThresholdsForRemoval(amount) {
        this._thresholdAmountForRemoval = amount;
    }
    unMarkThresholdsForRemoval(amount) {
        this._thresholdAmountForRemoval = amount;
    }
    resetPawns() {
        this._allCharacters.forEach((char) => {
            char.pawnService.resetFreePawns();
        });
    }
    removeFreePawn(charName, draggableId) {
        this.getCharacter(charName).pawnService.removePawn(draggableId, "freePawns");
    }
    removePawn(charName, draggableId) {
        this.getCharacter(charName).pawnService.removePawn(draggableId, "pawns");
    }
    addFreePawn(charName, draggableId) {
        this.getCharacter(charName).pawnService.copyPawnToFreePawns(draggableId);
    }
    addPawn(charName, draggableId) {
    }
    getPlayerCharacter(charName) {
        const char = this.getCharacter(charName);
        if (!(char instanceof PlayerCharacter_1.PlayerCharacter)) {
            throw new Error("Couldn't find PlayerCharacter with given scenario: " + charName);
        }
        return char;
    }
    getCharacter(charName) {
        const character = this._allCharacters.find((char) => char.name === charName);
        if (!character) {
            throw new Error("Couldn't find Character with scenario: " + charName);
        }
        return character;
    }
    hurt(character, amount, sourceLog) {
        const char = typeof character === "string"
            ? this.getCharacter(character)
            : character;
        char.hurt(amount);
        if (sourceLog) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.CHARACTER_GOT_HURT,
                subject1: char.name,
                subject2: "",
                amount
            }, "negative", sourceLog);
        }
        if (char instanceof PlayerCharacter_1.PlayerCharacter) {
            if (char.shouldMoraleDrop) {
                this._game.moraleService.lvlDown(1, char.name);
            }
        }
    }
    heal(character, amount, sourceLog) {
        const char = typeof character === "string" ? this.getCharacter(character) : character;
        const surplus = (char.health + amount) - char.maxHealth;
        let value = surplus > 0 ? char.maxHealth - char.health : amount;
        if (value === 0) {
            return;
        }
        char.heal(value);
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.CHARACTER_GOT_HEALED,
            amount,
            subject1: char.name,
            subject2: "",
        }, "positive", sourceLog);
    }
    hurtAllPlayerCharacters(amount, logSource) {
        this.playerCharacters.forEach((char) => {
            this.hurt(char, amount, "");
        });
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.ALL_PLAYERS_GOT_HURT,
            amount,
            subject1: "",
            subject2: ""
        }, "negative", logSource);
    }
    healAllCharacters(amount, logSource) {
        this._allCharacters.forEach((char) => char.heal(amount));
        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.ALL_PLAYERS_GOT_HEALED,
                amount,
                subject1: "",
                subject2: "",
            }, "positive", logSource);
        }
    }
    incrDetermination(charOrName, amount, logSource) {
        const char = typeof charOrName === "string"
            ? this.getCharacter(charOrName)
            : charOrName;
        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.CHARACTER_GOT_DETERMINATION,
                amount,
                subject1: char.name,
                subject2: ""
            }, "positive", logSource);
        }
        char.incrDetermination(amount);
    }
    decrDeterminationOrGetHurt(charOrName, amount, logSource) {
        if (amount === 0) {
            return;
        }
        const char = typeof charOrName === "string"
            ? this.getCharacter(charOrName)
            : charOrName;
        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.CHARACTER_LOST_DETERMINATION,
                subject1: char.name,
                subject2: "",
                amount
            }, "negative", logSource);
        }
        const diff = char.determination - amount;
        if (diff < 0) {
            this.hurt(char, Math.abs(diff), TERMS_1.TERMS.UNFULFILLED_DEMAND);
            char.determination = 0;
        }
        else {
            char.decrDetermination(amount);
        }
    }
    decrDeterminationAllPlayerCharacters(amount, logSource) {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.ALL_PLAYERS_LOST_DETERMINATION,
            amount,
            subject1: "",
            subject2: ""
        }, "negative", logSource);
        this.playerCharacters.forEach((char) => {
            this.decrDeterminationOrGetHurt(char, amount, "");
        });
    }
    incrDeterminationAllCharacters(amount, logSource) {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.ALL_PLAYERS_GOT_DETERMINATION,
            amount,
            subject1: "",
            subject2: "",
        }, "positive", logSource);
        this._allCharacters.forEach((char) => this.incrDetermination(char, amount, ""));
    }
    areSomePawnsUnassigned() {
        return this._allCharacters.some((char) => char.pawnService.freePawns.length > 0);
    }
}
exports.CharacterService = CharacterService;
//# sourceMappingURL=CharacterService.js.map