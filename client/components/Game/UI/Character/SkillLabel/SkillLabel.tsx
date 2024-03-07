import React, {Dispatch, SetStateAction} from "react";

import styles from "./SkillLabel.module.css";
import {ISkillRenderData} from "@shared/types/Skill/Skill";

interface Props {
    skill: ISkillRenderData;
    setSkillDescription: Dispatch<
        SetStateAction<{ skill: ISkillRenderData | null; show: boolean }>
    >;
    selected: boolean;

}

export default function SkillLabel(props: Props) {
    function handleClick() {
        props.setSkillDescription((prev) => {
            if (prev.skill == props.skill && prev.show) {
                return {
                    skill: props.skill,
                    show: false,
                };
            } else {
                return {
                    skill: props.skill,
                    show: true,
                };
            }
        });
    }

    const selectedClass = props.selected ? styles.skillNameSelected : "";

    return (
        <div
            className={styles.container + " " + selectedClass}
            onClick={handleClick}
        >
            <span className={styles.skillName}>{props.skill.namePL}</span>
        </div>
    );
}
