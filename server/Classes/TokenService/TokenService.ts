import { ITokenService } from "../../../interfaces/TokenService/TokenService";
import {
  DiscoveryTokenName,
  IToken,
} from "../../../interfaces/TokenService/Token";
import { IGame } from "../../../interfaces/Game";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import { TokenCreator } from "./TokenCreator/TokenCreator";
import { doubledDiscoveryTokens } from "../../../constants/doubledDiscoveryTokens";
import shuffle from "../../../utils/shuffleArray";
import { ITokenCreator } from "../../../interfaces/TokenCreator/TokenCreator";

export class TokenService implements ITokenService {
  get character(): IPlayerCharacter {
    return this._character;
  }

  private _tokenStack: DiscoveryTokenName[];

  private _owned: IToken[] = [];
  private _game: IGame;
  private readonly _character: IPlayerCharacter;
  private _tokenCreator: ITokenCreator;

  constructor(game: IGame, character: IPlayerCharacter) {
    this._game = game;
    this._character = character;
    this._tokenStack = shuffle(this.getTokenStack());
    this._tokenCreator = new TokenCreator(game, character);
    this.testTokens();
  }

  get ownedTokens(): IToken[] {
    return this._owned;
  }

  get renderData() {
    return {
      owned: this._owned.map((token) => token.renderData),
    };
  }

  private discardUsedTokens() {
    this._owned = this._owned.filter((token) => !token.used);
  }

  private getOwnedToken(id: string): IToken {
    const token = this._owned.find((token) => token.id === id);
    if (!token) {
      throw new Error("Can't find token with given id: " + id);
    }
    return token;
  }

  private getTokenStack(): DiscoveryTokenName[] {
    const tokenList = Object.values(DiscoveryTokenName);
    doubledDiscoveryTokens.forEach((name) => tokenList.push(name));
    return tokenList;
  }

  private testTokens() {
    const length = this._tokenStack.length;
    for (let i = 0; i < length; i++) {
      this.addRandomTokenToOwned();
    }
  }

  public autoUseOwnedTokens() {
    this._owned.forEach((token) => token.autoUse());
  }

  public useToken(id: string) {
    this.getOwnedToken(id).use();
    this.discardUsedTokens();
  }

  public addRandomTokenToOwned() {
    const tokenName = this._tokenStack.pop();
    if (tokenName) {
      this._owned.push(this._tokenCreator.createToken(tokenName));
    }
  }
}
