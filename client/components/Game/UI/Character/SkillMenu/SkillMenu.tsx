import React, {useState} from "react";
import styles from "./SkillMenu.module.css";
import {ISkillRenderData} from "@sharedTypes/Skill/Skill";
import snowImg from "/public/UI/scenarios/snow.png";
import rainImg from "/public/UI/scenarios/rain.png";
import {Cloud, OverallWeather} from "@sharedTypes/Weather/Weather";
import {IPlayerCharacter} from "@sharedTypes/Characters/PlayerCharacter";
import {ActionDice} from "@sharedTypes/RollDice/RollDice";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {insertIconsIntoText} from "@sharedUtils/insertIconsIntoText";

interface Props {
    skillDescription: {
        skill: ISkillRenderData | null;
        show: boolean;
    };
    use: (skillName: string, target?: IPlayerCharacter | ActionDice | Cloud) => void;
    used: boolean;
    overallWeather: OverallWeather;
    width: number;
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
            const cloudTarget = props.skillDescription.skill.name === "hooch" ? cloud : undefined;
            props.use(props.skillDescription.skill?.name, cloudTarget);
        }
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
                            <div className={styles.skillName}>{props.skillDescription.skill.namePL}</div>
                        </div>

                        <div className={styles.text}>
                            <div className={styles.quote}>{quote}</div>
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
                                <div className={styles.useButton} onClick={handleButtonClick}>Użyj</div>
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
