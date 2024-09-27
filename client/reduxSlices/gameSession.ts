import {createSlice} from "@reduxjs/toolkit";
import {RootState, store} from "../store/store";
import {IPawnRenderData} from "@shared/types/Game/Pawns/Pawn";
import {SessionRenderData} from "@shared/types/Session/Session";
import {IGameRenderData} from "@shared/types/Game/Game";
import {IActionSlotServiceRenderData} from "@shared/types/Game/ActionSlots";
import {createSelector} from "reselect";
import {IPlayerCharacterRenderData, PlayerCharacterName} from "@shared/types/Game/Characters/PlayerCharacter";
import {IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import { CHARACTER } from "@shared/types/Game/Characters/Character";


enum CONNECTION_STATUS {
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    NOT_CONNECTED = "not connected", // default
}

export interface SessionDataSlice {
    data: SessionRenderData | null,
    actionSlots: IActionSlotServiceRenderData | null,
    sessionId: string,
    connectionStatus: CONNECTION_STATUS,
    playerLatencyList: { playerId: string, latency: number }[]
}


const initialState: SessionDataSlice = {
    data: null,
    actionSlots: null,
    sessionId: "",
    connectionStatus: CONNECTION_STATUS.NOT_CONNECTED,
    playerLatencyList: [],
};

export const gameSessionSlice = createSlice({
    name: "gameSession",
    initialState,
    reducers: {
        gameSessionUpdated(state, action) {
            state.data = action.payload;
            state.sessionId = action.payload.id;
        },

        actionSlotUpdated(state, action) {
            state.actionSlots = action.payload;
        },

        actionSlotsPartiallyUpdated(state, action) {
            state.actionSlots = {
                ...state.actionSlots,
                ...action.payload,
            }
        },
        sessionIdUpdated(state, action) {
            state.sessionId = action.payload;
        },
        connectionStatusUpdated(state, action) {
            state.connectionStatus = action.payload
        },
        playerListLatencyUpdated(state, action) {
            state.playerLatencyList = action.payload;
        }
    },
});

export const {
    gameSessionUpdated,
    actionSlotUpdated,
    sessionIdUpdated,
    actionSlotsPartiallyUpdated,
    connectionStatusUpdated,
    playerListLatencyUpdated
} = gameSessionSlice.actions;

export const selectActionSlotById = (state: ReturnType<typeof store.getState>, actionSlotId: string): IPawnRenderData<any> | null => {
    const slots = state.gameSession.actionSlots!;
    return actionSlotId in slots ? (slots[actionSlotId as keyof typeof slots] as unknown as IPawnRenderData<any>) : null;
}

export const selectGame = (state: ReturnType<typeof store.getState>) => {
    return state.gameSession.data!.game!;
}

export const selectPlayerLatency = (state: ReturnType<typeof store.getState>, playerId: string) => {
    const list = state.gameSession.playerLatencyList;
    if (list) {
        return list.find((o) => o.playerId === playerId)?.latency
    } else {
        return undefined;
    }
}

export const selectActionSlotService = (state: RootState) => selectGame(state).actionSlotService!;
export const selectGlobalPawnService = (state: RootState) => selectGame(state).globalPawnService!;
export const selectInventionService = (state: RootState) => selectGame(state).inventionService!;
export const selectObjectPickers = (state: RootState) => selectGame(state).objectPickers!;
export const selectAdventureService = (state: RootState) => selectGame(state).adventureService!;
export const selectMysteryService = (state: RootState) => selectGame(state).mysteryService!;
export const selectPhaseService = (state: RootState) => selectGame(state).phaseService!;
export const selectActionService = (state: RootState) => selectGame(state).actionService!;
export const selectEventService = (state: RootState) => selectGame(state).eventService!;
export const selectCharacterService = (state: RootState) => selectGame(state).characterService!;
export const selectTokenService = (state: RootState) => selectGame(state).tokenService!;
export const selectWeatherService = (state: RootState) => selectGame(state).weatherService!;
export const selectLogs = (state: RootState) => selectGame(state).logs!;
export const selectScenarioService = (state: RootState) => selectGame(state).scenarioService!;
export const selectResourceService = (state: RootState) => selectGame(state).resourceService!;
export const selectEquipmentService = (state: RootState) => selectGame(state).equipmentService!;
export const selectPlayers = (state: RootState) => selectGame(state).players!;

export const selectPlayerByCharacter = (state: RootState, character: CHARACTER) => selectPlayers(state)?.find((player) => player.assignedCharacter.char === character);

export const selectGameData = createSelector([
    (state) => selectActionSlotService(state)!.slots,
    (state) => selectGlobalPawnService(state)!.allPawns,
    (state) => selectInventionService(state)!.inventions,
    (state) => selectObjectPickers(state)!,
    (state) => selectAdventureService(state)!.currentAdventure,
    (state) => selectMysteryService(state)!.isDrawingOn,
    (state) => selectEventService(state)!.currentAdventureResolve,
    (state) => selectEventService(state)!.currentMysteryResolve,
    (state) => selectPhaseService(state)!.phase,
    (state) => selectActionService(state)!.finished,
    (state) => selectPhaseService(state)!.locked,
    (state: RootState) => state.gameSession.data!.localPlayer,
    (state) => selectPlayers(state)!
], (actionSlots,
    allPawns,
    inventions,
    objectPickers,
    adventureToResolve,
    isMysteryCardDrawingOn,
    adventureToResolveAsEvent,
    mysteryCardToResolveAsEvent,
    currentPhase,
    actionResolveFinished,
    phaseChangeLocked,
    localPlayer,
    players
) => {
    return {
        actionSlots: actionSlots && new Map<string, IPawnRenderData<any> | null>(Object.entries(actionSlots)),
        allPawns,
        inventions,
        objectPickers,
        adventureToResolve,
        isMysteryCardDrawingOn,
        adventureToResolveAsEvent,
        mysteryCardToResolveAsEvent,
        currentPhase,
        actionResolveFinished,
        phaseChangeLocked,
        localPlayer,
        players
    }
})
