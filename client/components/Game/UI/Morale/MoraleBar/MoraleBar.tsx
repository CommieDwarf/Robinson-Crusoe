import React from "react";
import styles from "./MoraleBar.module.css";

import DynamicImage from "../../../../DynamicImage/DynamicImage";
import moraleIconImg from "/public/UI/icons/morale.webp";

interface Props {
	current: boolean;
	value: number;
}

export default function MoraleBar(props: Props) {
	return (
		<div
			className={`${styles.container} ${props.value === 0 && styles.moraleBar0
				} ${props.current && styles.current}`}
		>
			<div className={styles.moraleLabel}>
				<div
					className={`${styles.moraleValue} ${props.value === 0 && styles.morale0Value
						}`}
				>
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
}
