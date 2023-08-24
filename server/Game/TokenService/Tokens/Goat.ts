import {Token} from "./Token/Token";
import {IGame} from "../../../../interfaces/Game";
import {CONSTRUCTION} from "../../../../interfaces/ConstructionService/Construction";
import {DISCOVERY_TOKEN} from "../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";
import {BasicResources} from "../../ResourceService/BasicResources";

export class Goat extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.GOAT,
            "koza",
            "Jeśli posiadasz conajmniej 1 poziom broni, otrzymujesz 1 jedzenie i 1 skórę."
        );
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
        if (
            this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).lvl >
            0
        ) {
            super.use(user);
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
