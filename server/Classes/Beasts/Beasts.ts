import IBeast from "../../../interfaces/Beast";
import IResources from "../../../interfaces/Resources";
import { Resources } from "../AllResources/AllResources";
import shuffle from "../../../utils/shuffleArray";

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

class Beasts {
  deck: Beast[] = [];
  deckCount = 0;
  allBeasts = shuffle(this.getInitialBeasts());

  getInitialBeasts() {
    const bucks = new Beast(
      { pl: "kozły", en: "bucks" },
      4,
      1,
      new Resources(2, 0, 0, 3).amount
    );
    return [bucks];
  }

  addBeastToDeck() {
    const beast = this.allBeasts.pop();
    if (!beast) {
      throw new Error("There are no more beasts");
    }
    this.deckCount++;
    this.deck.push(beast);
  }

  revealBeast() {
    const beast = this.deck.pop();

    if (!beast) {
      throw new Error("There are no more beasts in deck");
    }

    this.deckCount--;
    return beast;
  }

  getReward(name: string) {
    return this.findBeast(name).reward;
  }

  getStrength(name: string) {
    return this.findBeast(name).strength;
  }

  getWeaponLoss(name: string) {
    return this.findBeast(name).weaponLoss;
  }

  findBeast(name: string) {
    const beast = this.deck.find((beast) => beast.name.en === name);
    if (!beast) {
      throw new Error(
        "Couldn't find beast with name: " + name + " in the deck"
      );
    }

    return beast;
  }
}

export default Beasts;
