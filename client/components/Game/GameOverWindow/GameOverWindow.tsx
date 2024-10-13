import styles from "./GameOverWindow.module.css";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { capitalize } from "lodash";
import { EndGameSummary } from "@shared/types/Game/GameSummary/GameSummary";
import { useAppSelector } from "../../../store/hooks";

interface Props {
	endGameSummary: EndGameSummary;
}

export function GameOverWindow(props: Props) {
	const { t } = useTranslation();

	const sessionId = useAppSelector((state) => state.gameSession).sessionId;
	const quickGame = useAppSelector(
		(state) => !!state.gameSession.data?.settings.quickGame
	);

	function getScenarioNarrative() {
		if (!props.endGameSummary.defeatReason) {
			return t(`scenario.castaways.winNarrative`);
		}
		if (props.endGameSummary.defeatReason === "death") {
			//todo: wprowadz opcje wyswielania nazw wielu martwych graczy
			const deadPlayer = props.endGameSummary.players.find(
				(player) => player.character!.health <= 0
			)!;
			return t(`scenario.castaways.defeatNarrative_death`, {
				player: deadPlayer.username,
			});
		}
		return t(`scenario.castaways.defeatNarrative_missedObjective`);
	}

	const gameWon = !props.endGameSummary.defeatReason;

	return (
		<div className={styles.container}>
			{gameWon ? (
				<h2 className={styles.statusWin}>{t("menu.win").toUpperCase()}</h2>
			) : (
				<h2 className={styles.statusDefeat}>{t("menu.defeat").toUpperCase()}</h2>
			)}
			<p className={styles.narrative}>{getScenarioNarrative()}</p>
			<div className={styles.summary}>
				<div>
					{capitalize(t("menu.rounds survived"))}: {props.endGameSummary.roundsSurvived}
				</div>
			</div>
			{quickGame ? (
				<div className={styles.buttonWrapper}>
					<div className={"menuButton"}>
						<Link href={"/"}>
							{capitalize(t("menu.to menu"))}
						</Link>
					</div>
				</div>
			) : (
				<div className={styles.buttonWrapper}>
					<div className={"menuButton"}>
						<Link href={"/multiplayer/lobby/" + sessionId}>
						{capitalize(t("menu.to lobby"))}
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
