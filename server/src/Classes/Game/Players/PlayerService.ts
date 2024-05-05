import {IPlayerService} from "@shared/types/Game/PlayerService/PlayerSevice";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";

export class PlayerService implements IPlayerService {
    players: IPlayer[];
    primePlayer: IPlayer;

    constructor(players: IPlayer[]) {
        this.players = players;
        // TODO: Hardcoded for the demo
        this.primePlayer = players[0];
    }

    get renderData() {
        return this.players.map((player) => player.renderData);
    }

    // TODO: Implement for multiplayer
    addPlayer(player: IPlayer): void {
    }

    // TODO: Implement for multiplayer Play
    setNextPrimePlayer(): void {
    }

    getPlayerById(id: string) {
        const searchedPlayer = this.players.find((player) => player.id === id);
        if (!searchedPlayer) {
            throw new Error("Can't find player with given id: " + searchedPlayer);
        }
        return searchedPlayer;
    }
}
