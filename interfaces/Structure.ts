import Pawn from "./Pawn";

export default interface IStructure {
    type: StructureType,
    level: number,
    commitedResources: {
        type: null | "wood" | "leather"
        quantity: number,
    },
    woodCost: number,
    leatherCost: number,
    locked: boolean,
    requiedHelpers: number,
}

export type StructureType = "shelter" | "roof" | "palisade" | "weapon";