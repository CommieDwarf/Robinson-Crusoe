import { IPawn } from "../../../interfaces/Pawns/Pawn";
import {
  IActionSlotsService,
  IActionSlotsServiceRenderData,
  SlotsOccupiedAndCategorized,
} from "../../../interfaces/ActionSlots";
import { IStructuresService } from "../../../interfaces/Structures/Structures";
import { IInventionsService } from "../../../interfaces/Inventions/Inventions";
import { ITilesService } from "../../../interfaces/Tiles/TilesService";
import { inventionList } from "../../constants/inventionList";
import Entries from "../../../interfaces/Entries";

export class ActionSlotsService implements IActionSlotsService {
  set slots(value: Map<string, IPawn | null>) {
    this._slots = value;
  }

  get slots(): Map<string, IPawn | null> {
    return this._slots;
  }

  get slotsOccupiedAndCategorized(): SlotsOccupiedAndCategorized {
    const categorized: SlotsOccupiedAndCategorized = {
      threat: new Map(),
      hunt: new Map(),
      build: new Map(),
      gather: new Map(),
      explore: new Map(),
      arrangeCamp: new Map(),
      rest: new Map(),
    };

    this.slots.forEach((pawn, droppableId) => {
      if (pawn) {
        const arrDroppableId = droppableId.split("-");
        const entries = Object.entries(
          categorized
        ) as Entries<SlotsOccupiedAndCategorized>;
        entries.forEach(([value, key]) => {
          if (arrDroppableId.includes(value)) {
            categorized[value].set(droppableId, pawn);
          }
        });
      }
    });

    return categorized;
  }

  get renderData(): IActionSlotsServiceRenderData {
    const slots: any = {};
    this.slots.forEach((pawn, slotId) => {
      if (pawn) {
        slots[slotId] = pawn.renderData;
      } else {
        slots[slotId] = null;
      }
    });
    return { slots };
  }

  private _slots: Map<string, null | IPawn>;
  private _structuresService: IStructuresService;
  private _inventionsService: IInventionsService;
  private _tiles: ITilesService;

  constructor(
    structuresService: IStructuresService,
    inventionsService: IInventionsService,
    tiles: ITilesService
  ) {
    this._structuresService = structuresService;
    this._inventionsService = inventionsService;
    this._tiles = tiles;
    this._slots = this.getInitialSlots();
  }

  public setPawn(id: string, pawn: IPawn | null) {
    this._slots.set(id, pawn);
  }

  public unsetPawn(id: string) {
    this._slots.set(id, null);
  }

  public clearSlots() {
    this._slots = this.getInitialSlots();
  }

  public getPawn(droppableId: string): IPawn | null {
    let pawn = this.slots.get(droppableId);
    if (pawn === undefined) {
      throw new Error("Cant find slot with id: " + droppableId);
    } else {
      return pawn;
    }
  }

  private getInitialSlots() {
    const actionSlots = new Map<string, null | IPawn>();
    this._structuresService.structures.forEach((structure) => {
      actionSlots.set("structure-" + structure.name + "-leader", null);
      actionSlots.set("structure-" + structure.name + "-helper-1", null);
      actionSlots.set("structure-" + structure.name + "-helper-2", null);
    });

    inventionList.forEach((invention) => {
      actionSlots.set("invention-" + invention + "-leader", null);
      actionSlots.set("invention-" + invention + "-helper-1", null);
      actionSlots.set("invention-" + invention + "-helper-2", null);
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
      actionSlots.set("rest-" + i + "-leader", null);
      actionSlots.set("arrangeCamp-" + i + "-leader", null);
    }

    actionSlots.set("threat-left-1-leader", null);
    actionSlots.set("threat-left-2-helper", null);
    actionSlots.set("threat-right-1-leader", null);
    actionSlots.set("threat-right-2-helper", null);

    actionSlots.set("hunt-leader", null);
    actionSlots.set("hunt-helper", null);

    return actionSlots;
  }
}
