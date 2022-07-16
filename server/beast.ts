import IBeast from "../interfaces/Beast";

export class Beast implements IBeast {
  constructor(
    name: { pl: string; en: string },
    strength: number,
    weaponLoss: number,
    reward: {
      skin: number;
      food: number;
    }
  ) {
    this.name = name;
    this.strength = strength;
    this.weaponLoss = weaponLoss;
    this.reward = reward;
  }

  name: {
    pl: string;
    en: string;
  };
  strength: number;
  weaponLoss: number;
  reward: {
    skin: number;
    food: number;
  };
}

const bucks = new Beast({ pl: "kozły", en: "bucks" }, 4, 1, {
  food: 3,
  skin: 1,
});

const beastDeck: Beast[] = [bucks];
export default beastDeck;
