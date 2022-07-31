import { IResources } from "../../../interfaces/Resources";
import { IBeast } from "../../../interfaces/Beasts/Beast";

export class Beast implements IBeast {
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

  private readonly _name: {
    pl: string;
    en: string;
  };
  private readonly _strength: number;
  private readonly _weaponLoss: number;
  private readonly _reward: Map<keyof IResources, number>;

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
}