import * as React from "react";
import { LoadingSpinner } from "components/LoaderSpinner/LoaderSpinner";
import styles from "./Loading.module.css";
import { LoadingFiles } from "config/preloadFiles";
import useImagePreloader from "utils/hooks/UsePreloadedImages";

export function Loading() {
	const { imagesPreloaded } = useImagePreloader(LoadingFiles);
	

	return (
		<div className={styles.container}>
			<h1>Ładowanie...</h1>
			<div className={styles.loadingSpinner}>
				<LoadingSpinner />
			</div>
		</div>
	);
}

export default Loading;
