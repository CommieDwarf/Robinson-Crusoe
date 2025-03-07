import ResizableImage from "../DynamicImage/DynamicImage";
import styles from "./LoaderSpinner.module.css";

export function LoadingSpinner() {
	return (
		<div className={styles.container}>
			<div>
				<ResizableImage src="/UI/misc/hourglass.webp" alt="loading" />
			</div>
		</div>
	);
}
