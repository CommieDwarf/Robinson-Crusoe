import {
  Gender,
  ICharacter,
  ICharacterRenderData,
} from "../../../../../interfaces/Characters/Character";

import { PlayerCharacterName } from "../../../../../interfaces/Characters/PlayerCharacter";
import { SideCharacterName } from "../../../../../interfaces/Characters/SideCharacter";
import { IGame } from "../../../../../interfaces/Game";
import { ICharEffects } from "../../../../../interfaces/Characters/CharEffects";
import { IPawnService } from "../../../../../interfaces/Pawns/Pawns";

export abstract class Character implements ICharacter {
  protected _namePL: string;
  protected _name: PlayerCharacterName | SideCharacterName;
  protected _gender: Gender = "male";
  protected _determination = 0;
  protected _id: number;
  protected readonly _maxHealth;
  protected _health: number;
  protected _game: IGame;
  protected declare _effects: ICharEffects;
  protected declare _pawnService: IPawnService;

  protected constructor(
    name: PlayerCharacterName | SideCharacterName,
    namePL: string,
    id: number,
    maxHealth: number,
    game: IGame
  ) {
    this._namePL = namePL;
    this._name = name;
    this._id = id;
    this._maxHealth = maxHealth;
    this._health = this._maxHealth;
    this._game = game;
  }

  getRenderData(): ICharacterRenderData {
    return {
      determination: this._determination,
      pawnService: this._pawnService.renderData,
      gender: this._gender,
      health: this._health,
      id: this._id,
      maxHealth: this._maxHealth,
      name: this._name,
      namePL: this._namePL,
    };
  }

  get effects(): ICharEffects {
    return this._effects;
  }

  get pawnService(): IPawnService {
    return this._pawnService;
  }

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

  get namePL(): string {
    return this._namePL;
  }

  set namePL(value: string) {
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

  incrDetermination(by: number) {
    this._determination += by;
  }

  decrDetermination(by: number) {
    this._determination -= by;
  }

  hurt(by: number) {
    this._health -= by;
  }

  heal(by: number) {
    if (by + this._health > this._maxHealth) {
      this._health = this._maxHealth;
    } else {
      this._health += by;
    }
  }
}
