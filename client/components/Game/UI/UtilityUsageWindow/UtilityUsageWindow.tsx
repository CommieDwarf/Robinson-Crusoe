// @flow
import * as React from "react";
import {useState} from "react";
import styles from "./UtilityUsageWindow.module.css";
import {Skills} from "./Skills/Skills";
import {ISkillRenderData} from "../../../../../server/src/types/Skill/Skill";
import {PHASE} from "../../../../../server/src/types/PhaseService/Phase";

type Props = {
    skills: ISkillRenderData[];
    determination: number;
    phase: PHASE;
};
export const UtilityUsageWindow = (props: Props) => {
    const [selected, setSelected] = useState("");

    function select(name: string) {
        setSelected(name);
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.useButton}>Użyj</div>
            </header>
            <Skills
                skills={props.skills}
                phase={props.phase}
                selected={selected}
                select={select}
            />
        </div>
    );
};
