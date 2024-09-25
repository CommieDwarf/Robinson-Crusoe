"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdventureService = void 0;
const AdventureCardCreator_1 = require("./AdventureCardCreator/Creators/AdventureCardCreator");
const Tile_1 = require("../TileService/Tile/Tile");
const TileService_1 = require("../TileService/TileService");
const isPlayerCharacter_1 = require("@shared/utils/typeGuards/isPlayerCharacter");
const isAdventureAction_1 = require("@shared/utils/typeGuards/isAdventureAction");
const shuffleArray_1 = __importDefault(require("@shared/utils/shuffleArray"));
class AdventureService {
    constructor(game) {
        this._stacks = {
            build: [],
            explore: [],
            gather: [],
        };
        this._currentAdventure = null;
        this._game = game;
        this._stacks = this.initCards();
    }
    get renderData() {
        return {
            currentAdventure: this._currentAdventure
                ? {
                    card: this._currentAdventure.card.renderData,
                    player: this._currentAdventure.player.renderData,
                }
                : null,
        };
    }
    get currentAdventure() {
        return this._currentAdventure;
    }
    resolveAdventureCard(option, playerCharacterName) {
        if (!this._currentAdventure) {
            throw new Error("There is no current card to resolve!");
        }
        const resolver = this._game.characterService.getCharacter(playerCharacterName);
        if (!(0, isPlayerCharacter_1.isPlayerCharacter)(resolver)) {
            throw new Error("Side character shouldn't have opportunity to resolve adventure card!");
        }
        if (option === 1 || !this._currentAdventure.card.shouldDecide) {
            this._currentAdventure.card.resolveOption1(resolver);
        }
        else {
            this._currentAdventure.card.resolveOption2(resolver);
        }
        this.unsetCurrentAdventure();
    }
    setCurrentAdventure(resolvableItem) {
        if (!(0, isAdventureAction_1.isAdventureAction)(resolvableItem.action)) {
            throw new Error(`${resolvableItem.action} action isn't adventure type`);
        }
        const card = this.popAdventureCardFromStack(resolvableItem.action);
        let relatedActionInfo = this.getRelatedActionInfo(resolvableItem);
        //AdventureCardResolve Service must remember the action,
        // that triggered it for some  adventure cards effects.
        this._currentAdventure = {
            card,
            relatedActionInfo,
            player: this._game.playerService.players.find((player => player.getCharacter().name === resolvableItem.leaderPawn.owner.name))
        };
    }
    getRelatedActionInfo(resolvableItem) {
        if (resolvableItem.item instanceof Tile_1.Tile) {
            return {
                tileId: resolvableItem.item.id,
                source: TileService_1.TileService.getSourceSideFromDroppableId(resolvableItem.droppableID),
            };
        }
        else {
            return null;
        }
    }
    popAdventureCardFromStack(adventure) {
        const card = this._stacks[adventure].pop();
        if (!card) {
            throw new Error(`${adventure} stack is empty`);
        }
        return card;
    }
    unsetCurrentAdventure() {
        this._currentAdventure = null;
    }
    initCards() {
        const creator = new AdventureCardCreator_1.AdventureCardCreator(this._game);
        const implemented = creator.implemented;
        return {
            build: (0, shuffleArray_1.default)(implemented.build.map((card) => creator.createBuildCard(card)), this._game.getRandomNumber),
            explore: (0, shuffleArray_1.default)(implemented.explore.map((card) => creator.createExploreCard(card)), this._game.getRandomNumber),
            gather: (0, shuffleArray_1.default)(implemented.gather.map((card) => creator.createGatherCard(card)), this._game.getRandomNumber)
        };
    }
}
exports.AdventureService = AdventureService;
//# sourceMappingURL=AdventureService.js.map