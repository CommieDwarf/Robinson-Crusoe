import { Character } from "../Character";
import {
  IPlayerCharacter,
  IPlayerCharacterRenderData,
  PlayerCharacterName,
} from "../../../../../interfaces/Characters/PlayerCharacter";
import { IPlayer } from "../../../../../interfaces/PlayerService/Player";
import { PawnService } from "../../../PawnService/PawnService";
import { ICharEffects } from "../../../../../interfaces/Characters/CharEffects";
import { PlayerCharEffects } from "../../CharEffects/CharEffects";
import { IPawnService } from "../../../../../interfaces/Pawns/Pawns";
import { IGame } from "../../../../../interfaces/Game";
import { Gender } from "../../../../../interfaces/Characters/Character";
import { ITokenService } from "../../../../../interfaces/TokenService/TokenService";
import { TokenService } from "../../../TokenService/TokenService";

export class PlayerCharacter extends Character implements IPlayerCharacter {
  get tokenService(): ITokenService {
    return this._tokenService;
  }

  protected readonly _player: IPlayer;
  protected readonly _moraleThresholds: number[];
  protected _pawnService: IPawnService = new PawnService(this, 3);
  protected declare _name: PlayerCharacterName;
  private _tokenService: ITokenService;

  constructor(
    name: PlayerCharacterName,
    id: number,
    maxHealth: number,
    game: IGame,
    gender: Gender,
    moraleThresholds: number[],
    player: IPlayer
  ) {
    super(name, id, maxHealth, game);
    this._player = player;
    this._moraleThresholds = moraleThresholds;
    this._gender = gender;
    this._pawnService = new PawnService(this, 3);
    this._effects = new PlayerCharEffects(this);
    this._tokenService = new TokenService(game, this);
  }

  get renderData(): IPlayerCharacterRenderData {
    return {
      ...super.getRenderData(),
      moraleThresholds: this._moraleThresholds,
      playerId: 0,
      name: this.name,
      tokenService: this._tokenService.renderData,
    };
  }

  // ---------------------------------------------

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
