"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RavishingWindstorm = void 0;
const EventCard_1 = require("../EventCard");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class RavishingWindstorm extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.RAVISHING_WINDSTORM, ACTION_1.ACTION.EXPLORE, {
            pawns: 1,
            invention: null,
            construction: null,
            resource: null, optionalResource: null,
        }, game);
        this._namePL = "rozszalała wichura";
        this._resolutionPL = "nowa broń";
    }
    triggerEventEffect() {
        this._game.constructionService.lvlDownIfPossible(Construction_1.CONSTRUCTION.WEAPON, 2, this.namePL);
    }
    triggerThreatEffect() {
        return;
        // nothing happens
    }
    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 1, this.name);
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 1, this.name);
    }
}
exports.RavishingWindstorm = RavishingWindstorm;
//# sourceMappingURL=RavishingWindstorm.js.map