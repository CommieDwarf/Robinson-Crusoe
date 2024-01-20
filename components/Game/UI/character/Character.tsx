import Image from "next/image";
import React, {useState} from "react";
import styles from "./Character.module.css";
import SideCharacters from "./sideCharacters/SideCharacters";

import Determination from "./determination/Determination";
import SkillLabel from "./SkillLabel/SkillLabel";
import SkillMenu from "./SkillMenu/SkillMenu";
import Pawn from "../Pawn";
import {Droppable} from "react-beautiful-dnd";
import capitalize from "../../../../utils/capitalizeFirstLetter";
import {IPlayerCharacter, IPlayerCharacterRenderData, Wounds} from "../../../../interfaces/Characters/PlayerCharacter";
import {ISideCharacterRenderData} from "../../../../interfaces/Characters/SideCharacter";
import {ISkillRenderData} from "../../../../interfaces/Skill/Skill";
import {useAppSelector} from "../../../../store/hooks";
import Wound from "./Wound/Wound";
import Entries from "../../../../interfaces/Entries";
import {Cloud, OverallWeather} from "../../../../interfaces/Weather/Weather";
import {ActionDice} from "../../../../interfaces/RollDice/RollDice";

interface Props {
    character: IPlayerCharacterRenderData;
    friday: ISideCharacterRenderData;
    dog: ISideCharacterRenderData;
    zIndex: string;
    useSkill: (character: string, skillName: string, target?: IPlayerCharacter | ActionDice | Cloud) => void;
    overallWeather: OverallWeather
}

export default function Character(props: Props) {
    const [skillDescription, setSkillDescription] = useState<{
        skill: ISkillRenderData | null;
        show: boolean;
    }>({skill: null, show: false});

    function useSkill(skillName: string, target?: IPlayerCharacter | ActionDice | Cloud) {
        props.useSkill(props.character.name, skillName, target);
    }


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

    const wounds: JSX.Element[] = [];

    const woundEntries = Object.entries(props.character.wounds) as Entries<Wounds>;
    woundEntries.forEach(([bodyPart, actions], i) => {
        actions.forEach((action, j) => {
            wounds.push(<Wound character={props.character} bodyPart={bodyPart}
                               action={action} count={j} key={i + j * 10}/>)
        })
    })


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
            {wounds}
            <div className={styles.description}>

                <div className={styles.skills}>
                    <SkillMenu skillDescription={skillDescription} use={useSkill}
                               used={props.character.skills.find((skill) => skill.name === skillDescription.skill?.name)?.usedInThisRound || false}
                               overallWeather={props.overallWeather}
                    />
                    {skills}
                </div>
            </div>
            <div className={styles.rightTop}>
                <div className={styles.characterName}>{nameCapitalized}</div>
                <Determination value={props.character.determination}/>
            </div>

            <div className={styles.scroll}>
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
            </div>
            <SideCharacters friday={props.friday} dog={props.dog}/>
        </div>
    );
}
