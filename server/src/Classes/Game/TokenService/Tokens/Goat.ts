import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {BasicResources} from "../../ResourceService/BasicResources";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Goat extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.GOAT,
            "koza",
            "Jeśli posiadasz conajmniej 1 poziom broni, otrzymujesz 1 jedzenie i 1 skórę."
        );
    }

    use(character: ICharacter, target?: ICharacter) {
        if (
            this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).lvl >
            0
        ) {
            super.use(character, target);
            const resources = new BasicResources(1, 0, 0, 1)
            if (this._game.phaseService.phase === "action") {
                this._game.resourceService.addBasicResourcesToFuture(resources, this._sourceLog);
            } else {
                this._game.resourceService.addBasicResourcesToOwned(resources, this._sourceLog);
            }
            this._used = true;
        } else {
            this._game.alertService.setAlert("Nie posiadasz wystarczającego poziomu broni.")
        }
    }

    autoDiscard() {
    }
}
