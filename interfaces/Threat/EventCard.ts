import { IResources } from "../Resources/Resources";

export type IEventCardRenderData = Omit<
  IEventCard,
  "reward" | "triggerThreatEffect" | "renderData"
>;

export interface IEventCard {
  id: number;
  name: string;
  reward: unknown;
  renderData: IEventCardRenderData;

  triggerThreatEffect(game: unknown): void;
}
