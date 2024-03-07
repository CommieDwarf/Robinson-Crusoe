import styles from "./play.module.css";
import Loading from "../Loading";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../store/hooks";
import Game from "../../components/Game/Game";
import {IGameRenderData} from "@shared/types/Game/Game";
import {socket} from "../_app";
import {globalCostModified} from "../../components/Game/features/globalCostModifiers";
import {actionSlotsUpdated, markedSlotUpdated} from "../../components/Game/features/actionSlots";
import {
    dogPawnsUpdated,
    fridayPawnsUpdated,
    localCharacterPawnsUpdated
} from "../../components/Game/features/freePawns";
import {phaseUpdated} from "../../components/Game/features/phase";
import {batch} from "react-redux";


type Props = {};

function Play(props: Props) {
    const [gameRenderData, setGameRenderData] = useState<IGameRenderData>();


    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        socket.emit("game_instance_requested");

    }, []);

    const dispatch = useAppDispatch();

    socket.on("game_instance_sent", (payload: IGameRenderData) => {
        console.log("przyszlo")
        updateGameRenderData(payload)
    })


    function updateGameRenderData(renderData: IGameRenderData) {
        // const renderData = JSON.parse(gameRenderData) as IGameRenderData;
        setGameRenderData(renderData);
        batch(() => {
            dispatch(globalCostModified(renderData.actionService.globalCostModifiers));
            dispatch(actionSlotsUpdated(renderData.actionSlotRenderData.slots));
            // dispatch(markedSlotUpdated(actionSlotService.pawnDropIDAlert));
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
        <div className={styles.container}>
            {gameRenderData ? (
                <Game
                    gameRenderData={gameRenderData}
                />
            ) : <Loading/>}
        </div>
    )
}

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
