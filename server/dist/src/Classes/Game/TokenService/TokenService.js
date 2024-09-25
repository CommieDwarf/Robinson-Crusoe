"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const Token_1 = require("../../../shared/types/Game/TokenService/Token");
const TokenCreator_1 = require("./TokenCreator/TokenCreator");
const doubledDiscoveryTokens_1 = require("../../../shared/constants/doubledDiscoveryTokens");
const shuffleArray_1 = __importDefault(require("../../../shared/utils/shuffleArray"));
class TokenService {
    constructor(game) {
        this._owned = [];
        this._future = [];
        this._game = game;
        this._tokenStack = (0, shuffleArray_1.default)(this.getTokenStack(), this._game.getRandomNumber);
        this._tokenCreator = new TokenCreator_1.TokenCreator(game);
        // this.testTokens();
    }
    get ownedTokens() {
        return this._owned;
    }
    get renderData() {
        return {
            owned: this._owned.map((token) => token.renderData),
            future: this._future.map((token) => token.renderData),
        };
    }
    getOwnedToken(id) {
        const token = this._owned.find((token) => token.id === id);
        if (!token) {
            throw new Error("Can't find token with given id: " + id);
        }
        return token;
    }
    getTokenStack() {
        const tokenList = Object.values(Token_1.DISCOVERY_TOKEN);
        doubledDiscoveryTokens_1.doubledDiscoveryTokens.forEach((name) => tokenList.push(name));
        return tokenList;
    }
    testTokens() {
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
    autoUseFutureTokens() {
        this._owned.forEach((token) => token.autoDiscard());
    }
    useToken(id, character) {
        //TODO: make targeting other characters.
        const token = this.getOwnedToken(id);
        token.use(character, character);
        if (token.used) {
            this._owned = this._owned.filter((tok) => tok !== token);
        }
    }
    addRandomTokensToFuture(amount) {
        for (let i = 0; i < amount; i++) {
            this._future.push(this.getRandomTokenFromStack());
        }
    }
    addRandomTokensToOwned(amount) {
        for (let i = 0; i < amount; i++) {
            this._owned.push(this.getRandomTokenFromStack());
        }
    }
    addTokenToOwned(token) {
        this._owned.push(token);
    }
    shuffleInToStack(token) {
        this._tokenStack.push(token);
        this._tokenStack = (0, shuffleArray_1.default)(this._tokenStack, this._game.getRandomNumber);
    }
    moveFutureToOwned() {
        this._owned = this._owned.concat(this._future);
        this._future = [];
    }
    onActionEnd() {
        this.autoUseFutureTokens();
        this.moveFutureToOwned();
    }
    getRandomTokenFromStack() {
        const tokenName = this._tokenStack.pop();
        if (tokenName) {
            return this._tokenCreator.create(tokenName);
        }
        else {
            throw new Error("Empty tokenStack!");
        }
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=TokenService.js.map