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
import { PawnsService } from "../Pawns/Pawns";

export class SideCharacter extends Character implements ISideCharacter {
  get pawns(): IPawnsService {
    return this._pawns;
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
      freePawns: this.pawns.freePawns.map((pawn) => pawn.renderData),
      health: this.health,
      currentHealth: this.currentHealth,
    };
  }

  private _pawns: IPawnsService;
  private _skills: IDictionary<ISkill>;
  private _effects: ICharEffects;
  protected declare _name: SideCharacterName;

  constructor(name: SideCharacterName, id: number, health: number) {
    super(name, id, health);
    this._pawns = new PawnsService(this, 1);
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
