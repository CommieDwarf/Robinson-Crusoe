import * as React from "react";
import styles from "./WeatherResolveWindow.module.css";
import Image from "next/image";
import { Header } from "./Header/Header";
import { WeatherTokens } from "./BottomBar/Tokens/WeatherTokens";
import { IWeatherServiceRenderData } from "../../../../interfaces/Weather/Weather";
import { Resources } from "./BottomBar/Resources/Resources";
import { CloudsTotal } from "./BottomBar/CloudsTotal/CloudsTotal";
import { Dices } from "./Dices/Dices";
import { RollDiceButton } from "./RollDiceButton/RollDiceButton";
import { IStructuresServiceRenderData } from "../../../../interfaces/Structures/Structures";
import { IResourcesAmount } from "../../../../interfaces/Resources/Resources";
import { useState } from "react";
import { WeatherResults } from "../../../../interfaces/RollDice/RollDice";
import Entries from "../../../../interfaces/Entries";
import { RollDiceWindow } from "./RollDiceWindow/RollDiceWindow";
import { WeatherDays } from "../../../../interfaces/ScenarioService/ScenarioService";
import { Utility } from "./Utility/Utility";
import { ISkillServiceRenderData } from "../../../../interfaces/SkillService/SkillService";
import { UtilityDropDownButton } from "./UtilityDropDownButton/UtilityDropDownButton";

type Props = {
  weatherService: IWeatherServiceRenderData;
  round: number;
  structuresService: IStructuresServiceRenderData;
  resourcesAmount: IResourcesAmount;
  rollWeatherDices: () => void;
  dices: WeatherDays;
  skillService: ISkillServiceRenderData;
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

  const results = new Map();

  if (props.weatherService.rollDiceResult) {
    const entries = Object.entries(
      props.weatherService.rollDiceResult.results
    ) as Entries<WeatherResults>;
    entries.forEach(([key, value]) => {
      if (value) {
        results.set(key, value);
      }
    });
  }

  return (
    <div className={styles.container}>
      <UtilityDropDownButton
        isOpen={isUtilityOpen}
        toggleOpen={toggleUtilityOpen}
      />
      <Utility
        skillService={props.skillService}
        determination={props.determination}
        isOpen={isUtilityOpen}
      />
      <RollDiceWindow
        results={results}
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
      <RollDiceButton rollWeatherDices={props.rollWeatherDices} />
      <div className={styles.bottomBar}>
        <WeatherTokens tokens={props.weatherService.tokens} />
        <CloudsTotal
          weatherService={props.weatherService}
          resolved={resolved}
        />
        <Resources
          structuresService={props.structuresService}
          resources={props.resourcesAmount}
          overallWeather={props.weatherService.overallWeather}
          storm={props.weatherService.tokens.storm}
          resolved={resolved}
        />
      </div>
    </div>
  );
};
