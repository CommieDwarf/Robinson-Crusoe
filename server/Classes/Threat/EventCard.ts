import { IEventCard } from "../../../interfaces/Threat/EventCard";

export class EventCard implements IEventCard {
  get reward(): unknown {
    return this._reward;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  private readonly _id: number;
  private readonly _name: string;
  private readonly _reward: unknown;

  constructor(name: string, id: number, reward: unknown) {
    this._name = name;
    this._id = id;
    this._reward = reward;
  }

  triggerThreatEffect(game: any) {
    console.log("threat effect");
  }
}
