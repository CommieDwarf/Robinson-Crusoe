import capitalize from "@shared/utils/capitalize";
import styles from "./PhaseElement.module.css";
import { useTranslation } from "react-i18next";
import { PhaseType } from "../Phase";
import DynamicImage from "components/DynamicImage/DynamicImage";



interface Props {
	currentPhase: boolean;
	phase: PhaseType;
    i: number;
    height: number;
}

export function PhaseElement(props: Props) {
	const [t] = useTranslation();

    const phaseTranslated = t(`phase.phase`, {
        phase: props.phase,
    })

	return (
		<div
			className={`${styles.container} ${
				props.currentPhase && styles.currentPhase
			} ${props.phase === "night" && styles.last}`}
            style={{height: props.height}}
		>
			<div className={`${styles.phaseLabel} ${styles[props.phase]}`}>
				{props.i + 1}.{" "}
				{capitalize(
					phaseTranslated
				)}
			</div>
			<div className={styles.phasePicture}>
				<DynamicImage src={`/UI/phase/${props.phase}-pic.webp`} alt={phaseTranslated} />
			</div>
		</div>
	);
}
