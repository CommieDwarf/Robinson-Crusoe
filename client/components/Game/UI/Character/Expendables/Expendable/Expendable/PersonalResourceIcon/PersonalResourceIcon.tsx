import styles from "./PersonalResourceIcon.module.css";
import ResizableImage from "../../../../../../../ResizableImage/ResizableImage";
import { IBasicResourcesAmount } from "@shared/types/Game/Resources/Resources";

interface Props {
	type: keyof IBasicResourcesAmount;
}

// Personal ResourceModifiers is meant to be spent on pawn assignment to action that cost resource.
export function PersonalResourceIcon(props: Props) {
	return (
		<div className={styles.container}>
			<ResizableImage
				src={`/UI/icons/${props.type}.png`}
				alt={props.type}
			/>
		</div>
	);
}
