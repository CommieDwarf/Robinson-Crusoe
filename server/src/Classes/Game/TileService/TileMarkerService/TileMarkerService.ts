import {ITile, TILE_ACTION} from "@shared/types/Game/TileService/ITile";
import {Side, TILE_RESOURCE_ACTION} from "@shared/types/Game/TileService/TileResourceService";
import {IGame} from "@shared/types/Game/Game";


export class TileMarkerService {


    private readonly _game: IGame;

    private readonly _actionQueue: (() => void)[] = [];
    private _remainingToFinishAction: number = 0;

    constructor(game: IGame) {
        this._game = game;
    }


    get isActionRemaining(): boolean {
        return this._actionQueue.length > 0;
    }


    public markTilesForAction(tiles: ITile[],
                              action: TILE_ACTION,
                              requiredActionAmount: number,
                              source: string,
                              shouldApplyDmg: boolean
    ): void {

        const markAction = () => {
            const markableTiles = tiles.filter((tile) => tile.canActionBePerformed(action));
            if (shouldApplyDmg) {
                this.applyDmgOnInsufficientAmount(requiredActionAmount, markableTiles.length, source);
            }
            this._remainingToFinishAction = Math.min(requiredActionAmount, markableTiles.length);
            markableTiles.forEach((tile) => {
                tile.markTileForActon(action, source);
            })

        }
        this.enqueueAndOrExecute(markAction)
    }


    public markTileResourcesForAction(tiles: ITile[],
                                      action: TILE_RESOURCE_ACTION,
                                      source: string,
                                      resource: "food" | "wood" | null,
                                      requiredActionAmount: number,
                                      shouldApplyDmg: boolean
    ): void {
        const markAction = () => {
            const markableAmount = this.countMarkableResources(tiles, action, source, resource);
            if (shouldApplyDmg) {
                this.applyDmgOnInsufficientAmount(requiredActionAmount, markableAmount, source);
            }
            this._remainingToFinishAction = Math.min(requiredActionAmount, markableAmount);
            tiles.forEach((tile) => this.markResourcesOnTile(tile, action, source, resource));
        }
        this.enqueueAndOrExecute(markAction)
    }

    public triggerMarkedResourceAction(tileId: number, side: Side): void {
        const tile = this._game.tileService.getTile(tileId);
        tile.triggerResourceAction(side, "");
        this.handleActionTriggered();
    }

    public triggerMarkedAction(tileId: number): void {
        const tile = this._game.tileService.getTile(tileId);
        if (tile.markedForAction) {
            tile.triggerAction();
        }
        this.handleActionTriggered()
    }

    private handleActionTriggered(): void {
        this.decrRemainingToFinishAction();
        if (this._remainingToFinishAction > 0) {
            return;
        }
        this.clearTileMarks();
        this.clearResourceTileMarks()
        this.dequeueAndExecuteNext()
    }


    private applyDmgOnInsufficientAmount(requiredAmount: number,
                                         markableAmount: number,
                                         logSource: string): void {
        const missing = requiredAmount - markableAmount;
        if (missing > 0) {
            this._game.characterService.hurtAllPlayerCharacters(missing, logSource);
        }
    }


    private enqueueAndOrExecute(markAction: () => void): void {
        if (this._remainingToFinishAction <= 0) {
            return;
        }
        if (this.isActionRemaining) {
            this._actionQueue.push(markAction);
        } else {
            this._actionQueue.push(markAction);
            markAction();
        }
    }

    private dequeueAndExecuteNext(): void {
        this._actionQueue.shift();
        if (this.isActionRemaining) {
            this._actionQueue[0]();
        }
    }


    private clearResourceTileMarks(): void {
        this._game.tileService.tiles.forEach((tile) => {
            tile.resetTileResourceActionMarks();
        })
    }

    private clearTileMarks(): void {
        this._game.tileService.tiles.forEach((tile) => {
            tile.resetTileActionMark()
        });
    }


    private decrRemainingToFinishAction(): void {
        this._remainingToFinishAction--;
        if (this._remainingToFinishAction < 0) {
            throw new Error(`RemainingToTakeAction is negative number!`)
        }
    }


    private markResourcesOnTile(tile: ITile,
                                action: TILE_RESOURCE_ACTION,
                                source: string,
                                resource: "food" | "wood" | null
    ): void {
        const args = resource ? [resource] : ["left", "right"] as Side[];
        args.forEach((arg) => {
            if (tile.canResourceActionBePerformed(action, arg, source)) {
                tile.markResourceForAction(arg, action, source);
            }
        })
    }

    private countMarkableResources(tiles: ITile[],
                                   action: TILE_RESOURCE_ACTION,
                                   source: string,
                                   resource: "wood" | "food" | null = null
    ): number {
        let count = 0;
        tiles.forEach((tile) => {
            const args = resource ? [resource] : ["left", "right"] as Side[];
            args.forEach((arg) => {
                if (tile.canResourceActionBePerformed(action, arg, source)) {
                    count++;
                console.log("COUNT:", count);
                console.log("arg", arg);
                }
            })
        })
        return count;
    }
}
