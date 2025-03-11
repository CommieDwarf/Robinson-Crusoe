import DynamicImage from "components/DynamicImage/DynamicImage";
import MoraleBarStyles from "./MoraleBar.module.css";
import styles from "./MoraleBar3.module.css";
import heartImg from "/public/UI/misc/heart.webp";
import crossLineImg from "/public/UI/misc/cross-line.webp";
import moraleIconImg from "/public/UI/icons/morale.webp";

interface Props {
	current: boolean;
}

export function MoraleBar3(props: Props) {
	return (
		<div
			className={`${MoraleBarStyles.container} ${styles.container} ${
				props.current && MoraleBarStyles.current
			}`}
		>
			<div className={MoraleBarStyles.moraleLabel}>
				<div className={styles.value}>3</div>
				<div className={styles.icon}>
					<DynamicImage
						src={moraleIconImg}
						fill
						alt="morale"
						sizes={styles.lastMoraleBar}
					/>
				</div>
				<div className={styles.heart}>
					<DynamicImage
						src={heartImg}
						fill
						alt="życie"
						sizes={styles.heart}
					/>
				</div>
				<div className={styles.diagnal}>
					<DynamicImage src={crossLineImg} alt={""} fill />
				</div>
			</div>
		</div>
	);
}
