import * as React from "react";
import {useState} from "react";
import styles from "./WeatherResolveWindow.module.css";
import sharedStyles from "../../../../styles/shared.module.css"
import {Header} from "./Header/Header";
import {WeatherTokens} from "./BottomBar/Tokens/WeatherTokens";
import {Resources} from "./BottomBar/Resources/Resources";
import {CloudsTotal} from "./BottomBar/CloudsTotal/CloudsTotal";
import {Dices} from "./Dices/Dices";
import {RollDiceButton} from "./RollDiceButton/RollDiceButton";
import {RollDiceWindow} from "./RollDiceWindow/RollDiceWindow";
import Draggable from "react-draggable";
import {ISkillRenderData} from "@shared/types/Game/Skill/Skill";
import {IWeatherServiceRenderData} from "@shared/types/Game/Weather/Weather";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";
import {WeatherDays} from "@shared/types/Game/ScenarioService/ScenarioService";
import {IConstructionServiceRenderData} from "@shared/types/Game/ConstructionService/IConstructionService";


type Props = {
    weatherService: IWeatherServiceRenderData;
    round: number;
    constructionService: IConstructionServiceRenderData;
    resourcesAmount: IBasicResourcesAmount;
    dices: WeatherDays;
    skills: ISkillRenderData[];
    determination: number;
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
                />
                <Dices
                    animals={props.dices.animals.includes(props.round)}
                    rain={props.dices.rain.includes(props.round)}
                    snow={props.dices.winter.includes(props.round)}
                />
                {props.weatherService.shouldRollDices && (
                    <RollDiceButton/>
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
