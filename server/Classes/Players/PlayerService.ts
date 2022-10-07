import { IPlayerService } from "../../../interfaces/PlayerService/PlayerSevice";
import { IPlayer } from "../../../interfaces/PlayerService/Player";

export class PlayerService implements IPlayerService {
  get renderData() {
    return this.players.map((player) => player.renderData);
  }

  // TODO: Hardcoded for the moment.
  players: IPlayer[];
  primePlayer: IPlayer;

  constructor(players: IPlayer[]) {
    this.players = players;
    this.primePlayer = players[0];
  }

  // TODO: Implement for multiplayer
  addPlayer(player: IPlayer): void {}

  // TODO: Implement for multiplayer game
  setNextPrimePlayer(): void {}
}
