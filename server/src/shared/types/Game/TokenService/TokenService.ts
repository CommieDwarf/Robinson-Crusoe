import {DISCOVERY_TOKEN, IToken, ITokenRenderData} from "./Token";

export interface ITokenService {
    ownedTokens: IToken[];
    renderData: ITokenServiceRenderData;
    useToken: (id: string, targetName: string | null) => void;
    addRandomTokensToOwned: (amount: number) => void;
    addRandomTokensToFuture: (amount: number) => void;
    getRandomTokenFromStack: () => IToken;

    addTokenToOwned: (token: IToken) => void;
    shuffleInToStack: (token: DISCOVERY_TOKEN) => void;
    onActionEnd: () => void;

}

export interface ITokenServiceRenderData {
    owned: ITokenRenderData[];
    future: ITokenRenderData[];
}
