import * as React from "react";
import styles from "./RollDiceWindow.module.css";
import {RollDiceAnimation} from "../../RollDiceAnimation/RollDiceAnimation";
import {
    WeatherDice,
    WeatherDiceResult,
    WeatherDiceResults,
} from "@shared/types/RollDice/RollDice";
import {IWeatherServiceRenderData} from "@shared/types/Weather/Weather";
import Entries from "../../../../../../server/src/types/Entries";

type Props = {
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
