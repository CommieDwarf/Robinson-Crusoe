// @flow
import * as React from "react";
import styles from "./Skills.module.css";
import {Skill} from "./Skill/Skill";
import {PHASE} from "@shared/types/PhaseService/Phase";
import {ISkillRenderData} from "@shared/types/Skill/Skill";

type Props = {
    skills: ISkillRenderData[];
    phase: PHASE;
    selected: string;
    select: (name: string) => void;
};
export const Skills = (props: Props) => {
    const skills = props.skills.filter((skill) => {
        return skill.phasesAllowed.includes(props.phase);
    });

    return (
        <div className={styles.container}>
            {skills.map((skill, i) => {
                return (
                    <Skill
                        skill={skill}
                        key={skill.name}
                        selected={props.selected === skill.name}
                        select={props.select}
                    />
                );
            })}
        </div>
    );
};
