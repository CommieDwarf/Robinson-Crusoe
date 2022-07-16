export default interface Beast {
  name: { pl: string; en: string };
  strength: number;
  weaponLoss: number;
  reward: {
    skin: number;
    food: number;
  };
}