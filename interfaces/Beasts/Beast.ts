export interface IBeastRenderData {
  name: string;
}

export interface IBeast {
  name: string;
  strength: number;
  weaponLoss: number;
  requiredHelperAmount: number;

  renderData: IBeastRenderData;
  applySpecialEffect: () => void;
}

export enum BEAST {
  ALLIGATOR = "alligator",
  BEAR = "bear",
  BIRDS = "birds",
  BOA = "boa",
  CHAMOIS = "chamois",
  CHEETAH = "cheetah",
  FOX = "fox",
  GOATS = "goats",
  GORILLA = "gorilla",
  IGUANA = "iguana",
  JAGUAR = "jaguar",
  PUMA = "puma",
  TAPIR = "tapir",
  TIGER = "tiger",
  WILD_DOG = "wild dog",
  WILD_PIG = "wild pig",
}
