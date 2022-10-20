import {
  ICharacterService,
  ICharacterServiceRenderData,
} from "../../../interfaces/CharacterService/CharacterService";

import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import { ISideCharacter } from "../../../interfaces/Characters/SideCharacter";
import { PlayerCharacter } from "./PlayerCharacter";
import { IGame } from "../../../interfaces/Game";
import { SideCharacter } from "./SideCharacter";

export class CharacterService implements ICharacterService {
  get allCharacters(): (ISideCharacter | IPlayerCharacter)[] {
    return this._allCharacters;
  }

  get playerCharacters(): IPlayerCharacter[] {
    return this._allCharacters.filter(
      (char) => char instanceof PlayerCharacter
    ) as IPlayerCharacter[];
  }

  dog: ISideCharacter = new SideCharacter("dog", 1, Infinity);
  friday: ISideCharacter = new SideCharacter("friday", 0, 4);
  private _allCharacters: (ISideCharacter | IPlayerCharacter)[] = [
    this.dog,
    this.friday,
  ];

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
    this._allCharacters = this._allCharacters.concat(characters);
    console.log(this._allCharacters);
    this._game = game;
  }

  removeFreePawn(charName: string, draggableId: string): void {
    this.getCharacter(charName).pawns.removePawn(draggableId, "freePawns");
  }

  removePawn(charName: string, draggableId: string): void {
    this.getCharacter(charName).pawns.removePawn(draggableId, "pawns");
  }

  addFreePawn(charName: string, draggableId: string): void {
    this.getCharacter(charName).pawns.copyPawnToFreePawns(draggableId);
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

  hurt(charName: string, by: number, sourceLog: string) {
    const char = this.getCharacter(charName);
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

  heal(charName: string, by: number, sourceLog: string) {}

  hurtAllPlayerCharacters(by: number, logSource: string): void {
    this.playerCharacters.forEach((char) => {
      this.hurt(char.name, by, "");
    });
    this._game.chatLog.addMessage(
      "Wszyscy gracze dostają obrażenia.",
      "red",
      logSource
    );
  }

  decrDetermination(charName: string, by: number, logSource: string) {
    const char = this.getCharacter(charName);
    if (logSource) {
      this._game.chatLog.addMessage(
        `${char.namePL} odrzuca ${by} żeton/y determinacji`,
        "red",
        logSource
      );
    }
    if (char.determination < by) {
      this.hurt(
        charName,
        char.determination - by,
        "brak determinacji do odrzucenia"
      );
      char.determination = 0;
    } else {
      char.decrementDetermination(by);
    }
  }

  decrDeterminationAllPlayerCharacters(by: number, logSource: string) {
    this._game.chatLog.addMessage(
      "Wszyscy gracze tracą 1 determinację.",
      "red",
      logSource
    );
    this.playerCharacters.forEach((char) => {
      this.decrDetermination(char.name, by, "");
    });
  }
}
