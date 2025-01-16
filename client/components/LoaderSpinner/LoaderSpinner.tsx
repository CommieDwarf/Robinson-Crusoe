import ResizableImage from "../ResizableImage/ResizableImage";
import styles from "./LoaderSpinner.module.css";

export function LoadingSpinner() {
	return (
		<div className={styles.container}>
			<div>
				<ResizableImage src="/UI/misc/hourglass.png" alt="loading" />
			</div>
		</div>
	);
}
