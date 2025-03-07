import styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import ResizableImage from "../../../components/DynamicImage/DynamicImage";
import Link from "next/link";
import {
	GAME_SETTINGS_MODE,
	GameSettings,
} from "../../../components/Lobby/GameSettings/GameSettings";
import exitIcon from "/public/UI/icons/exit4.webp";

export interface Props {}

export function CreateGame() {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<Link href={"./"}>
				<div className={styles.menuButton}>
					<ResizableImage src={exitIcon} alt={"menu"} />
				</div>
			</Link>
			<div className={styles.gameSettings}>
				<GameSettings
					mode={GAME_SETTINGS_MODE.GAME_CREATE}
					host={true}
				/>
			</div>
		</div>
	);
}

export default CreateGame;
