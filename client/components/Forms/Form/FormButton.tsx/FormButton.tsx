import formStyles from "../Form.module.css";
import styles from "./FormButton.module.css";

interface Props {
	active: boolean;
	loading: boolean;
	label: string;
	loadingLabel?: string;
}

export function FormButton(props: Props) {
	return (
		<div className={`${formStyles.rowWrapper} ${formStyles.rowWrapperShort}`}>
			<button
				type="submit"
				className={` ${styles.container}
                        ${props.active && styles.buttonActive}
						${props.loading && styles.buttonLoading}`}
			>
				<span className={styles.label}>
					{props.loadingLabel && props.loading && props.loadingLabel}
					{!props.loading && props.label}
				</span>
			</button>
		</div>
	);
}
