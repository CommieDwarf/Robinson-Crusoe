import {IPawn} from "../../../interfaces/Pawns/Pawn";
import {
    IActionSlotService,
    IActionSlotServiceRenderData,
    OccupiedSlots,
} from "../../../interfaces/ActionSlots";
import Entries from "../../../interfaces/Entries";
import {ACTION_ITEM, getDroppableID} from "../../../utils/getDroppableID";
import {
    INVENTION_NORMAL,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
} from "../../../interfaces/InventionService/Invention";
import {ACTION} from "../../../interfaces/ACTION";
import {IGame} from "../../../interfaces/Game";
import {getItemFromDroppableId} from "../../../utils/getItemFromDroppableId";
import {MissingLeaderError} from "../Errors/MissingLeaderError";
import {MissingHelperError} from "../Errors/MissingHelperError";
import {ITile} from "../../../interfaces/TileService/ITile";
import {isTile} from "../../../utils/isSpecificResolvableItem/isTile";

export class ActionSlotService implements IActionSlotService {
    private _slots: Map<string, null | IPawn>;
    private _game: IGame;
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
        if (droppableId.includes("gather") && !assignedPawn) {
            Boolean(pawn) ? this.incrDecrGatherTileAssignedPawns(droppableId, 1) : this.incrDecrGatherTileAssignedPawns(droppableId, -1)
        }
    }


    public unsetPawn(droppableId: string) {
        this._slots.set(droppableId, null);
        console.log("UNSET")
        this.incrDecrGatherTileAssignedPawns(droppableId, -1);
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

                if (helperCount < item.requiredHelperAmount || !(isTile(item) && item.isAnySideRequiredPawnsSatisfied)) {
                    throw new MissingHelperError(droppableID);
                }
            });
        });
    }

    private incrDecrGatherTileAssignedPawns(droppableId: string, amount: number) {
        const tile = getItemFromDroppableId(droppableId, this._game) as ITile;
        if (droppableId.includes("left")) {
            tile.incrDecrSideAssignedPawn("left", amount)
        } else {
            tile.incrDecrSideAssignedPawn("right", amount)
        }
    }
}
