export const equipmentList: EqList = {
  bible: "biblia",
  biscuits: "suchary",
  emptyBottle: "pusta butelka",
  flaskOfRum: "flaszka rumu",
  hammer: "młotek",
  tobacco: "fajka i tytoń",
  pistol: "pistolet",
  stormGlass: "barometr",
};

export interface EqList {
  bible: string;
  biscuits: string;
  emptyBottle: string;
  flaskOfRum: string;
  hammer: string;
  tobacco: string;
  pistol: string;
  stormGlass: string;
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
