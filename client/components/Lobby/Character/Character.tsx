import styles from "./Character.module.css";
import DynamicImage from "../../DynamicImage/DynamicImage";
import { CHARACTER, Gender } from "@shared/types/Game/Characters/Character";
import { Abilities } from "./Abilities/Abilities";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { GenderSwitch } from "./GenderSwitch/GenderSwitch";
import { Invention } from "./Invention/Invention";

interface Props {
	character: CHARACTER;
	gender: Gender;
}

export function Character(props: Props) {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.characterDisplay}>
				<div className={styles.characterName}>
					{capitalize(t(`character.${props.character}`))}
				</div>
				<div className={styles.characterImage}>
					<DynamicImage
						src={`/UI/characters/player-characters/no-wounds/${props.character}-${props.gender}.webp`}
						alt={"character"}
					/>
				</div>
				<div className={styles.genderSwitch}>
					<GenderSwitch gender={props.gender} />
				</div>
			</div>
			<div className={styles.characterInfo}>
				<div className={styles.abilities}>
					<Abilities character={props.character} />
				</div>
				<hr className={styles.hr} />
				<div className={styles.invention}>
					<Invention character={props.character} />
				</div>
			</div>
		</div>
	);
}
