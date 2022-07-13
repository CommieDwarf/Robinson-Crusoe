import Pawn from "../interfaces/Pawn";
import AdditionalActivity from "../interfaces/AdditionalActivity";

class Activity implements AdditionalActivity {
  type: "arrange" | "rest";
  pawns: number;

  constructor(type: "arrange" | "rest") {
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

const rest = new Activity("rest");
const arrange = new Activity("arrange");

const activities = { rest, arrange };

export default activities;
