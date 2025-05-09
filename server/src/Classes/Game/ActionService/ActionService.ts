import {
    ActionTokens,
    GlobalCostModifiers,
    IActionService,
    IActionServiceRenderData,
} from "@shared/types/Game/ActionService/ActionService";
import {IGame} from "@shared/types/Game/Game";
import {IResolvableItem, RESOLVE_ITEM_STATUS} from "@shared/types/Game/ActionService/IResolvableItem";
import {ResolvableItem} from "./ResolvableItem";
import Entries from "@shared/types/Entries";
import {ACTION, AdventureAction} from "@shared/types/Game/ACTION";
import {ITEM} from "@shared/types/Game/Equipment/Item";
import {isAdventureAction} from "@shared/utils/typeGuards/isAdventureAction";
import {GlobalCostModifier} from "./GlobalCostModifier/GlobalCostModifier";
import {OccupiedSlots} from "@shared/types/Game/ActionSlots";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {IPawn} from "@shared/types/Game/Pawns/Pawn";
import {actionOrder} from "@shared/constants/actionOrder";
import {getDroppableIdObject} from "@shared/utils/getActionSlotDroppableId";
import {IGlobalCostModifierRenderData} from "@shared/types/Game/ActionService/GlobalCostModifier";
import {MissingLeaderError} from "../Errors/MissingLeaderError";
import {getItemFromDroppableId} from "../../../utils/getItemFromDroppableId";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import { isPlayerCharacter } from "@shared/utils/typeGuards/isPlayerCharacter";


export class ActionService implements IActionService {


    private readonly _game: IGame;
    private _resolvableItems: IResolvableItem[] = [];
    private _action: ACTION = ACTION.THREAT;
    private _skippableActions: ACTION[] = [];
    private _actionIndex = 0;
    private _finished: boolean = false;
    private _occupiedSlots: Map<string, IPawn<any>> = new Map();
    private _lastRolledItem: IResolvableItem | null = null;
    private _adventureTokens: ActionTokens = {
        build: false,
        explore: false,
        gather: false,
    };

    private _newAdventureTokens: ActionTokens = {
        build: false,
        explore: false,
        gather: false,
    };
    private _reRollTokens: ActionTokens = {
        build: false,
        explore: false,
        gather: false,
    };

    private _globalCostModifiers: GlobalCostModifiers = {
        [ACTION.THREAT]: [],
        [ACTION.HUNT]: [],
        [ACTION.BUILD]: [],
        [ACTION.GATHER]: [],
        [ACTION.EXPLORE]: [],
        [ACTION.ARRANGE_CAMP]: [],
        [ACTION.REST]: [],
    }

    private _bibleUses: number = 0;

    constructor(game: IGame) {
        this._game = game;
    }

    get renderData(): IActionServiceRenderData {
        const globalCostModifiers = Object.fromEntries(Object.entries(this._globalCostModifiers)
            .map(([key, value]) =>
                [key, value.map((mod) => mod.renderData)])) as Record<ACTION, IGlobalCostModifierRenderData[]>

        return {
            action: this.action,
            currentActionResolved: this.currentActionResolved,
            finished: this.finished,
            resolvableItems: this.resolvableItems.map(
                (resItem) => resItem.renderData
            ),
            lastRolledItem: this._lastRolledItem?.renderData || null,
            adventureTokens: this._adventureTokens,
            reRollTokens: this.reRollTokens,
            skippableActions: this._skippableActions,
            globalCostModifiers
        };
    }


    get globalCostModifiers(): GlobalCostModifiers {
        return this._globalCostModifiers;
    }


    get reRollTokens(): ActionTokens {
        return this._reRollTokens;
    }

    get skippableActions(): ACTION[] {
        return this._skippableActions;
    }

    get currentActionResolved() {
        return !this._resolvableItems.some(
            (resolvableItem) =>
                resolvableItem.resolveStatus === RESOLVE_ITEM_STATUS.PENDING
        );
    }

    get adventureTokens(): ActionTokens {
        return this._adventureTokens;
    }

    set finished(value: boolean) {
        this._finished = value;
    }

    get resolvableItems(): IResolvableItem[] {
        return this._resolvableItems;
    }

    get action(): ACTION {
        return this._action;
    }

    get finished(): boolean {
        return this._finished;
    }

    get lastRolledItem(): IResolvableItem | null {
        return this._lastRolledItem;
    }

    get bibleUses(): number {
        return this._bibleUses;
    }

    set bibleUses(value: number) {
        this._bibleUses = value;
    }

    hasGlobalModifier(action: ACTION, resource: "helper" | keyof IBasicResourcesAmount): boolean {
        return this._globalCostModifiers[action].some((modifier) => modifier.resource === resource);
    }

    addGlobalCostModifier(action: ACTION, resource: "helper" | keyof IBasicResourcesAmount, disposable: boolean, source: string) {
        this._globalCostModifiers[action].push(new GlobalCostModifier(resource, disposable, source));
    }

    removeGlobalCostModifier(action: ACTION, source: string) {
        this._globalCostModifiers[action] = this._globalCostModifiers[action].filter((modifier) => modifier.source === source);
    }

    setAdventureToken(
        action: AdventureAction,
        value: boolean,
        logSource: string
    ) {
        if (this._adventureTokens[action] === value) {
            return;
        }
        if (!value) {
            this._adventureTokens[action] = value;
            return;
        }
        if (value) {
            this._game.logService.addMessage({
                code: LOG_CODE.ACTION_GOT_TOKEN, subject1: "adventure", subject2: action, amount: 1
            }, "negative", logSource)
        }
        if (this._game.phaseService.phase === "action") {
            this._newAdventureTokens[action] = value
        } else {
            this._adventureTokens[action] = value;
        }
    }

    private finishPhase() {
        this._finished = true;
        this._actionIndex = 0;
        this._action = actionOrder[this._actionIndex];
        this._resolvableItems = [];
        this._skippableActions = [];
        this.mergeAdventureTokens();
        this.resetNewAdventureTokens();
    }

    public setNextAction() {
        if (!this.currentActionResolved || this._game.mysteryService.isDrawingOn) {
            return;
        }
        this._lastRolledItem = null;
        do {
            if (this.action !== ACTION.REST) {
                this._actionIndex++;
                this._action = actionOrder[this._actionIndex];
                if (this.action !== ACTION.THREAT) {
                    this.loadItems();
                }
            } else {
                this.finishPhase();
            }
        } while (this._skippableActions.includes(this._action) && !this._finished);
    }

    public setReRollToken(
        action: AdventureAction,
        value: boolean,
        logSource: string
    ) {
        if (this._reRollTokens[action] === value) {
            return;
        }
        if (value) {
            this._game.logService.addMessage({
                code: LOG_CODE.ACTION_GOT_TOKEN,
                subject1: "reroll",
                subject2: action,
                amount: 1,
            }, "negative", logSource)
        }
        this._reRollTokens[action] = value;
    }

    private setCanBeSkipped(slots: OccupiedSlots) {
        const entries = Object.entries(slots) as Entries<OccupiedSlots>;
        return entries.map(([action, map]) => {
            if (map.size === 0) {
                this._skippableActions.push(action);
            }
        });
    }

    public loadItems() {
        this._bibleUses = this._game.equipmentService.hasItem(ITEM.BIBLE) ? this._game.equipmentService.getUses(ITEM.BIBLE) : 0;
        const allSlots = this._game.actionSlotService.getOccupiedActionSlots();
        if (this._actionIndex === 0) {
            this.setCanBeSkipped(allSlots);
        }

        this._occupiedSlots = allSlots[this._action];
        const resolvableItems: IResolvableItem[] = [];
        const helpers: string[] = [];
        this._occupiedSlots.forEach((pawn, droppableID) => {
            if (droppableID.includes("helper")) {
                const resolvableItem = this.getResolvableItemByDroppableID(
                    droppableID,
                    resolvableItems
                );
                if (resolvableItem) {
                    resolvableItem.helperAmount++;
                } else {
                    helpers.push(droppableID);
                }
            } else {
                const item = getItemFromDroppableId(droppableID, this._game);
                if (item) {
                    resolvableItems.push(
                        new ResolvableItem(item, this._action, pawn, this._game, droppableID)
                    );
                }

            }
        });

        helpers.forEach((droppableID) => {
            const item = this.getResolvableItemByDroppableID(
                droppableID,
                resolvableItems
            );


            if (!item) {
                throw new MissingLeaderError(droppableID);
            } else {
                item.helperAmount++;
            }
        });
        this._resolvableItems = resolvableItems;
    }

    public rollDices(resolvableItemID: string) {
        if (this.canResolve) {
            const resolvableItem = this.getResolvableItem(resolvableItemID);
            resolvableItem.rollDices();
            this._lastRolledItem = resolvableItem;
        } 
    }

    public reRollSuccess(resolvableItemID: string) {
        if (isAdventureAction(this._action)) {
            this.getResolvableItem(resolvableItemID).reRollSuccess();
            this.setReRollToken(this._action, false, "");
        }
    }

    public reRollDice(dice: ActionDice) {
        if (isAdventureAction(this._action) && this._lastRolledItem) {
            this._lastRolledItem?.reRollDice(dice, this._action);
        }
    }

    get canResolve() {
        return !(
            this._game.adventureService.currentAdventure ||
            this._game.mysteryService.isDrawingOn
        );
    }

    public resolve(resolvableItemID: string) {
        if (!this.canResolve) {
            return;
        }

        const resolvableItem = this.getResolvableItem(resolvableItemID);
        resolvableItem.resolve();
        if (resolvableItem.shouldRollDices) {
            this._lastRolledItem = resolvableItem;
        }
        if (
            isAdventureAction(resolvableItem.action) &&
            this.shouldSetAdventureCard(resolvableItem)
        ) {
            if (isPlayerCharacter(resolvableItem.leaderPawn.owner)) {
                this._game.adventureService.setCurrentAdventure(resolvableItem);
            }
            this.setAdventureToken(
                resolvableItem.action,
                false,
                resolvableItem.action
            );
        }
        this._lastRolledItem = null;
    }

    private shouldSetAdventureCard(resolvableItem: IResolvableItem): boolean {
        return (
            isAdventureAction(resolvableItem.action) &&
            (resolvableItem.rollDiceResults?.mystery.result === "mystery" ||
                this._adventureTokens[resolvableItem.action])
        );
    }

    private getResolvableItem(resolvableItemID: string) {
        const resItem = this._resolvableItems.find(
            (resItem) => resItem.id === resolvableItemID
        );
        if (!resItem) {
            throw new Error(
                "Couldn't find resolvable item with id: " + resolvableItemID
            );
        }
        return resItem;
    }

    private getResolvableItemByDroppableID(
        droppableID: string,
        resolvableItems: IResolvableItem[]
    ) {

        const {itemType, name, side} = getDroppableIdObject(droppableID);
        const resolvableItem = resolvableItems.find((resItem) => {
                return [itemType, name, side].every((value) => {
                    return resItem.droppableID.includes(value)
                });
            }
        )
        if (!resolvableItem) {
            throw new Error(
                `Resolvable item with droppableID: ${droppableID} not found.`
            );
        }

        return resolvableItem;
    }

    private mergeAdventureTokens() {
        this._adventureTokens = {
            gather: this._adventureTokens.gather || this._newAdventureTokens.gather,
            explore: this._adventureTokens.explore || this._newAdventureTokens.explore,
            build: this._adventureTokens.build || this._newAdventureTokens.build,
        }

    }

    private resetNewAdventureTokens() {
        this._newAdventureTokens = {
            gather: false,
            explore: false,
            build: false
        }
    }

    setBibleUsage(resolvableItemId: string, value: boolean) {
        this.getResolvableItem(resolvableItemId).bibleChecked = value;
    }
}
