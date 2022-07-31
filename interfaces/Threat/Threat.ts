import { IEventCard } from "./EventCard";

export interface ThreatSlotsObj {
  left: IEventCard | null;
  right: IEventCard | null;
}

export interface IThreat {
  leftSlot: IEventCard | null;
  rightSlot: IEventCard | null;
  moveCardsLeft: () => void;
}
