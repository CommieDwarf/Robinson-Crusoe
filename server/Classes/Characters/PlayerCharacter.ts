import { Character } from "./Character";
import {
  IPlayerCharacter,
  IPlayerCharacterRenderData,
  PlayerCharacterName,
} from "../../../interfaces/Characters/PlayerCharacter";
import { IPlayer } from "../../../interfaces/PlayerService/Player";
import { PawnsService } from "../PawnService/PawnService";
import { IDictionary } from "../../../interfaces/IDictionary";
import { getCookSkills } from "../../constants/getCookSkills";
import { ISkill } from "../../../interfaces/Characters/Skill";
import { ICharEffects } from "../../../interfaces/Characters/CharEffects";
import { PlayerCharEffects } from "./CharEffects";
import { IPawnsService } from "../../../interfaces/Pawns/Pawns";
import { IGame } from "../../../interfaces/Game";

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

  get pawnService(): IPawnsService {
    return this._pawnService;
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

  get moraleDrop(): boolean {
    return this._moraleThresholds.includes(this.health);
  }

  get renderData(): IPlayerCharacterRenderData {
    return {
      name: this.name,
      namePL: this.namePL,
      playerId: this.id,
      gender: this.gender,
      moraleThresholds: this.moraleThresholds,
      skills: this.skills,
      id: this.id,
      freePawns: this.pawnService.freePawns.map((pawn) => pawn.renderData),
      health: this.health,
      maxHealth: this.maxHealth,
      determination: this.determination,
    };
  }

  protected readonly _player: IPlayer;
  protected readonly _moraleThresholds: number[];
  protected readonly _gender: "male" | "female";
  protected _pawnService: IPawnsService = new PawnsService(this, 3);
  protected declare _name: PlayerCharacterName;
  private _skills: IDictionary<ISkill>;
  private _effects: ICharEffects;

  constructor(
    name: PlayerCharacterName,
    id: number,
    maxHealth: number,
    game: IGame,
    gender: "male" | "female",
    moraleThresholds: number[],
    player: IPlayer
  ) {
    super(name, id, maxHealth, game);
    this._player = player;
    this._moraleThresholds = moraleThresholds;
    this._gender = gender;
    this._pawnService = new PawnsService(this, 3);
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
