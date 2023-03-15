import {
  ICharacterService,
  ICharacterServiceRenderData,
} from "../../../interfaces/CharacterService/CharacterService";

import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import { ISideCharacter } from "../../../interfaces/Characters/SideCharacter";
import { PlayerCharacter } from "./Characters/Character/PlayerCharacter/PlayerCharacter";
import { IGame } from "../../../interfaces/Game";
import { ICharacter } from "../../../interfaces/Characters/Character";
import { Dog } from "./Characters/Dog";
import { Friday } from "./Characters/Friday";

export class CharacterService implements ICharacterService {
  dog: ISideCharacter;
  friday: ISideCharacter;
  private readonly _allCharacters: (ISideCharacter | IPlayerCharacter)[];

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
    };
  }

  // ------------------------------------------------------------

  get allCharacters(): (ISideCharacter | IPlayerCharacter)[] {
    return this._allCharacters;
  }

  get playerCharacters(): IPlayerCharacter[] {
    return this._allCharacters.filter(
      (char) => char instanceof PlayerCharacter
    ) as IPlayerCharacter[];
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
    char.moraleThresholdsRemoved.push(threshold);
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

  addPawn(charName: string, draggableId: string): void {}

  getPlayerCharacter(charName: string): IPlayerCharacter {
    const char = this.getCharacter(charName);
    if (!(char instanceof PlayerCharacter)) {
      throw new Error(
        "Couldn't find PlayerCharacter with given name: " + charName
      );
    }
    return char;
  }

  getCharacter(charName: string): IPlayerCharacter | ISideCharacter {
    const character = this._allCharacters.find(
      (char) => char.name === charName
    );
    if (!character) {
      throw new Error("Couldn't find character with name: " + charName);
    }
    return character;
  }

  hurt(charOrName: string | ICharacter, by: number, sourceLog: string) {
    const char =
      typeof charOrName === "string"
        ? this.getCharacter(charOrName)
        : charOrName;
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

  heal(charOrName: string | ICharacter, by: number, sourceLog: string) {}

  hurtAllPlayerCharacters(by: number, logSource: string): void {
    this.playerCharacters.forEach((char) => {
      this.hurt(char, by, "");
    });
    this._game.chatLog.addMessage(
      "Wszyscy gracze dostają obrażenia.",
      "red",
      logSource
    );
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

  decrDetermination(
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
      "green",
      logSource
    );
    this.playerCharacters.forEach((char) => {
      this.decrDetermination(char, amount, "");
    });
  }

  incrDeterminationAllCharacters(amount: number, logSource: string) {
    this._game.chatLog.addMessage(
      `Wszystkie postaci zyskują ${amount} determinacji.`,
      "red",
      logSource
    );
    this._allCharacters.forEach((char) =>
      this.incrDetermination(char, amount, "")
    );
  }
}
