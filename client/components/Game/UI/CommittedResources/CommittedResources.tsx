import React from "react";
import styles from "./CommittedResources.module.css";
import ResizableImage from "../../../DynamicImage/DynamicImage";
import { SingleResourceRequirement } from "@shared/types/Game/ResourceCommitableItem/ResourceCommittableItem";
import { IBasicResourcesAmount } from "@shared/types/Game/Resources/Resources";
import { PersonalResourceIcon } from "../Character/Expendables/Expendable/Expendable/PersonalResourceIcon/PersonalResourceIcon";

interface Props {
	committedResources: SingleResourceRequirement<keyof IBasicResourcesAmount>;
	personalResourceUsed: boolean;
	background: boolean;
	justifyContent: "start" | "center";
}

function CommittedResources(props: Props) {
	const resourceElements = [];
	const { amount, type } = props.committedResources;

	for (let i = 0; i < amount; i++) {
		resourceElements.push(
			<div
				className={`${styles.icon} ${
					props.background && styles.background
				}`}
			>
				<ResizableImage src={`/UI/icons/${type}.webp`} alt={type} />
			</div>
		);
	}

	if (props.personalResourceUsed) {
		resourceElements.push(
			<div
				className={`${styles.icon} ${
					props.background && styles.background
				}`}
			>
				<PersonalResourceIcon type={type} />
			</div>
		);
	}

	return (
		<div
			className={styles.container}
			style={{ justifyContent: props.justifyContent }}
		>
			{resourceElements}
		</div>
	);
}

export default CommittedResources;
