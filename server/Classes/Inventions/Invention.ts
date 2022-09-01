import {
  IInvention, IInventionRenderData,
  INVENTION_TYPE,
} from "../../../interfaces/Inventions/Invention";
import {TerrainType} from "../../../interfaces/Tiles/Tile";
import {ICharacter} from "../../../interfaces/Characters/Character";
import {IResources, IResourcesAmount} from "../../../interfaces/Resources/Resources";
import {Resources} from "../AllResources/Resources";

export class Invention implements IInvention {
  get cost(): IResources {
    return this._cost;
  }

  set cost(value: IResources) {
    this._cost = value;
  }

  get isBuilt(): boolean {
    return this._built;
  }

  set isBuilt(value: boolean) {
    this._built = value;
  }

  get name(): string {
    return this._name;
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

  get reward(): {} {
    return this._reward;
  }

  get type(): INVENTION_TYPE {
    return this._type;
  }

  get committedResources(): IResources {
    return this._committedResources;
  }

  set committedResources(resources: IResources) {
    this._committedResources = resources;
  }

  get requirement() {
    return this._requirement;
  }

  get renderData(): IInventionRenderData {
    return {
      name: this.name,
      locked: this.locked,
      requiredHelpersAmount: this.requiredHelpersAmount,
      type: this.type,
      committedResources: this._committedResources.renderData,
      isBuilt: this.isBuilt

    }
  }

  private readonly _name: string;
  private _locked = true;
  private readonly _requirement: {
    invention: IInvention | null;
    terrainType: TerrainType | null;
  };

  //temporary fixed value
  private _requiredHelpersAmount = 0;
  private readonly _reward: {};
  private readonly _type: INVENTION_TYPE;
  private _committedResources: IResources = new Resources();
  private _built = false;
  private _cost: IResources;
  private readonly _character: ICharacter | null;

  constructor(
      name: string,
      requirement: {
        invention: IInvention | null;
        terrainType: TerrainType | null;
      },
      reward: {},
      type: INVENTION_TYPE,
      cost: IResources,
      character: ICharacter | null
  ) {
    this._name = name;
    this._requirement = requirement;
    this._reward = reward;
    this._type = type;
    this._cost = cost;
    this._character = character;
  }
}
