import styles from "../Abilities.module.css";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {useTranslation} from "react-i18next";

interface Props {
    ability: ABILITY;
    selected: boolean;
    select: (ability: ABILITY) => void;
}

export function AbilityOption(props: Props) {

    const {t} = useTranslation();

    function handleClick() {
        props.select(props.ability)
    }


    return <div
        className={`${styles.abilityOption} 
        ${props.selected && styles.abilityOptionSelected}`}
        onClick={handleClick}
        // @ts-ignore
    >{t(`ability.${props.ability}.name`)}</div>
}
