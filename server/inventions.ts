import { starters, normal, personal } from "./inventions/inventionList";
import shuffle from "../utils/shuffleArray";
import { TerrainType } from "../interfaces/Tile";
import IInvention from "../interfaces/Invention";
import { Character } from "./characters";

let shuffledNormal = shuffle(normal);

let fiveNormals = shuffledNormal.splice(0, 5);

export class Invention implements IInvention {
  name: string;
  locked: boolean;
  requirement: (IInvention | TerrainType)[] | null;
  requiredHelpers: number;
  reward: {};
  type: "normal" | "starter" | "personal" | "scenario";
  committedResources: {
    type: "leather" | "wood" | null;
    quantity: number;
  };

  constructor(
    name: string,
    locked: boolean,
    requirement: (IInvention | TerrainType)[] | null,
    requiredHelpers: number,
    reward: {},
    type: "normal" | "starter" | "personal" | "scenario",
    committedResources: {
      type: "leather" | "wood" | null;
      quantity: number;
    }
  ) {
    this.name = name;
    this.locked = locked;
    this.requirement = requirement;
    this.requiredHelpers = requiredHelpers;
    this.reward = reward;
    this.type = type;
    this.committedResources = committedResources;
  }
}

const normalInventions = normal.map((name) => {
  return new Invention(name, false, null, 1, {}, "normal", {
    type: null,
    quantity: 0,
  });
});
const personalInventions = personal.map((name) => {
  return new Invention(name, false, null, 1, {}, "personal", {
    type: null,
    quantity: 0,
  });
});

const starterInventions = starters.map((name) => {
  return new Invention(name, false, null, 2, {}, "starter", {
    type: "wood",
    quantity: 3,
  });
});

import { castaways } from "./inventions/inventionList";

export const castawaysInventions = castaways.map((name) => {
  return new Invention(name, false, null, 2, {}, "scenario", {
    type: null,
    quantity: 0,
  });
});

export default starterInventions.concat(normalInventions, personalInventions);
