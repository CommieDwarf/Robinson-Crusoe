import * as React from "react";
import {useState} from "react";
import styles from "./WeatherResolveWindow.module.css";
import sharedStyles from "../../../../styles/shared.module.css"
import {Header} from "./Header/Header";
import {WeatherTokens} from "./BottomBar/Tokens/WeatherTokens";
import {IWeatherServiceRenderData} from "@sharedTypes/Weather/Weather";
import {Resources} from "./BottomBar/Resources/Resources";
import {CloudsTotal} from "./BottomBar/CloudsTotal/CloudsTotal";
import {Dices} from "./Dices/Dices";
import {RollDiceButton} from "./RollDiceButton/RollDiceButton";
import {IConstructionServiceRenderData} from "@sharedTypes/ConstructionService/IConstructionService";
import {IBasicResourcesAmount} from "@sharedTypes/Resources/Resources";
import {RollDiceWindow} from "./RollDiceWindow/RollDiceWindow";
import {WeatherDays} from "@sharedTypes/ScenarioService/ScenarioService";
import {ISkillRenderData} from "@sharedTypes/Skill/Skill";
import Draggable from "react-draggable";


type Props = {
    weatherService: IWeatherServiceRenderData;
    round: number;
    constructionService: IConstructionServiceRenderData;
    resourcesAmount: IBasicResourcesAmount;
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


    function setWeatherResolved() {
        setResolved(true);
    }


    return (
        <Draggable bounds="parent" defaultClassNameDragging={sharedStyles.grabbing}>
            <div className={styles.container}>
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
        </Draggable>
    );
};
