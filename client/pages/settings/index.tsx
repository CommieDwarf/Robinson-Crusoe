import { BackButton } from "components/BackButton/BackButton";
import styles from "./index.module.css";
import { StyledHr } from "components/StyledHr/StyledHr";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { UserPreferencesData } from "@shared/types/UserData/UserData";
import { userPreferencesUpdated } from "reduxSlices/connection";
import { socketEmit } from "middleware/socketMiddleware";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { UserPreferences } from "components/UserPreferences/UserPreferences";

export default function Settings() {
	const skipUITour = useAppSelector(
		(state) => state.connection.user?.preferences.skipUITour
	);

	const dispatch = useAppDispatch();

	function handleUITourClick() {
		handlePreferencesChange({ skipUITour: !skipUITour });
	}

	function handlePreferencesChange(
		preferences: Partial<UserPreferencesData>
	) {
		dispatch(userPreferencesUpdated(preferences));
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.CHANGE_USER_PREFERENCES, {
				preferences,
			})
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.backButton}>
					<BackButton />
				</div>
				<div className={styles.title}>
					<h1>Opcje gry</h1>
				</div>
			</div>
			<div className={styles.spacer}></div>
			<StyledHr color="border" />
			<div className={styles.spacer}></div>

			<UserPreferences />
		</div>
	);
}
