import {
  EVENT_TYPE,
  EventResolveRequirements,
  IEventCard,
  IEventCardRenderData,
} from "../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../interfaces/Game";
import { v4 as uuidv4 } from "uuid";
import { IPawn } from "../../../../interfaces/Pawns/Pawn";
import {
  EVENT_CARD,
  WRECKAGE_CARD,
} from "../../../../interfaces/EventService/EVENT_CARD";
import { ICharacter } from "../../../../interfaces/Characters/Character";
import { ACTION, AdventureAction } from "../../../../interfaces/ACTION";

//TODO: implement name translations

export abstract class EventCard implements IEventCard {
  protected declare _namePL: string;
  protected declare _resolutionPL: string;
  protected readonly _id = uuidv4();
  protected readonly _name: string;
  protected readonly _type: AdventureAction | EVENT_TYPE;
  protected readonly _requirements: EventResolveRequirements;
  protected _game: IGame;
  protected _requiredHelperAmount: number;

  protected constructor(
    name: EVENT_CARD | WRECKAGE_CARD,
    type: AdventureAction | EVENT_TYPE,
    requirements: EventResolveRequirements,
    game: IGame
  ) {
    this._name = name;
    this._type = type;
    this._requirements = requirements;
    this._game = game;
    this._requiredHelperAmount = this._requirements.pawns;
  }

  get renderData(): IEventCardRenderData {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      requiredHelperAmount: this._requiredHelperAmount,
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get namePL(): string {
    return this._namePL;
  }

  get resolutionPL(): string {
    return this._resolutionPL;
  }

  get type(): EVENT_TYPE | AdventureAction {
    return this._type;
  }

  get requiredHelperAmount(): number {
    return this._requiredHelperAmount;
  }

  protected getLeaderCharacter(): ICharacter {
    const slot = this._game.eventService.getSlotByCardID(this.id);
    const pawn = this._game.actionSlotService.getPawn(
      `threat-${slot}-leader-0`
    );
    if (!pawn) {
      throw new Error("Can't find leader pawn");
    }
    return pawn.character;
  }

  protected getHelperPawn(): IPawn | null {
    const slot = this._game.eventService.getSlotByCardID(this.id);
    return this._game.actionSlotService.getPawn(`threat-${slot}-helper-1`);
  }

  get requirements(): EventResolveRequirements {
    return this._requirements;
  }

  public setAdventureToken() {
    if (
      this._type === ACTION.BUILD ||
      this._type === ACTION.EXPLORE ||
      this._type === ACTION.GATHER
    ) {
      this._game.actionService.setAdventureToken(this._type, true, this.namePL);
    }
  }

  triggerEffect() {}

  triggerThreatEffect() {
    throw new Error("triggerThreatEffect() not implemented");
  }

  fullFill() {
    throw new Error("fullFill() not implemented");
  }

  protected incrDetermination(amount: number) {
    this._game.characterService.incrDetermination(
      this.getLeaderCharacter(),
      amount,
      this._resolutionPL
    );
  }
}
