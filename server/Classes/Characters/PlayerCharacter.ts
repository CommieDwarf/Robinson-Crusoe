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

export class PlayerCharacter extends Character implements IPlayerCharacter {
  get pawns(): Pawns {
    return this._pawns;
  }

  set pawns(value: Pawns) {
    this._pawns = value;
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
  protected _pawns: Pawns;

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
  }

  private getSkills(): IDictionary<ISkill> {
    switch (this.name) {
      case "cook":
        return getCookSkills(this);
      default:
        throw new Error("getSkills is not yet implemented for: " + this.name);
    }
  }
}
