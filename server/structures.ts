// import IStructure from "../interfaces/Structure";
// import Resources from "../interfaces/Resources";
//
// type StructureType = "shelter" | "roof" | "palisade" | "weapon";
// const structureNames: StructureType[] = ["shelter", "roof", "palisade", "weapon"];
//
// export class Structure implements IStructure {
//   type: typeof
//   level: number;
//   committedResources: Resources;
//   cost: Resources;
//   locked: boolean;
//   requiredHelpers: number;
//
//   constructor(
//     type: StructureType,
//     level: number,
//     committedResources: Resources,
//     cost: Resources,
//     locked: boolean,
//     requiredHelpers: number
//   ) {
//     this.type = type;
//     this.level = level;
//     this.committedResources = committedResources;
//     this.cost = cost;
//     this.locked = locked;
//     this.requiredHelpers = requiredHelpers;
//   }
// }
//
//
//
// const structures = structureNames.map((name) => {
//   return new Structure(name, 0, { type: null, quantity: 0 }, 3, 2, false, 1);
// });
//
// structures[3].leatherCost = 0;
// structures[3].woodCost = 2;
//
// export default structures;
