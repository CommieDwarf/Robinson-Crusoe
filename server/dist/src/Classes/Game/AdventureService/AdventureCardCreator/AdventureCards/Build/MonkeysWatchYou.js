"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonkeysWatchYou = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class MonkeysWatchYou extends BuildAdventureCard_1.BuildAdventureCard {
    // protected _eventOptions: IAdventureEventsOption[] | null = [
    //     {
    //         label: "dach",
    //         resolve: () => {
    //             this._game.constructionService.setDividedLvlByTwoRoundedDown(CONSTRUCTION.ROOF, this._eventNamePL)
    //         },
    //         canBeResolved: () => {
    //             return this._game.constructionService.isBuilt(CONSTRUCTION.ROOF)
    //         },
    //
    //     },
    //     {
    //         label: "palisada",
    //         resolve: () => {
    //             this._game.constructionService.setDividedLvlByTwoRoundedDown(CONSTRUCTION.PALISADE, this._eventNamePL)
    //         },
    //         canBeResolved: () => {
    //             return this._game.constructionService.isBuilt(CONSTRUCTION.PALISADE)
    //         },
    //     }
    // ]
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU, "monkeys in the camp!", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
    }
}
exports.MonkeysWatchYou = MonkeysWatchYou;
//# sourceMappingURL=MonkeysWatchYou.js.map