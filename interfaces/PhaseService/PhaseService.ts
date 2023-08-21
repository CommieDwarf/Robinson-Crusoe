export type Phase =
  | "event"
  | "morale"
  | "production"
  | "preAction"
  | "action"
  | "weather"
  | "night";

export interface IPhaseServiceRenderData {
  phase: Phase;
  locked: boolean;
}

export interface PhaseEffects {
  event: () => void;
  morale: () => void;
  production: () => void;
  preAction: () => void;
  action: () => void;
  weather: () => void;
  night: () => void;
}

export interface IPhaseService {
  phase: Phase;
  goNextPhase: () => void;
  renderData: IPhaseServiceRenderData;
  phaseEffects: PhaseEffects;
  addPhaseEffect: (effect: Function) => void;
  removePhaseEffect: (effect: Function) => void;
}
