import {IResources} from "../../../interfaces/Resources/Resources";
import {IBeast, IBeastRenderData} from "../../../interfaces/Beasts/Beast";

export class Beast implements IBeast {

  private readonly _strength: number;
  private readonly _weaponLoss: number;
  private readonly _reward: Map<keyof IResources, number>;
  private readonly _name: {
    pl: string;
    en: string;
  };

  constructor(
      name: { pl: string; en: string },
      strength: number,
      weaponLoss: number,
      reward: Map<keyof IResources, number>
  ) {
    this._name = name;
    this._strength = strength;
    this._weaponLoss = weaponLoss;
    this._reward = reward;
  }

  get renderData(): IBeastRenderData {
    return {
      name: this.name,
    };
  }

  // ----------------------------------------------

  get name(): { pl: string; en: string } {
    return this._name;
  }

  get strength(): number {
    return this._strength;
  }

  get weaponLoss(): number {
    return this._weaponLoss;
  }

  get reward(): Map<keyof IResources, number> {
    return this._reward;
  }


}
