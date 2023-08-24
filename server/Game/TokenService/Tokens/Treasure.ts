import {Token} from "./Token/Token";
import {IGame} from "../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";

export class Treasure extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.TREASURE,
            "znalezisko",
            "pociągnij 1 Skarb z talii Tajemnic");
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
        super.use(user);
        this._game.mysteryService.startDrawingCards(0, 0, 1, user);
        this._used = true;
    }

    autoDiscard() {
    }
}
