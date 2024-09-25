"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideCharacter = void 0;
const Character_1 = require("../Character");
const CharEffects_1 = require("../../../CharEffects/CharEffects");
const PawnService_1 = require("../../../../PawnService/PawnService");
class SideCharacter extends Character_1.Character {
    get name() {
        return this._name;
    }
    constructor(name, id, maxHealth, game) {
        super(name, id, maxHealth, game);
        this._pawnService = new PawnService_1.PawnService(this._game, this);
        this.pawnService.initPawns(1, false, null);
        this._effects = new CharEffects_1.SideCharEffects(this);
    }
    get renderData() {
        return Object.assign(Object.assign({}, this.getPawnOwnerRenderData()), { pawnService: this._pawnService.renderData });
    }
    getPawnOwnerRenderData() {
        return Object.assign(Object.assign({}, super.getPawnOwnerRenderData()), { name: this._name });
    }
}
exports.SideCharacter = SideCharacter;
//# sourceMappingURL=SideCharacter.js.map