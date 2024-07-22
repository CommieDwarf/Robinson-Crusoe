import styles from "./Character.module.css";
import ResizableImage from "../../ResizableImage/ResizableImage";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {Abilities} from "./Abilities/Abilities";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import {GenderSwitch} from "./GenderSwitch/GenderSwitch";
import {Invention} from "./Invention/Invention";

interface Props {
    character: CHARACTER,
    gender: Gender,
    setGender: (gender: Gender) => void;
}

export function Character(props: Props) {

    const {t} = useTranslation();


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
            <div className={styles.genderSwitch}>
                <GenderSwitch gender={props.gender}/>
            </div>
        </div>
        <div className={styles.characterInfo}>
            <div className={styles.abilities}>
                <Abilities character={props.character}/>
            </div>
            <hr className={styles.hr}/>
            <Invention character={props.character}/>
        </div>

    </div>
}
