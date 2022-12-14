import {
  IToken,
  ITokenRenderData,
} from "../../../../../interfaces/TokenService/Token";
import { TOKEN_PL } from "../../../../../interfaces/TRANSLATE_PL/CATEGORIES/TOKEN_PL";
import { IPlayerCharacter } from "../../../../../interfaces/Characters/PlayerCharacter";
import { IGame } from "../../../../../interfaces/Game";
import { v4 as uuidv4 } from "uuid";

export abstract class Token implements IToken {
  protected _name: keyof typeof TOKEN_PL;
  protected _namePL: TOKEN_PL;
  protected _description: string;
  protected _game: IGame;
  protected _character: IPlayerCharacter;
  protected _used: boolean = false;
  protected _sourceLog: string;
  protected _id = uuidv4();

  protected constructor(
    game: IGame,
    character: IPlayerCharacter,
    name: keyof typeof TOKEN_PL,
    description: string
  ) {
    this._game = game;
    this._character = character;
    this._name = name;
    this._namePL = TOKEN_PL[name];
    this._description = description;
    this._sourceLog = "Żeton: " + this._namePL;
  }

  get renderData(): ITokenRenderData {
    return {
      name: this._name,
      namePL: this._namePL,
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

  get name(): keyof typeof TOKEN_PL {
    return this._name;
  }

  get namePL(): TOKEN_PL {
    return this._namePL;
  }

  get description(): string {
    return this._description;
  }

  public use(): void {
    throw new Error("Usage not implemented");
  }

  public autoUse(): void {
    throw new Error("Auto discard not implemented");
  }
}
