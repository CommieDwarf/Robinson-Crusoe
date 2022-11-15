import { IPlayerService } from "../../../interfaces/PlayerService/PlayerSevice";
import { IPlayer } from "../../../interfaces/PlayerService/Player";

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
  addPlayer(player: IPlayer): void {}

  // TODO: Implement for multiplayer game
  setNextPrimePlayer(): void {}
}
