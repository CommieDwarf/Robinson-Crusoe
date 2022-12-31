import {
  CONSTRUCTION,
  IConstruction,
  IConstructionRenderData,
} from "../../../interfaces/ConstructionService/Construction";
import { IResources } from "../../../interfaces/Resources/Resources";
import { Resources } from "../ResourceService/Resources";
import { STRUCTURE_PL } from "../../../interfaces/TRANSLATE_PL/CATEGORIES/STRUCTURE_PL";

export class Construction implements IConstruction {
  private _requiredHelpersAmount = 0;
  private readonly _name: CONSTRUCTION;
  private _lvl = 0;
  private _committedResources: IResources = new Resources();
  private _cost: IResources;
  private _locked: boolean;
  private _resourceChoice: boolean = true;

  constructor(name: CONSTRUCTION, cost: Resources, locked: boolean) {
    this._name = name;
    this._cost = cost;
    this._locked = locked;
  }

  get renderData(): IConstructionRenderData {
    return {
      committedResources: this.committedResources.renderData,
      cost: this.cost.renderData,
      locked: this.locked,
      lvl: this.lvl,
      name: this.name,
      requiredHelpersAmount: this.requiredHelpersAmount,
    };
  }

  get resourceChoice(): boolean {
    return this._resourceChoice;
  }

  set lvl(value: number) {
    this._lvl = value;
  }

  get name(): CONSTRUCTION {
    return this._name;
  }

  get namePL(): string {
    return STRUCTURE_PL[this.name];
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

  incrementLvl(num: number) {
    this._lvl += num;
  }

  decrementLvl(num: number) {
    this._lvl -= num;
  }
}
