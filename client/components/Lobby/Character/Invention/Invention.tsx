import { CHARACTER } from "@shared/types/Game/Characters/Character";
import styles from "./Invention.module.css";
import { capitalize } from "lodash";
import { characterToInventionMap } from "@shared/constants/CharacterToInventionMap";
import { insertIconsIntoText } from "../../../../utils/insertIconsIntoText/insertIconsIntoText";
import { useTranslation } from "react-i18next";

interface Props {
	character: CHARACTER;
}

export function Invention(props: Props) {
	const { t } = useTranslation();
	return (
		<div className={styles.container}>
			{"Karta Pomysłu: "}
			<strong>
				{capitalize(
					/*@ts-ignore*/
					t(`invention.${characterToInventionMap[props.character]}`)
				)}
			</strong>
			{/*@ts-ignore*/}
			<br />{" "}
			{insertIconsIntoText(
				capitalize(
					/*@ts-ignore*/
					t(
						/*@ts-ignore*/
						`personalInventionDescription.${
							characterToInventionMap[props.character]
						}`
					)
				),
				styles.icon
			)}
		</div>
	);
}
