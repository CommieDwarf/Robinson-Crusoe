import styles from "./GenderSwitch.module.css";
import {Gender} from "@shared/types/Game/Characters/Character";
import {useState} from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {socketEmit} from "../../../../middleware/socketMiddleware";
import {SOCKET_EVENT} from "@shared/types/Requests/Socket";

interface Props {
    gender: Gender;
}

export function GenderSwitch(props: Props) {

    const [gender, setGender] = useState<Gender>(props.gender);
    const dispatch = useAppDispatch();

    function handleMaleClick() {
        gender !== "male" && switchGender("male");
    }

    function switchGender(gender: Gender) {
        setGender(gender);
        dispatch(socketEmit(SOCKET_EVENT.CHANGE_CHARACTER, {
            character: {
                gender
            },
            sessionId: true,
        }))
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
