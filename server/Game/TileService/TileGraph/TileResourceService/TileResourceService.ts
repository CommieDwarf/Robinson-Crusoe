import {
    ITileResourceService,
    Side,
    TILE_RESOURCE_ACTION,
    TileResourceInfo,
} from "../../../../../interfaces/TileService/TileResourceService";
import {
    TERRAIN_TYPE,
    TileExtras,
    TileResource,
} from "../../../../../interfaces/TileService/ITile";
import {IGame} from "../../../../../interfaces/Game";

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
            left: {
                resource: resources.left,
                depleted: false,
                modifiers: [],
                markedForAction: null,
                assignedPawns: 0,
            },
            right: {
                resource: resources.right,
                depleted: false,
                modifiers: [],
                markedForAction: null,
                assignedPawns: 0,
            },
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

    public markResourceForAction(
        source: string,
        actionName: TILE_RESOURCE_ACTION,
        side: Side
    ) {
        let trigger;

        switch (actionName) {
            case TILE_RESOURCE_ACTION.DEPLETE:
                trigger = this.deplete;
                break;
            case TILE_RESOURCE_ACTION.UN_DEPLETE:
                trigger = this.unDeplete;
                break;
            case TILE_RESOURCE_ACTION.ADD_MODIFIER:
                trigger = this.addModifier;
                break;
            case TILE_RESOURCE_ACTION.REMOVE_MODIFIER:
                trigger = this.removeModifier;
                break;
        }
        this._resources[side].markedForAction = {
            source,
            actionName,
            trigger,
        };
    }

    public deplete(side: Side, source: string) {
        this._resources[side].depleted = true;
        const resource = this._resources[side].resource;
        //TODO: add translation of resource later.
        this._game.chatLog.addMessage(
            `Żródło z ${resource} zostało wyczerpane`,
            "red",
            source
        );
    }

    public unDeplete(side: Side, source: string) {
        this._resources[side].depleted = false;
        const resource = this._resources[side].resource;
        //TODO: add translation of resource later.
        this._game.chatLog.addMessage(
            `Żródło ${resource} już nie jest wyczerpane`,
            "green",
            source
        );
    }

    public addModifier(side: Side, source: string) {
        if (this._resources[side].modifiers.length === 0) {
            const resource = this._resources[side].resource;
            this._game.chatLog.addMessage(
                `Żródło z ${resource} daje teraz dodatkowy surowiec`,
                "green",
                source
            );
        }
        this._resources[side].modifiers.push(source);
    }

    public removeModifier(side: Side, source: string) {
        if (this._resources[side].modifiers.length === 1) {
            const resource = this.resources[side].resource;
            this._game.chatLog.addMessage(
                `Żródło z ${resource} nie daje już dodatkowego surowca`,
                "red",
                source
            );
        }
        this._resources[side].modifiers = this._resources[side].modifiers.filter(
            (mod) => mod === source
        );
    }

    public clearModifiers() {
        this._resources.left.modifiers = [];
        this._resources.right.modifiers = [];
    }

    public triggerAction(side: Side, source: string) {
        if (this._resources[side].markedForAction) {
            this._resources[side].markedForAction?.trigger.call(this, side, source);
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
}
