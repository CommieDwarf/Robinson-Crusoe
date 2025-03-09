import styles from "./PersonalResourceIcon.module.css";
import DynamicImage from "../../../../../../../DynamicImage/DynamicImage";
import { IBasicResourcesAmount } from "@shared/types/Game/Resources/Resources";

interface Props {
	type: keyof IBasicResourcesAmount;
}

// Personal ResourceModifiers is meant to be spent on pawn assignment to action that cost resource.
export function PersonalResourceIcon(props: Props) {
	return (
		<div className={styles.container}>
			<DynamicImage
				src={`/UI/icons/${props.type}.webp`}
				alt={props.type}
			/>
		</div>
	);
}
