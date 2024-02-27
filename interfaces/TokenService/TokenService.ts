import {IToken, ITokenRenderData} from "./Token";

export interface ITokenService {
    ownedTokens: IToken[];
    renderData: ITokenServiceRenderData;
    useToken: (id: string, targetName: string | null) => void;
    autoUseOwnedTokens: () => void;
    addRandomTokensToOwned: (amount: number) => void;
}

export interface ITokenServiceRenderData {
    owned: ITokenRenderData[];
}
