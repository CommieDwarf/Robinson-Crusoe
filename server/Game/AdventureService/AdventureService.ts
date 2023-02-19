import {IGame} from "../../../interfaces/Game";

export class AdventureService {

    private readonly _game: IGame;

    constructor(game: IGame) {
        this._game = game;
    }


}