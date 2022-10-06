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
  get pawnsAssigned(): number {
    return this._pawnsAssigned;
  }

  get game(): IGame | null {
    return this._game;
  }

  get effects(): {
    triggerEffect: () => void;
    triggerThreatEffect: () => void;
    fullFill: () => void;
  } {
    return this._effects;
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

  get extraReward(): unknown {
    return this._extraReward;
  }

  get reward(): unknown {
    return this._reward;
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
  private readonly _reward: unknown;
  private readonly _extraReward: unknown;
  private readonly _type: EVENT_TYPE;
  private _pawnsAssigned = 0;
  private readonly _requirements: Requirements;
  private _game: IGame | null = null;
  private readonly _effects: {
    triggerEffect: () => void;
    triggerThreatEffect: () => void;
    fullFill: () => void;
  };
  private _character: ICharacter | null = null;
  slot: null | "left" | "right" = null;

  constructor(
    name: string,
    namePL: string,
    id: number,
    reward: unknown,
    extraReward: unknown,
    type: EVENT_TYPE,
    requirements: Requirements,
    effects: EventEffects
  ) {
    this._name = name;
    this._namePL = namePL;
    this._id = id;
    this._reward = reward;
    this._extraReward = extraReward;
    this._type = type;
    this._requirements = requirements;
    this._effects = effects;
  }

  setCharacter(char: ICharacter) {
    this._character = char;
  }

  unsetCharacter() {
    this._character = null;
  }

  setSlot(slot: "left" | "right") {
    this.slot = slot;
  }

  unsetSlot() {
    this.slot = null;
  }
}
