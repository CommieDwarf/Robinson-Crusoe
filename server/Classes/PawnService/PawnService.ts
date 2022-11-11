import { IPawnsService } from "../../../interfaces/Pawns/Pawns";
import { IPawn, IPawnRenderData } from "../../../interfaces/Pawns/Pawn";

import { PawnArrayName } from "../../../interfaces/Pawns/Pawns";
import { Pawn } from "./Pawn";
import { ICharacter } from "../../../interfaces/Characters/Character";

export class PawnsService implements IPawnsService {
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

  get character(): ICharacter {
    return this._character;
  }

  get renderData(): IPawnRenderData[] {
    return this._freePawns.map((pawn) => {
      return pawn.renderData;
    });
  }

  private _freePawns: IPawn[];
  private _pawns: IPawn[];
  private readonly _character: ICharacter;
  _initialQuantity: number;

  constructor(character: ICharacter, initialQuantity: number) {
    this._character = character;
    this._pawns = this.getInitialPawns(initialQuantity);
    this._freePawns = this._pawns;
    this._initialQuantity = initialQuantity;
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
    this._freePawns = this._pawns;
  }

  private getInitialPawns(initialQuantity: number): IPawn[] {
    const pawns: IPawn[] = [];
    for (let i = 0; i < initialQuantity; i++) {
      pawns.push(new Pawn(i, this.character));
    }
    return pawns;
  }

  findPawn(draggableId: string, source: PawnArrayName): IPawn | undefined {
    return this[source].find((pawn) => pawn.draggableId === draggableId);
  }
}
