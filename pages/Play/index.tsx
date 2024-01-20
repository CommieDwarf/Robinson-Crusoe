// @flow
import * as React from "react";
import {useEffect, useState} from "react";
import {IGameRenderData} from "../../interfaces/Game";
import createGame from "../api/createGame";
import getGameRenderData from "../api/getGame";
import Game from "../../components/Game/Game";
import {NextPage} from "next";
import {useAppDispatch} from "../../store/hooks";
import {
    actionSlotsUpdated,
    markedSlotUpdated,
} from "../../components/Game/features/actionSlots";
import getActionSlotService from "../api/getActionSlotService";
import {IActionSlotServiceRenderData} from "../../interfaces/ActionSlots";
import {
    dogPawnsUpdated,
    fridayPawnsUpdated,
    localCharacterPawnsUpdated,
} from "../../components/Game/features/freePawns";
import {batch} from "react-redux";
import {globalCostModified} from "../../components/Game/features/globalCostModifiers";
import {phaseUpdated} from "../../components/Game/features/phase";

type Props = {};
const Play: NextPage = (props: Props) => {
    const [gameRenderData, setGameRenderData] = useState<IGameRenderData>();
    useEffect(() => {
        createGame();
        updateGameRenderData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dispatch = useAppDispatch();

    function updateGameRenderData() {
        const renderData = JSON.parse(getGameRenderData()) as IGameRenderData;
        const actionSlotService = JSON.parse(
            getActionSlotService()
        ) as IActionSlotServiceRenderData;
        setGameRenderData(renderData);
        batch(() => {
            dispatch(globalCostModified(renderData.actionService.globalCostModifiers));
            dispatch(actionSlotsUpdated(actionSlotService.slots));
            dispatch(markedSlotUpdated(actionSlotService.pawnDropIDAlert));
            dispatch(
                localCharacterPawnsUpdated(
                    renderData.localPlayer.character.pawnService.freePawns
                )
            );
            dispatch(
                dogPawnsUpdated(renderData.characterService.dog.pawnService.freePawns)
            );
            dispatch(
                fridayPawnsUpdated(
                    renderData.characterService.friday.pawnService.freePawns
                )
            );
            dispatch(phaseUpdated(renderData.phaseService.phase));
        });
    }

    return (
        <div>
            {gameRenderData && (
                <Game
                    gameRenderData={gameRenderData}
                    updateGameRenderData={updateGameRenderData}
                />
            )}
        </div>
    );
};

export default Play;

// export const getStaticProps: GetServerSideProps = async ({ query }) => {
//   // for beautiful DND to work correctly...
//   resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
//
//   // const gameDataJSON = getGameRenderData();
//   // const gameData = await JSON.parse(gameDataJSON);
//   return {
//     props: {
//       // gameData,
//     },
//   };
// };
