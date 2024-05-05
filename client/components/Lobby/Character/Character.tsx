import styles from "./Character.module.css";
import ResizableImage from "../../ResizableImage/ResizableImage";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {Abilities} from "./Abilities/Abilities";
import {insertIconsIntoText} from "../../../utils/insertIconsIntoText";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import abilityStyles from "./Abilities/Abilities.module.css";

interface Props {
    character: CHARACTER,
    gender: Gender,
    setGender: (gender: Gender) => void;
}

export function Character(props: Props) {

    const {t} = useTranslation();

    function handleMaleClick() {
        props.gender !== "male" && props.setGender("male");
    }

    function handleFemaleClick() {
        props.gender !== "female" && props.setGender("female");
    }

    return <div className={styles.container}>
        <div className={styles.characterDisplay}>
            <div className={styles.characterName}>
                {capitalize(t(`character.${props.character}`))}
            </div>
            <div className={styles.characterImage}>
                <ResizableImage
                    src={`/UI/characters/player-characters/no-wounds/${props.character}-${props.gender}.png`}
                    alt={"character"}/>
            </div>
            <div className={styles.genderSelect}>
                <div className={`${styles.genderOption} ${props.gender === "male" && styles.genderOptionSelected}`}
                     onClick={handleMaleClick}>Male
                </div>
                <div className={`${styles.genderOption} ${props.gender === "female" && styles.genderOptionSelected}`}
                     onClick={handleFemaleClick}>Female
                </div>
            </div>
        </div>
        <div className={styles.characterInfo}>
            <div className={styles.abilities}>
                <Abilities character={CHARACTER.EXPLORER}/>
            </div>
            <hr className={abilityStyles.hr}/>
            <div className={styles.invention}>
                Karta Pomysłu: <strong><i>Siekiera</i></strong>
                <br/> {insertIconsIntoText("(+1 $wood$ na kafelku z obozem)", styles.icon)}
            </div>
        </div>

    </div>
}
