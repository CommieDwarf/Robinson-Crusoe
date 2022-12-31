import { IToken, ITokenRenderData } from "./Token";

export interface ITokenService {
  ownedTokens: IToken[];
  renderData: ITokenServiceRenderData;
  useToken: (userName: string, id: string, targetName: string | null) => void;
  autoUseOwnedTokens: () => void;
  addRandomTokenToOwned: () => void;
}

export interface ITokenServiceRenderData {
  owned: ITokenRenderData[];
}
