import { starters, normal, personal } from "./inventions/inventionList";
import shuffle from "../utils/shuffleArray";
import { TerrainType } from "../interfaces/Tile";
import IInvention from "../interfaces/Invention";
import { Character } from "./characters";

let shuffledNormal = shuffle(normal);

let fiveNormals = shuffledNormal.splice(0, 5)





export class Invention implements IInvention {
  name: string;
  locked: boolean;
  requirement: (IInvention | TerrainType)[] | null;
  requiedHelpers: number;
  reward: {};
  type: "normal" | "starter" | "personal";
  commitedResources: {
    type: "leather" | "wood" | null,
    quantity: number,
  }

  constructor(
    name: string,
    locked: boolean,
    requirement: (IInvention | TerrainType)[] | null,
    requiedHelpers: number,
    reward: {},
    type: "normal" | "starter" | "personal",
    commitedResources: {
      type: "leather" | "wood" | null,
      quantity: number,
    }
  ) {
    this.name = name;
    this.locked = locked;
    this.requirement = requirement;
    this.requiedHelpers = requiedHelpers;
    this.reward = reward;
    this.type = type;
    this.commitedResources = commitedResources;
  }
}

const normalInventions = normal.map((name) => {
    return new Invention(name, false, null, 1, {}, "normal", {type: null, quantity: 0})
})
const personalInventions = personal.map((name) => {
    return new Invention(name, false, null, 1, {}, "personal",  {type: null, quantity: 0})
})


const starterInventions = starters.map((name) => {
    return new Invention(name, false, null, 2, {}, "starter",  {type: "wood", quantity: 3});
})


export default starterInventions.concat(normalInventions, personalInventions);