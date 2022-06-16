import { starters, normal, personal } from "./inventions/inventionList";
import shuffle from "../utils/shuffleArray";
import { TerrainType } from "../interfaces/Tile";
import IInvention from "../interfaces/Invention";

let shuffledNormal = shuffle(normal);

let fiveNormals = shuffledNormal.splice(0, 5)





class Invention implements IInvention {
  name: string;
  locked: boolean;
  requirement: (IInvention | TerrainType)[] | null;
  helpers: ({} | null)[];
  leader: {} | null;
  reward: {};
  type: "normal" | "starter" | "personal"

  constructor(
    name: string,
    locked: boolean,
    requirement: (IInvention | TerrainType)[] | null,
    helpers: ({} | null)[],
    leader: {} | null,
    reward: {},
    type: "normal" | "starter" | "personal"
  ) {
    this.name = name;
    this.locked = locked;
    this.requirement = requirement;
    this.helpers = helpers;
    this.leader = leader;
    this.reward = reward;
    this.type = type;
  }
}

const normalInventions = fiveNormals.map((name) => {
    return new Invention(name, false, null, [null], null, {}, "normal")
})


const starterInventions = starters.map((name) => {
    return new Invention(name, false, null, [null], null, {}, "starter");
})

export default starterInventions.concat(normalInventions);