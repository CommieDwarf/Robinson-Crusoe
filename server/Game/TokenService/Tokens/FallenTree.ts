import {Token} from "./Token/Token";
import {IGame} from "../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";

export class FallenTree extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.FALLEN_TREE,
            "powalone drzewo",
            "Otrzymujesz 1 drewno. Żeton zostanie zrealizowany automatycznie po fazie akcji."
        );
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
        super.use(user);
        this._game.resourceService.addBasicResourceToFuture(
            "wood",
            1,
            this._sourceLog
        );
        this._used = true;
    }

    autoDiscard() {
        if (this._game.phaseService.phase === "weather") {
            this._game.resourceService.addBasicResourceToOwned(
                "wood",
                1,
                this._sourceLog
            );
            this._used = true;
            super.autoDiscard();
        }
    }
}
