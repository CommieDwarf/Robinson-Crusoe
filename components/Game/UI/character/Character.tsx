import Image from "next/image";
import React, {useState} from "react";
import styles from "./Character.module.css";
import SideCharacters from "./sideCharacters/SideCharacters";
import scrollbarStyles from "./Scrollbar.module.css";

import Determination from "./determination/Determination";
import SkillLabel from "./SkillLabel/SkillLabel";
import SkillMenu from "./SkillMenu/SkillMenu";
import Scrollbar from "../Scrollbar";
import Pawn from "../Pawn";
import {Droppable} from "react-beautiful-dnd";
import capitalize from "../../../../utils/capitalizeFirstLetter";
import {IPlayerCharacterRenderData} from "../../../../interfaces/Characters/PlayerCharacter";
import {ISideCharacterRenderData} from "../../../../interfaces/Characters/SideCharacter";
import {ISkillRenderData} from "../../../../interfaces/Skill/Skill";
import {useAppSelector} from "../../../../store/hooks";

interface Props {
    character: IPlayerCharacterRenderData;
    friday: ISideCharacterRenderData;
    dog: ISideCharacterRenderData;
    zIndex: string;
}

export default function Character(props: Props) {
    const [skillDescription, setSkillDescription] = useState<{
        skill: ISkillRenderData | null;
        show: boolean;
    }>({skill: null, show: false});


    const skills = props.character.skills.map((skill, i) => {
        return (
            <SkillLabel
                skill={skill}
                setSkillDescription={setSkillDescription}
                key={i}
                selected={skill === skillDescription.skill && skillDescription.show}
            />
        );
    });

    const zIndexClass = props.zIndex.includes("freepawns")
        ? styles.zIndexIncreased
        : styles.zIndexTransition;

    // const nameCapitalized = capitalize(props.character.namePL);
    const nameCapitalized = capitalize(props.character.namePL);

    const pawns = useAppSelector((state) => state.freePawns.localCharacter);

    return (
        <div className={styles.container + " " + zIndexClass}>
            <div className={styles.characterPicture}>
                <Image
                    src={`/UI/characters/player-characters/${props.character.name}-${props.character.gender}.png`}
                    fill
                    alt="character"
                    sizes={styles.characterPicture}
                />
            </div>
            <div className={styles.description}>
                <div className={styles.characterName}>{nameCapitalized}</div>
                <div className={styles.skills}>
                    <SkillMenu skillDescription={skillDescription}/>
                    {skills}
                </div>
            </div>
            <Determination value={props.character.determination}/>
            <Scrollbar styleModule={scrollbarStyles}>
                <Droppable droppableId={"freepawns-" + props.character.name}>
                    {(provided) => (
                        <div
                            id={"freepawns-" + props.character.name}
                            className={styles.pawns}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {pawns &&
                                pawns.map((pawn, i) => {
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
            <SideCharacters friday={props.friday} dog={props.dog}/>
        </div>
    );
}
