"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollDiceService = void 0;
const gather_1 = require("@shared/constants/diceStructures/gather");
const build_1 = require("@shared/constants/diceStructures/build");
const explore_1 = require("@shared/constants/diceStructures/explore");
const weather_1 = require("@shared/constants/diceStructures/weather");
const diceStructures = {
    gather: gather_1.gather,
    build: build_1.build,
    explore: explore_1.explore,
};
class RollDiceService {
    static getAxes(random) {
        const axes = RollDiceService.resultsAxes[("r" + random)];
        const axisIncr = 360;
        axes.x += axisIncr;
        axes.y += axisIncr;
        axes.z += axisIncr;
        return axes;
    }
    static getActionRollDiceResult(action, dice, rngFunc) {
        const random = Math.floor(rngFunc() * 6);
        const axes = this.getAxes(random);
        const result = diceStructures[action][dice][random];
        return {
            result,
            axes,
        };
    }
    static getActionRollDiceResults(actionType, rngFunc) {
        return {
            success: this.getActionRollDiceResult(actionType, "success", rngFunc),
            mystery: this.getActionRollDiceResult(actionType, "mystery", rngFunc),
            hurt: this.getActionRollDiceResult(actionType, "hurt", rngFunc),
        };
    }
    static getWeatherRollDiceResult(dice, rngFunc) {
        const random = Math.floor(rngFunc() * 6);
        const axes = this.getAxes(random);
        const result = weather_1.weather[dice][random];
        return {
            result,
            axes,
        };
    }
}
exports.RollDiceService = RollDiceService;
RollDiceService.resultsAxes = {
    r0: {
        y: 270,
        x: 360,
        z: 360,
    },
    r1: {
        y: 450,
        x: 360,
        z: 360,
    },
    r2: {
        y: 360,
        x: 450,
        z: 360,
    },
    r3: {
        y: 360,
        x: 270,
        z: 360,
    },
    r4: {
        y: 360,
        x: 360,
        z: 360,
    },
    r5: {
        y: 360,
        x: 180,
        z: 180,
    },
};
//# sourceMappingURL=RollDiceService.js.map