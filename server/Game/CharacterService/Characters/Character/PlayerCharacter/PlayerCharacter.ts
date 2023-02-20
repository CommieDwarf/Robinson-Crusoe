import { Character } from "../Character";
import {
  IPlayerCharacter,
  IPlayerCharacterRenderData,
  PlayerCharacterName,
} from "../../../../../../interfaces/Characters/PlayerCharacter";
import { IPlayer } from "../../../../../../interfaces/PlayerService/Player";
import { PawnService } from "../../../../PawnService/PawnService";
import { ICharEffects } from "../../../../../../interfaces/Characters/CharEffects";
import { PlayerCharEffects } from "../../../CharEffects/CharEffects";
import { IPawnService } from "../../../../../../interfaces/Pawns/Pawns";
import { IGame } from "../../../../../../interfaces/Game";
import { Gender } from "../../../../../../interfaces/Characters/Character";
import { ISkill } from "../../../../../../interfaces/Skill/Skill";

export abstract class PlayerCharacter
  extends Character
  implements IPlayerCharacter
{
  protected readonly _player: IPlayer;
  protected readonly _moraleThresholds: number[];
  protected _pawnService: IPawnService = new PawnService(this, 3);
  protected declare _name: PlayerCharacterName;
  protected declare _skills: ISkill[];

  protected constructor(
    name: PlayerCharacterName,
    namePL: string,
    id: number,
    maxHealth: number,
    game: IGame,
    gender: Gender,
    moraleThresholds: number[],
    player: IPlayer
  ) {
    super(name, namePL, id, maxHealth, game);
    this._player = player;
    this._moraleThresholds = moraleThresholds;
    this._gender = gender;
    this._pawnService = new PawnService(this, 3);
    this._effects = new PlayerCharEffects(this);
  }

  get renderData(): IPlayerCharacterRenderData {
    return {
      ...super.getRenderData(),
      moraleThresholds: this._moraleThresholds,
      playerId: 0,
      name: this.name,
      skills: this._skills.map((skill) => skill.renderData),
    };
  }

  // ---------------------------------------------

  get skills(): ISkill[] {
    return this._skills;
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

  get pawnService(): IPawnService {
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

  get shouldMoraleDrop(): boolean {
    return this._moraleThresholds.includes(this.health);
  }

  // ---------------------------------------------
}
