import {
  EVENT_TYPE,
  IEventCard,
  IEventCardRenderData,
  EventResolveRequirements,
} from "../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../interfaces/Game";
import { v4 as uuidv4 } from "uuid";
import { IPawn } from "../../../../interfaces/Pawns/Pawn";

//TODO: implement name translations

export class EventCard implements IEventCard {
  private readonly _id = uuidv4();
  private readonly _name: string;
  private readonly _type: EVENT_TYPE;
  private readonly _requirements: EventResolveRequirements;
  protected _game: IGame;

  constructor(
    name: string,
    type: EVENT_TYPE,
    requirements: EventResolveRequirements,
    game: IGame
  ) {
    this._name = name;
    this._type = type;
    this._requirements = requirements;
    this._game = game;
  }

  get renderData(): IEventCardRenderData {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      requiredPawns: this.requirements.pawns,
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get type(): EVENT_TYPE {
    return this._type;
  }

  protected getLeaderPawn(): IPawn {
    const slot = this._game.eventService.getSlotByCardID(this.id);
    const pawn = this._game.actionSlotService.getPawn(
      `threat-${slot}-leader-0`
    );
    if (!pawn) {
      throw new Error("Can't find leader pawn");
    }
    return pawn;
  }

  protected getHelperPawn(): IPawn | null {
    const slot = this._game.eventService.getSlotByCardID(this.id);
    return this._game.actionSlotService.getPawn(`threat-${slot}-helper-1`);
  }

  get requirements(): EventResolveRequirements {
    return this._requirements;
  }

  triggerEffect() {
    throw new Error("triggerEffect() not implemented");
  }

  triggerThreatEffect() {
    throw new Error("triggerThreatEffect() not implemented");
  }

  fullFill() {
    throw new Error("fullFill() not implemented");
  }
}
