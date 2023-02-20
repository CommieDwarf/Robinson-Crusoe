import type { NextPage } from "next";
import { IGameRenderData } from "../interfaces/Game";
import { useEffect, useState } from "react";
import createGame from "./api/createGame";
import getGameRenderData from "./api/getGame";
import "../I18n/I18n";
import Link from "next/link";
import styles from "./index.module.css";

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
    <div className={styles.container}>
      <h1>Tu Będzie kiedyś menu</h1>
      <Link href={"./Play"}>Graj</Link>
    </div>
  );
};

export default Home;
