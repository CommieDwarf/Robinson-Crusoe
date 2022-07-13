import Pawn from "../interfaces/Pawn";
import tiles from "./tiles";
import structures from "./structures";

import characters from "./characters";
import inventions from "./inventions";

const actionSlots = new Map<string, null | Pawn>();

// get tiles gather

let testPawn: null = null;

const pawns = characters.cook.pawns;

tiles.forEach((tile) => {
  actionSlots.set("tile" + tile.id + "gatherleftleader", testPawn);
  actionSlots.set("tile" + tile.id + "gatherrightleader", testPawn);
  actionSlots.set("tile" + tile.id + "gatherrighthelper1", testPawn);
  actionSlots.set("tile" + tile.id + "gatherlefthelper1", testPawn);
  actionSlots.set("tile" + tile.id + "gatherrighthelper2", testPawn);
  actionSlots.set("tile" + tile.id + "gatherlefthelper2", testPawn);
  actionSlots.set("tile" + tile.id + "exploreleader", testPawn);
  actionSlots.set("tile" + tile.id + "explorehelper1", testPawn);
  actionSlots.set("tile" + tile.id + "explorehelper2", testPawn);
});

structures.forEach((structure) => {
  actionSlots.set("structure" + structure.type + "leader", null);
  actionSlots.set("structure" + structure.type + "helper1", null);
  actionSlots.set("structure" + structure.type + "helper2", null);
});

inventions.forEach((invention) => {
  actionSlots.set("invention-" + invention.name + "-leader", null);
  actionSlots.set("invention-" + invention.name + "-helper-1", null);
  actionSlots.set("invention-" + invention.name + "-helper-2", null);
});

for (let i = 1; i < 10; i++) {
  actionSlots.set("rest-leader-" + i, null);
  actionSlots.set("arrange-leader-" + i, null);
}

for (let i = 1; i <= 2; i++) {
  actionSlots.set("threat-left-" + i, null);
  actionSlots.set("threat-right-" + i, null);
}

export default actionSlots;
