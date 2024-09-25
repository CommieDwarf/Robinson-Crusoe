"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goat = void 0;
const Token_1 = require("./Token/Token");
const Construction_1 = require("../../../../shared/types/Game/ConstructionService/Construction");
const Token_2 = require("../../../../shared/types/Game/TokenService/Token");
const BasicResources_1 = require("../../ResourceService/BasicResources");
class Goat extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.GOAT, "koza", "Jeśli posiadasz conajmniej 1 poziom broni, otrzymujesz 1 jedzenie i 1 skórę.", id);
    }
    use(character, target) {
        if (this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON).lvl >
            0) {
            super.use(character, target);
            const resources = new BasicResources_1.BasicResources(1, 0, 0, 1);
            if (this._game.phaseService.phase === "action") {
                this._game.resourceService.addBasicResourcesToFuture(resources, this._sourceLog);
            }
            else {
                this._game.resourceService.addBasicResourcesToOwned(resources, this._sourceLog);
            }
            this._used = true;
        }
        else {
            this._game.alertService.setAlert("Nie posiadasz wystarczającego poziomu broni.");
        }
    }
    autoDiscard() {
    }
}
exports.Goat = Goat;
//# sourceMappingURL=Goat.js.map