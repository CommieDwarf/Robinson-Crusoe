import * as React from "react";
import { LoadingSpinner } from "components/LoaderSpinner/LoaderSpinner";
import styles from "./Loading.module.css";

export function Loading() {

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
