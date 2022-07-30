import { IPawn } from "../../../interfaces/Pawn";
import { Pawn } from "../Pawns/Pawns";

import { ICharacter } from "../../../interfaces/Characters/Character";

export abstract class PlayerCharacter implements ICharacter {
  freePawns: IPawn[];
  pawns: IPawn[];
  gender: "male" | "female";
  name = "";

  protected constructor(gender: "male" | "female") {
    this.pawns = this.getInitialPawns();
    this.freePawns = this.pawns;
    this.gender = gender;
  }

  protected getInitialPawns() {
    if (!this.name) {
      throw Error("Character has no name");
    }

    const pawns: IPawn[] = [];
    for (let i = 0; i < 2; i++) {
      pawns.push(new Pawn(i, this));
    }
    return pawns;
  }
}
