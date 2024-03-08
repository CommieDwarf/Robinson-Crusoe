// @flow
import * as React from "react";
import styles from "./Skill.module.css";
import {ISkillRenderData} from "@shared/types/Game/Skill/IAbility";
import {insertIconsIntoText} from "../../../../../../utils/insertIconsIntoText";

type Props = {
    skill: ISkillRenderData;
    selected: boolean;
    select: (name: string) => void;
};
export const Skill = (props: Props) => {
    const description = insertIconsIntoText(props.skill.description);

    function handleClick() {
        props.select(props.skill.name);
    }

    const selectedClass = props.selected ? styles.selected : "";

    return (
        <div
            className={`${styles.container} ${selectedClass}`}
            onClick={handleClick}
        >
            <div className={styles.skillName}>{props.skill.namePL}</div>
            <div className={styles.description}>
                {description.map((str, i) => (
                    <span key={i}>{str}</span>
                ))}
            </div>
        </div>
    );
};
