import { Character } from "./Character";
import {
  IPlayerCharacter,
  PlayerCharacterName,
} from "../../../interfaces/Characters/PlayerCharacter";
import { IPlayer } from "../../../interfaces/Player";
import { Pawns } from "../Pawns/Pawns";
import { IDictionary } from "../../../interfaces/IDictionary";
import { getCookSkills } from "../../constants/getCookSkills";
import { ISkill } from "../../../interfaces/Characters/Skill";
import { ICharEffects } from "../../../interfaces/Characters/CharEffects";
import { PlayerCharEffects } from "./CharEffects";
import { IPawns } from "../../../interfaces/Pawns/Pawns";

export class PlayerCharacter extends Character implements IPlayerCharacter {
  get skills(): IDictionary<ISkill> {
    return this._skills;
  }

  set skills(value: IDictionary<ISkill>) {
    this._skills = value;
  }

  get effects(): ICharEffects {
    return this._effects;
  }

  set effects(value: ICharEffects) {
    this._effects = value;
  }

  get name(): PlayerCharacterName {
    return this._name;
  }

  set name(value: PlayerCharacterName) {
    this._name = value;
  }

  get pawns(): IPawns {
    return this._pawns;
  }

  set pawns(pawns: IPawns) {
    this._pawns = pawns;
  }

  get player(): IPlayer {
    return this._player;
  }

  get moraleThresholds(): number[] {
    return this._moraleThresholds;
  }

  get gender(): "male" | "female" {
    return this._gender;
  }

  protected readonly _player: IPlayer;
  protected readonly _moraleThresholds: number[];
  protected readonly _gender: "male" | "female";
  protected _pawns: IPawns = new Pawns(this, 2);
  protected declare _name: PlayerCharacterName;
  private _skills: IDictionary<ISkill>;
  private _effects: ICharEffects;

  constructor(
    name: PlayerCharacterName,
    id: number,
    health: number,
    gender: "male" | "female",
    moraleThresholds: number[],
    player: IPlayer
  ) {
    super(name, id, health);
    this._player = player;
    this._moraleThresholds = moraleThresholds;
    this._gender = gender;
    this._pawns = new Pawns(this, 2);
    this._skills = this.getSkills();
    this._effects = new PlayerCharEffects(this);
  }

  private getSkills(): IDictionary<ISkill> {
    switch (this._name) {
      case "cook":
        return getCookSkills(this);
      default:
        throw new Error("getSkills is not yet implemented for: " + this._name);
    }
  }
}
