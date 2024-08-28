import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store/hooks";
import styles from "./ConnectCode.module.css";
import { useState } from "react";
import { toast } from 'react-toastify';
import { capitalize } from "lodash";

interface Props {}

export function ConnectCode(props: Props) {
	const connectCode = useAppSelector(
		(state) => state.gameSession.data?.connectCode!
	);
	const { t } = useTranslation();

	const [visible, setVisible] = useState(false);

	function handleClickVisibleButton() {
		setVisible((prev) => !prev);
	}

	function handleCopyClick() {
		navigator.clipboard.writeText(connectCode).then(() => {
			toast(<span>&#128203; {capitalize(t("toast.copied to clipboard"))}!</span>)
		});
		
	}

	return (
		<>
			<span>{t("menu.connect code")}</span>
			<span>
				
				{visible && (
					<input
						className={styles.input}
						type="text"
						value={connectCode}
						readOnly
					></input>
				)}
				<span
					className={styles.button}
					onClick={handleClickVisibleButton}
				>
					{visible ? (
						<i className="icon-eye-off"></i>
					) : (
						<i className="icon-eye"></i>
					)}
				</span>

				<span className={styles.button} onClick={handleCopyClick} title="kopiuj">
					&#128203;
				</span>
			</span>
		</>
	);
}
