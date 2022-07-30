import IResources from "./Resources";

export interface EventCard {
  name: string;

  getReward(numberOfPawnsAssigned: number): Map<keyof IResources, number>;

  triggerThreatEffect(game: {}): void;
}
