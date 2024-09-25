"use strict";
/**
 * Deeply compares 2 objects.
 * Objects cannot be recursive.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectsEqual = void 0;
const objectsEqual = (o1, o2) => {
    if (o1 && o2 && typeof o1 === "object" && Object.keys(o1).length > 0) {
        return Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every((p) => (0, exports.objectsEqual)(o1[p], o2[p]));
    }
    else {
        return o1 === o2;
    }
};
exports.objectsEqual = objectsEqual;
//# sourceMappingURL=objectsEqual.js.map