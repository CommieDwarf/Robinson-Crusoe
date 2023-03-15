import {
  IMysteryCard,
  MYSTERY_CARD_TYPE,
} from "../../../../../interfaces/MysteryService/MysteryCard";
import { IGame } from "../../../../../interfaces/Game";
import { ICharacter } from "../../../../../interfaces/Characters/Character";

export abstract class MysteryCard implements IMysteryCard {
  protected readonly _name: string;
  protected readonly _namePL: string;
  protected readonly _shuffleable: boolean;
  private readonly _eventName: string;
  protected readonly _game: IGame;
  protected declare readonly _type: MYSTERY_CARD_TYPE;
  protected readonly _requiresTargeting: boolean = false;
  protected _uses = 1;

  protected constructor(
    game: IGame,
    name: string,
    namePL: string,
    shuffleable: boolean,
    eventName: string
  ) {
    this._game = game;
    this._name = name;
    this._namePL = namePL;
    this._shuffleable = shuffleable;
    this._eventName = eventName;
  }

  protected getRenderData() {
    return {
      name: this._name,
      namePL: this._namePL,
      type: this._type,
      shuffleable: this._shuffleable,
    };
  }

  get renderData() {
    return this.getRenderData();
  }

  get uses(): number {
    return this._uses;
  }

  get eventName(): string {
    return this._eventName;
  }

  get name(): string {
    return this._name;
  }

  get namePL(): string {
    return this._namePL;
  }

  get type(): MYSTERY_CARD_TYPE {
    return this._type;
  }

  get shuffleable(): boolean {
    return this._shuffleable;
  }

  get requiresTarget(): boolean {
    return this._requiresTargeting;
  }

  protected addCardAsReminder() {
    this._game.mysteryService.addCardAsReminder(this);
  }

  protected shuffleIntoEventDeck() {
    if (!this._shuffleable) {
      throw new Error(
        "shuffleIntoEventDeck method is used but card is marked as unshuffleable. " +
          this._name
      );
    }
    //TODO: implement
  }

  use(...args: any[]): void {
    this._uses--;
  }

  triggerDrawEffect(drawer: ICharacter) {}

  triggerEventEffect() {}
}
