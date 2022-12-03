import { IToken, ITokenRenderData } from "./Token";
import { IPlayerCharacter } from "../Characters/PlayerCharacter";

export interface ITokenService {
  ownedTokens: IToken[];
  useToken: (name: string) => void;
  renderData: ITokenServiceRenderData;
  character: IPlayerCharacter;
  addRandomTokenToOwned: () => void;
}

export interface ITokenServiceRenderData {
  owned: ITokenRenderData[];
}
