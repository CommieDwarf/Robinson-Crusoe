import styles from "../Guide.module.css";

interface Props {
	imgElement: () => JSX.Element;
	textElement: () => JSX.Element;
	borderRadius?: boolean;
}

export function ImgListItem(props: Props) {
	return (
		<li className={styles.li}>
			<div
				className={`${styles.listItemImg} ${
					props.borderRadius && styles.borderRadius
				}`}
			>
				{props.imgElement()}
			</div>
			<div className={styles.listItemDescription}>
				{props.textElement()}
			</div>
		</li>
	);
}
