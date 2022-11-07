import { Resources } from "../AllResources/Resources";
import { STRUCTURE } from "../../../interfaces/Structures/Structure";
import { Structure } from "./Structure";
import {
  IStructuresService,
  IStructuresServiceRenderData,
  StructureName,
} from "../../../interfaces/Structures/Structures";
import { IResources } from "../../../interfaces/Resources/Resources";

export class StructuresService implements IStructuresService {
  structures = this.getInitialStructures();

  get renderData(): IStructuresServiceRenderData {
    return {
      structures: this.structures.map((structure) => structure.renderData),
    };
  }

  private getInitialStructures() {
    return Object.entries(STRUCTURE).map(([key, value]) => {
      const cost = new Resources();
      if (value === "weapon") {
        cost.setResource("wood", 1);
      } else {
        cost.setResource("wood", 3);
        cost.setResource("leather", 2);
      }
      return new Structure(value, cost, value !== "shelter");
    });
  }

  lvlUpStruct(name: StructureName, by: number) {
    this.getStruct(name).incrementLvl(by);
  }

  lvlDownStruct(name: StructureName, by: number) {
    this.getStruct(name).decrementLvl(by);
  }

  setLvl(name: StructureName, lvl: number) {
    this.getStruct(name).lvl = lvl;
  }

  unlockStruct(name: StructureName) {
    this.getStruct(name).locked = false;
  }

  lockStruct(name: StructureName) {
    this.getStruct(name).locked = true;
  }

  unlockAllStructs() {
    this.structures.forEach((structure) => (structure.locked = false));
  }

  commitResources(name: StructureName, resources: IResources) {
    this.getStruct(name).committedResources = resources;
  }

  rollBackCommittedResources(name: StructureName) {
    this.getStruct(name).committedResources = new Resources();
  }

  getStruct(name: StructureName) {
    const struct = this.structures.find((structure) => structure.name === name);
    if (!struct) {
      throw new Error("Cant find structure with given name: " + name);
    }
    return struct;
  }
}
