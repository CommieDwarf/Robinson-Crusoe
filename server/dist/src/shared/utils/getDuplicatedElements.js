"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDuplicatedElements = void 0;
function getDuplicatedElements(arr) {
    return arr.filter((element, index) => arr.indexOf(element) !== index);
}
exports.getDuplicatedElements = getDuplicatedElements;
//# sourceMappingURL=getDuplicatedElements.js.map