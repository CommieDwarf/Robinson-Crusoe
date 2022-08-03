import { Resources } from "../AllResources/Resources";
import { STRUCTURE_NAMES } from "../../../interfaces/Structures/Structure";
import { Structure } from "./Structure";
import { IStructures } from "../../../interfaces/Structures/Structures";
import { IResources } from "../../../interfaces/Resources/Resources";

export default class Structures implements IStructures {
  structures = this.getInitialStructures();

  private getInitialStructures() {
    return Object.entries(STRUCTURE_NAMES).map(([key, value]) => {
      const cost = new Resources();
      if (value === STRUCTURE_NAMES.WEAPON) {
        cost.setResource("wood", 1);
      } else {
        cost.setResource("wood", 3);
        cost.setResource("leather", 2);
      }
      return new Structure(value, cost, value !== STRUCTURE_NAMES.SHELTER);
    });
  }

  lvlUpStruct(name: STRUCTURE_NAMES, by: number) {
    this.getStruct(name).incrementLvl(by);
  }

  lvlDownStruct(name: STRUCTURE_NAMES, by: number) {
    this.getStruct(name).decrementLvl(by);
  }

  unlockStruct(name: STRUCTURE_NAMES) {
    this.getStruct(name).locked = true;
  }

  lockStruct(name: STRUCTURE_NAMES) {
    this.getStruct(name).locked = false;
  }

  unlockAllStructs() {
    this.structures.forEach((structure) => (structure.locked = true));
  }

  commitResources(name: STRUCTURE_NAMES, resources: IResources) {
    this.getStruct(name).committedResources = resources;
  }

  rollBackCommittedResources(name: STRUCTURE_NAMES) {
    this.getStruct(name).committedResources = new Resources();
  }

  getStruct(name: STRUCTURE_NAMES) {
    const struct = this.structures.find((structure) => structure.name === name);
    if (!struct) {
      throw new Error("Cant find structure with given name: " + name);
    }
    return struct;
  }
}
