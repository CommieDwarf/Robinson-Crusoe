import { IResources } from "../Resources/Resources";

export interface IEventCard {
  id: number;
  name: string;
  reward: unknown;

  triggerThreatEffect(game: unknown): void;
}
