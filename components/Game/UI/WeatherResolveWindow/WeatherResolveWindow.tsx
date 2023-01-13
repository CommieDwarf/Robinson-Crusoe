import * as React from "react";
import styles from "./WeatherResolveWindow.module.css";
import {Header} from "./Header/Header";
import {WeatherTokens} from "./BottomBar/Tokens/WeatherTokens";
import {IWeatherServiceRenderData} from "../../../../interfaces/Weather/Weather";
import {Resources} from "./BottomBar/Resources/Resources";
import {CloudsTotal} from "./BottomBar/CloudsTotal/CloudsTotal";
import {Dices} from "./Dices/Dices";
import {RollDiceButton} from "./RollDiceButton/RollDiceButton";
import {IConstructionServiceRenderData} from "../../../../interfaces/ConstructionService/IConstructionService";
import {IResourcesAmount} from "../../../../interfaces/Resources/Resources";
import {useState} from "react";
import {RollDiceWindow} from "./RollDiceWindow/RollDiceWindow";
import {WeatherDays} from "../../../../interfaces/ScenarioService/ScenarioService";
import {Utility} from "./Utility/Utility";
import {UtilityDropDownButton} from "./UtilityDropDownButton/UtilityDropDownButton";
import {ISkillRenderData} from "../../../../interfaces/Skill/Skill";

type Props = {
    weatherService: IWeatherServiceRenderData;
    round: number;
    constructionService: IConstructionServiceRenderData;
    resourcesAmount: IResourcesAmount;
    rollWeatherDices: () => void;
    dices: WeatherDays;
    skills: ISkillRenderData[];
    determination: number;
    setNextPhase: () => void;
};
export const WeatherResolveWindow = (props: Props) => {
    const [resolved, setResolved] = useState(
        !props.dices.animals.includes(props.round) &&
        !props.dices.rain.includes(props.round) &&
        !props.dices.winter.includes(props.round)
    );
    const [isUtilityOpen, setIsUtilityOpen] = useState(false);

    function setWeatherResolved() {
        setResolved(true);
    }

    function toggleUtilityOpen() {
        setIsUtilityOpen((prev) => {
            return !prev;
        });
    }

    return (
        <div className={styles.container}>
            <UtilityDropDownButton
                isOpen={isUtilityOpen}
                toggleOpen={toggleUtilityOpen}
            />
            <Utility
                skills={props.skills}
                determination={props.determination}
                isOpen={isUtilityOpen}
            />
            <RollDiceWindow
                weatherService={props.weatherService}
                setResolved={setWeatherResolved}
                resolved={resolved}
            />

            <Header
                round={props.round}
                resolved={resolved}
                setNextPhase={props.setNextPhase}
            />
            <Dices
                animals={props.dices.animals.includes(props.round)}
                rain={props.dices.rain.includes(props.round)}
                snow={props.dices.winter.includes(props.round)}
            />
            {props.weatherService.shouldRollDices && (
                <RollDiceButton rollWeatherDices={props.rollWeatherDices}/>
            )}
            <div className={styles.bottomBar}>
                <WeatherTokens tokens={props.weatherService.tokens}/>
                <CloudsTotal
                    weatherService={props.weatherService}
                    resolved={resolved}
                />
                <Resources
                    constructionService={props.constructionService}
                    resources={props.resourcesAmount}
                    overallWeather={props.weatherService.overallWeather}
                    storm={props.weatherService.tokens.storm}
                    resolved={resolved}
                />
            </div>
        </div>
    );
};
