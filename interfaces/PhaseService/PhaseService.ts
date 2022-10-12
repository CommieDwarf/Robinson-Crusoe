import { PHASE } from "./Phase";

export type Phase =
  | "event"
  | "morale"
  | "production"
  | "action"
  | "weather"
  | "night";

export interface IPhaseServiceRenderData {
  phase: Phase;
}

export interface PhaseEffects {
  event: () => void;
  morale: () => void;
  production: () => void;
  action: () => void;
  weather: () => void;
  night: () => void;
}

export interface IPhaseService {
  phase: Phase;
  goNextPhase: () => void;
  renderData: IPhaseServiceRenderData;
  phaseEffects: PhaseEffects;
}
