import { ITokenService } from "../../../interfaces/TokenService/TokenService";
import { IToken } from "../../../interfaces/TokenService/Token";
import { IGame } from "../../../interfaces/Game";

export class TokenService implements ITokenService {
  private _allTokens: IToken[] = [];
  private _ownedTokens: IToken[] = [];
  private _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  get allTokens(): IToken[] {
    return this._allTokens;
  }

  get ownedTokens(): IToken[] {
    return this._ownedTokens;
  }

  get renderData() {
    return {
      allTokens: this._allTokens.map((token) => token.renderData),
      ownedTokens: this._ownedTokens.map((token) => token.renderData),
    };
  }

  public useToken(name: string) {
    this.getOwnedToken(name).use();
  }

  private getOwnedToken(name: string): IToken {
    const token = this._ownedTokens.find((token) => token.name === name);
    if (!token) {
      throw new Error("Can't find token with given name: " + name);
    }

    return token;
  }
}
