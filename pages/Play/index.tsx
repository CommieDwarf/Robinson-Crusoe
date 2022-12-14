// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import { IGameRenderData } from "../../interfaces/Game";
import createGame from "../api/createGame";
import getGameRenderData from "../api/getGame";
import Game from "../../components/game/Game";
import { GetServerSideProps, NextPage } from "next";
import { resetServerContext } from "react-beautiful-dnd";

type Props = {};
const Play: NextPage = (props: Props) => {
  const [gameRenderData, setGameRenderData] = useState<IGameRenderData>();
  useEffect(() => {
    createGame();
    setGameRenderData(JSON.parse(getGameRenderData()));
  }, []);

  function updateGameRenderData() {
    setGameRenderData(JSON.parse(getGameRenderData()));
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
