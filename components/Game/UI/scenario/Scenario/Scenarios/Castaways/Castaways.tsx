import styles from "./Castaways.module.css";
import Image from "next/image";
import { Description } from "./Description/Description";
import { WoodStack } from "./WoodStack/WoodStack";

import Invention from "../../../../inventions/Invention/Invention";
import React from "react";
import { IInventionRenderData } from "../../../../../../../interfaces/InventionService/Invention";

import scenarioBackgroundImg from "/public/UI/scenarios/background.png";
import bookEffectImg from "/public/UI/scenarios/castaways/book-effect.png";
import totemEffectImg from "/public/UI/scenarios/castaways/totem-effect.png";
import scenarioTokensImg from "/public/UI/scenarios/castaways/tokens.png";
import Rounds from "./Rounds/Rounds";

interface Props {
  inventions: IInventionRenderData[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  zIndex: string;
  round: number;
}

export default function Castaways(props: Props) {
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
      <Rounds current={props.round} />
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
                zIndexIncreased={props.zIndex.includes(inv.name)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
