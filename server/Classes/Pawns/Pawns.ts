import { IPawns } from "../../../interfaces/Pawns/Pawns";
import { IPawn } from "../../../interfaces/Pawns/Pawn";

import { PawnArrayName } from "../../../interfaces/Pawns/Pawns";
import { Pawn } from "./Pawn";
import { ICharacter } from "../../../interfaces/Characters/Character";

export class Pawns implements IPawns {
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

  private _freePawns: IPawn[];
  private _pawns: IPawn[];
  private readonly _character: ICharacter;
  _initialQuantity: number;

  constructor(character: ICharacter, initialQuantity: number) {
    this._pawns = this.getInitialPawns();
    this._freePawns = this._pawns;
    this._character = character;
    this._initialQuantity = initialQuantity;
  }

  addPawn(pawn: IPawn): void {
    this.pawns.push(pawn);
  }

  copyPawnToFreePawns(draggableId: string): void {
    const freePawn = this.findPawn(draggableId, "freePawns");
    if (freePawn) {
      throw new Error(
        `There is already pawn with id: ${draggableId} in freePawns[]`
      );
    }
    this.freePawns.push(this.findPawn(draggableId, "pawns"));
  }

  removePawn(draggableId: string, source: PawnArrayName): void {
    const pawn = this.findPawn(draggableId, source);
    this[source] = this[source].filter((p) => pawn === p);
  }

  resetFreePawns(): void {}

  private getInitialPawns(): IPawn[] {
    const pawns: IPawn[] = [];
    for (let i = 0; i < this._initialQuantity; i++) {
      pawns.push(new Pawn(i, this.character));
    }
    return pawns;
  }

  findPawn(draggableId: string, source: PawnArrayName): IPawn {
    const pawn = this[source].find((pawn) => pawn.draggableId === draggableId);
    if (!pawn) {
      throw new Error(
        `Couldn't find pawn with drag. id: ${draggableId} in ${source}[]`
      );
    }
    return pawn;
  }
}
