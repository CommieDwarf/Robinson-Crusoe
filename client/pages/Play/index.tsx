import styles from "./play.module.css";
import Loading from "../Loading";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../store/hooks";
import Game from "../../components/Game/Game";
import {IGameRenderData} from "@shared/types/Game/Game";
import {globalCostModified} from "../../reduxSlices/globalCostModifiers";
import {actionSlotsUpdated} from "../../reduxSlices/actionSlots";
import {
    dogPawnsUpdated,
    fridayPawnsUpdated,
    localCharacterPawnsUpdated
} from "../../reduxSlices/freePawns";
import {phaseUpdated} from "../../reduxSlices/phase";
import {batch} from "react-redux";
import AuthGuard from "../../components/AuthGuard/AuthGuard";
import {socket, socketEmitter} from "../_app";

type Props = {};

function Play(props: Props) {
    const [gameRenderData, setGameRenderData] = useState<IGameRenderData>();


    useEffect(() => {
        socketEmitter.requestGameInstance();
        socket.on("game_instance_sent", (payload: IGameRenderData) => {
            console.log("game instance sent!")
            updateGameRenderData(payload)
        })

        return () => {
            socket.off();
        }
    }, []);


    const dispatch = useAppDispatch();


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
        <AuthGuard>
            <div className={styles.container}>
                {gameRenderData ? (
                    <Game
                        gameRenderData={gameRenderData}
                    />
                ) : <Loading/>}
            </div>
        </AuthGuard>

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
