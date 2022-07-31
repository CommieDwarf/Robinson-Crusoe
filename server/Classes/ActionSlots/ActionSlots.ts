import Pawn from "../../../interfaces/Pawns/Pawn";
import Tiles from "../Tiles/Tiles";
import Structures from "../Structures/Structures";
import Inventions from "../Inventions/Inventions";

export default class ActionSlots {
  set slots(value: Map<string, Pawn | null>) {
    this._slots = value;
  }

  get slots(): Map<string, Pawn | null> {
    return this._slots;
  }

  private _slots: Map<string, null | Pawn>;
  private _structures: Structures;
  private _inventions: Inventions;
  private _tiles: Tiles;

  constructor(structures: Structures, inventions: Inventions, tiles: Tiles) {
    this._structures = structures;
    this._inventions = inventions;
    this._tiles = tiles;
    this._slots = this.getInitialSlots();
  }

  private getInitialSlots() {
    const actionSlots = new Map<string, null | Pawn>();

    this._structures.structures.forEach((structure) => {
      actionSlots.set("structure" + structure.name + "leader", null);
      actionSlots.set("structure" + structure.name + "helper1", null);
      actionSlots.set("structure" + structure.name + "helper2", null);
    });

    this._inventions.inventions.forEach((invention) => {
      actionSlots.set("invention-" + invention.name + "-leader", null);
      actionSlots.set("invention-" + invention.name + "-helper-1", null);
      actionSlots.set("invention-" + invention.name + "-helper-2", null);
    });

    this._tiles.tiles.forEach((tile) => {
      actionSlots.set(`tile-${tile.id}-gather-left-leader`, null);
      actionSlots.set(`tile-${tile.id}-gather-right-helper-1`, null);
      actionSlots.set(`tile-${tile.id}-gather-left-helper-1`, null);
      actionSlots.set(`tile-${tile.id}-gather-right-leader`, null);
      actionSlots.set(`tile-${tile.id}-gather-right-helper-2`, null);
      actionSlots.set(`tile-${tile.id}-gather-left-helper-2`, null);
      actionSlots.set(`tile-${tile.id}-explore-leader`, null);
      actionSlots.set(`tile-${tile.id}-explore-helper-1`, null);
      actionSlots.set(`tile-${tile.id}-explore-helper-2`, null);
    });

    for (let i = 1; i < 10; i++) {
      actionSlots.set("rest-leader-" + i, null);
      actionSlots.set("arrange-leader-" + i, null);
    }

    actionSlots.set("threat-left-helper", null);
    actionSlots.set("threat-left-leader", null);
    actionSlots.set("threat-right-helper", null);
    actionSlots.set("threat-right-leader", null);

    actionSlots.set("hunt-leader", null);
    actionSlots.set("hunt-helper", null);

    return actionSlots;
  }

  public setPawn(id: string, pawn: Pawn) {
    this._slots.set(id, pawn);
  }

  public unsetPawn(id: string) {
    this._slots.set(id, null);
  }

  public clearSlots() {
    this._slots = this.getInitialSlots();
  }

  public findPawn(slotId: string) {
    let pawn = this._slots.get(slotId);
    if (pawn === undefined) {
      throw new Error("Cant find slot with id: " + slotId);
    } else {
      return pawn;
    }
  }
}
