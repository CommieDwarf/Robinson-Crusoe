import {
  DISCOVERY_TOKEN,
  IToken,
  ITokenRenderData,
} from "../../../../../interfaces/TokenService/Token";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { IGame } from "../../../../../interfaces/Game";
import { v4 as uuidv4 } from "uuid";
import { ICharacter } from "../../../../../interfaces/Characters/Character";

export abstract class Token implements IToken {
  protected _name: DISCOVERY_TOKEN;
  protected _description: string;
  protected _game: IGame;
  protected _used: boolean = false;
  protected _sourceLog: string;
  protected _id = uuidv4();

  protected constructor(
    game: IGame,
    name: DISCOVERY_TOKEN,
    description: string
  ) {
    this._game = game;
    this._name = name;
    this._description = description;
    this._sourceLog = "Żeton: " + this.name;
  }

  get renderData(): ITokenRenderData {
    return {
      name: this._name,
      description: this._description,
      id: this._id,
    };
  }

  get used(): boolean {
    return this._used;
  }

  get id(): string {
    return this._id;
  }

  get name(): DISCOVERY_TOKEN {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  public use(user: IPlayerCharacter, target: ICharacter | null = null): void {
    this._game.chatLog.addMessage(
      `postać ${user.name} użyła ${this.name}`,
      "neutral",
      "Żeton odkryć"
    );
  }

  public autoDiscard(): void {
    this._game.chatLog.addMessage(
      `żeton ${this.name} został użyty`,
      "neutral",
      "Auto-użycie"
    );
  }
}
