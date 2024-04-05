import styles from "./Abilities.module.css";
import {useTranslation} from "react-i18next";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {capitalize} from "lodash";
import {insertIconsIntoText} from "../../../../utils/insertIconsIntoText";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {mapAbilities} from "../../../../utils/mapAbilities";
import {useState} from "react";


interface Props {
    character: CHARACTER
}

export function Abilities(props: Props) {

    const [selectedAbility, setSelectedAbility] = useState(ABILITY.FRENZY);

    const {t} = useTranslation();

    return <div className={styles.container}>
        <div className={styles.abilityName}>
            <h4>{t(`ability.${selectedAbility}.name`)}</h4>
        </div>
        <div className={styles.abilityDescription}>
            {insertIconsIntoText(capitalize(t("ability." + ABILITY.FRENZY + ".description")), styles.icon)}
        </div>
        <div className={styles.selectAbility}>
            {mapAbilities(props.character).map((ability: ABILITY) => {
                return <div className={styles.abilityOption} key={ability}>{t(`ability.${ability}.name`)}</div>
            })}
        </div>
    </div>
}
