import { CHAR_NAME_TRANSLATION } from "../../../interfaces/Characters/Character";

import { PlayerCharacterName } from "../../../interfaces/Characters/PlayerCharacter";
import { SideCharacterName } from "../../../interfaces/Characters/SideCharacter";
import { IGame } from "../../../interfaces/Game";

export abstract class Character {
  set determination(value: number) {
    this._determination = value;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  get determination(): number {
    return this._determination;
  }

  get id(): number {
    return this._id;
  }

  get namePL(): CHAR_NAME_TRANSLATION {
    return this._namePL;
  }

  set namePL(value: CHAR_NAME_TRANSLATION) {
    this._namePL = value;
  }

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    this._health = value;
  }

  get name(): PlayerCharacterName | SideCharacterName {
    return this._name;
  }

  get gender() {
    return this._gender;
  }

  protected _namePL: CHAR_NAME_TRANSLATION;

  protected _name: PlayerCharacterName | SideCharacterName;
  protected _gender = "";
  private _determination = 0;

  protected _id: number;
  private readonly _maxHealth;
  protected _health: number;
  protected _game: IGame;

  protected constructor(
    name: PlayerCharacterName | SideCharacterName,
    id: number,
    maxHealth: number,
    game: IGame
  ) {
    this._namePL = CHAR_NAME_TRANSLATION[name];
    this._name = name;
    this._id = id;
    this._maxHealth = maxHealth;
    this._health = this._maxHealth;
    this._game = game;
  }

  incrDetermination(by: number) {
    this._determination += by;
    // this._game.chatLog.addMessage(
    //   `${this.namePL} otrzymuje ${by} determinacji`,
    //   "green",
    //   logSource
    // );
  }

  decrDetermination(by: number) {
    // if (logSource) {
    //   this._game.chatLog.addMessage(
    //     `${this.namePL} odrzuca ${by} determinacji`,
    //     "red",
    //     logSource
    //   );
    // }

    this._determination -= by;
  }

  hurt(by: number) {
    this._health -= by;
    // if (logSource) {
    //   this._game.chatLog.addMessage(
    //     `${this.namePL} dostaje ${by} obrażeń`,
    //     "red",
    //     logSource
    //   );
    // }
  }

  heal(by: number) {
    if (by + this._health > this._maxHealth) {
      this._health = this._maxHealth;
    } else {
      this._health += by;
    }

    // if (logSource) {
    //   this._game.chatLog.addMessage(
    //     `${this.namePL} leczy ${by} obrażeń`,
    //     "green",
    //     logSource
    //   );
    // }
  }
}
