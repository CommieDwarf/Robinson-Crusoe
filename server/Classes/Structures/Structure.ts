import {
  IStructure,
  STRUCTURE,
} from "../../../interfaces/Structures/Structure";
import { IResources } from "../../../interfaces/Resources/Resources";
import { Resources } from "../AllResources/Resources";

export class Structure implements IStructure {
  get name(): STRUCTURE {
    return this._name;
  }

  get lvl(): number {
    return this._lvl;
  }

  get committedResources(): IResources {
    return this._committedResources;
  }

  set committedResources(resources: IResources) {
    this._committedResources = resources;
  }

  get cost(): IResources {
    return this._cost;
  }

  set cost(value: IResources) {
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
  private readonly _name: STRUCTURE;
  private _lvl = 0;
  private _committedResources: IResources = new Resources();
  private _cost: IResources;
  private _locked: boolean;

  constructor(name: STRUCTURE, cost: Resources, locked: boolean) {
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
