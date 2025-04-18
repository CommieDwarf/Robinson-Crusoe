import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store/hooks";
import styles from "./InvitationCode.module.css";
import { useState } from "react";
import { toast } from "react-toastify";


export function InvitationCode() {
	const code = useAppSelector(
		(state) => state.gameSession.data!.invitationCode
	);
	const { t } = useTranslation();

	const [visible, setVisible] = useState(false);

	function handleClickVisibleButton() {
		setVisible((prev) => !prev);
	}

	function handleCopyClick() {
		navigator.clipboard.writeText(code).then(() => {
			toast(<span> {t("toast.copied to clipboard")}</span>, {
				icon: <span>&#128203;</span>,
			});
		});
	}

	return (
		<>
			<span>
				{visible && (
					<input
						className={`${styles.input} font-mono`}
						type="text"
						value={code}
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

				<span
					className={styles.button}
					onClick={handleCopyClick}
					title="kopiuj"
				>
					&#128203;
				</span>
			</span>
		</>
	);
}
