import {IPawnService, IPawnServiceRenderData, PawnArrayName,} from "@shared/types/Game/Pawns/PawnService";
import {IPawn, IPawnOwner, PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";
import {Pawn} from "./Pawn/Pawn";
import {IGame} from "@shared/types/Game/Game";

export class PawnService<Owner extends IPawnOwner> implements IPawnService<Owner> {
    private _freePawns: IPawn<Owner>[] = [];
    private _pawns: IPawn<Owner>[] = [];
    private readonly _owner: Owner;

    private readonly _game: IGame;
    private _pawnIdCounter = 0;

    constructor(game: IGame, owner: Owner) {
        this._game = game;
        this._owner = owner;
        // this._pawns = this.initPawns(2, false, null, this._pawnIdCounter++);
        this._freePawns = [...this._pawns];
    }

    get renderData(): IPawnServiceRenderData<Owner["renderData"]> {
        return {
            freePawns: this._freePawns.map((pawn) => pawn.renderData),
            pawns: this._pawns.map((pawn) => pawn.renderData)
        }
    }


    get freePawns(): IPawn<Owner>[] {
        return this._freePawns;
    }

    get pawns(): IPawn<Owner>[] {
        return this._pawns;
    }

    get owner(): Owner {
        return this._owner;
    }

    copyPawnToFreePawns(draggableId: string): void {
        const duplicated = this.findPawn(draggableId, "freePawns");
        if (duplicated) {
            throw new Error(
                `There is already pawn with id: ${draggableId} in freePawns[]`
            );
        }
        let pawn = this.findPawn(draggableId, "pawns");
        if (!pawn) {
            throw new Error(
                "Character doesn't own pawn with draggable id: " + draggableId
            );
        }

        this.freePawns.push(pawn);
    }

    removePawn(draggableId: string, source: PawnArrayName): void {
        const pawn = this.findPawn(draggableId, source);
        // @ts-ignore
        this["_" + source] = this[source].filter((p) => pawn !== p);
    }

    resetFreePawns(): void {
        this._pawns.forEach((pawn) => {
            if (!this._freePawns.includes(pawn) && !pawn.disposable) {
                this._freePawns.push(pawn);
            }
        })
    }

    public addPawn(disposable: boolean, action: PAWN_HELPER_ACTION | null) {
        const pawn = new Pawn<Owner>(this._owner, disposable, action, ++this._pawnIdCounter);
        this._pawns.push(pawn);
        this._freePawns.push(pawn);
    }

    public destroyPawn(draggableId: string): void {
        this.removePawn(draggableId, "pawns");
        this.removePawn(draggableId, "freePawns");
        this._game.globalPawnService.removeItemPawn(draggableId);
    }

    public destroyAllPawns(): void {
        this._pawns.forEach((pawn) => this.destroyPawn(pawn.draggableId));
    }

    public initPawns = (initialQuantity: number, disposable: boolean, action: PAWN_HELPER_ACTION | null) => {
        const pawns: IPawn<Owner>[] = [];
        for (let i = 0; i < initialQuantity; i++) {
            pawns.push(new Pawn(this.owner, disposable, action, ++this._pawnIdCounter));
        }
        this._pawns = [...pawns];
        this._freePawns = [...pawns];
    }

    private getPawn(draggableId: string) {
        const pawn = this.pawns.find((p) => p.draggableId === draggableId);
        if (!pawn) {
            throw new Error("Can't find pawn width id: " + draggableId);
        }
        return pawn;
    }

    findPawn(draggableId: string, array: PawnArrayName): IPawn<Owner> | undefined {
        return this[array].find((pawn) => pawn.draggableId === draggableId);
    }
}
