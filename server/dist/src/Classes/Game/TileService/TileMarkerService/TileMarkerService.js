"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileMarkerService = void 0;
class TileMarkerService {
    constructor(game) {
        this._actionQueue = [];
        this._remainingToFinishAction = 0;
        this._game = game;
    }
    get isActionRemaining() {
        return this._actionQueue.length > 0;
    }
    markTilesForAction(tiles, action, requiredActionAmount, source, shouldApplyDmg) {
        const markAction = () => {
            const markableTiles = tiles.filter((tile) => tile.canActionBePerformed(action));
            if (shouldApplyDmg) {
                this.applyDmgOnInsufficientAmount(requiredActionAmount, markableTiles.length, source);
            }
            this._remainingToFinishAction = Math.min(requiredActionAmount, markableTiles.length);
            markableTiles.forEach((tile) => {
                tile.markTileForActon(action, source);
            });
        };
        this.enqueueAndOrExecute(markAction);
    }
    markTileResourcesForAction(tiles, action, source, resource, requiredActionAmount, shouldApplyDmg) {
        const markAction = () => {
            const markableAmount = this.countMarkableResources(tiles, action, source, resource);
            if (shouldApplyDmg) {
                this.applyDmgOnInsufficientAmount(requiredActionAmount, markableAmount, source);
            }
            this._remainingToFinishAction = Math.min(requiredActionAmount, markableAmount);
            tiles.forEach((tile) => this.markResourcesOnTile(tile, action, source, resource));
        };
        this.enqueueAndOrExecute(markAction);
    }
    triggerMarkedResourceAction(tileId, side) {
        const tile = this._game.tileService.getTile(tileId);
        tile.triggerResourceAction(side, "");
        this.handleActionTriggered();
    }
    triggerMarkedAction(tileId) {
        const tile = this._game.tileService.getTile(tileId);
        if (tile.markedForAction) {
            tile.triggerAction();
        }
        this.handleActionTriggered();
    }
    handleActionTriggered() {
        this.decrRemainingToFinishAction();
        if (this._remainingToFinishAction > 0) {
            return;
        }
        this.clearTileMarks();
        this.clearResourceTileMarks();
        this.dequeueAndExecuteNext();
    }
    applyDmgOnInsufficientAmount(requiredAmount, markableAmount, logSource) {
        const missing = requiredAmount - markableAmount;
        if (missing > 0) {
            this._game.characterService.hurtAllPlayerCharacters(missing, logSource);
        }
    }
    enqueueAndOrExecute(markAction) {
        if (this._remainingToFinishAction <= 0) {
            return;
        }
        if (this.isActionRemaining) {
            this._actionQueue.push(markAction);
        }
        else {
            this._actionQueue.push(markAction);
            markAction();
        }
    }
    dequeueAndExecuteNext() {
        this._actionQueue.shift();
        if (this.isActionRemaining) {
            this._actionQueue[0]();
        }
    }
    clearResourceTileMarks() {
        this._game.tileService.tiles.forEach((tile) => {
            tile.resetTileResourceActionMarks();
        });
    }
    clearTileMarks() {
        this._game.tileService.tiles.forEach((tile) => {
            tile.resetTileActionMark();
        });
    }
    decrRemainingToFinishAction() {
        this._remainingToFinishAction--;
        if (this._remainingToFinishAction < 0) {
            throw new Error(`RemainingToTakeAction is negative number!`);
        }
    }
    markResourcesOnTile(tile, action, source, resource) {
        const args = resource ? [resource] : ["left", "right"];
        args.forEach((arg) => {
            if (tile.canResourceActionBePerformed(action, arg, source)) {
                tile.markResourceForAction(arg, action, source);
            }
        });
    }
    countMarkableResources(tiles, action, source, resource = null) {
        let count = 0;
        tiles.forEach((tile) => {
            const args = resource ? [resource] : ["left", "right"];
            args.forEach((arg) => {
                if (tile.canResourceActionBePerformed(action, arg, source)) {
                    count++;
                    console.log("COUNT:", count);
                    console.log("arg", arg);
                }
            });
        });
        return count;
    }
}
exports.TileMarkerService = TileMarkerService;
//# sourceMappingURL=TileMarkerService.js.map