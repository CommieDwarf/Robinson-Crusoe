import {
  IInvention,
  IInventionRenderData,
  INVENTION_TYPE,
} from "../../../interfaces/Inventions/Invention";
import { TerrainType } from "../../../interfaces/Tiles/Tile";
import { CharacterName } from "../../../interfaces/Characters/Character";
import { IResources } from "../../../interfaces/Resources/Resources";
import { Resources } from "../ResourceService/Resources";
import { INVENTION_PL } from "../../../interfaces/TRANSLATE_PL/CATEGORIES/INVENTION_PL";

export class Invention implements IInvention {
  private readonly _name: keyof typeof INVENTION_PL;
  private _locked = true;
  private readonly _requirement: {
    invention: string[] | null;
    terrainType: TerrainType | null;
  };

  //temporary fixed value
  private _requiredHelpersAmount = 0;
  private readonly _reward: {};
  private readonly _type: INVENTION_TYPE;
  private _committedResources: IResources = new Resources();
  private _built = false;
  private _cost: IResources;
  private readonly _character: CharacterName | null;
  private readonly _namePL: INVENTION_PL;

  constructor(
    name: keyof typeof INVENTION_PL,
    requirement: {
      invention: string[] | null;
      terrainType: TerrainType | null;
    },
    reward: {},
    type: INVENTION_TYPE,
    cost: IResources,
    character: CharacterName | null
  ) {
    this._name = name;
    this._namePL = INVENTION_PL[name];
    this._requirement = requirement;
    this._reward = reward;
    this._type = type;
    this._cost = cost;
    this._character = character;
  }

  get renderData(): IInventionRenderData {
    return {
      name: this.name,
      locked: this.locked,
      requiredHelpersAmount: this.requiredHelpersAmount,
      type: this.type,
      committedResources: this._committedResources.renderData,
      isBuilt: this.isBuilt,
    };
  }

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

  get name(): keyof typeof INVENTION_PL {
    return this._name;
  }

  get namePL(): INVENTION_PL {
    return this._namePL;
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
}
