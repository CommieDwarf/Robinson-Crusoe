import {Token} from "./Token/Token";
import {IGame} from "../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";

export class NourishingLarvae extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.NOURISHING_LARVAE,
            "pożywne larwy",
            "Otrzymujesz 2 do jedzenia do posiadanych surowców." +
            " Żeton jest automatycznie realizowany po fazie akcji."
        );
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
        super.use(user);
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
