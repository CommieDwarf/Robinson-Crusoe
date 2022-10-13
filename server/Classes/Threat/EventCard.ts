import {
  EVENT_TYPE,
  IEventCard,
  IEventCardRenderData,
  Requirements,
} from "../../../interfaces/Threat/EventCard";
import { IGame } from "../../../interfaces/Game";
import { EventEffects } from "../../../interfaces/Threat/EventCard";
import { ICharacter } from "../../../interfaces/Characters/Character";

export class EventCard implements IEventCard {
  get triggerEffect(): () => void {
    return this._triggerEffect;
  }

  get triggerThreatEffect(): () => void {
    return this._triggerThreatEffect;
  }

  get fullFill(): (character: ICharacter) => void {
    return this._fullFill;
  }

  get pawnsAssigned(): number {
    return this._pawnsAssigned;
  }

  get game(): IGame | null {
    return this._game;
  }

  get requirements(): Requirements {
    return this._requirements;
  }

  get type(): EVENT_TYPE {
    return this._type;
  }

  get namePL(): string {
    return this._namePL;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get renderData(): IEventCardRenderData {
    return {
      id: this.id,
      name: this.name,
    };
  }

  private readonly _id: number;
  private readonly _name: string;
  private readonly _namePL: string;
  private readonly _type: EVENT_TYPE;
  private _pawnsAssigned = 0;
  private readonly _requirements: Requirements;
  private _game: IGame | null = null;
  private _triggerEffect: () => void;
  private _triggerThreatEffect: () => void;
  private _fullFill: (character: ICharacter) => void;

  constructor(
    name: string,
    namePL: string,
    id: number,
    type: EVENT_TYPE,
    requirements: Requirements,
    triggerEffect: (this: EventCard) => void,
    triggerThreatEffect: (this: EventCard) => void,
    fullFill: (this: EventCard, character: ICharacter) => void
  ) {
    this._name = name;
    this._namePL = namePL;
    this._id = id;
    this._type = type;
    this._requirements = requirements;
    this._triggerEffect = triggerEffect;
    this._triggerThreatEffect = triggerThreatEffect;
    this._fullFill = fullFill;
  }
}
