"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionService = void 0;
const Construction_1 = require("../../../shared/types/Game/ConstructionService/Construction");
const Construction_2 = require("./Construction");
const LOG_CODE_1 = require("../../../shared/types/Game/ChatLog/LOG_CODE");
const constructionPL = {
    shelter: "schronienie",
    roof: "dach",
    palisade: "palisada",
    weapon: "broń",
};
class ConstructionService {
    constructor(game) {
        this._game = game;
        this._constructions = this.initConstructions();
    }
    get renderData() {
        return {
            constructions: this._constructions.map((construct) => construct.renderData),
        };
    }
    get constructions() {
        return this._constructions;
    }
    initConstructions() {
        return Object.entries(Construction_1.CONSTRUCTION).map(([key, value]) => {
            let resource;
            let optionalResource = null;
            if (value === Construction_1.CONSTRUCTION.WEAPON) {
                resource = {
                    type: "wood",
                    amount: 1
                };
            }
            else {
                resource = {
                    type: "wood",
                    amount: 2,
                };
                optionalResource = {
                    type: "leather",
                    amount: 1,
                };
            }
            return new Construction_2.Construction(value, constructionPL[value], value !== "shelter" && value !== "weapon", this._game, resource, optionalResource);
        });
    }
    lvlUpConstruction(construction, by, logSource) {
        const construct = this.getConstruction(construction);
        if ((construction === Construction_1.CONSTRUCTION.ROOF
            || construction === Construction_1.CONSTRUCTION.PALISADE)
            && !this.isBuilt(Construction_1.CONSTRUCTION.SHELTER)) {
            return;
        }
        construct.incrementLvl(by);
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.CONSTRUCTION_UPGRADED,
            amount: construct.lvl,
            subject1: construction,
            subject2: ""
        }, "positive", logSource);
    }
    lvlDownConstruction(construction, by, logSource) {
        const construct = this.getConstruction(construction);
        construct.decrementLvl(by);
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.CONSTRUCTION_DOWNGRADED,
            amount: construct.lvl,
            subject1: construction,
            subject2: "",
        }, "negative", logSource);
    }
    lvlDownIfPossible(construction, by, logSource) {
        const construct = this.getConstruction(construction);
        const diff = construct.lvl - by;
        const oldLvl = construct.lvl;
        if (diff > 0) {
            this.lvlDownConstruction(construction, by, logSource);
        }
        else {
            this.lvlDownConstruction(construction, construct.lvl, logSource);
        }
    }
    lvlDownOrGetHurt(construction, by, logSource) {
        const construct = this.getConstruction(construction);
        const diff = construct.lvl - by;
        if (diff >= 0) {
            this.lvlDownConstruction(construction, by, logSource);
        }
        else {
            if (construct.lvl !== 0) {
                this.lvlDownConstruction(construction, construct.lvl, logSource);
            }
            this._game.characterService.hurtAllPlayerCharacters(by - construct.lvl, logSource);
        }
    }
    setLvl(construction, lvl) {
        this.getConstruction(construction).lvl = lvl;
        this.updateLocks();
    }
    setDividedLvlByTwoRoundedDown(construction, logSource) {
        this.setDividedLvlByTwo(construction, logSource, Math.floor);
    }
    setDividedLvlByTwoRoundedUp(construction, logSource) {
        this.setDividedLvlByTwo(construction, logSource, Math.ceil);
    }
    setDividedLvlByTwo(construction, logSource, roundFunction) {
        const construct = this.getConstruction(construction);
        const prevValue = construct.lvl;
        const updatedLvl = roundFunction(prevValue / 2);
        const diff = prevValue - updatedLvl;
        if (diff !== 0) {
            this.lvlDownConstruction(construction, diff, logSource);
        }
    }
    unlockConstruction(construction) {
        this.getConstruction(construction).locked = false;
    }
    lockConstruction(construction) {
        this.getConstruction(construction).locked = true;
    }
    unlockAllConstructions() {
        this._constructions.forEach((construction) => (construction.locked = false));
    }
    updateLocks() {
        var _a;
        if (this.getConstruction(Construction_1.CONSTRUCTION.SHELTER).lvl > 0 || ((_a = this._game.tileService.campTile.tileResourceService) === null || _a === void 0 ? void 0 : _a.extras.naturalShelter)) {
            this.unlockAllConstructions();
        }
        else {
            [Construction_1.CONSTRUCTION.PALISADE, Construction_1.CONSTRUCTION.ROOF].forEach((construction) => {
                this.lockConstruction(construction);
            });
        }
    }
    isBuilt(construction) {
        return this.getConstruction(construction).lvl > 0;
    }
    getConstruction(construction) {
        const construct = this._constructions.find((constr) => constr.name === construction);
        if (!construct) {
            throw new Error("Cant find structure with given construction: " + construction);
        }
        return construct;
    }
    switchCommittedResources(construction) {
        this.getConstruction(construction).switchCommittedResourceType();
    }
}
exports.ConstructionService = ConstructionService;
//# sourceMappingURL=ConstructionService.js.map