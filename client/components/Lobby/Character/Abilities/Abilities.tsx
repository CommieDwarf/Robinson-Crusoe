import styles from "./Abilities.module.css";
import {useTranslation} from "react-i18next";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {capitalize} from "lodash";
import {insertIconsIntoText} from "../../../../utils/insertIconsIntoText/insertIconsIntoText";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {getAbilities} from "../../../../utils/getAbilities";
import {useEffect, useState} from "react";
import {AbilityOption} from "./AbilityOption/AbilityOption";


interface Props {
    character: CHARACTER
}

export function Abilities(props: Props) {

    const abilities = getAbilities(props.character);

    const [selectedAbility, setSelectedAbility] = useState<ABILITY>(abilities[0]);


    useEffect(() => {
        setSelectedAbility(getAbilities(props.character)[0]);
    }, [props.character])

    function selectAbility(ability: ABILITY) {
        setSelectedAbility(ability)
    }


    const {t} = useTranslation();

    return <div className={styles.container}>

        <div className={styles.title}><h3>Podgląd umiejętności</h3></div>
        <hr className={styles.hr}/>
        <div className={styles.abilityName}>
            {/* @ts-ignore*/}
            <h4>{t(`ability.${selectedAbility}.name`)}</h4>
        </div>
        <div className={styles.abilityDescription}>
            {/* @ts-ignore*/}
            {insertIconsIntoText(capitalize(t(`ability.${selectedAbility}.description`)), styles.icon)}
        </div>
        <div className={styles.selectAbility}>
            {abilities.map((ability: ABILITY) => {
                return <AbilityOption ability={ability}
                                      selected={selectedAbility === ability}
                                      select={selectAbility}
                                      key={ability}/>
            })}
        </div>
    </div>
}
