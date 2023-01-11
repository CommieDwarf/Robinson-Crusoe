import { IGame } from "../../../../interfaces/Game";
import { ADVENTURE_CARD } from "../../../../interfaces/AdventureService/ADVENTURE_CARD";

export abstract class AdventureCard {
  protected readonly _name: ADVENTURE_CARD;
  protected readonly _namePL: string;
  protected readonly _decide: boolean;
  protected readonly _eventNamePL: string = "";
  protected readonly _game: IGame;

  protected constructor(
    name: ADVENTURE_CARD,
    namePL: string,
    decide: boolean,
    game: IGame
  ) {
    this._name = name;
    this._namePL = namePL;
    this._decide = decide;
    this._game = game;
  }

  get decide(): boolean {
    return this._decide;
  }

  get name(): ADVENTURE_CARD {
    return this._name;
  }

  get namePL(): string {
    return this._namePL;
  }

  get eventNamePL(): string {
    return this._eventNamePL;
  }

  get game(): IGame {
    return this._game;
  }

  option1() {}

  option2() {}

  eventEffect() {}

  protected shuffleIntoEventDeck() {
    //TODO: implement
  }

  protected getPrimeCharacter() {
    return this._game.playerService.primePlayer.getCharacter();
  }
}
