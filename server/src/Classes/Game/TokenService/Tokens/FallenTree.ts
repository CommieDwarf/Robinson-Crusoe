import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";

export class FallenTree extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.FALLEN_TREE,
            "powalone drzewo",
            "Otrzymujesz 1 drewno. Żeton zostanie zrealizowany automatycznie po fazie akcji."
        );
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character, target);
        this._game.resourceService.addBasicResourceToOwned(
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
