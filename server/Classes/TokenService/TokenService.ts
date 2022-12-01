import { ITokenService } from "../../../interfaces/TokenService/TokenService";
import { IToken } from "../../../interfaces/TokenService/Token";
import { IGame } from "../../../interfaces/Game";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import { ISideCharacter } from "../../../interfaces/Characters/SideCharacter";

export class TokenService implements ITokenService {
  get character(): IPlayerCharacter {
    return this._character;
  }

  private _allTokens: IToken[] = [];
  private _ownedTokens: IToken[] = [];
  private _game: IGame;
  private _character: IPlayerCharacter;

  constructor(game: IGame, character: IPlayerCharacter) {
    this._game = game;
    this._character = character;
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
