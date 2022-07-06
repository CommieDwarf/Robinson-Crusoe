import { normal, personal, starters } from "../server/inventions/inventionList";
import { TerrainType } from "./Tile";

export default interface IInvention {
    name: typeof starters[number] | typeof normal[number] | typeof personal[number],
    locked: boolean,
    requirement: (TerrainType | IInvention)[] | null,
    requiedHelpers: number, 
    reward: {},
    type: "starter" | "normal" | "personal",
    commitedResources: {
        type: "wood" | "leather" | null,
        quantity: number
    }
}
