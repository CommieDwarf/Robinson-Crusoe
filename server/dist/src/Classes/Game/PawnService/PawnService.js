"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PawnService = void 0;
const Pawn_1 = require("./Pawn/Pawn");
class PawnService {
    constructor(game, owner) {
        this._freePawns = [];
        this._pawns = [];
        this._pawnIdCounter = 0;
        this.initPawns = (initialQuantity, disposable, action) => {
            const pawns = [];
            for (let i = 0; i < initialQuantity; i++) {
                pawns.push(new Pawn_1.Pawn(this.owner, disposable, action, ++this._pawnIdCounter));
            }
            this._pawns = [...pawns];
            this._freePawns = [...pawns];
        };
        this._game = game;
        this._owner = owner;
        // this._pawns = this.initPawns(2, false, null, this._pawnIdCounter++);
        this._freePawns = [...this._pawns];
    }
    get renderData() {
        return {
            freePawns: this._freePawns.map((pawn) => pawn.renderData),
            pawns: this._pawns.map((pawn) => pawn.renderData)
        };
    }
    get freePawns() {
        return this._freePawns;
    }
    get pawns() {
        return this._pawns;
    }
    get owner() {
        return this._owner;
    }
    copyPawnToFreePawns(draggableId) {
        const duplicated = this.findPawn(draggableId, "freePawns");
        if (duplicated) {
            throw new Error(`There is already pawn with id: ${draggableId} in freePawns[]`);
        }
        let pawn = this.findPawn(draggableId, "pawns");
        if (!pawn) {
            throw new Error("Character doesn't own pawn with draggable id: " + draggableId);
        }
        this.freePawns.push(pawn);
    }
    removePawn(draggableId, source) {
        const pawn = this.findPawn(draggableId, source);
        // @ts-ignore
        this["_" + source] = this[source].filter((p) => pawn !== p);
    }
    resetFreePawns() {
        this._pawns.forEach((pawn) => {
            if (!this._freePawns.includes(pawn) && !pawn.disposable) {
                this._freePawns.push(pawn);
            }
        });
    }
    addPawn(disposable, action) {
        const pawn = new Pawn_1.Pawn(this._owner, disposable, action, ++this._pawnIdCounter);
        this._pawns.push(pawn);
        this._freePawns.push(pawn);
    }
    destroyPawn(draggableId) {
        this.removePawn(draggableId, "pawns");
        this.removePawn(draggableId, "freePawns");
        this._game.globalPawnService.removeItemPawn(draggableId);
    }
    destroyAllPawns() {
        this._pawns.forEach((pawn) => this.destroyPawn(pawn.draggableId));
    }
    getPawn(draggableId) {
        const pawn = this.pawns.find((p) => p.draggableId === draggableId);
        if (!pawn) {
            throw new Error("Can't find pawn width id: " + draggableId);
        }
        return pawn;
    }
    findPawn(draggableId, array) {
        return this[array].find((pawn) => pawn.draggableId === draggableId);
    }
}
exports.PawnService = PawnService;
//# sourceMappingURL=PawnService.js.map