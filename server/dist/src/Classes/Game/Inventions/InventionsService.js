"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventionsService = void 0;
const shuffleArray_1 = __importDefault(require("../../../shared/utils/shuffleArray"));
const Invention_1 = require("../../../shared/types/Game/InventionService/Invention");
const InventionCreator_1 = require("./InventionCreator/InventionCreator");
const LOG_CODE_1 = require("../../../shared/types/Game/ChatLog/LOG_CODE");
const isPlayerCharacter_1 = require("../../../shared/utils/typeGuards/isPlayerCharacter");
class InventionsService {
    constructor(scenario, tiles, game) {
        this._builtInventions = [];
        this.fireplace = false;
        this._inventionStack = [];
        this._game = game;
        this.scenario = scenario;
        this._tiles = tiles;
        this._inventionStack = this.initStack();
        this._inventions = this.initInventions(scenario);
        this.updateLocks();
        this.sortInventions();
    }
    get renderData() {
        return {
            inventions: this.inventions.map((invention) => invention.renderData),
        };
    }
    get inventions() {
        return this._inventions;
    }
    get builtInventions() {
        return this._builtInventions;
    }
    isBuilt(invention) {
        return this.getInvention(invention).isBuilt;
    }
    addInvention(invention) {
        this._inventions.push(invention);
        this.updateLocks();
        this.sortInventions();
    }
    pickInventionsFromStack(amount) {
        return this._inventionStack.slice(-amount);
    }
    shuffleInventionStack() {
        this._inventionStack = (0, shuffleArray_1.default)(this._inventionStack, this._game.getRandomNumber);
    }
    initInventions(scenarioName) {
        const starters = Object.values(Invention_1.INVENTION_STARTER);
        const normal = this.popInventionsFromStack(5);
        const scenario = Object.values(Invention_1.INVENTION_CASTAWAYS);
        const creator = new InventionCreator_1.InventionCreator(this._game);
        const personal = this._game.characterService.playerCharacters.map((char) => char.invention);
        return [...normal, ...[...starters, ...scenario, ...personal].map((invention) => {
                return creator.create(invention);
            })];
    }
    initStack() {
        const creator = new InventionCreator_1.InventionCreator(this._game);
        return (0, shuffleArray_1.default)(Object.values(Invention_1.INVENTION_NORMAL), this._game.getRandomNumber).map((invention) => {
            return creator.create(invention);
        });
    }
    popInventionsFromStack(amount) {
        let popped = [];
        for (let i = 0; i < amount; i++) {
            popped.push(this._inventionStack.pop());
        }
        return popped.filter((obj) => obj !== undefined);
    }
    build(inventionName, builder) {
        const invention = this.getInvention(inventionName);
        if (this._builtInventions.includes(invention)) {
            throw new Error("Invention is already has been built " + invention.name);
        }
        if (inventionName !== Invention_1.INVENTION_CASTAWAYS.MAST) {
            this._builtInventions.push(invention);
            invention.isBuilt = true;
        }
        if (invention.inventionType === Invention_1.INVENTION_TYPE.PERSONAL) {
            if (!(0, isPlayerCharacter_1.isPlayerCharacter)(builder)) {
                throw new Error("Non player character can't build personal invention");
            }
            if (builder.invention !== inventionName) {
                throw new Error(`${inventionName} isn't ${builder.name}'s personal invention!`);
            }
        }
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.INVENTION_BUILT,
            subject1: invention.name,
            subject2: "",
            amount: 1,
        }, "positive", builder.name);
        invention.onBuild();
        this.updateLocks();
        this.sortInventions();
    }
    destroy(name) {
        const invention = this.getInvention(name);
        if (!this._builtInventions.includes(invention)) {
            throw new Error("There is no such invention built: " + invention.name);
        }
        this._builtInventions = this._builtInventions.filter((inv) => {
            return inv.name !== invention.name;
        });
        invention.onDestruction();
    }
    updateLocks() {
        this._inventions.forEach((invention) => {
            invention.locked = !(this.isInvRequirementMet(invention) &&
                this.isTileTypeRequirementMet(invention));
        });
    }
    useInvention(name, character) {
        const invention = this.getInvention(name);
        if (!invention.canBeUsed) {
            console.warn(`Invention ${name} can't be used now`);
            return;
        }
        invention.use(character);
    }
    isInvRequirementMet(invention) {
        if (!invention.requirements || !invention.requirements.inventions) {
            return true;
        }
        let flag = true;
        invention.requirements.inventions.forEach((req) => {
            if (!this._builtInventions.some((inv) => inv.name === req)) {
                flag = false;
            }
        });
        return flag;
    }
    isTileTypeRequirementMet(invention) {
        if (!invention.requirements || !invention.requirements.terrainType) {
            return true;
        }
        return this._tiles.exploredTerrainTypes.has(invention.requirements.terrainType);
    }
    resetCardPawns() {
        this._builtInventions.forEach((card) => { var _a; return (_a = card.pawnService) === null || _a === void 0 ? void 0 : _a.resetFreePawns(); });
    }
    getInvention(name) {
        let invention = this._inventions.find((inv) => inv.name === name);
        if (!invention) {
            invention = this._inventionStack.find((inv) => inv.name === name);
        }
        if (!invention) {
            throw new Error("Can find invention with specific scenario: " + name);
        }
        return invention;
    }
    onMapExplore() {
        this.updateLocks();
        this.sortInventions();
    }
    sortInventions() {
        this._inventions = this._inventions.sort((a, b) => {
            return this.getSortWeight(b) - this.getSortWeight(a);
        });
    }
    getSortWeight(invention) {
        let sum = 0;
        if (invention.isBuilt)
            sum += 10;
        if (!invention.locked)
            sum += 5;
        if (invention.inventionType === Invention_1.INVENTION_TYPE.STARTER)
            sum += 2;
        if (invention.inventionType === Invention_1.INVENTION_TYPE.NORMAL)
            sum += 1;
        return sum;
    }
}
exports.InventionsService = InventionsService;
//# sourceMappingURL=InventionsService.js.map