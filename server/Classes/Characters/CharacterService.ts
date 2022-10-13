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
  get playerCharacters(): IPlayerCharacter[] {
    return this.allCharacters.filter(
      (char) => char instanceof PlayerCharacter
    ) as IPlayerCharacter[];
  }

  dog: ISideCharacter = new SideCharacter("dog", 1, Infinity);
  friday: ISideCharacter = new SideCharacter("friday", 0, 4);
  allCharacters: (ISideCharacter | IPlayerCharacter)[] = [
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
    this.allCharacters.concat(characters);
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
    const character = this.allCharacters.find((char) => char.name === charName);
    if (!character) {
      throw new Error("Couldn't find character with name: " + charName);
    }
    return character;
  }

  hurtAllPlayerCharacters(by: number, logSource: string): void {
    this.playerCharacters.forEach((char) => {
      char.getHurt(by);
    });
    this._game.chatLog.addMessage(
      "Wszyscy gracze dostają obrażenia.",
      "red",
      logSource
    );
  }

  decrDeterminationAllPlayerCharacters(by: number, logSource: string) {
    this.playerCharacters.forEach((char) => {
      char.decrementDetermination(by);
    });
    this._game.chatLog.addMessage(
      "Wszyscy gracze tracą 1 determinację.",
      "red",
      logSource
    );
  }
}
