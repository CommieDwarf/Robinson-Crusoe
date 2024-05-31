import {DISCOVERY_TOKEN, IToken, ITokenRenderData} from "./Token";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export interface ITokenService {
    ownedTokens: IToken[];
    renderData: ITokenServiceRenderData;
    useToken: (id: string, character: ICharacter) => void;
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
