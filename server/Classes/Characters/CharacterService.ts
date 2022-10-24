import {
  ICharacterService,
  ICharacterServiceRenderData,
} from "../../../interfaces/CharacterService/CharacterService";

import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import { ISideCharacter } from "../../../interfaces/Characters/SideCharacter";
import { PlayerCharacter } from "./PlayerCharacter";
import { IGame } from "../../../interfaces/Game";
import { SideCharacter } from "./SideCharacter";
import { ICharacter } from "../../../interfaces/Characters/Character";

export class CharacterService implements ICharacterService {
  get allCharacters(): (ISideCharacter | IPlayerCharacter)[] {
    return this._allCharacters;
  }

  get playerCharacters(): IPlayerCharacter[] {
    return this._allCharacters.filter(
      (char) => char instanceof PlayerCharacter
    ) as IPlayerCharacter[];
  }

  dog: ISideCharacter;
  friday: ISideCharacter;
  private _allCharacters: (ISideCharacter | IPlayerCharacter)[];

  get renderData(): ICharacterServiceRenderData {
    return {
      playerCharacters: this.playerCharacters.map(
        (player) => player.renderData
      ),
      dog: this.dog.renderData,
      friday: this.friday.renderData,
    };
  }

  private readonly _game: IGame;

  constructor(characters: IPlayerCharacter[], game: IGame) {
    this.dog = new SideCharacter("dog", 1, Infinity, game);
    this.friday = new SideCharacter("friday", 0, 4, game);
    this._game = game;
    this._allCharacters = [this.dog, this.friday, ...characters];
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
      if (char.moraleDrop) {
        this._game.morale.lvlDown(1, char.namePL);
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

  decrDeterminationAllPlayerCharacters(by: number, logSource: string) {
    this._game.chatLog.addMessage(
      `Wszyscy gracze tracą ${by} determinację.`,
      "red",
      logSource
    );
    this.playerCharacters.forEach((char) => {
      this.decrDetermination(char, by, "");
    });
  }
}
