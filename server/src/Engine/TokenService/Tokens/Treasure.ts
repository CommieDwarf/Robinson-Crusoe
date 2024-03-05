import {Token} from "./Token/Token";
import {IGame} from "../../../types/Game";
import {DISCOVERY_TOKEN} from "../../../types/TokenService/Token";
import {IPlayer} from "../../../types/PlayerService/Player";
import {ICharacter} from "../../../types/Characters/Character";

export class Treasure extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.TREASURE,
            "znalezisko",
            "pociągnij 1 Skarb z talii Tajemnic");
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.mysteryService.startDrawingCards(0, 0, 1, user.getCharacter());
        this._used = true;
    }

    autoDiscard() {
    }
}
