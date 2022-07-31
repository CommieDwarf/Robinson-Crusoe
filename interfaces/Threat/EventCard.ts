import { IResources } from "../Resources";

export interface IEventCard {
  id: number;
  name: string;
  reward: unknown;

  triggerThreatEffect(game: unknown): void;
}
