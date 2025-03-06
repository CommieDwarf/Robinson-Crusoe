import styles from "./Session.module.css";
import { capitalize } from "lodash";
import { useTranslation } from "react-i18next";

interface Props {
	name: string;
	host: string;
	playerAmount: number;
	maxPlayerAmount: number;
	scenario: string;
	password: boolean;
	id: string;
	onPasswordJoinAttempt: (sessionId: string) => void;
	onJoinClick: (sessionId: string) => void;
	shortMode?: boolean;
	hidePassword?: boolean;
}

export function Session(props: Props) {
	const { t } = useTranslation();

	function handleClick() {
		if (props.password) {
			props.onPasswordJoinAttempt(props.id);
		} else {
			props.onJoinClick(props.id);
		}
	}

	return (
		<div className={`${styles.container}`}>
			<div
				className={`${styles.sessionInfo} ${styles.sessionInfoGrid} ${
					props.shortMode && styles.sessionInfoShortened
				}`}
			>
				<div className={`${styles.name}`}>{props.name}</div>
				<div className={styles.host}>{props.host}</div>
				<div className={styles.playerAmount}>
					{props.playerAmount}/{props.maxPlayerAmount}
				</div>
				<div className={styles.scenario}>
					{/* @ts-ignore */}
					{capitalize(t(`scenario.${props.scenario}.name`))}
				</div>
				{!props.hidePassword && (
					<div className={styles.password}>
						{props.password ? (
							<i className={"icon-lock"}></i>
						) : (
							<i className={"icon-lock-open"}></i>
						)}
					</div>
				)}
			</div>
			<div className={styles.buttonWrapper}>
				<div className={"menuButton"} onClick={handleClick}>
					{capitalize(t("menu.join"))}
				</div>
			</div>
		</div>
	);
}
