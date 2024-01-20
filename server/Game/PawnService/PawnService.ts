import {
    IPawnService,
    IPawnServiceRenderData,
} from "../../../interfaces/Pawns/Pawns";
import {IPawn, IPawnHelper} from "../../../interfaces/Pawns/Pawn";

import {PawnArrayName} from "../../../interfaces/Pawns/Pawns";
import {Pawn} from "./Pawn/Pawn";
import {IPlayerCharacter} from "../../../interfaces/Characters/PlayerCharacter";

export class PawnService implements IPawnService {
    private _freePawns: (IPawn | IPawnHelper)[] = [];
    private _pawns: (IPawn | IPawnHelper)[] = [];
    private readonly _character: IPlayerCharacter;
    _initialQuantity: number;

    constructor(character: IPlayerCharacter, initialQuantity: number) {
        this._character = character;
        this._pawns = this.initPawns(initialQuantity);
        this._freePawns = [...this._pawns];
        this._initialQuantity = initialQuantity;
    }

    get renderData(): IPawnServiceRenderData {
        return {
            freePawns: this._freePawns.map((pawn) => pawn.renderData),
        };
    }

    set freePawns(value: IPawn[]) {
        this._freePawns = value;
    }

    set pawns(value: IPawn[]) {
        this._pawns = value;
    }

    get freePawns(): IPawn[] {
        return this._freePawns;
    }

    get pawns(): IPawn[] {
        return this._pawns;
    }

    get character(): IPlayerCharacter {
        return this._character;
    }

    addPawn(pawn: IPawn): void {
        this.pawns.push(pawn);
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
                "character doesn't own pawn with draggable id: " + draggableId
            );
        }

        this.freePawns.push(pawn);
    }

    removePawn(draggableId: string, source: PawnArrayName): void {
        const pawn = this.findPawn(draggableId, source);
        this[source] = this[source].filter((p) => pawn !== p);
    }

    resetFreePawns(): void {
        this._pawns.forEach((pawn) => {
            if (!this._freePawns.includes(pawn) && !("disposable" in pawn)) {
                this._freePawns.push(pawn);
            }
        })
    }

    private initPawns(initialQuantity: number): IPawn[] {
        const pawns: IPawn[] = [];
        for (let i = 0; i < initialQuantity; i++) {
            pawns.push(new Pawn(this.character));
        }
        return pawns;
    }

    findPawn(draggableId: string, array: PawnArrayName): IPawn | undefined {
        return this[array].find((pawn) => pawn.draggableId === draggableId);
    }
}
