import { Resources } from "../AllResources/Resources";
import { STRUCTURE } from "../../../interfaces/Structures/Structure";
import { Structure } from "./Structure";
import { IStructuresService } from "../../../interfaces/Structures/Structures";
import { IResources } from "../../../interfaces/Resources/Resources";

export class StructuresService implements IStructuresService {
  structures = this.getInitialStructures();

  private getInitialStructures() {
    return Object.entries(STRUCTURE).map(([key, value]) => {
      const cost = new Resources();
      if (value === STRUCTURE.WEAPON) {
        cost.setResource("wood", 1);
      } else {
        cost.setResource("wood", 3);
        cost.setResource("leather", 2);
      }
      return new Structure(value, cost, value !== STRUCTURE.SHELTER);
    });
  }

  lvlUpStruct(name: STRUCTURE, by: number) {
    this.getStruct(name).incrementLvl(by);
  }

  lvlDownStruct(name: STRUCTURE, by: number) {
    this.getStruct(name).decrementLvl(by);
  }

  unlockStruct(name: STRUCTURE) {
    this.getStruct(name).locked = true;
  }

  lockStruct(name: STRUCTURE) {
    this.getStruct(name).locked = false;
  }

  unlockAllStructs() {
    this.structures.forEach((structure) => (structure.locked = true));
  }

  commitResources(name: STRUCTURE, resources: IResources) {
    this.getStruct(name).committedResources = resources;
  }

  rollBackCommittedResources(name: STRUCTURE) {
    this.getStruct(name).committedResources = new Resources();
  }

  getStruct(name: STRUCTURE) {
    const struct = this.structures.find((structure) => structure.name === name);
    if (!struct) {
      throw new Error("Cant find structure with given name: " + name);
    }
    return struct;
  }
}
