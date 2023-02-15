// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import { IGameRenderData } from "../../interfaces/Game";
import createGame from "../api/createGame";
import getGameRenderData from "../api/getGame";
import Game from "../../components/Game/Game";
import { NextPage } from "next";
import { useAppDispatch } from "../../store/hooks";
import { setActionSlots } from "../../store/actionSlots";

type Props = {};
const Play: NextPage = (props: Props) => {
  const [gameRenderData, setGameRenderData] = useState<IGameRenderData>();
  useEffect(() => {
    createGame();
    updateGameRenderData();
  }, []);

  const dispatch = useAppDispatch();

  function updateGameRenderData() {
    const renderData = JSON.parse(getGameRenderData()) as IGameRenderData;
    setGameRenderData(renderData);
    dispatch(setActionSlots(renderData.actionSlotService.slots));
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
