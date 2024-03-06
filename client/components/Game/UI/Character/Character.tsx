import React, {useLayoutEffect, useRef, useState} from "react";
import styles from "./Character.module.css";
import SideCharacters from "./SideCharacters/SideCharacters";

import Determination from "./Determination/Determination";
import SkillLabel from "./SkillLabel/SkillLabel";
import SkillMenu from "./SkillMenu/SkillMenu";
import Pawn from "../Pawn";
import {Droppable} from "react-beautiful-dnd";

import {emitAction} from "../../../../pages/api/emitAction";
import {CHARACTER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {Cloud, OverallWeather} from "@shared/types/Game/Weather/Weather";
import {IPlayerCharacter, IPlayerCharacterRenderData, Wounds} from "@shared/types/Game/Characters/PlayerCharacter";
import {useAppSelector} from "../../../../store/hooks";
import Entries from "@shared/types/Entries";
import Wound from "./Wound/Wound";
import {getOwnedDroppableId} from "@shared/utils/getOwnedDroppableId";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {ISkillRenderData} from "@shared/types/Game/Skill/Skill";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {ISideCharacterRenderData} from "@shared/types/Game/Characters/SideCharacter";
import {capitalize, kebabCase} from "lodash";

interface Props {
    character: IPlayerCharacterRenderData;
    friday: ISideCharacterRenderData;
    dog: ISideCharacterRenderData;
    zIndex: string;
    overallWeather: OverallWeather
}

export default function Character(props: Props) {
    const [skillDescription, setSkillDescription] = useState<{
        skill: ISkillRenderData | null;
        show: boolean;
    }>({skill: null, show: false});

    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const {current} = containerRef;
        if (current) {
            setContainerWidth(current.clientWidth);
        }
    }, []);

    function useSkill(abilityName: string, target: IPlayerCharacter | ActionDice | Cloud) {
        emitAction(CHARACTER_CONTROLLER_ACTION.USE_ABILITY, {
            abilityName,
            target
        })
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

    // const nameCapitalized = capitalize(props.Character.namePL);
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

    const charImgName = kebabCase(`${props.character.name} ${props.character.gender}`)
    const droppableId = getOwnedDroppableId(props.character.name, "character")
    return (
        <div className={styles.container + " " + zIndexClass} ref={containerRef}>
            <div className={styles.characterPictureWrapper}>
                <div className={styles.characterPicture}>
                    {wounds}
                    <ResizableImage
                        src={`/UI/characters/player-characters/${charImgName}.png`}
                        fill
                        alt="character"
                        sizes={styles.characterPicture}
                    />
                </div>
            </div>


            <div className={styles.characterName}>{nameCapitalized}</div>
            <SkillMenu skillDescription={skillDescription} use={useSkill}
                       used={props.character.skills.find((skill) => skill.name === skillDescription.skill?.name)?.usedInThisRound || false}
                       overallWeather={props.overallWeather}
                       width={containerWidth}
            />
            <div className={styles.skills}>
                {skills}
            </div>
            <div className={styles.rightTop}>
                <Determination value={props.character.determination}/>
            </div>

            <div className={styles.scroll}>
                <Droppable droppableId={droppableId}>
                    {(provided) => (
                        <div
                            id={droppableId}
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
