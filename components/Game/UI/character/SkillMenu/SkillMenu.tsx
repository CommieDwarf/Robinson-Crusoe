import React, {useState} from "react";
import styles from "./SkillMenu.module.css";
import {insertIconsIntoText} from "../../../../../utils/insertIconsIntoText";
import {ISkillRenderData} from "../../../../../interfaces/Skill/Skill";
import Image from "next/image";
import snowImg from "/public/UI/scenarios/snow.png";
import rainImg from "/public/UI/scenarios/rain.png";
import {Cloud, OverallWeather} from "../../../../../interfaces/Weather/Weather";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {ActionDice} from "../../../../../interfaces/RollDice/RollDice";

interface Props {
    skillDescription: {
        skill: ISkillRenderData | null;
        show: boolean;
    };
    use: (skillName: string, target?: IPlayerCharacter | ActionDice | Cloud | null) => void;
    used: boolean;
    overallWeather: OverallWeather;
}

export default function SkillMenu(props: Props) {
    let description;
    let quote;
    if (props.skillDescription.skill) {
        description = insertIconsIntoText(props.skillDescription.skill.description);
        quote = insertIconsIntoText(props.skillDescription.skill.quote);
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

    function handleButtonClick() {
        if (props.skillDescription.skill?.name) {
            const cloudTarget = props.skillDescription.skill.name === "hooch" ? cloud : null;
            props.use(props.skillDescription.skill?.name, cloudTarget);
        }
    }

    return (
        <div className={styles.wrapper + " " + visibilityClass}>
            <div className={styles.container}>
                {props.skillDescription.skill && (
                    <>
                        <div className={styles.topBar}>
                            <div className={styles.skillName}>{props.skillDescription.skill.namePL}</div>
                        </div>

                        <div className={styles.text}>
                            <div className={styles.quote}>{quote}</div>
                            <hr/>
                            <div className={styles.description}>{description}</div>
                        </div>
                        {!props.used && props.skillDescription.skill.canBeUsed && <>
                            <div className={styles.useButton} onClick={handleButtonClick}>Użyj</div>
                            {props.skillDescription.skill.name === "hooch" && <div className={styles.chooseCloud}>
                                <div className={`${styles.cloud} ${cloud === "rain" ? styles.cloudSelected : ""}`}
                                     onClick={handleRainCloudClick}
                                >
                                    <Image src={rainImg} alt={"deszcz"} fill/>
                                </div>
                                /
                                <div className={`${styles.cloud} ${cloud === "snow" ? styles.cloudSelected : ""}`}
                                     onClick={handleSnowCloudClick}
                                >
                                    <Image src={snowImg} alt={"śnieg"} fill/>
                                </div>
                            </div>}
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
