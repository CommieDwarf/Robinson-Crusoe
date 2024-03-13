import React, {Dispatch, SetStateAction} from "react";

import styles from "./SkillLabel.module.css";
import {useTranslation} from "react-i18next";
import {ISkillRenderData} from "@shared/types/Game/Skill/IAbility";

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

    const selectedClass = props.selected ? styles.abilityNameSelected : "";
    const {t} = useTranslation();

    return (
        <div
            className={styles.container + " " + selectedClass}
            onClick={handleClick}
        >
            {/*// @ts-ignore*/}
            <span className={styles.abilityName}>{t(`ability.${props.skill.name}.name`)}</span>
        </div>
    );
}
