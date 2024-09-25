"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveService = void 0;
const SaveGame_1 = require("../../Models/SaveGame");
class SaveService {
    constructor(session) {
        this._playerActions = [];
        this._session = session;
    }
    saveAction(userId, action, args) {
        this._playerActions.push({
            userId,
            action,
            args
        });
    }
    saveGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const save = yield SaveGame_1.SaveGame.findOne({ gameId: game.id });
            const data = this.getSaveData(game);
            if (save) {
                yield SaveGame_1.SaveGame.findOneAndUpdate({ gameId: game.id }, {
                    data
                });
            }
            else {
                return yield new SaveGame_1.SaveGame(data).save();
            }
        });
    }
    static getSaveGamesOverview(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield SaveGame_1.SaveGame.find({ hostId: userId })
                    .select("timestamp round scenario players name sessionSettings _id")
                    .lean()
                    .then((saves) => {
                    return saves.map((save) => {
                        return Object.assign({ playerAmount: save.players.length, maxPlayers: save.sessionSettings.maxPlayers, id: save._id.toString() }, save);
                    });
                });
            }
            catch (e) {
                console.warn(e);
            }
        });
    }
    static loadGame(saveId) {
        const saveGame = SaveGame_1.SaveGame.find({ _id: saveId });
    }
    getPlayersSaveData(game) {
        return game.playerService.players.map((player) => player.saveData);
    }
    getSaveData(game) {
        const data = {
            playerActions: this._playerActions,
            players: this.getPlayersSaveData(game),
            seed: game.seed,
            scenario: game.scenarioService.scenario,
            timestamp: Date.now(),
            gameId: game.id,
            round: game.round,
            hostId: this._session.host.id,
            sessionSettings: this._session.settings,
            name: this._session.settings.name,
        };
        return data;
    }
}
exports.SaveService = SaveService;
//# sourceMappingURL=SaveService.js.map