// import Pawn from "../interfaces/Pawn";
// import Tiles, { Tile } from "./Tiles";
// import { Structure } from "./structures";
// import { Invention } from "./inventions";
//
// export default class ActionSlots {
//   slots: Map<string, null | Pawn>;
//
//   constructor(
//     structures: Structure[],
//     inventions: Invention[],
//     scenarioInventions: Invention[]
//   ) {
//     this.slots = this.getBasicSlots(structures, inventions, scenarioInventions);
//   }
//
//   private getBasicSlots(
//     structures: Structure[],
//     inventions: Invention[],
//     scenarioInventions: Invention[],
//     tiles: Tiles;
//   ) {
//     const actionSlots = new Map<string, null | Pawn>();
//
//     this.updateTileSlots(tiles);
//
//     structures.forEach((structure) => {
//       actionSlots.set("structure" + structure.type + "leader", null);
//       actionSlots.set("structure" + structure.type + "helper1", null);
//       actionSlots.set("structure" + structure.type + "helper2", null);
//     });
//
//     inventions.forEach((invention) => {
//       actionSlots.set("invention-" + invention.name + "-leader", null);
//       actionSlots.set("invention-" + invention.name + "-helper-1", null);
//       actionSlots.set("invention-" + invention.name + "-helper-2", null);
//     });
//
//     scenarioInventions.forEach((invention) => {
//       actionSlots.set("invention-" + invention.name + "-leader", null);
//       actionSlots.set("invention-" + invention.name + "-helper-1", null);
//       actionSlots.set("invention-" + invention.name + "-helper-2", null);
//     });
//
//     for (let i = 1; i < 10; i++) {
//       actionSlots.set("rest-leader-" + i, null);
//       actionSlots.set("arrange-leader-" + i, null);
//     }
//
//     actionSlots.set("threat-left-helper", null);
//     actionSlots.set("threat-left-leader", null);
//     actionSlots.set("threat-right-helper", null);
//     actionSlots.set("threat-right-leader", null);
//
//     actionSlots.set("hunt-leader", null);
//     actionSlots.set("hunt-helper", null);
//
//     return actionSlots;
//   }
//
//   public setSlot(id: string, pawn: Pawn) {
//     this.slots.set(id, pawn);
//   }
//
//   public unsetSlot(id: string) {
//     this.slots.set(id, null);
//   }
//
//   public getSlot(id: string) {
//     let slot = this.slots.get(id);
//     if (slot === undefined) {
//       throw new Error("Cant find slot with id: " + id);
//     } else {
//       return slot;
//     }
//   }
//
//   public updateTileSlots(tiles: Tile[]) {
//     tiles.forEach((tile) => {
//       this.slots.set(`tile-${tile.id}-gather-left-leader`, null);
//       this.slots.set(`tile-${tile.id}-gather-right-helper-1`, null);
//       this.slots.set(`tile-${tile.id}-gather-left-helper-1`, null);
//       this.slots.set(`tile-${tile.id}-gather-right-leader`, null);
//       this.slots.set(`tile-${tile.id}-gather-right-helper-2`, null);
//       this.slots.set(`tile-${tile.id}-gather-left-helper-2`, null);
//       this.slots.set(`tile-${tile.id}-explore-leader`, null);
//       this.slots.set(`tile-${tile.id}-explore-helper-1`, null);
//       this.slots.set(`tile-${tile.id}-explore-helper-2`, null);
//     });
//   }
// }
