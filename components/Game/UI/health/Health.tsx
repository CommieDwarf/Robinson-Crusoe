import Image from "next/image";
import React from "react";
import styles from "./Health.module.css";
import heartImg from "/public/UI/misc/heart.png";
import redHeartImg from "/public/UI/icons/red-heart.png";
import moraleArrowLeftImg from "/public/UI/icons/morale-arrow-left.png";
import skullImg from "/public/UI/icons/skull.png";
import { ICharacterRenderData } from "../../../../interfaces/Characters/Character";
import { ICharacterService, ICharacterServiceRenderData } from "../../../../interfaces/CharacterService/CharacterService";
import Threshold from "./Threshold";

interface Props {
  value: number;
  maxHealth: number;
  moraleThresholds: number[];
  characterService: ICharacterServiceRenderData;
  removeThreshold: (threshold: number) => void;
}

function Health(props: Props) {
  let marks: JSX.Element[] = [];


  for (let i = props.maxHealth; i > 0; i--) {
    marks.push(
      <div className={styles.heart} key={i}>
        <Image
          src={i === props.value ? redHeartImg : heartImg}
          fill
          alt="serce"
          sizes={styles.heart}
        />
      </div>
    );
    if (props.moraleThresholds.includes(i - 1)) {
      marks.push(
        <Threshold id={i - 1} 
        thresholdAmountForRemoval={props.characterService.thresholdAmountForRemoval}
        removeThreshold={props.removeThreshold}
        //TODO: CHANGE HARDCODED CHAR
        removed={props.characterService.playerCharacters[0].moraleThresholdsRemoved.includes(i -1)}
        />
      );
    }
  }
  marks.push(
    <div className={styles.skull} key={2137}>
      <Image src={skullImg} fill alt="czaszka" sizes={styles.skull} />
    </div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.health}>{marks}</div>
    </div>
  );
}

export default React.memo(Health);