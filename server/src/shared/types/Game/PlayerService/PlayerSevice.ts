import {IPlayer, IPlayerRenderData} from "./Player";

export interface IPlayerService {
    players: IPlayer[];
    primePlayer: IPlayer;
    setNextPrimePlayer: () => void;
    renderData: IPlayerRenderData[];
}
