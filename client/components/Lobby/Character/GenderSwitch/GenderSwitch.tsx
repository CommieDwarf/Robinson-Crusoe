import styles from "./GenderSwitch.module.css";
import { Gender } from "@shared/types/Game/Characters/Character";
import { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { socketEmit } from "../../../../middleware/socketMiddleware";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";

interface Props {
	gender: Gender;
}

export function GenderSwitch(props: Props) {
	const [gender, setGender] = useState<Gender>(props.gender);
	const dispatch = useAppDispatch();

	const { t } = useTranslation();

	function handleMaleClick() {
		if (gender !== "male") {
			switchGender("male");
		}
	}

	function switchGender(gender: Gender) {
		setGender(gender);
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.CHANGE_CHARACTER, {
				character: {
					gender,
				},
				hydrateSessionId: true,
			})
		);
	}

	function handleFemaleClick() {
		if (gender !== "female") {
			switchGender("female")
		}
	}

	return (
		<div className={styles.container}>
			<div
				className={`${styles.genderOption} ${
					gender === "male" && styles.genderOptionSelected
				}`}
				onClick={handleMaleClick}
			>
				{capitalize(t("other.male"))}
			</div>
			<div
				className={`${styles.genderOption} ${
					gender === "female" && styles.genderOptionSelected
				}`}
				onClick={handleFemaleClick}
			>
				{capitalize(t("other.female"))}
			</div>
		</div>
	);
}
