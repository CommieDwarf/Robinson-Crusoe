import { CHAR_NAME_TRANSLATION } from "../../../interfaces/Characters/Character";

import { PlayerCharacterName } from "../../../interfaces/Characters/PlayerCharacter";
import { SideCharacterName } from "../../../interfaces/Characters/SideCharacter";

export abstract class Character {
  get id(): number {
    return this._id;
  }

  get health() {
    return this._health;
  }

  get namePL(): CHAR_NAME_TRANSLATION {
    return this._namePL;
  }

  set namePL(value: CHAR_NAME_TRANSLATION) {
    this._namePL = value;
  }

  get currentHealth(): number {
    return this._currentHealth;
  }

  set currentHealth(value: number) {
    this._currentHealth = value;
  }

  get name(): PlayerCharacterName | SideCharacterName {
    return this._name;
  }

  get gender() {
    return this._gender;
  }

  protected _namePL: CHAR_NAME_TRANSLATION;
  protected _currentHealth = 0;
  protected _name: PlayerCharacterName | SideCharacterName;
  protected _gender = "";

  protected _id: number;
  protected _health;

  protected constructor(
    name: PlayerCharacterName | SideCharacterName,
    id: number,
    health: number
  ) {
    this._namePL = CHAR_NAME_TRANSLATION[name];
    this._currentHealth = health;
    this._name = name;
    this._id = id;
    this._health = health;
  }
}
