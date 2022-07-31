import IBeast from "../../../interfaces/Beasts/Beast";
import {Resources} from "../AllResources/AllResources";
import shuffle from "../../../utils/shuffleArray";
import {IResources} from "../../../interfaces/Resources";

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
      reward: Map<keyof IResources, number>,
  ) {
    this._name = name;
    this._strength = strength;
    this._weaponLoss = weaponLoss;
    this._reward = reward;
  }
}

class Beasts {
  deck: Beast[] = [];

  constructor(game: unknown, ownedResources: IResources) {

  }
}

export default Beasts;
