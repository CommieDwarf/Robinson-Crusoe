import { IToken, ITokenRenderData } from "./Token";
import { IPlayerCharacter } from "../Characters/PlayerCharacter";

export interface ITokenService {
  ownedTokens: IToken[];
  renderData: ITokenServiceRenderData;
  character: IPlayerCharacter;
  useToken: (name: string) => void;
  autoUseOwnedTokens: () => void;
  addRandomTokenToOwned: () => void;
}

export interface ITokenServiceRenderData {
  owned: ITokenRenderData[];
}
