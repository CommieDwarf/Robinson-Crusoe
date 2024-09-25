"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
class PlayerService {
    constructor(players, game) {
        this._game = game;
        this._players = players;
        this._primePlayer = players[0];
        this._primePlayer.prime = true;
        this.addPrimePlayerMsg(this._primePlayer);
    }
    get renderData() {
        return this.players.map((player) => player.renderData);
    }
    get players() {
        return this._players;
    }
    get primePlayer() {
        return this._primePlayer;
    }
    setNextPrimePlayer() {
        if (this._players.length === 0) {
            throw new Error("player length is 0");
        }
        if (this._players.length === 1) {
            return;
        }
        let nextPlayer = this._players[this._players.indexOf(this._primePlayer) + 1];
        if (!nextPlayer) {
            nextPlayer = this._players[0];
        }
        this.setPlayerPrime(nextPlayer);
    }
    setPlayerPrime(player) {
        this._primePlayer.prime = false;
        player.prime = true;
        this._primePlayer = player;
        this.addPrimePlayerMsg(player);
    }
    addPrimePlayerMsg(player) {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.NEW_PRIME_PLAYER,
            subject1: player.username,
            amount: 1,
            subject2: ""
        }, "positive", "$star$");
    }
    getPlayerById(id) {
        const searchedPlayer = this.players.find((player) => player.id === id);
        if (!searchedPlayer) {
            throw new Error("Can't find player with given id: " + searchedPlayer);
        }
        return searchedPlayer;
    }
}
exports.PlayerService = PlayerService;
//# sourceMappingURL=PlayerService.js.map