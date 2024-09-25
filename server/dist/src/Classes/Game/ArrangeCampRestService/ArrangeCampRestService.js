"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrangeCampRestService = void 0;
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const Item_1 = require("@shared/types/Game/Equipment/Item");
class ArrangeCampRestService {
    constructor(game) {
        this._arrangeCampBonus = null;
        this._pawnAmount = {
            rest: 0,
            arrangeCamp: 0,
        };
        this._game = game;
    }
    get renderData() {
        return {
            arrangeCampBonus: this._arrangeCampBonus,
            pawnAmount: this._pawnAmount,
        };
    }
    get arrangeCampBonus() {
        return this._arrangeCampBonus;
    }
    get pawnAmount() {
        return this._pawnAmount;
    }
    incrPawnAmount(action) {
        this._pawnAmount[action]++;
    }
    decrPawnAmount(action) {
        this._pawnAmount[action]--;
    }
    rest(character) {
        const bedBuilt = this._game.inventionService.isBuilt(Invention_1.INVENTION_NORMAL.BED);
        const hammockOwned = this._game.mysteryService.hasTreasureCard(MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HAMMOCK);
        let healAmount = bedBuilt ? 2 : 1;
        this._game.characterService.heal(character, healAmount, "Odpoczynek");
        if (bedBuilt || hammockOwned) {
            this._game.characterService.incrDetermination(character, 1, "Odpoczynek");
        }
    }
    arrangeCamp(character, useBible) {
        const characterService = this._game.characterService;
        let determination = 2;
        let logSource = "Porządkowanie obozu";
        if (useBible) {
            logSource += " (Biblia)";
            determination = 3;
            characterService.heal(character, 1, logSource);
            this._game.equipmentService.useItem(Item_1.ITEM.BIBLE, character);
        }
        this._game.moraleService.lvlUp(1, character.name);
        characterService.incrDetermination(character, determination, logSource);
    }
}
exports.ArrangeCampRestService = ArrangeCampRestService;
//# sourceMappingURL=ArrangeCampRestService.js.map