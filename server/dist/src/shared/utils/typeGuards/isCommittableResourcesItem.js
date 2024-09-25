"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommittableResourcesItem = void 0;
function isCommittableResourcesItem(candidate) {
    return candidate instanceof Object && "resourceCost" in candidate;
}
exports.isCommittableResourcesItem = isCommittableResourcesItem;
//# sourceMappingURL=isCommittableResourcesItem.js.map