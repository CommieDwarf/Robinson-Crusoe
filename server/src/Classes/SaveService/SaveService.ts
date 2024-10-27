import {Session} from "../Session/Session";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IGame} from "@shared/types/Game/Game";
import {SaveGame, SaveGameDocument} from "../../Models/SaveGame";
import {SaveStep} from "@shared/types/SaveGame";


export class SaveService {


    _saveSteps: SaveStep[] = [];

    private readonly _session: Session


    constructor(session: Session) {
        this._session = session
    }

    public saveStep(userId: string, action: CONTROLLER_ACTION, args: any[]) {
        this._saveSteps.push({
            userId,
            action,
            args
        })
    }

    public async saveGame(game: IGame) {
        const save = await SaveGame.findOne({gameId: game.id});
        const data = this.getSaveData(game);
        if (save) {
            await SaveGame.findOneAndUpdate({gameId: game.id}, {
                data
            })
        } else {
            return await new SaveGame(data).save();
        }


    }

    public clearSaveSteps() {
        this._saveSteps = [];
    }

    static async getSaveGamesOverview(userId: string) {
        try {
            return await SaveGame.find({hostId: userId})
                .select("timestamp round scenario players name sessionSettings _id")
                .lean()
                .then((saves) => {
                    return saves.map((save) => {
                        return {
                            playerAmount: save.players.length,
                            maxPlayers: save.sessionSettings.maxPlayers,
                            id: save._id.toString(),
                            ...save,
                        }
                    })
                })
        } catch (e) {
            console.warn(e);
        }
    }

    static loadGame(saveId: string) {
        const saveGame = SaveGame.find({_id: saveId});
    }

    private getPlayersSaveData(game: IGame) {
        return game.playerService.players.map((player) => player.saveData)
    }

    private getSaveData(game: IGame) {
        const data: Omit<SaveGameDocument, "_id"> = {
            playerActions: this._saveSteps,
            players: this.getPlayersSaveData(game),
            seed: game.seed,
            scenario: game.scenarioService.scenario,
            timestamp: Date.now(),
            gameId: game.id,
            round: game.round,
            hostId: this._session.host.id,
            sessionSettings: this._session.settings,
            name: this._session.settings.name,
        }

        return data;
    }
}
