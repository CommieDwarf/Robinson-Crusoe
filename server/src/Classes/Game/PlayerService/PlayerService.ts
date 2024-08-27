import {IPlayerService} from "@shared/types/Game/PlayerService/PlayerSevice";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {IGame} from "@shared/types/Game/Game";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";

export class PlayerService implements IPlayerService {

    private readonly _players: IPlayer[];
    private _primePlayer: IPlayer;
    private readonly _game: IGame;

    constructor(players: IPlayer[], game: IGame) {
        this._game = game;
        this._players = players;
        this._primePlayer = players[0];
        this._primePlayer.prime = true;
        this.addPrimePlayerMsg(this._primePlayer);
    }

    get renderData() {
        return this.players.map((player) => player.renderData);
    }

    get players(): IPlayer[] {
        return this._players;
    }

    get primePlayer(): IPlayer {
        return this._primePlayer;
    }


    public setNextPrimePlayer(): void {
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

    public setPlayerPrime(player: IPlayer) {
        this._primePlayer.prime = false;
        player.prime = true;
        this._primePlayer = player;
        this.addPrimePlayerMsg(player);
    }

    private addPrimePlayerMsg(player: IPlayer) {
        this._game.logService.addMessage({
            code: LOG_CODE.NEW_PRIME_PLAYER,
            subject1: player.username,
            amount: 1,
            subject2: ""
        }, "positive", "$star$")
    }

    getPlayerById(id: string) {
        const searchedPlayer = this.players.find((player) => player.id === id);
        if (!searchedPlayer) {
            throw new Error("Can't find player with given id: " + searchedPlayer);
        }
        return searchedPlayer;
    }
}
