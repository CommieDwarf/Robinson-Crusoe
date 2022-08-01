import { CHAR_NAME_TRANSLATION } from "../../../interfaces/Characters/Character";
import { ICharEffects } from "../../../interfaces/Characters/CharEffects";
import { IDictionary } from "../../../interfaces/IDictionary";
import { ISkill } from "../../../interfaces/Characters/Skill";
import { PlayerCharacterName } from "../../../interfaces/Characters/PlayerCharacter";
import { SideCharacterName } from "../../../interfaces/Characters/SideCharacter";
import { Pawns } from "../Pawns/Pawns";
import { IPawns } from "../../../interfaces/Pawns/Pawns";

export abstract class Character {
  get id(): number {
    return this._id;
  }

  get effects(): ICharEffects {
    return this._effects;
  }

  get health() {
    return this._health;
  }

  get pawns(): IPawns {
    return this._pawns;
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

  get skills(): IDictionary<ISkill> {
    return this._skills;
  }

  set skills(value: IDictionary<ISkill>) {
    this._skills = value;
  }

  get name(): PlayerCharacterName | SideCharacterName {
    return this._name;
  }

  protected _namePL: CHAR_NAME_TRANSLATION;
  protected _currentHealth = 0;
  protected _name: PlayerCharacterName | SideCharacterName;
  protected _pawns: IPawns = new Pawns(this, 2);
  protected declare _skills: IDictionary<ISkill>;
  protected _id: number;
  protected declare _effects: ICharEffects;
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
