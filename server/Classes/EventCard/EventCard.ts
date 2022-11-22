import {
  EVENT_TYPE,
  IEventCard,
  IEventCardRenderData,
  Requirements,
} from "../../../interfaces/Threat/EventCard";
import { IGame } from "../../../interfaces/Game";
import { ICharacter } from "../../../interfaces/Characters/Character";
import { EVENT_CARD_PL } from "../../../interfaces/TRANSLATE_PL/CATEGORIES/EVENT_CARD_PL";

export class EventCard implements IEventCard {
  get namePL(): EVENT_CARD_PL {
    return this._namePL;
  }

  private readonly _id: number;
  private readonly _name: keyof typeof EVENT_CARD_PL;
  private readonly _namePL: EVENT_CARD_PL;
  private readonly _type: EVENT_TYPE;
  private _pawnsAssigned = 0;
  private readonly _requirements: Requirements;
  private _game: IGame | null = null;
  private readonly _triggerEffect: () => void;
  private readonly _triggerThreatEffect: () => void;
  private readonly _fullFill: (character: ICharacter, helper: boolean) => void;

  constructor(
    name: keyof typeof EVENT_CARD_PL,
    id: number,
    type: EVENT_TYPE,
    requirements: Requirements,
    triggerEffect: (this: EventCard) => void,
    triggerThreatEffect: (this: EventCard) => void,
    fullFill: (this: EventCard, leader: ICharacter, helper: boolean) => void
  ) {
    this._name = name;
    this._namePL = EVENT_CARD_PL[name];
    this._id = id;
    this._type = type;
    this._requirements = requirements;
    this._triggerEffect = triggerEffect;
    this._triggerThreatEffect = triggerThreatEffect;
    this._fullFill = fullFill;
  }

  get renderData(): IEventCardRenderData {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
    };
  }

  get triggerEffect(): () => void {
    return this._triggerEffect;
  }

  get triggerThreatEffect(): () => void {
    return this._triggerThreatEffect;
  }

  get fullFill(): (character: ICharacter, helper: boolean) => void {
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

  get id(): number {
    return this._id;
  }

  get name(): keyof typeof EVENT_CARD_PL {
    return this._name;
  }
}
