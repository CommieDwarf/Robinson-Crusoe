import { IToken, ITokenRenderData } from "./Token";
import { IPlayerCharacter } from "../Characters/PlayerCharacter";

export interface ITokenService {
  allTokens: IToken[];
  ownedTokens: IToken[];
  useToken: (name: string) => void;
  renderData: ITokenServiceRenderData;
  character: IPlayerCharacter;
}

export interface ITokenServiceRenderData {
  allTokens: ITokenRenderData[];
  ownedTokens: ITokenRenderData[];
}
