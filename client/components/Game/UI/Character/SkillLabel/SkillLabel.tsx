import React from "react";

import styles from "./SkillLabel.module.css";
import { useTranslation } from "react-i18next";
import { IAbilityRenderData } from "@shared/types/Game/Skill/IAbility";

interface Props {
	ability: IAbilityRenderData;
	selectAbility: (ability: IAbilityRenderData) => void;
	selected: boolean;
}

export default function SkillLabel(props: Props) {
	function handleClick() {
		props.selectAbility(props.ability);
	}

	const selectedClass = props.selected ? styles.abilitySelected : "";
	const { t } = useTranslation();

	return (
		<div
			className={styles.container + " " + selectedClass}
			onClick={handleClick}
		>
			{/*// @ts-ignore*/}
			<span className={styles.abilityName}>
				{t(`ability.${props.ability.name}.name`)}
			</span>
		</div>
	);
}
