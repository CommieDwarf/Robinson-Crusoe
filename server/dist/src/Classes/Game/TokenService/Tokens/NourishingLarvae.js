"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NourishingLarvae = void 0;
const Token_1 = require("./Token/Token");
const Token_2 = require("@shared/types/Game/TokenService/Token");
class NourishingLarvae extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.NOURISHING_LARVAE, "pożywne larwy", "Otrzymujesz 2 do jedzenia do posiadanych surowców." +
            " Żeton jest automatycznie realizowany po fazie akcji.", id);
    }
    use(character, target) {
        super.use(character);
        this._game.resourceService.addBasicResourceToOwned("food", 2, this._sourceLog);
        this._used = true;
    }
    autoDiscard() {
        if (this._game.phaseService.phase === "weather") {
            super.autoDiscard();
            this._game.resourceService.addBasicResourceToOwned("food", 2, this._sourceLog);
            this._used = true;
        }
    }
}
exports.NourishingLarvae = NourishingLarvae;
//# sourceMappingURL=NourishingLarvae.js.map