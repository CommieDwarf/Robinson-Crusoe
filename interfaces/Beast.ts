import Resources from "./Resources";

export default interface Beast {
  name: { pl: string; en: string };
  strength: number;
  weaponLoss: number;
  reward: Map<keyof Resources, number>;
}
