import styles from "./Message.module.css";
import { StyledHr } from "components/StyledHr/StyledHr";

interface Props {
	title: string;
	message: string;
}

export function Message(props: Props) {

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{props.title}</h1>
			<StyledHr color="hunt" style={{ width: "90%" }} />
			<span>{props.message}</span>
		</div>
	);
}
