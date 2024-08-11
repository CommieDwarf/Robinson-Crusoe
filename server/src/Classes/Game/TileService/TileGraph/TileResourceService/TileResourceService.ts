import {
    ITileResourceService,
    Side,
    TILE_RESOURCE_ACTION,
    TileResourceInfo,
} from "@shared/types/Game/TileService/TileResourceService";
import {TERRAIN_TYPE, TileExtras, TileGatherableResource, TileResource,} from "@shared/types/Game/TileService/ITile";
import {IGame} from "@shared/types/Game/Game";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";

export class TileResourceService implements ITileResourceService {
    private readonly _game: IGame;
    private readonly _id: number;
    private readonly _terrainType: TERRAIN_TYPE;
    private readonly _resources: {
        left: TileResourceInfo;
        right: TileResourceInfo;
    };
    private readonly _extras: TileExtras;

    constructor(
        game: IGame,
        id: number,
        terrainType: TERRAIN_TYPE,
        resources: { left: TileResource; right: TileResource },
        extras: TileExtras
    ) {
        this._game = game;
        this._id = id;
        this._terrainType = terrainType;
        this._extras = extras;
        this._resources = {
            left: this.initResources(resources.left),
            right: this.initResources(resources.right),
        };
    }

    get renderData() {
        return {
            id: this._id,
            terrainType: this._terrainType,
            resources: this._resources,
            extras: this._extras,
        };
    }

    get id(): number {
        return this._id;
    }

    get terrainType(): TERRAIN_TYPE {
        return this._terrainType;
    }

    get resources(): { left: TileResourceInfo; right: TileResourceInfo } {
        return this._resources;
    }

    get extras(): TileExtras {
        return this._extras;
    }

    public hasModifier(side: Side) {
        return this._resources[side].modifiers.length > 0;
    }

    public canBeDepleted(side: Side): boolean {
        return (
            this._resources[side].resource !== "beast" &&
            !this._resources[side].depleted
        );
    }

    public isSideMarkedForAction(side: Side) {
        return Boolean(this.resources[side].markedForAction);
    }

    public getModifiedBasicResourceAmount(side: Side) {
        const resource = this._resources[side].resource;
        if (resource !== "beast") {
            const amount = this._resources[side].modifiers.length > 0 ? 2 : 1;
            return {
                resource,
                amount,
            };
        } else {
            return null;
        }
    }

    public isMarkedForAction(): boolean {
        return (
            Boolean(this._resources.left.markedForAction) ||
            Boolean(this._resources.right.markedForAction)
        );
    }

    public hasBasicResource(resource: "food" | "wood") {
        return (
            this._resources.left.resource === resource ||
            this._resources.right.resource === resource
        );
    }

    public canActionBePerformed(action: TILE_RESOURCE_ACTION, side: Side, source: string) {
        const {
            depleted,
            modifiers,
            shortcut
        } = this._resources[side];

        switch (action) {
            case TILE_RESOURCE_ACTION.ADD_MODIFIER:
                return true;
            case TILE_RESOURCE_ACTION.REMOVE_MODIFIER:
                return modifiers.some((mod) => mod.source === source);
            case TILE_RESOURCE_ACTION.UN_DEPLETE:
                return depleted;
            case TILE_RESOURCE_ACTION.DEPLETE:
                return this.canBeDepleted(side);
            case TILE_RESOURCE_ACTION.SET_SHORTCUT:
                return !depleted && !shortcut;
            case TILE_RESOURCE_ACTION.UNSET_SHORTCUT:
                return shortcut;
        }
    }

    public markResourceForAction(
        side: Side,
        actionName: TILE_RESOURCE_ACTION,
        source: string,
    ) {
        let trigger;
        switch (actionName) {
            case TILE_RESOURCE_ACTION.DEPLETE:
                trigger = this.deplete;
                break;
            case TILE_RESOURCE_ACTION.UN_DEPLETE:
                trigger = this.replenish;
                break;
            case TILE_RESOURCE_ACTION.ADD_MODIFIER:
                trigger = this.addResourceBoostBySide;
                break;
            case TILE_RESOURCE_ACTION.REMOVE_MODIFIER:
                trigger = this.removeBoost;
                break;
            case TILE_RESOURCE_ACTION.SET_SHORTCUT:
                trigger = () => this.setShortcut(side, true);
                break;
            case TILE_RESOURCE_ACTION.UNSET_SHORTCUT:
                trigger = () => this.setShortcut(side, false);
                break;
        }
        this._resources[side].markedForAction = {
            source,
            actionName,
            trigger,
        };
    }

    public resetActionMarks() {
        this._resources.left.markedForAction = null;
        this._resources.right.markedForAction = null;
    }

    public deplete(side: Side, source: string) {
        this._resources[side].depleted = true;
        const resource = this._resources[side].resource;
        this._game.logService.addMessage({
            code: LOG_CODE.RESOURCE_DEPLETED,
            amount: 1,
            subject1: resource,
            subject2: ""
        }, "negative", source)

    }

    public replenish(side: Side, source: string) {
        this._resources[side].depleted = false;
        const resource = this._resources[side].resource;

        this._game.logService.addMessage({
            code: LOG_CODE.RESOURCE_REPLENISHED,
            amount: 1,
            subject1: resource,
            subject2: ""
        }, "positive", source)
    }

    public addResourceBoostBySide(side: Side, source: string) {
        const resource = this._resources[side].resource;
        if (resource !== "beast") {
            this._resources[side].modifiers.push({resource, source})
            this._game.logService.addMessage({
                code: LOG_CODE.RESOURCE_BOOST_ADDED,
                amount: 1,
                subject1: resource,
                subject2: ""
            }, "positive", source)
        }

    }

    public addModifierByResource(resource: TileGatherableResource, source: string) {
        const side = this.getSideByResource(resource);
        if (!side) {
            const beastSide = this.getSideByResource("beast") as Side;
            this._resources[beastSide].modifiers.push({resource, source});
        } else {
            this._resources[side].modifiers.push({resource, source})
        }
    }

    public removeBoost(side: Side, source: string) {
        if (this._resources[side].modifiers.length === 1) {
            const resource = this.resources[side].resource;
            this._game.logService.addMessage({
                code: LOG_CODE.RESOURCE_BOOST_REMOVED,
                subject1: "resource",
                subject2: "",
                amount: 1
            }, "negative", source)
        }
        this._resources[side].modifiers = this._resources[side].modifiers.filter(
            (mod) => mod.resource === source
        );
    }

    public setShortcut(side: Side, value: boolean) {
        if (value && this._resources[side].resource === "beast") {
            throw new Error("Can't place shortcut on a beast!");
        }
        if (value && this._resources[side].depleted) {
            throw new Error("Can't place shortcut on depleted resource");
        }
        this._resources[side].shortcut = value;
    }

    public clearModifiers() {
        this._resources.left.modifiers = [];
        this._resources.right.modifiers = [];
    }

    public triggerAction(side: Side) {
        if (this._resources[side].markedForAction) {
            this._resources[side].markedForAction?.trigger.call(this, side, this._resources[side].markedForAction?.source || "");
            this._resources[side].markedForAction = null;
        }
    }

    public getSideByResource(resource: TileResource): Side | null {
        switch (true) {
            case this._resources.left.resource === resource:
                return "left";
            case this._resources.right.resource === resource:
                return "right";
            default:
                return null;
        }
    }

    private initResources(resource: TileResource) {
        return {
            resource: resource,
            depleted: false,
            modifiers: [],
            markedForAction: null,
            assignedPawns: 0,
            shortcut: false,
        }
    }
}
