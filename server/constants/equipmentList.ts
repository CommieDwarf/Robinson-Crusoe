const eqList: EqList = {
  bible: "biblia",
  biscuits: "suchary",
  emptyBottle: "pusta butelka",
  flaskOfRum: "flaszka rumu",
  "hammer&Nails": "młotek",
  "pipe&Tobacco": "fajka i tytoń",
  pistol: "pistolet",
  stormGlass: "barometr",
};

export interface EqList {
  bible: string;
  biscuits: string;
  emptyBottle: string;
  flaskOfRum: string;
  "hammer&Nails": string;
  "pipe&Tobacco": string;
  pistol: string;
  stormGlass: string;
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export default new Map(Object.entries(eqList) as Entries<EqList>);
