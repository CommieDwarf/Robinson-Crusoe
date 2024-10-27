import styles from "./FormError.module.css";

interface Props {
	error: string | "";
}

export function FormError(props: Props) {
	return (
		<div className={styles.container}>
			{props.error && (
				<>
					<i className="icon-warning"></i>
					{props.error}
				</>
			)}
		</div>
	);
}
