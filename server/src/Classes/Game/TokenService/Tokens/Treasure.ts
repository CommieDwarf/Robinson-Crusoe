import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Treasure extends Token {
    constructor(game: IGame, id: string) {
        super(game, DISCOVERY_TOKEN.TREASURE,
            "znalezisko",
            "pociągnij 1 Skarb z talii Tajemnic", id);
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character);
        this._game.mysteryService.startDrawingCards(0, 0, 1, character);
        this._used = true;
    }

    autoDiscard() {
    }
}
