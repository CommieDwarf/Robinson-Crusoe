import styles from "./GenderSwitch.module.css";
import {Gender} from "@shared/types/Game/Characters/Character";
import {useState} from "react";
import {socketEmitter} from "../../../../pages/_app";


interface Props {
    gender: Gender;
}

export function GenderSwitch(props: Props) {

    const [gender, setGender] = useState<Gender>(props.gender);

    function handleMaleClick() {
        gender !== "male" && switchGender("male");
    }

    function switchGender(gender: Gender) {
        setGender(gender);
        socketEmitter.emitChangeCharacter({
            gender,
        })
    }

    function handleFemaleClick() {
        gender !== "female" && switchGender("female");
    }

    return <div className={styles.container}>
        <div className={`${styles.genderOption} ${gender === "male" && styles.genderOptionSelected}`}
             onClick={handleMaleClick}>Male
        </div>
        <div className={`${styles.genderOption} ${gender === "female" && styles.genderOptionSelected}`}
             onClick={handleFemaleClick}>Female
        </div>
    </div>
}
