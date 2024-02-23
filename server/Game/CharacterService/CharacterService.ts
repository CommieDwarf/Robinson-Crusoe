import {
    ICharacterService,
    ICharacterServiceRenderData,
} from "../../../interfaces/CharacterService/CharacterService";

import {ISideCharacter} from "../../../interfaces/Characters/SideCharacter";
import {PlayerCharacter} from "./Characters/Character/PlayerCharacter/PlayerCharacter";
import {IGame} from "../../../interfaces/Game";
import {ICharacter} from "../../../interfaces/Characters/Character";
import {Dog} from "./Characters/Dog";
import {Friday} from "./Characters/Friday";
import {IPlayerCharacter} from "../../../interfaces/Characters/PlayerCharacter";
import i18n from "../../../I18n/I18n";

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

    hurt(character: string | ICharacter, by: number, sourceLog: string) {
        const char =
            typeof character === "string"
                ? this.getCharacter(character)
                : character;
        char.hurt(by);
        if (sourceLog) {
            this._game.chatLog.addMessage(
                `${char.namePL} otrzymał ${by} obrażeń`,
                "red",
                sourceLog
            );
        }
        if (char instanceof PlayerCharacter) {
            if (char.shouldMoraleDrop) {
                this._game.moraleService.lvlDown(1, char.namePL);
            }
        }
    }

    heal(character: string | ICharacter, by: number, sourceLog: string) {
        const char = typeof character === "string" ? this.getCharacter(character) : character;
        const surplus = (char.health + by) - char.maxHealth;
        let value = surplus > 0 ? char.maxHealth - char.health : by;
        if (value === 0) {
            return;
        }
        char.heal(value);
        this._game.chatLog.addMessage(`${char.namePL} został uleczony o ${value} ranę/y`, "green", sourceLog);
    }

    hurtAllPlayerCharacters(by: number, logSource: string): void {
        this.playerCharacters.forEach((char) => {
            this.hurt(char, by, "");
        });
        this._game.chatLog.addMessage(
            "Wszyscy gracze dostają obrażenia",
            "red",
            logSource
        );
    }

    public healAllCharacters(amount: number, logSource: string): void {
        this._allCharacters.forEach((char) => char.heal(amount));
        if (logSource) {
            this._game.chatLog.addMessage(
                "Wszystkie postaci są leczone o " + amount,
                "green",
                logSource,
            )
        }
    }

    incrDetermination(
        charOrName: string | ICharacter,
        by: number,
        logSource: string
    ) {
        const char =
            typeof charOrName === "string"
                ? this.getCharacter(charOrName)
                : charOrName;
        if (logSource) {
            this._game.chatLog.addMessage(
                `${char.namePL} otrzymuje ${by} żeton/y determinacji`,
                "green",
                logSource
            );
        }
        char.incrDetermination(by);
    }

    decrDeterminationOrGetHurt(
        charOrName: string | ICharacter,
        by: number,
        logSource: string
    ) {
        if (by === 0) {
            return;
        }
        const char =
            typeof charOrName === "string"
                ? this.getCharacter(charOrName)
                : charOrName;

        if (logSource) {
            this._game.chatLog.addMessage(
                `${char.namePL} odrzuca ${by} żeton/y determinacji`,
                "red",
                logSource
            );
        }
        const diff = char.determination - by;
        if (diff < 0) {
            this.hurt(char, Math.abs(diff), "brak determinacji do odrzucenia");
            char.determination = 0;
        } else {
            char.decrDetermination(by);
        }
    }

    decrDeterminationAllPlayerCharacters(amount: number, logSource: string) {
        this._game.chatLog.addMessage(
            `Wszyscy gracze tracą ${amount} determinację.`,
            "red",
            logSource
        );
        this.playerCharacters.forEach((char) => {
            this.decrDeterminationOrGetHurt(char, amount, "");
        });
    }

    incrDeterminationAllCharacters(amount: number, logSource: string) {
        this._game.chatLog.addMessage(
            `Wszystkie postaci zyskują ${amount} determinacji.`,
            "green",
            logSource
        );
        this._allCharacters.forEach((char) =>
            this.incrDetermination(char, amount, "")
        );
    }

    private areSomePawnsUnassigned(): boolean {
        return this._allCharacters.some((char) => char.pawnService.freePawns.length > 0);
    }
}
