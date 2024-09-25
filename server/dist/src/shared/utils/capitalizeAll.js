"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeAll = void 0;
const capitalize_1 = __importDefault(require("./capitalize"));
function capitalizeAll(str) {
    return str.split(" ").map((word) => (0, capitalize_1.default)(word)).join(" ");
}
exports.capitalizeAll = capitalizeAll;
//# sourceMappingURL=capitalizeAll.js.map