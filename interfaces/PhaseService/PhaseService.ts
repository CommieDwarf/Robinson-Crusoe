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

export interface IPhaseService {
  phase: Phase;
  goNextPhase: () => void;
  renderData: IPhaseServiceRenderData;
}
