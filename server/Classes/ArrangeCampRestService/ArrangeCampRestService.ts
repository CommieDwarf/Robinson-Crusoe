export class AdditionalActivity implements IAdditionalActivity {
  type: "arrangeCamp" | "rest";
  pawnAmount: number;

  constructor(type: "arrangeCamp" | "rest") {
    this.type = type;
    this.pawnAmount = 0;
  }

  incrementPawns() {
    this.pawnAmount++;
  }

  decrementPawns() {
    this.pawnAmount--;
  }

  resetPawns() {
    this.pawnAmount = 0;
  }
}
