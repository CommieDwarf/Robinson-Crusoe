import {IToken, ITokenRenderData} from "./Token";

export interface ITokenService {
    ownedTokens: IToken[];
    renderData: ITokenServiceRenderData;
    useToken: (id: string, targetName: string | null) => void;
    addRandomTokensToOwned: (amount: number) => void;
    addRandomTokensToFuture: (amount: number) => void;

    onActionEnd: () => void;

}

export interface ITokenServiceRenderData {
    owned: ITokenRenderData[];
    future: ITokenRenderData[];
}
