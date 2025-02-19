import styles from "./ConfirmWindow.module.css";
import { CONFIRM_WINDOW, confirmWindowMessages } from "./messages";
import sharedStyles from "../../../../styles/shared.module.css";
import Draggable from "react-draggable";

interface Props {
	name: CONFIRM_WINDOW;
	onAccept: () => void;
	onRefuse: () => void;
}

export function ConfirmWindow(props: Props) {
	function handleAccept() {
		props.onAccept();
	}

	function handleRefuse() {
		props.onRefuse();
	}

	return (
		<Draggable
			bounds="parent"
			defaultClassNameDragging={sharedStyles.grabbing}
		>
			<div className={styles.container}>
				<span className={styles.title}>Uwaga!</span>
				<div className={styles.text}>
					{confirmWindowMessages[props.name]}
				</div>
				<hr />
				<div className={styles.buttonsRow}>
					<div
						className={`${styles.button} ${styles.accept}`}
						onClick={handleAccept}
					>
						Akceptuj
					</div>
					<div
						className={`${styles.button} ${styles.refuse}`}
						onClick={handleRefuse}
					>
						Anuluj
					</div>
				</div>
			</div>
		</Draggable>
	);
}
