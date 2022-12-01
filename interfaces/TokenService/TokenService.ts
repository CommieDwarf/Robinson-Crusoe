import { IToken, ITokenRenderData } from "./Token";

export interface ITokenService {
  allTokens: IToken[];
  ownedTokens: IToken[];
  useToken: (name: string) => void;
  renderData: ITokenServiceRenderData;
}

export interface ITokenServiceRenderData {
  allTokens: ITokenRenderData[];
  ownedTokens: ITokenRenderData[];
}
