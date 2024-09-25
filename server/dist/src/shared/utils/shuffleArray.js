"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shuffle(array, rngFunc) {
    let shuffled = [...array];
    for (let i = 0; i < shuffled.length; i++) {
        let temp = shuffled[i];
        const random = Math.floor(rngFunc() * (shuffled.length - 1));
        shuffled[i] = shuffled[random];
        shuffled[random] = temp;
    }
    return shuffled;
}
exports.default = shuffle;
//# sourceMappingURL=shuffleArray.js.map