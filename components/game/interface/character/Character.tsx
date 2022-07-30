import Image from "next/image";
import React, { useId, useState } from "react";
import styles from "./Character.module.css";
import SideCharacters from "./sideCharacters/SideCharacters";
import scrollbarStyles from "./Scrollbar.module.css";

import Determination from "./determination/Determination";
import Skill from "./Skill/Skill";
import ICharacter, {
  ISkill,
} from "../../../../interfaces/Characters/Character";
import SkillMenu from "./SkillMenu/SkillMenu";
import Scrollbar from "../Scrollbar";
import Pawn from "../Pawn";
import { Droppable } from "react-beautiful-dnd";
import capitalize from "../../../../utils/capitalize";

interface Props {
  character: ICharacter;
  friday: ICharacter;
  dog: ICharacter;
  zIndexIncreased: Map<string, boolean>;
  setZIndexIncreased: React.Dispatch<
    React.SetStateAction<Map<string, boolean>>
  >;
}

export default function Character(props: Props) {
  const [skillDescription, setSkillDescription] = useState<{
    skill: ISkill | null;
    show: boolean;
  }>({ skill: null, show: false });

  const skills = props.character.skills.map((skill, i) => {
    return (
      <Skill
        skill={skill}
        setSkillDescription={setSkillDescription}
        key={i}
        setZIndex={props.setZIndexIncreased}
      />
    );
  });

  const zIndexClass = props.zIndexIncreased
    ? styles.zIndexIncreased
    : styles.zIndexTransition;

  const nameCapitalized = capitalize(props.character.name.pl);

  return (
    <div className={styles.container + " " + zIndexClass}>
      <div className={styles.characterPicture}>
        <Image
          src={`/interface/characters/characterPictures/${props.character.name.en}-${props.character.gender}.png`}
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
      <Determination />
      <Scrollbar styleModule={scrollbarStyles}>
        <Droppable droppableId={"freepawns"}>
          {(provided) => (
            <div
              id="freepawns"
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
                    key={pawn.id}
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
