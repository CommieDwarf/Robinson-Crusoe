"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromArray = void 0;
function removeFromArray(array, element) {
    const i = array.indexOf(element);
    if (i !== -1) {
        return array.slice(0, i).concat(array.slice(i + 1, array.length));
    }
    return array;
}
exports.removeFromArray = removeFromArray;
//# sourceMappingURL=removeFromArray.js.map