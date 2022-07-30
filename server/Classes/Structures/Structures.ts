import IStructure, { STRUCTURE_NAMES } from "../../../interfaces/Structure";
import { Resources } from "../AllResources/AllResources";

export class Structure implements IStructure {
  private readonly _name: STRUCTURE_NAMES;
  private _lvl = 0;
  private _committedResources = new Resources();
  private _cost: Resources;
  private _locked: boolean;

  get name(): STRUCTURE_NAMES {
    return this._name;
  }

  get lvl(): number {
    return this._lvl;
  }

  get committedResources(): Resources {
    return this._committedResources;
  }

  set committedResources(value: Resources) {
    this._committedResources = value;
  }

  get cost(): Resources {
    return this._cost;
  }

  set cost(value: Resources) {
    this._cost = value;
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get requiredHelpers(): number {
    return this._requiredHelpers;
  }

  set requiredHelpers(value: number) {
    this._requiredHelpers = value;
  }

  private _requiredHelpers = 1;

  constructor(name: STRUCTURE_NAMES, cost: Resources, locked: boolean) {
    this._name = name;
    this._cost = cost;
    this._locked = locked;
  }

  incrementLvl(num: number) {
    this._lvl += num;
  }

  decrementLvl(num: number) {
    this._lvl -= num;
  }
}

export default class Structures {
  structures = this.getInitialStructures();

  getInitialStructures() {
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

  incrementStructureLvl(name: STRUCTURE_NAMES, num: number) {
    this.findStructure(name).incrementLvl(num);
  }

  decrementStructureLvl(name: STRUCTURE_NAMES, num: number) {
    this.findStructure(name).decrementLvl(num);
  }

  unlockStructure(name: STRUCTURE_NAMES) {
    this.findStructure(name).locked = true;
  }

  lockStructure(name: STRUCTURE_NAMES) {
    this.findStructure(name).locked = false;
  }

  unlockAllStructures() {
    this.structures.forEach((structure) => (structure.locked = true));
  }

  commitResources(name: STRUCTURE_NAMES, resources: Resources) {
    this.findStructure(name).committedResources = resources;
  }

  unCommitResources(name: STRUCTURE_NAMES) {
    this.findStructure(name).committedResources = new Resources();
  }

  findStructure(name: STRUCTURE_NAMES) {
    const struct = this.structures.find((structure) => structure.name === name);
    if (!struct) {
      throw new Error("Cant find structure with given name: " + name);
    }
    return struct;
  }
}
