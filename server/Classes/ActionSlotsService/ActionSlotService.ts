import { IPawn } from "../../../interfaces/Pawns/Pawn";
import {
  IActionSlotService,
  IActionSlotsServiceRenderData,
  SlotsOccupied,
} from "../../../interfaces/ActionSlots";
import Entries from "../../../interfaces/Entries";
import { ACTION_ITEM, getDroppableID } from "../../../utils/getDroppableID";
import {
  INVENTION_NORMAL,
  INVENTION_PERSONAL,
  INVENTION_STARTER,
} from "../../../interfaces/InventionService/Invention";
import { ACTION } from "../../../interfaces/ACTION";
import { IGame } from "../../../interfaces/Game";

export class ActionSlotService implements IActionSlotService {
  private _slots: Map<string, null | IPawn>;
  private _game: IGame;

  constructor(game: IGame) {
    this._game = game;
    this._slots = this.initActionSlots();
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

  // -------------------------------------------------

  set slots(value: Map<string, IPawn | null>) {
    this._slots = value;
  }

  get slots(): Map<string, IPawn | null> {
    return this._slots;
  }

  getOccupiedActionSlots(): SlotsOccupied {
    const entries = Object.values(ACTION).map((value) => [value, new Map()]);
    const categorized: SlotsOccupied = Object.fromEntries(entries);

    this.slots.forEach((pawn, droppableId) => {
      if (!pawn) {
        return;
      }
      const arrDroppableId = droppableId.split("-");
      const entries = Object.entries(categorized) as Entries<SlotsOccupied>;
      entries.forEach(([value, key]) => {
        if (
          arrDroppableId.includes(value) ||
          (value === ACTION.BUILD &&
            ActionSlotService.isBuildCategory(droppableId))
        ) {
          categorized[value].set(droppableId, pawn);
        }
      });
    });
    return categorized;
  }

  // -------------------------------------------------------

  public setPawn(id: string, pawn: IPawn | null) {
    this._slots.set(id, pawn);
  }

  public unsetPawn(id: string) {
    this._slots.set(id, null);
  }

  public clearSlots() {
    this._slots = this.initActionSlots();
  }

  public getPawn(droppableId: string): IPawn | null {
    let pawn = this.slots.get(droppableId);
    if (pawn === undefined) {
      throw new Error("Cant find slot with id: " + droppableId);
    } else {
      return pawn;
    }
  }

  private initActionSlots() {
    const actionSlots = new Map<string, null | IPawn>();
    this._game.constructionService.constructions.forEach((construction) => {
      for (let i = 0; i < 4; i++) {
        actionSlots.set(
          getDroppableID(ACTION_ITEM.CONSTRUCTION, construction.name, "", i),
          null
        );
      }
    });
    const inventions = [
      ...Object.values(INVENTION_STARTER),
      ...Object.values(INVENTION_NORMAL),
      ...Object.values(INVENTION_PERSONAL),
    ];
    inventions.forEach((invention) => {
      for (let i = 0; i < 4; i++) {
        actionSlots.set(
          getDroppableID(ACTION_ITEM.INVENTION, invention, "", i),
          null
        );
      }
    });
    this._game.tileService.tiles.forEach((tile) => {
      for (let i = 0; i < 8; i++) {
        actionSlots.set(
          getDroppableID(ACTION_ITEM.GATHER, tile.id, "left", i),
          null
        );
        actionSlots.set(
          getDroppableID(ACTION_ITEM.GATHER, tile.id, "right", i),
          null
        );
        actionSlots.set(
          getDroppableID(ACTION_ITEM.EXPLORE, tile.id, "", i),
          null
        );
      }
    });
    for (let i = 0; i < 10; i++) {
      actionSlots.set(getDroppableID(ACTION_ITEM.REST, "", "", i), null);
      actionSlots.set(
        getDroppableID(ACTION_ITEM.ARRANGE_CAMP, "", "", i),
        null
      );
    }
    for (let i = 0; i < 2; i++) {
      actionSlots.set(getDroppableID(ACTION_ITEM.THREAT, "", "left", i), null);
      actionSlots.set(getDroppableID(ACTION_ITEM.THREAT, "", "right", i), null);
      actionSlots.set(getDroppableID(ACTION_ITEM.HUNT, "", "", i), null);
    }

    return actionSlots;
  }

  public static isBuildCategory(droppableId: string) {
    return (
      droppableId.includes("invention") || droppableId.includes("construction")
    );
  }

  public static rmvRoleInfoFromDroppableId(droppableId: string): string {
    return droppableId.slice(0, -9);
  }

  public checkMissingPawns(): void | never {}

  private checkMissingLeaders() {
    Object.entries(this.getOccupiedActionSlots()).forEach(([category, map]) => {
      map.forEach((pawn, droppableID) => {
        //TODO: finish implementing
      });
    });
  }
}
