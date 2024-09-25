"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokenTree = void 0;
const EventCard_1 = require("../EventCard");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class BrokenTree extends EventCard_1.EventCard {
    constructor(game) {
        super(EVENT_CARD_1.EVENT_CARD.BROKEN_TREE, ACTION_1.ACTION.BUILD, {
            pawns: 1,
            invention: Invention_1.INVENTION_STARTER.ROPE,
            construction: null,
            resource: null,
            optionalResource: null,
        }, game);
        this._namePL = "powalone drzewo";
        this._resolutionPL = "usunięcie drzewa";
    }
    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this.name);
    }
    triggerThreatEffect() {
        this._game.moraleService.lvlDown(1, this._namePL);
    }
    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 1, this.name);
        this._game.resourceService.addBasicResourceToOwned("wood", 1, this.name);
    }
}
exports.BrokenTree = BrokenTree;
//# sourceMappingURL=BrokenTree.js.map