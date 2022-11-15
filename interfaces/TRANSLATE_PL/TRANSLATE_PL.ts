export enum CHARACTER_PL {
  cook = "kucharz",
  carpenter = "cieśla",
  explorer = "odkrywca",
  soldier = "żolnierz",
  friday = "piętaszek",
  dog = "pies",
}

export enum STRUCTURE_PL {
  structure = "struktura",
  shelter = "schronienie",
  roof = "dach",
  palisade = "palisada",
  weapon = "broń",
}

export enum INVENTION_PL {
  invention = "karta pomysłu",
  bricks = "cegły",
  cure = "lek",
  dam = "tama",
  fire = "ogień",
  knife = "nóż",
  map = "mapa",
  pot = "naczynia",
  rope = "lina",
  shovel = "łopata",
  belts = "pasy",
  bow = "łuk",
  lantern = "latarnia",
  moat = "ogrodzene",
  shield = "tarcza",
  wall = "mur",
  fireplace = "palenisko",
  axe = "siekiera",
  mast = "maszt",
}

export enum ACTION_PL {
  threat = "zagrożenie",
  hunt = "polowanie",
  build = "budowanie",
  gather = "zbieractwo",
  explore = "exploracja",
  arrangeCamp = "porządkowanie obozu",
  rest = "odpoczynek",
}

export enum RESOURCE_PL {
  food = "żywność",
  dryFood = "suchy prowiant",
  wood = "drewno",
  leather = "skóra",
}

export enum PHASE_PL {
  event = "faza wydarzenia",
  morale = "faza morali",
  production = "faza produkcji",
  action = "faza akcji",
  weather = "faza pogody",
  night = "faza nocy",
}

export enum ITEM_PL {
  tile = "kafelek",
  structure = "struktura",
  invention = "karta pomysłu",
  beast = "bestia",
  arrangeCamp = "porządkowanie obozu",
  rest = "odpoczynek",
  threat = "zagrożenie",
}

export const TRANSLATE_PL = {
  ...CHARACTER_PL,
  ...STRUCTURE_PL,
  ...INVENTION_PL,
  ...ACTION_PL,
  ...RESOURCE_PL,
  ...PHASE_PL,
  ...ITEM_PL,
};
export type Translatable = keyof typeof TRANSLATE_PL;
