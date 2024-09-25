"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAvatar = void 0;
const jdenticon_1 = __importDefault(require("jdenticon"));
const SIZE = 200;
function generateAvatar(username) {
    return jdenticon_1.default.toSvg(username, SIZE);
}
exports.generateAvatar = generateAvatar;
//# sourceMappingURL=generateAvatar.js.map