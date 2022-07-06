import Image from "next/image";
import React, { useId, useState } from "react";
import styles from "./Character.module.css";
import SideCharacters from "./sideCharacters/SideCharacters";
import scrollbarStyles from "./Scrollbar.module.css";

import Determination from "./determination/Determination";
import Skill from "./Skill/Skill";
import ICharacter, { ISkill } from "../../../../interfaces/Character";
import SkillMenu from "./SkillMenu/SkillMenu";
import Scrollbar from "../Scrollbar";
import Pawn from "../Pawn";
import IPawn from "../../../../interfaces/Pawn";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  character: ICharacter;
  friday: ICharacter;
  dog: ICharacter;
}

export default function Character(props: Props) {
  const [skillDescription, setSkillDescription] = useState<{
    skill: ISkill | null;
    show: boolean;
  }>({ skill: null, show: false });

  const skills = props.character.skills.map((skill, i) => {
    return (
      <Skill skill={skill} setSkillDescription={setSkillDescription} key={i} />
    );
  });

  const pawnSize = {
    width: "30px",
    height: "30px",
  };

  return (
    <div className={styles.container}>
      <div className={styles.characterPicture}>
        <Image
          src={`/interface/characters/characterPictures/${props.character.name.en}-${props.character.gender}.png`}
          layout="fill"
          alt="character"
        />
      </div>
      <div className={styles.description}>
        <div className={styles.characterName}>{props.character.name.pl}</div>
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
