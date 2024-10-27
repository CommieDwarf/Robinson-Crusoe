import mongoose, {Schema} from "mongoose";
import {IPlayerSaveData} from "@shared/types/Game/PlayerService/Player";
import {SCENARIO} from "@shared/types/Game/ScenarioService/SCENARIO";
import {SessionSettings} from "@shared/types/SessionSettings";
import {SaveStep} from "@shared/types/SaveGame";


export interface SaveGameDocument {
    _id: string;
    playerActions: SaveStep[];
    players: IPlayerSaveData[];
    scenario: SCENARIO;
    timestamp: number;
    seed: string;
    gameId: string;
    hostId: string;
    round: number;
    sessionSettings: SessionSettings;
    name: string;
}

const saveSchema = new Schema<SaveGameDocument>({
    playerActions: [{
        type: Schema.Types.Mixed,
        required: true,
    }],
    players: [{
        type: Schema.Types.Mixed,
        required: true,
    }],
    scenario: {
        type: String,
        required: true,
        enum: SCENARIO,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    seed: {
        type: String,
        required: true,
    },
    round: {
        type: Number,
        required: true
    },
    gameId: {
        type: String,
        unique: false,
    },
    hostId: {
        type: String,
        unique: false,
    },
    name: {
        type: String,
        required: true,
    },
    sessionSettings: {
        type: Schema.Types.Mixed,
        required: true,
    },

});

const SaveGame = mongoose.model<SaveGameDocument>('SaveGame', saveSchema, "saveGames");

export {SaveGame};
