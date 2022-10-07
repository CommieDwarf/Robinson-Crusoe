import {
  IStructure,
  IStructureRenderData,
  STRUCTURE,
} from "../../../interfaces/Structures/Structure";
import { IResources } from "../../../interfaces/Resources/Resources";
import { Resources } from "../AllResources/Resources";

export class Structure implements IStructure {
  set lvl(value: number) {
    this._lvl = value;
  }

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

  get requiredHelpersAmount(): number {
    return this._requiredHelpersAmount;
  }

  set requiredHelpersAmount(value: number) {
    this._requiredHelpersAmount = value;
  }

  get renderData(): IStructureRenderData {
    return {
      committedResources: this.committedResources.renderData,
      cost: this.cost.renderData,
      locked: this.locked,
      lvl: this.lvl,
      name: this.name,
      requiredHelpersAmount: this.requiredHelpersAmount,
    };
  }

  private _requiredHelpersAmount = 0;
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
