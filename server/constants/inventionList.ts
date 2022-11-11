import { Invention } from "../Classes/Inventions/Invention";
import { INVENTION_TYPE } from "../../interfaces/Inventions/Invention";
import { Resources } from "../Classes/AllResources/Resources";

// TODO: implement rewards to inventions.

const requirementNone = { invention: null, terrainType: null };

export const starters = [
  new Invention(
    "bricks",
    "cegły",
    { invention: null, terrainType: "hills" },
    {},
    INVENTION_TYPE.STARTER,
    new Resources(),
    null
  ),
  new Invention(
    "cure",
    "lek",
    { invention: null, terrainType: "plains" },
    {},
    INVENTION_TYPE.STARTER,
    new Resources(),
    null
  ),
  new Invention(
    "dam",
    "tama",
    { invention: null, terrainType: "river" },
    {},
    INVENTION_TYPE.STARTER,
    new Resources(0, 0, 1, 0),
    null
  ),
  new Invention(
    "fire",
    "ogień",
    { invention: null, terrainType: "mountains" },
    {},
    INVENTION_TYPE.STARTER,
    new Resources(),
    null
  ),
  new Invention(
    "knife",
    "nóż",
    { invention: null, terrainType: "mountains" },
    {},
    INVENTION_TYPE.STARTER,
    new Resources(),
    null
  ),
  new Invention(
    "map",
    "mapa",
    { invention: null, terrainType: "river" },
    {},
    INVENTION_TYPE.STARTER,
    new Resources(),
    null
  ),
  new Invention(
    "pot",
    "naczynia",
    { invention: null, terrainType: "hills" },
    {},
    INVENTION_TYPE.STARTER,
    new Resources(),
    null
  ),
  new Invention(
    "rope",
    "lina",
    { invention: null, terrainType: "plains" },
    {},
    INVENTION_TYPE.STARTER,
    new Resources(),
    null
  ),
  new Invention(
    "shovel",
    "łopata",
    requirementNone,
    {},
    INVENTION_TYPE.STARTER,
    new Resources(),
    null
  ),
];

export const starterList = [
  "bricks",
  "cure",
  "dam",
  "fire",
  "knife",
  "map",
  "pot",
  "rope",
  "shovel",
];

export const normal = [
  // new Invention(
  //   "basket",
  //   { invention: null, terrainType: "plains" },
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(),
  //   null
  // ),
  // new Invention(
  //   "bed",
  //   { invention: null, terrainType: "plains" },
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(),
  //   null
  // ),
  new Invention(
    "belts",
    "pasy",
    { invention: ["knife"], terrainType: null },
    {},
    INVENTION_TYPE.NORMAL,
    new Resources(0, 0, 0, 1),
    null
  ),
  new Invention(
    "bow",
    "łuk",
    { invention: ["rope", "knife"], terrainType: null },
    {},
    INVENTION_TYPE.NORMAL,
    new Resources(0, 0, 1, 0),
    null
  ),
  // new Invention(
  //   "cellar",
  //   { invention: ["shovel"], terrainType: null },
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(),
  //   null
  // ),
  // new Invention(
  //   "corral",
  //   { invention: ["rope"], terrainType: null },
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(0, 0, 1, 0),
  //   null
  // ),
  // new Invention(
  //   "diary",
  //   { invention: null, terrainType: null },
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(0, 0, 0, 1),
  //   null
  // ),
  // new Invention(
  //   "drums",
  //   {
  //     invention: null,
  //     terrainType: "hills",
  //   },
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(0, 0, 0, 1),
  //   null
  // ),
  // new Invention(
  //   "furnace",
  //   requirementNone,
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(),
  //   null
  // ),
  new Invention(
    "lantern",
    "latarnia",
    { invention: ["fire"], terrainType: "hills" },
    {},
    INVENTION_TYPE.NORMAL,
    new Resources(),
    null
  ),
  new Invention(
    "moat",
    "ogrodzenie",
    { invention: ["shovel"], terrainType: null },
    {},
    INVENTION_TYPE.NORMAL,
    new Resources(0, 0, 1, 0),
    null
  ),
  // new Invention(
  //   "pit",
  //   { invention: ["shovel"], terrainType: null },
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(0, 0, 1, 0),
  //   null
  // ),
  // new Invention(
  //   "raft",
  //   { invention: ["rope"], terrainType: null },
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(0, 0, 2, 0),
  //   null
  // ),
  // new Invention(
  //   "sack",
  //   requirementNone,
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(0, 0, 0, 1),
  //   null
  // ),
  new Invention(
    "shield",
    "tarcza",
    { invention: ["rope"], terrainType: null },
    {},
    INVENTION_TYPE.NORMAL,
    new Resources(0, 0, 1, 0),
    null
  ),
  // new Invention(
  //   "sling",
  //   requirementNone,
  //   {},
  //   INVENTION_TYPE.NORMAL,
  //   new Resources(0, 0, 1, 1),
  //   null
  // ),
  new Invention(
    "wall",
    "mur",
    requirementNone,
    {},
    INVENTION_TYPE.NORMAL,
    new Resources(),
    null
  ),
];

export const normalList = [
  "basket",
  "bed",
  "belts",
  "bow",
  "cellar",
  "corral",
  "diary",
  "drums",
  "furnace",
  "lantern",
  "moat",
  "pit",
  "raft",
  "sack",
  "shield",
  "sling",
  "wall",
];

const personalList = {
  cook: "fireplace",
  explorer: "shortcut",
  carpenter: "snare",
  soldier: "spear",
};

const cookInvention = new Invention(
  "fireplace",
  "palenisko",
  requirementNone,
  {},
  INVENTION_TYPE.PERSONAL,
  new Resources(),
  "cook"
);

const scenario = {
  castaways: [
    new Invention(
      "axe",
      "siekiera",
      { invention: null, terrainType: "mountains" },
      {},
      INVENTION_TYPE.SCENARIO,
      new Resources(0, 0, 1, 0),
      null
    ),
    new Invention(
      "mast",
      "maszt",
      { invention: ["rope"], terrainType: null },
      {},
      INVENTION_TYPE.SCENARIO,
      new Resources(0, 0, 1, 1),
      null
    ),
  ],
};

const scenarioList = {
  castaways: ["axe", "mast"],
};

export const inventionList = [
  ...starterList,
  ...normalList,
  ...scenarioList.castaways,
  personalList.cook,
];

export const inventions = {
  starters,
  normal,
  scenario,
  personal: {
    cook: cookInvention,
  },
};
