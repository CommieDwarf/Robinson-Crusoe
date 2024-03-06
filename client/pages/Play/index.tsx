import styles from "./play.module.css";
import Loading from "../Loading";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../store/hooks";
import Game from "../../components/Game/Game";
import {IGameRenderData} from "@shared/types/Game/Game";


type Props = {};

function Play(props: Props) {
    const [gameRenderData, setGameRenderData] = useState<IGameRenderData>();


    useEffect(() => {
        updateGameRenderData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dispatch = useAppDispatch();

    function updateGameRenderData() {
        // const renderData = JSON.parse(gameRenderData) as IGameRenderData;
        // const actionSlotService = JSON.parse(
        //     getActionSlotService()
        // ) as IActionSlotServiceRenderData;
        // setGameRenderData(renderData);
        // batch(() => {
        //     dispatch(globalCostModified(renderData.actionService.globalCostModifiers));
        //     dispatch(actionSlotsUpdated(actionSlotService.slots));
        //     dispatch(markedSlotUpdated(actionSlotService.pawnDropIDAlert));
        //     dispatch(
        //         localCharacterPawnsUpdated(
        //             renderData.localPlayer.character.pawnService.freePawns
        //         )
        //     );
        //     dispatch(
        //         dogPawnsUpdated(renderData.characterService.dog.pawnService.freePawns)
        //     );
        //     dispatch(
        //         fridayPawnsUpdated(
        //             renderData.characterService.friday.pawnService.freePawns
        //         )
        //     );
        //     dispatch(phaseUpdated(renderData.phaseService.phase));
        // });
    }


    return (
        <div className={styles.container}>
            {gameRenderData ? (
                <Game
                    gameRenderData={gameRenderData}
                    updateGameRenderData={updateGameRenderData}
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
