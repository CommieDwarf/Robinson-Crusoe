import styles from "./Character.module.css";
import ResizableImage from "../../ResizableImage/ResizableImage";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {Abilities} from "./Abilities/Abilities";
import {insertIconsIntoText} from "../../../utils/insertIconsIntoText";


interface Props {
    character: CHARACTER,
    gender: Gender,
}

export function Character(props: Props) {
    return <div className={styles.container}>
        <div className={styles.characterDisplay}>
            <div className={styles.characterName}>
                Odkrywca
            </div>
            <div className={styles.characterImage}>
                <ResizableImage
                    src={`/UI/characters/player-characters/no-wounds/${props.character}-${props.gender}.png`}
                    alt={"character"}/>
            </div>
            <div className={styles.genderSelect}>
                <div className={`${styles.genderOption} ${styles.genderOptionSelected}`}>Male</div>
                <div className={styles.genderOption}>Female</div>
            </div>
        </div>
        <div className={styles.characterInfo}>
            <div className={styles.abilities}>
                <Abilities character={CHARACTER.EXPLORER}/>
            </div>
            <div className={styles.invention}>
                Karta Pomysłu: <strong><i>Siekiera</i></strong>
                <br/> {insertIconsIntoText("(+1 $wood$ na kafelku z obozem)", styles.icon)}
            </div>

        </div>

    </div>
}
