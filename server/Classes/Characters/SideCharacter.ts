import { Character } from "./Character";
import {
  ISideCharacter,
  ISideCharacterRenderData,
  SideCharacterName,
} from "../../../interfaces/Characters/SideCharacter";
import { IDictionary } from "../../../interfaces/IDictionary";
import { ISkill } from "../../../interfaces/Characters/Skill";
import { ICharEffects } from "../../../interfaces/Characters/CharEffects";
import { SideCharEffects } from "./CharEffects";
import { IPawnsService } from "../../../interfaces/Pawns/Pawns";
import { PawnsService } from "../PawnService/PawnService";
import { IGame } from "../../../interfaces/Game";

export class SideCharacter extends Character implements ISideCharacter {
  get pawnService(): IPawnsService {
    return this._pawnService;
  }

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

  get name(): SideCharacterName {
    return this._name;
  }

  set name(value: SideCharacterName) {
    this._name = value;
  }

  get renderData(): ISideCharacterRenderData {
    return {
      name: this.name,
      namePL: this.namePL,
      gender: this.gender,
      skills: this.skills,
      id: this.id,
      freePawns: this.pawnService.freePawns.map((pawn) => pawn.renderData),
      health: this.health,
      maxHealth: this.maxHealth,
      determination: this.determination,
    };
  }

  private _pawnService: IPawnsService;
  private _skills: IDictionary<ISkill>;
  private _effects: ICharEffects;
  protected declare _name: SideCharacterName;

  constructor(
    name: SideCharacterName,
    id: number,
    maxHealth: number,
    game: IGame
  ) {
    super(name, id, maxHealth, game);
    this._pawnService = new PawnsService(this, 1);
    this._skills = this.getSkills();
    this._effects = new SideCharEffects(this);
  }

  //TODO: implement getSkills for Friday
  private getSkills(): IDictionary<ISkill> {
    if (this.name === "dog") {
      return {};
    }

    return {};
  }
}
