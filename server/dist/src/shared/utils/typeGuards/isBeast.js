"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBeastRenderData = exports.isBeast = void 0;
const Beast_1 = require("@shared/types/Game/Beasts/Beast");
function isBeast(candidate) {
    return "weaponLoss" in candidate;
}
exports.isBeast = isBeast;
function isBeastRenderData(candidate) {
    return "name" in candidate && Object.values(Beast_1.BEAST).includes(candidate.name);
}
exports.isBeastRenderData = isBeastRenderData;
//# sourceMappingURL=isBeast.js.map