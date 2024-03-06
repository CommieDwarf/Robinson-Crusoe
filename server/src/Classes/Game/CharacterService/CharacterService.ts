import {ICharacterService, ICharacterServiceRenderData,} from "@shared/types/Game/CharacterService/CharacterService";

import {ISideCharacter} from "@shared/types/Game/Characters/SideCharacter";
import {PlayerCharacter} from "./Characters/Character/PlayerCharacter/PlayerCharacter";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {Dog} from "./Characters/Dog";
import {Friday} from "./Characters/Friday";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {TERMS} from "@shared/types/Terms/TERMS";

export class CharacterService implements ICharacterService {
    dog: ISideCharacter;
    friday: ISideCharacter;
    private readonly _allCharacters: ICharacter[];
    private _thresholdAmountForRemoval: number = 0;

    private readonly _game: IGame;

    constructor(characters: IPlayerCharacter[], game: IGame) {
        this.dog = new Dog("male", game);
        this.friday = new Friday("male", game);
        this._game = game;
        this._allCharacters = [this.dog, this.friday, ...characters];
    }

    get renderData(): ICharacterServiceRenderData {
        return {
            playerCharacters: this.playerCharacters.map(
                (player) => player.renderData
            ),
            dog: this.dog.renderData,
            friday: this.friday.renderData,
            thresholdAmountForRemoval: this._thresholdAmountForRemoval,
            areSomePawnsUnassigned: this.areSomePawnsUnassigned(),
        };
    }

    // ------------------------------------------------------------

    get allCharacters(): ICharacter[] {
        return this._allCharacters;
    }

    get playerCharacters(): IPlayerCharacter[] {
        return this._allCharacters.filter(
            (char) => char instanceof PlayerCharacter
        ) as IPlayerCharacter[];
    }

    get thresholdAmountForRemoval() {
        return this._thresholdAmountForRemoval;
    }

    // -------------------------------------------

    removeMoraleThreshold(
        character: IPlayerCharacter | string,
        threshold: number
    ) {
        const char =
            typeof character === "string"
                ? this.getPlayerCharacter(character)
                : character;
        if (!char.moraleThresholds.includes(threshold)) {
            throw new Error(
                `Character ${char.name} doesn't have morale threshold: ${threshold}`
            );
        }
        if (this._thresholdAmountForRemoval > 0) {
            char.moraleThresholdsRemoved.push(threshold);
            this._thresholdAmountForRemoval--;
        }
    }

    markThresholdsForRemoval(amount: number) {
        this._thresholdAmountForRemoval = amount;
    }

    unMarkThresholdsForRemoval(amount: number) {
        this._thresholdAmountForRemoval = amount;
    }

    resetPawns() {
        this._allCharacters.forEach((char) => {
            char.pawnService.resetFreePawns();
        });
    }

    removeFreePawn(charName: string, draggableId: string): void {
        this.getCharacter(charName).pawnService.removePawn(
            draggableId,
            "freePawns"
        );
    }

    removePawn(charName: string, draggableId: string): void {
        this.getCharacter(charName).pawnService.removePawn(draggableId, "pawns");
    }

    addFreePawn(charName: string, draggableId: string): void {
        this.getCharacter(charName).pawnService.copyPawnToFreePawns(draggableId);
    }

    addPawn(charName: string, draggableId: string): void {
    }

    getPlayerCharacter(charName: string): IPlayerCharacter {
        const char = this.getCharacter(charName);
        if (!(char instanceof PlayerCharacter)) {
            throw new Error(
                "Couldn't find PlayerCharacter with given name: " + charName
            );
        }
        return char;
    }

    getCharacter(charName: string): ICharacter {
        const character = this._allCharacters.find(
            (char) => char.name === charName
        );
        if (!character) {
            throw new Error("Couldn't find Character with name: " + charName);
        }
        return character;
    }

    hurt(character: string | ICharacter, amount: number, sourceLog: string) {
        const char =
            typeof character === "string"
                ? this.getCharacter(character)
                : character;
        char.hurt(amount);
        if (sourceLog) {

            this._game.logService.addMessage({
                code: LOG_CODE.CHARACTER_GOT_HURT,
                subject1: char.name,
                subject2: "",
                amount
            }, "negative", sourceLog)
        }
        if (char instanceof PlayerCharacter) {
            if (char.shouldMoraleDrop) {
                this._game.moraleService.lvlDown(1, char.namePL);
            }
        }
    }

    heal(character: string | ICharacter, amount: number, sourceLog: string) {
        const char = typeof character === "string" ? this.getCharacter(character) : character;
        const surplus = (char.health + amount) - char.maxHealth;
        let value = surplus > 0 ? char.maxHealth - char.health : amount;
        if (value === 0) {
            return;
        }
        char.heal(value);
        this._game.logService.addMessage({
            code: LOG_CODE.CHARACTER_GOT_HEALED,
            amount,
            subject1: char.name,
            subject2: "",
        }, "positive", sourceLog)
    }

    hurtAllPlayerCharacters(amount: number, logSource: string): void {
        this.playerCharacters.forEach((char) => {
            this.hurt(char, amount, "");
        });

        this._game.logService.addMessage({
            code: LOG_CODE.ALL_PLAYERS_GOT_HURT,
            amount,
            subject1: "",
            subject2: ""
        }, "negative", logSource)
    }

    public healAllCharacters(amount: number, logSource: string): void {
        this._allCharacters.forEach((char) => char.heal(amount));
        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE.ALL_PLAYERS_GOT_HEALED,
                amount,
                subject1: "",
                subject2: "",
            }, "positive", logSource)
        }
    }

    incrDetermination(
        charOrName: string | ICharacter,
        amount: number,
        logSource: string
    ) {
        const char =
            typeof charOrName === "string"
                ? this.getCharacter(charOrName)
                : charOrName;
        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE.CHARACTER_GOT_DETERMINATION,
                amount,
                subject1: char.name,
                subject2: ""
            }, "positive", logSource)
        }
        char.incrDetermination(amount);
    }

    decrDeterminationOrGetHurt(
        charOrName: string | ICharacter,
        amount: number,
        logSource: string
    ) {
        if (amount === 0) {
            return;
        }
        const char =
            typeof charOrName === "string"
                ? this.getCharacter(charOrName)
                : charOrName;

        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE.CHARACTER_LOST_DETERMINATION,
                subject1: char.namePL,
                subject2: "",
                amount
            }, "negative", logSource)
        }
        const diff = char.determination - amount;
        if (diff < 0) {
            this.hurt(char, Math.abs(diff), TERMS.UNFULFILLED_DEMAND);
            char.determination = 0;
        } else {
            char.decrDetermination(amount);
        }
    }

    decrDeterminationAllPlayerCharacters(amount: number, logSource: string) {

        this._game.logService.addMessage({
            code: LOG_CODE.ALL_PLAYERS_LOST_DETERMINATION,
            amount,
            subject1: "",
            subject2: ""
        }, "negative", logSource)
        this.playerCharacters.forEach((char) => {
            this.decrDeterminationOrGetHurt(char, amount, "");
        });
    }

    incrDeterminationAllCharacters(amount: number, logSource: string) {
        this._game.logService.addMessage({
            code: LOG_CODE.ALL_PLAYERS_GOT_DETERMINATION,
            amount,
            subject1: "",
            subject2: "",
        }, "positive", logSource)
        this._allCharacters.forEach((char) =>
            this.incrDetermination(char, amount, "")
        );
    }

    private areSomePawnsUnassigned(): boolean {
        return this._allCharacters.some((char) => char.pawnService.freePawns.length > 0);
    }
}
