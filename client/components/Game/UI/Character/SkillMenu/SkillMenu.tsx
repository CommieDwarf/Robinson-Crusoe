import React, {useState} from "react";
import styles from "./SkillMenu.module.css";
import snowImg from "/public/UI/scenarios/snow.png";
import rainImg from "/public/UI/scenarios/rain.png";
import {OverallWeather} from "@shared/types/Game/Weather/Weather";
import {ISkillRenderData} from "@shared/types/Game/Skill/IAbility";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {insertIconsIntoText} from "../../../../../utils/insertIconsIntoText";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {emitAction} from "../../../../../pages/api/emitAction";
import {CHARACTER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {AbilityArgMap} from "@shared/types/Game/Skill/AbilityArgMap";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {useAppDispatch} from "../../../../../store/hooks";
import {alertSlice, alertUpdated} from "../../../reduxSlices/alert";
import {ALERT_CODE} from "../../../../../types/Alert/ALERT_CODE";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";


interface Props {
    skillDescription: {
        skill: ISkillRenderData;
        show: boolean;
    };
    used: boolean;
    overallWeather: OverallWeather;
    width: number;

    ownedDetermination: number;
}

export default function SkillMenu(props: Props) {

    const {t} = useTranslation();
    let description;
    let comment;
    if (props.skillDescription.skill) {
        // @ts-ignore
        description = t(`ability.${props.skillDescription.skill.name}.description`) as string;
        // @ts-ignore
        comment = t(`ability.${props.skillDescription.skill.name}.comment`) as string;
        description = insertIconsIntoText(description, styles.icon);
        comment = insertIconsIntoText(comment, styles.icon);
    }
    const visibilityClass = props.skillDescription.show
        ? styles.skillDescriptionVisible
        : "";

    const [cloud, setCloud] = useState<"rain" | "snow">("rain");

    if (props.overallWeather.rain === 0 && props.overallWeather.snow > 0 && cloud === "rain") {
        setCloud("snow");
    }

    function handleRainCloudClick() {
        if (props.overallWeather.rain > 0 && cloud !== "rain") {
            setCloud("rain")
        }
    }

    function handleSnowCloudClick() {
        if (props.overallWeather.snow > 0 && cloud !== "snow") {
            setCloud("snow");
        }
    }

    const dispatch = useAppDispatch();


    function handleButtonClick() {
        if (props.skillDescription.skill.cost > props.ownedDetermination) {
            dispatch(alertUpdated(ALERT_CODE.NOT_ENOUGH_DETERMINATION_FOR_ABILITY));
        }

        const ability = props.skillDescription.skill.name;
        //TODO: emituj akcje
        switch (ability) {
            case ABILITY.HOOCH:
                activateAbility(ability, cloud)
                break;
            case ABILITY.SCROUNGER:
                break;
            case ABILITY.STONE_SOUP:
                activateAbility(ability)
                break;
            case ABILITY.GRANDMAS_RECIPE:
                //TODO: zrób wybór postaci.
                activateAbility(ability, CHARACTER.COOK);
                break;
        }
    }


    function activateAbility<T extends ABILITY>(abilityName: T, ...args: AbilityArgMap[T]) {
        emitAction(CHARACTER_CONTROLLER_ACTION.USE_ABILITY, {
            abilityName,
            args
        })
    }

    const containerStyle = {
        width: props.width + "px",
    }

    return (
        <div className={styles.wrapper + " " + visibilityClass}>
            <div className={styles.container} style={containerStyle}>
                {props.skillDescription.skill && (
                    <>
                        <div className={styles.topBar}>
                            <div className={styles.skillName}>
                                {/*@ts-ignore*/}
                                {t(`ability.${props.skillDescription.skill.name}.name`)}
                            </div>
                        </div>

                        <div className={styles.text}>
                            <div className={styles.quote}>{comment}</div>
                            <hr className={styles.hr}/>
                            <div className={styles.description}>{description}</div>
                        </div>
                        {!props.used && props.skillDescription.skill.canBeUsed &&
                            <>
                                {props.skillDescription.skill.name === "hooch" && <div className={styles.chooseCloud}>
                                    <div className={`${styles.cloud} ${cloud === "rain" ? styles.cloudSelected : ""}`}
                                         onClick={handleRainCloudClick}
                                    >
                                        <ResizableImage src={rainImg} alt={"deszcz"} fill sizes={styles.cloud}/>
                                    </div>
                                    /
                                    <div className={`${styles.cloud} ${cloud === "snow" ? styles.cloudSelected : ""}`}
                                         onClick={handleSnowCloudClick}
                                    >
                                        <ResizableImage src={snowImg} alt={"śnieg"} fill sizes={styles.cloud}/>
                                    </div>
                                </div>
                                }
                                <div className={styles.useButton}
                                     onClick={handleButtonClick}>{capitalize(t("other.use"))}</div>
                            </>
                        }
                        {
                            props.used &&
                            <>
                                <div className={`${styles.useButton} ${styles.useButtonUsed}`}>Użyto w tej rundzie
                                </div>

                            </>
                        }
                    </>
                )}
            </div>
        </div>

    );
}
