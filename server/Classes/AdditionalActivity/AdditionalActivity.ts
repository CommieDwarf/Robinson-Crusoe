import Pawn from "../../../interfaces/Pawns/Pawn";
import AdditionalActivity from "../../../interfaces/AdditionalActivity";

class Activity implements AdditionalActivity {
  type: "arrangeCamp" | "rest";
  pawns: number;

  constructor(type: "arrangeCamp" | "rest") {
    this.type = type;
    this.pawns = 0;
  }

  incrementPawns() {
    this.pawns++;
  }

  decrementPawns() {
    this.pawns--;
  }

  resetPawns() {
    this.pawns = 0;
  }
}

export default Activity;
