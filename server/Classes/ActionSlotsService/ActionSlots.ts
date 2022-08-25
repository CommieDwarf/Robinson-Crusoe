import {IPawn} from "../../../interfaces/Pawns/Pawn";
import {IActionSlotsService, IActionSlotsServiceRenderData} from "../../../interfaces/ActionSlots";
import {getPawnCanBeSettled} from "../../../utils/canPawnBeSettled";
import {IStructuresService} from "../../../interfaces/Structures/Structures";
import {IInventionsService} from "../../../interfaces/Inventions/Inventions";
import {ITilesService} from "../../../interfaces/Tiles/Tiles";

export class ActionSlotsService implements IActionSlotsService {
  set slots(value: Map<string, IPawn | null>) {
    this._slots = value;
  }

  get slots(): Map<string, IPawn | null> {
    return this._slots;
  }

  get renderData(): IActionSlotsServiceRenderData {
    const renderData: any = {};
    this.slots.forEach((pawn, slotId) => {
      if (pawn) {
        renderData[slotId] = pawn.renderData;
      } else {
        renderData[slotId] = null;
      }
    })
    return renderData;
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

  public setPawns(destinationId: string, sourceId: string) {
    const pawn1 = this.getPawn(destinationId);
    const pawn2 = this.getPawn(sourceId);
    if (getPawnCanBeSettled(pawn1, sourceId)) {
      this.setPawn(sourceId, pawn1);
    }
    if (getPawnCanBeSettled(pawn2, destinationId)) {
      this.setPawn(destinationId, pawn2);
    }
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
    let IPawn = this._slots.get(droppableId);
    if (IPawn === undefined) {
      throw new Error("Cant find slot with id: " + droppableId);
    } else {
      return IPawn;
    }
  }

  private getInitialSlots() {
    const actionSlots = new Map<string, null | IPawn>();

    this._structuresService.structures.forEach((structure) => {
      actionSlots.set("structure" + structure.name + "leader", null);
      actionSlots.set("structure" + structure.name + "helper-1", null);
      actionSlots.set("structure" + structure.name + "helper-2", null);
    });

    this._inventionsService.inventions.forEach((invention) => {
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
      actionSlots.set("rest-" + i, null);
      actionSlots.set("arrangeCamp-" + i, null);
    }

    actionSlots.set("threat-left-1", null);
    actionSlots.set("threat-left-2", null);
    actionSlots.set("threat-right-1", null);
    actionSlots.set("threat-right-2", null);

    actionSlots.set("hunt-leader", null);
    actionSlots.set("hunt-helper", null);

    return actionSlots;
  }
}
