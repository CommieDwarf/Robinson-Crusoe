import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class NourishingLarvae extends Token {
    constructor(game: IGame, id: string) {
        super(
            game,
            DISCOVERY_TOKEN.NOURISHING_LARVAE,
            "pożywne larwy",
            "Otrzymujesz 2 do jedzenia do posiadanych surowców." +
            " Żeton jest automatycznie realizowany po fazie akcji.",
            id
        );
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character);
        this._game.resourceService.addBasicResourceToOwned(
            "food",
            2,
            this._sourceLog
        );
        this._used = true;
    }

    autoDiscard() {
        if (this._game.phaseService.phase === "weather") {
            super.autoDiscard();
            this._game.resourceService.addBasicResourceToOwned(
                "food",
                2,
                this._sourceLog
            );
            this._used = true;
        }
    }
}
