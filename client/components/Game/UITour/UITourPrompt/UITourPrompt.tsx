import { DraggableWindow } from "components/Game/UI/DraggableWindow/DraggableWindow";
import styles from "./UITourPrompt.module.css";
import { CheckBox } from "components/Checkbox/CheckBox";
import { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { tourInProgressUpdated, UITourRefusedUpdated } from "reduxSlices/UITour";
import { socketEmit } from "middleware/socketMiddleware";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { userPreferencesUpdated } from "reduxSlices/connection";

export function UITourPrompt() {
	const [checked, setChecked] = useState(false);


	function handleCheckBoxClick() {
		setChecked((prev) => !prev);
	}

	const dispatch = useAppDispatch();

	function handleConfirmClick() {
		dispatch(tourInProgressUpdated(true));
	}

	function handleRefuseClick() {
		dispatch(UITourRefusedUpdated(true))
		if (checked) {
			dispatch(userPreferencesUpdated({skipUITour: true}));
			dispatch(socketEmit(SOCKET_EVENT_CLIENT.CHANGE_USER_PREFERENCES, {
				preferences: {
					skipUITour: true,
				} 
			}))
		}
	}


	return (
		<DraggableWindow width={350} height={160} padding={"0 20px 0 20px"}>
			<div className={styles.content}>
				<p>Czy chcesz być oprowadzony po interfejsie gry?</p>
				<div className={styles.buttons}>
					<div className={styles.button} onClick={handleRefuseClick}>Nie</div>
					<div className={styles.button} onClick={handleConfirmClick}>Tak</div>
				</div>
				<div className={styles.dontAskAgain}>
					Nie pytaj więcej
					<CheckBox
						checked={checked}
						type={5}
						className={styles.checkBox}
						onClick={handleCheckBoxClick}
					/>
				</div>
			</div>
		</DraggableWindow>
	);
}
