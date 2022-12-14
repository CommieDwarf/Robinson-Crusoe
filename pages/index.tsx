import type { NextPage } from "next";
import { IGameRenderData } from "../interfaces/Game";
import { useEffect, useState } from "react";
import createGame from "./api/createGame";
import getGameRenderData from "./api/getGame";
import Game from "../components/game/Game";

const Home: NextPage = () => {
  const [gameRenderData, setGameRenderData] = useState<IGameRenderData>();
  useEffect(() => {
    createGame();
    setGameRenderData(JSON.parse(getGameRenderData()));
  }, []);

  function handleUpdateGameRenderData() {
    setGameRenderData(JSON.parse(getGameRenderData()));
  }

  return (
    <div>
      {gameRenderData && (
        <Game
          gameRenderData={gameRenderData}
          updateGameRenderData={handleUpdateGameRenderData}
        />
      )}
    </div>
  );
};

export default Home;
