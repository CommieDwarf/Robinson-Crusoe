import { IEventCard, IEventCardRenderData } from "./EventCard";

export interface IThreatRenderData {
  leftSlot: IEventCardRenderData | null;
  rightSlot: IEventCardRenderData | null;
}

export interface IThreat {
  leftSlot: IEventCard | null;
  rightSlot: IEventCard | null;
  moveCardsLeft: () => void;
  renderData: IThreatRenderData;
}
