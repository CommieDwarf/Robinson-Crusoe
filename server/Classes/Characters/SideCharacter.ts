import { Character } from "./Character";
import {
  ISideCharacter,
  SideCharacterName,
} from "../../../interfaces/Characters/SideCharacter";
import { Pawns } from "../Pawns/Pawns";
import { IDictionary } from "../../../interfaces/IDictionary";
import { ISkill } from "../../../interfaces/Characters/Skill";

export class SideCharacter extends Character implements ISideCharacter {
  get name(): SideCharacterName {
    return this._name;
  }

  set name(value: SideCharacterName) {
    this._name = value;
  }

  protected declare _name: SideCharacterName;

  constructor(name: SideCharacterName, id: number, health: number) {
    super(name, id, health);
    this._pawns = new Pawns(this, 1);
    this._skills = this.getSkills();
  }

  //TODO: implement getSkills for Friday
  private getSkills(): IDictionary<ISkill> {
    if (this.name === "dog") {
      return {};
    }

    return {};
  }
}
