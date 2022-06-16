export default interface IStructure {
    type: structureType,
    level: number,
    commitedResources: {
        type: null | "wood" | "leather"
        quantity: number,
    },
    woodCost: number,
    leatherCost: number,
    locked: boolean,
    builder: null | {},
    helper: null | {},
}

export type structureType = "shelter" | "roof" | "palisade" | "weapon";