import { IPlayer, IPlayerRenderData } from "./Player";

export interface IPlayerService {
  players: IPlayer[];
  primePlayer: IPlayer;
  addPlayer: (player: IPlayer) => void;
  setNextPrimePlayer: () => void;
  renderData: IPlayerRenderData[];
}
