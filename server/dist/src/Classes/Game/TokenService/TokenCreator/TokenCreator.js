"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCreator = void 0;
const Token_1 = require("../../../../shared/types/Game/TokenService/Token");
const Candles_1 = require("../Tokens/Candles");
const FallenTree_1 = require("../Tokens/FallenTree");
const LargeLeaves_1 = require("../Tokens/LargeLeaves");
const OldMachete_1 = require("../Tokens/OldMachete");
const Poison_1 = require("../Tokens/Poison");
const Herbs_1 = require("../Tokens/Herbs");
const Goat_1 = require("../Tokens/Goat");
const ThornyBushes_1 = require("../Tokens/ThornyBushes");
const Tobacco_1 = require("../Tokens/Tobacco");
const Treasure_1 = require("../Tokens/Treasure");
const Vegetables_1 = require("../Tokens/Vegetables");
const Castaways1_1 = require("../Tokens/Castaways/Castaways1");
const Castaways2_1 = require("../Tokens/Castaways/Castaways2");
const Castaways3_1 = require("../Tokens/Castaways/Castaways3");
const Castaways4_1 = require("../Tokens/Castaways/Castaways4");
const NourishingLarvae_1 = require("../Tokens/NourishingLarvae");
const HealingHerbs_1 = require("../Tokens/HealingHerbs");
class TokenCreator {
    constructor(game) {
        this._counter = 0;
        this._game = game;
    }
    create(discoveryToken) {
        const game = this._game;
        switch (discoveryToken) {
            case Token_1.DISCOVERY_TOKEN.CANDLES:
                return new Candles_1.Candles(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.FALLEN_TREE:
                return new FallenTree_1.FallenTree(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.GOAT:
                return new Goat_1.Goat(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.HEALING_HERBS:
                return new HealingHerbs_1.HealingHerbs(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.HERBS:
                return new Herbs_1.Herbs(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.NOURISHING_LARVAE:
                return new NourishingLarvae_1.NourishingLarvae(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.LARGE_LEAVES:
                return new LargeLeaves_1.LargeLeaves(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.OLD_MACHETE:
                return new OldMachete_1.OldMachete(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.POISON:
                return new Poison_1.Poison(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.THORNY_BUSHES:
                return new ThornyBushes_1.ThornyBushes(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.TOBACCO:
                return new Tobacco_1.Tobacco(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.TREASURE:
                return new Treasure_1.Treasure(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.VEGETABLES:
                return new Vegetables_1.Vegetables(game, this.getId());
            // TODO: implement conditional statement in the future for multiple scenarios.
            case Token_1.DISCOVERY_TOKEN.SCENARIO_1:
                return new Castaways1_1.Castaways1(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.SCENARIO_2:
                return new Castaways2_1.Castaways2(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.SCENARIO_3:
                return new Castaways3_1.Castaways3(game, this.getId());
            case Token_1.DISCOVERY_TOKEN.SCENARIO_4:
                return new Castaways4_1.Castaways4(game, this.getId());
        }
    }
    getId() {
        return (this._counter++).toString();
    }
}
exports.TokenCreator = TokenCreator;
//# sourceMappingURL=TokenCreator.js.map