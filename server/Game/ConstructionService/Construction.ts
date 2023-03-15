import {
  CONSTRUCTION,
  IConstruction,
  IConstructionRenderData,
} from "../../../interfaces/ConstructionService/Construction";
import { IBasicResources } from "../../../interfaces/Resources/Resources";
import { BasicResources } from "../ResourceService/BasicResources";

export class Construction implements IConstruction {
  private _requiredHelperAmount = 0;
  private readonly _name: CONSTRUCTION;
  private readonly _namePL: string;
  private _lvl = 0;
  private _committedResources: IBasicResources = new BasicResources();
  private _cost: IBasicResources;
  private _locked: boolean;
  private _resourceChoice: boolean = true;

  constructor(
    name: CONSTRUCTION,
    namePL: string,
    cost: BasicResources,
    locked: boolean
  ) {
    this._name = name;
    this._namePL = namePL;
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
      requiredHelperAmount: this.requiredHelperAmount,
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
    return this._namePL;
  }

  get lvl(): number {
    return this._lvl;
  }

  get committedResources(): IBasicResources {
    return this._committedResources;
  }

  set committedResources(resources: IBasicResources) {
    this._committedResources = resources;
  }

  get cost(): IBasicResources {
    return this._cost;
  }

  set cost(value: IBasicResources) {
    this._cost = value;
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get requiredHelperAmount(): number {
    return this._requiredHelperAmount;
  }

  set requiredHelperAmount(value: number) {
    this._requiredHelperAmount = value;
  }

  incrementLvl(num: number) {
    this._lvl += num;
  }

  decrementLvl(num: number) {
    this._lvl -= num;
  }
}
