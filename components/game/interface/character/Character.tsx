import Image from "next/image";
import React, { useId, useState } from "react";
import styles from "./Character.module.css";
import SideCharacters from "./sideCharacters/SideCharacters";
import scrollbarStyles from "./Scrollbar.module.css";

import Determination from "./determination/Determination";
import SkillLabel from "./SkillLabel/SkillLabel";
import SkillMenu from "./SkillMenu/SkillMenu";
import Scrollbar from "../Scrollbar";
import Pawn from "../Pawn";
import { Droppable } from "react-beautiful-dnd";
import capitalize from "../../../../utils/capitalizeFirstLetter";
import {
  IPlayerCharacter,
  IPlayerCharacterRenderData,
} from "../../../../interfaces/Characters/PlayerCharacter";
import {
  ISideCharacter,
  ISideCharacterRenderData,
} from "../../../../interfaces/Characters/SideCharacter";
import { ISkill } from "../../../../interfaces/Characters/Skill";

interface Props {
  character: IPlayerCharacterRenderData;
  friday: ISideCharacterRenderData;
  dog: ISideCharacterRenderData;
  zIndex: string;
}

export default function Character(props: Props) {
  const [skillDescription, setSkillDescription] = useState<{
    skill: ISkill | null;
    show: boolean;
  }>({ skill: null, show: false });

  const skills = Object.entries(props.character.skills).map(([key, value]) => {
    return (
      <SkillLabel
        skill={value}
        setSkillDescription={setSkillDescription}
        key={key}
        selected={value === skillDescription.skill && skillDescription.show}
      />
    );
  });

  const zIndexClass = props.zIndex.includes("freepawns")
    ? styles.zIndexIncreased
    : styles.zIndexTransition;

  // const nameCapitalized = capitalize(props.character.namePL);
  const nameCapitalized = capitalize(props.character.namePL);
  return (
    <div className={styles.container + " " + zIndexClass}>
      <div className={styles.characterPicture}>
        <Image
          src={`/interface/characters/characterPictures/${props.character.name}-${props.character.gender}.png`}
          layout="fill"
          alt="character"
        />
      </div>
      <div className={styles.description}>
        <div className={styles.characterName}>{nameCapitalized}</div>
        <div className={styles.skills}>
          <SkillMenu skillDescription={skillDescription} />
          {skills}
        </div>
      </div>
      <Determination value={props.character.determination} />
      <Scrollbar styleModule={scrollbarStyles}>
        <Droppable droppableId={"freepawns-" + props.character.name}>
          {(provided) => (
            <div
              id={"freepawns-" + props.character.name}
              className={styles.pawns}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.character.freePawns.map((pawn, i) => {
                return (
                  <Pawn
                    pawn={pawn}
                    context={"character"}
                    index={i}
                    key={pawn.draggableId}
                  />
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Scrollbar>
      <SideCharacters friday={props.friday} dog={props.dog} />
    </div>
  );
}
