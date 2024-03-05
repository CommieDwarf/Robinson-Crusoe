import {
    IActionSlotService,
    IActionSlotServiceRenderData,
    OccupiedSlots,
} from "../../../../interfaces/ActionSlots";
import Entries from "../../../../interfaces/Entries";
import {getActionSlotDroppableId} from "../../../../utils/getActionSlotDroppableId";
import {
    INVENTION_CASTAWAYS,
    INVENTION_NORMAL,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
} from "../../../../interfaces/InventionService/Invention";
import {ACTION, ACTION_ITEM} from "../../../../interfaces/ACTION";
import {IGame} from "../../../../interfaces/Game";
import {getItemFromDroppableId} from "../../../../utils/getItemFromDroppableId";
import {MissingLeaderError} from "../Errors/MissingLeaderError";
import {MissingHelperError} from "../Errors/MissingHelperError";
import {IPawn} from "../../../../interfaces/Pawns/Pawn";
import {isEventCard} from "../../../../utils/typeGuards/isEventCard";
import {WRECKAGE_CARD} from "../../../../interfaces/EventService/EVENT_CARD";

export class ActionSlotService implements IActionSlotService {
    private _slots: Map<string, null | IPawn>;
    private readonly _game: IGame;
    private _pawnDropIDAlert: string | null = null;

    constructor(game: IGame) {
        this._game = game;
        this._slots = this.initActionSlots();
    }

    get renderData(): IActionSlotServiceRenderData {
        const slots: any = {};
        this.slots.forEach((pawn, slotId) => {
            if (pawn) {
                slots[slotId] = pawn.renderData;
            } else {
                slots[slotId] = null;
            }
        });
        return {
            slots,
            pawnDropIDAlert: this._pawnDropIDAlert,
        };

    }

    // -------------------------------------------------

    set slots(value: Map<string, IPawn | null>) {
        this._slots = value;
    }

    get slots(): Map<string, IPawn | null> {
        return this._slots;
    }

    get pawnDropIDAlert(): string | null {
        return this._pawnDropIDAlert;
    }

    set pawnDropIDAlert(value: string | null) {
        this._pawnDropIDAlert = value;
    }

    getOccupiedActionSlots(): OccupiedSlots {
        const entries = Object.values(ACTION).map((value) => [value, new Map()]);
        const categorized: OccupiedSlots = Object.fromEntries(entries);

        this.slots.forEach((pawn, droppableId) => {
            if (!pawn) {
                return;
            }
            const arrDroppableId = droppableId.split("-");
            const entries = Object.entries(categorized) as Entries<OccupiedSlots>;
            entries.forEach(([value]) => {
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


    public setPawn(droppableId: string, pawn: IPawn | null) {
        const assignedPawn = this._slots.get(droppableId);
        this._slots.set(droppableId, pawn);
        if (assignedPawn) {
            return;
        }
        if (droppableId.includes("gather")) {
        } else if (droppableId.includes("rest")) {
            Boolean(pawn) ? this._game.arrangeCampRestService.incrPawnAmount("rest") : this._game.arrangeCampRestService.decrPawnAmount("rest");
        } else if (droppableId.includes("arrange camp")) {
            Boolean(pawn) ? this._game.arrangeCampRestService.incrPawnAmount("arrangeCamp") : this._game.arrangeCampRestService.decrPawnAmount("arrangeCamp");
        }
    }

    private incrPawnAmountInItem(droppableId: string) {
        const item = getItemFromDroppableId(droppableId, this._game);
    }


    public unsetPawn(droppableId: string) {
        this._slots.set(droppableId, null);
        if (droppableId.includes("gather")) {
        } else if (droppableId.includes("rest")) {
            this._game.arrangeCampRestService.decrPawnAmount("rest");
        } else if (droppableId.includes("arrange camp")) {
            this._game.arrangeCampRestService.decrPawnAmount("arrangeCamp");
        }
    }

    public clearSlots() {
        this._slots = this.initActionSlots();
    }

    public getPawn(droppableId: string): IPawn | null {
        return this.slots.get(droppableId) || null;
    }

    private initActionSlots() {
        const actionSlots = new Map<string, null | IPawn>();
        this._game.constructionService.constructions.forEach((construction) => {
            for (let i = 0; i < 4; i++) {
                actionSlots.set(
                    getActionSlotDroppableId(ACTION_ITEM.CONSTRUCTION, construction.name, null, i),
                    null
                );
            }
        });
        const inventions = [
            ...Object.values(INVENTION_STARTER),
            ...Object.values(INVENTION_NORMAL),
            ...Object.values(INVENTION_PERSONAL),
            ...Object.values(INVENTION_CASTAWAYS),
        ];
        inventions.forEach((invention) => {
            for (let i = 0; i < 4; i++) {
                actionSlots.set(
                    getActionSlotDroppableId(ACTION_ITEM.INVENTION, invention, null, i),
                    null
                );
            }
        });
        this._game.tileService.tiles.forEach((tile) => {
            for (let i = 0; i < 8; i++) {
                actionSlots.set(
                    getActionSlotDroppableId(ACTION.GATHER, tile.id, "left", i),
                    null
                );
                actionSlots.set(
                    getActionSlotDroppableId(ACTION.GATHER, tile.id, "right", i),
                    null
                );
                actionSlots.set(
                    getActionSlotDroppableId(ACTION.EXPLORE, tile.id, null, i),
                    null
                );
            }
        });
        for (let i = 0; i < 10; i++) {
            actionSlots.set(getActionSlotDroppableId(ACTION.REST, "", null, i), null);
            actionSlots.set(
                getActionSlotDroppableId(ACTION.ARRANGE_CAMP, "", null, i),
                null
            );
        }
        for (let i = 0; i < 2; i++) {
            actionSlots.set(getActionSlotDroppableId(ACTION.THREAT, " ", "left", i), null);
            actionSlots.set(getActionSlotDroppableId(ACTION.THREAT, " ", "right", i), null);
            actionSlots.set(getActionSlotDroppableId(ACTION.HUNT, " ", null, i), null);
        }

        return actionSlots;
    }

    public static isBuildCategory(droppableId: string) {
        return (
            droppableId.includes("invention") || droppableId.includes("construction")
        );
    }

    public static rmvRoleInfoFromDroppableId(droppableID: string): string {
        return droppableID.slice(0, -9);
    }

    static checkMissingPawns(occupiedSlots: OccupiedSlots, game: IGame) {
        Object.entries(occupiedSlots).forEach(([category, map]) => {
            let helperItems = new Set<string>();
            let leaderItems = new Set<string>();
            map.forEach((pawn, droppableID) => {
                if (droppableID.includes("helper")) {
                    helperItems.add(this.rmvRoleInfoFromDroppableId(droppableID));
                } else {
                    leaderItems.add(this.rmvRoleInfoFromDroppableId(droppableID));
                }
            });

            //leader check
            helperItems.forEach((droppableID) => {
                if (!leaderItems.has(droppableID)) {
                    throw new MissingLeaderError(droppableID);
                }
            });


            //helper check
            leaderItems.forEach((droppableID) => {
                const item = getItemFromDroppableId(droppableID, game);
                if (item === ACTION.ARRANGE_CAMP || item === ACTION.REST) {
                    return false;
                }
                let helperCount = 0;
                helperItems.forEach((hDroppableID) => {
                    if (hDroppableID === droppableID) {
                        helperCount++;
                    }
                });


                if (item && item.requiredPawnAmount && helperCount < item.requiredPawnAmount - 1
                    &&
                    !(isEventCard(item) && item.name === WRECKAGE_CARD.SUPPLY_CRATES)
                ) {
                    throw new MissingHelperError(droppableID);
                }
            });
        });
    }

}
