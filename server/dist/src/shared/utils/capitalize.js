"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function capitalize(string) {
    if (string.length == 0) {
        return string;
    }
    return string[0].toUpperCase() + string.slice(1);
}
exports.default = capitalize;
//# sourceMappingURL=capitalize.js.map