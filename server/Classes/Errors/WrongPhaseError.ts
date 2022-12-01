import { Phase } from "../../../interfaces/PhaseService/PhaseService";

export class WrongPhaseError extends Error {
  private readonly _itemName: string;
  private readonly _phase: Phase;
  private readonly _properPhase: Phase | null;

  constructor(itemName: string, phase: Phase, properPhase: Phase | null) {
    super();
    this._itemName = itemName;
    this._phase = phase;
    this._properPhase = properPhase;
  }

  get phase(): Phase {
    return this._phase;
  }

  get itemName(): string {
    return this._itemName;
  }

  get properPhase(): Phase | null {
    return this._properPhase;
  }
}
