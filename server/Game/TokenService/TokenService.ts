import {ITokenService} from "../../../interfaces/TokenService/TokenService";
import {
    DISCOVERY_TOKEN,
    IToken,
} from "../../../interfaces/TokenService/Token";
import {IGame} from "../../../interfaces/Game";
import {TokenCreator} from "./TokenCreator/TokenCreator";
import {doubledDiscoveryTokens} from "../../../constants/doubledDiscoveryTokens";
import shuffle from "../../../utils/shuffleArray";
import {ICreator} from "../../../interfaces/Creator/Creator";

export class TokenService implements ITokenService {
    private _tokenStack: DISCOVERY_TOKEN[];

    private _owned: IToken[] = [];
    private _future: IToken[] = [];
    private _game: IGame;
    private _tokenCreator: ICreator<IToken, DISCOVERY_TOKEN>;

    constructor(game: IGame) {
        this._game = game;
        this._tokenStack = shuffle(this.getTokenStack());
        this._tokenCreator = new TokenCreator(game);
        // this.testTokens();
    }

    get ownedTokens(): IToken[] {
        return this._owned;
    }

    get renderData() {
        return {
            owned: this._owned.map((token) => token.renderData),
            future: this._future.map((token) => token.renderData),
        };
    }


    private getOwnedToken(id: string): IToken {
        const token = this._owned.find((token) => token.id === id);
        if (!token) {
            throw new Error("Can't find token with given id: " + id);
        }
        return token;
    }

    private getTokenStack(): DISCOVERY_TOKEN[] {
        const tokenList = Object.values(DISCOVERY_TOKEN);
        doubledDiscoveryTokens.forEach((name) => tokenList.push(name));
        return tokenList;
    }

    private testTokens() {
        const length = this._tokenStack.length;
        for (let i = 0; i < length; i++) {
        }
        // const testSet = new Set<string>();
        //
        // this.ownedTokens.forEach((token) => {
        //     if (testSet.has(token.id)) {
        //         throw new Error("powtarza sie");
        //     }
        //     testSet.add(token.id);
        // });
    }

    private autoUseFutureTokens() {
        this._owned.forEach((token) => token.autoDiscard());
    }

    public useToken(id: string, targetName: string | null = null) {
        const user = this._game.localPlayer
        const target = targetName
            ? this._game.characterService.getCharacter(targetName)
            : null;

        //target fixed for now.
        //TODO: make targeting other characters.
        const token = this.getOwnedToken(id)
        token.use(user, user.getCharacter());
        if (token.used) {
            this._owned = this._owned.filter((tok) => tok !== token);
        }
    }

    public addRandomTokensToFuture(amount: number) {
        for (let i = 0; i < amount; i++) {
            this._future.push(this.getRandomToken())
        }
    }

    public addRandomTokensToOwned(amount: number) {
        for (let i = 0; i < amount; i++) {
            this._owned.push(this.getRandomToken())
        }
    }

    private moveFutureToOwned() {
        this._owned = this._owned.concat(this._future);
        this._future = [];
    }

    public onActionEnd() {
        this.autoUseFutureTokens();
        this.moveFutureToOwned();
    }

    private getRandomToken(): IToken {
        const tokenName = this._tokenStack.pop();
        if (tokenName) {
            return this._tokenCreator.create(tokenName);
        } else {
            throw new Error("Empty tokenStack!");
        }
    }
}
