import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import {RollDiceAnimation} from "../../RollDiceAnimation/RollDiceAnimation";
import {IWeatherServiceRenderData} from "@shared/types/Game/Weather/Weather";
import {WeatherDice, WeatherDiceResult, WeatherDiceResults} from "@shared/types/Game/RollDice/RollDice";
import Entries from "@shared/types/Entries";

type Props = {
    // @ts-ignore
    weatherService: IWeatherServiceRenderData;
    setResolved: (name: string) => void;
    resolved: boolean;
};
export const RollDiceWindow = (props: Props) => {
    return (
        <div className={styles.container}>
            {props.weatherService.rollDiceResult && (
                <RollDiceAnimation
                    name={"weather"}
                    results={
                        new Map<WeatherDice, WeatherDiceResult | null>(
                            Object.entries(
                                props.weatherService.rollDiceResult
                            ) as Entries<WeatherDiceResults>
                        )
                    }
                    type={"weather"}
                    onFinish={props.setResolved}
                    reRoll={() => {
                    }}
                    reRolledDice={null}
                    fixed={props.resolved}
                />
            )}
        </div>
    );
};

// function areEqual() {
//   return true;
// }
//
// export default React.memo(RollDiceWindow, areEqual);
