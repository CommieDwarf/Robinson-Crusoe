import React from "react";
import styles from "./MoraleBar.module.css";
import moraleIconImg from "/public/UI/icons/morale.webp";
import heartImg from "/public/UI/misc/heart.webp";
import crossLineImg from "/public/UI/misc/cross-line.webp";
import DynamicImage from "../../../../DynamicImage/DynamicImage";

interface Props {
	current: boolean;
	value: number;
}

export default function MoraleBar(props: Props) {
	const moraleBar0Class = props.value == 0 ? styles.moraleBar0 : "";
	const morale0Value = props.value === 0 ? styles.morale0Value : "";
	const moraleCurrentClass = props.current ? styles.current : "";

	if (props.value !== 3) {
		return (
			<div
				className={
					styles.moraleBar +
					" " +
					moraleBar0Class +
					" " +
					moraleCurrentClass
				}
			>
				<div className={styles.moraleLabel}>
					<div className={`${styles.moraleValue} ${morale0Value}`}>
						{props.value}
					</div>
					{props.value !== 0 && (
						<div className={styles.moraleIcon}>
							<div className={styles.moraleImg}>
								<DynamicImage
									src={moraleIconImg}
									fill
									alt="morale"
									sizes={styles.moraleIcon}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div
				className={
					styles.moraleBar +
					" " +
					styles.lastMoraleBar +
					" " +
					moraleCurrentClass
				}
			>
				<div className={styles.moraleLabel}>
					<div className={styles.lastMoraleBarValue}>3</div>
					<div className={styles.lastMoraleIcon}>
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
					<div className={styles.crossLine}>
						<DynamicImage src={crossLineImg} alt={""} fill />
					</div>
				</div>
			</div>
		);
	}
}
