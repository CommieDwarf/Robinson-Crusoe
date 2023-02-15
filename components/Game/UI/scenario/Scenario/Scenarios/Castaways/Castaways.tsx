import styles from "./Castaways.module.css";
import Image from "next/image";
import { RoundSquare } from "./RoundSquare";
import { Description } from "./Description/Description";
import { WoodStack } from "./WoodStack/WoodStack";

import Invention from "../../../../inventions/Invention/Invention";
import React from "react";
import { IInventionRenderData } from "../../../../../../../interfaces/InventionService/Invention";
import { IPawnRenderData } from "../../../../../../../interfaces/Pawns/Pawn";
import { castaways } from "../../../../../../../constants/scenarios/castaways";

import scenarioBackgroundImg from "/public/UI/scenarios/background.png";
import bookEffectImg from "/public/UI/scenarios/castaways/book-effect.png";
import totemEffectImg from "/public/UI/scenarios/castaways/totem-effect.png";
import scenarioTokensImg from "/public/UI/scenarios/castaways/tokens.png";

interface Props {
  inventions: IInventionRenderData[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  zIndex: string;
  round: number;
}

export default function Castaways(props: Props) {
  let rounds = [];

  for (let i = 1; i <= 12; i++) {
    const ship = i >= 10;
    const weather = {
      rain: castaways.weather.rain.includes(i),
      snow: castaways.weather.winter.includes(i),
      hungryAnimal: castaways.weather.animals.includes(i),
    };
    const current = i === props.round;
    rounds.push(
      <RoundSquare
        round={i}
        ship={ship}
        weather={weather}
        currentRound={current}
        key={i}
      />
    );
  }

  function handleClick() {
    props.setShow(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.hideButton} onClick={handleClick}>
        X
      </div>
      <div className={styles.titleDiv}>
        <span className={styles.title}>Rozbitkowie</span>
        <Image
          src={scenarioBackgroundImg}
          className={styles.titleImage}
          fill
          alt="tytuł tło"
          sizes={styles.titleDiv}
        />
      </div>
      <div className={styles.rounds}>{rounds}</div>
      <Description />
      <div className={styles.eventEffects}>
        <div className={styles.eventEffect + " " + styles.bookEffect}>
          <Image
            src={bookEffectImg}
            fill
            alt={"tokeny"}
            sizes={styles.eventEffect}
          />
        </div>

        <div className={styles.eventEffect}>
          <Image
            src={totemEffectImg}
            fill
            alt={"tokeny"}
            sizes={styles.eventEffect}
          />
        </div>
      </div>
      <WoodStack stackLevel={5} committedWood={0} wood={1} />
      <div className={styles.bottomHalf}>
        <div className={styles.tokens}>
          <Image
            src={scenarioTokensImg}
            fill
            alt={"tokeny"}
            sizes={styles.tokens}
          />
        </div>
        <div className={styles.inventions}>
          {props.inventions.map((inv, i) => {
            return (
              <Invention
                key={inv.name}
                invention={inv}
                column={i + 1}
                row={1}
                top={-100}
                zIndex={props.zIndex}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
