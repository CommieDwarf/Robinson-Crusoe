// @flow
import * as React from "react";
import styles from "./Resources.module.css";
import {Resource} from "./Resource/Resource";
import {IConstructionServiceRenderData} from "../../../../../../interfaces/ConstructionService/IConstructionService";
import {IBasicResourcesAmount} from "../../../../../../interfaces/Resources/Resources";
import {OverallWeather} from "../../../../../../interfaces/Weather/Weather";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";

type Props = {
    constructionService: IConstructionServiceRenderData;
    resources: IBasicResourcesAmount;
    overallWeather: OverallWeather;
    storm: boolean;
    resolved: boolean;
};

export type Subtrahend = "snow" | "roof" | "cloud" | "storm";

export const Resources = (props: Props) => {
    function getConstruct(construct: CONSTRUCTION) {
        const construction = props.constructionService.constructions.find(
            (struct) => struct.name === construct
        );
        if (!construction) {
            throw new Error(`Can't find construction with given name: ${construct}`);
        }
        return construction;
    }

    const roof = getConstruct(CONSTRUCTION.ROOF);
    const palisade = getConstruct(CONSTRUCTION.PALISADE);
    const weapon = getConstruct(CONSTRUCTION.WEAPON);

    const subtrahends = {
        wood: new Map<Subtrahend, number>(),
        food: new Map<Subtrahend, number>(),
        roof: new Map<Subtrahend, number>(),
        palisade: new Map<Subtrahend, number>(),
    };

    subtrahends.wood.set("snow", -props.overallWeather.snow);
    subtrahends.wood.set(
        "roof",
        roof.lvl - (props.overallWeather.snow + props.overallWeather.rain)
    );

    subtrahends.food.set(
        "roof",
        roof.lvl - (props.overallWeather.snow + props.overallWeather.rain)
    );

    subtrahends.roof.set(
        "cloud",
        -(props.overallWeather.snow + props.overallWeather.rain)
    );

    subtrahends.palisade.set("storm", props.storm ? -1 : 0);

    return (
        <div className={styles.container}>
            <ul className={styles.tips}>
                <li className={styles.tip}>
                    Za każdy brakujący surowiec i strukturę (oprócz dachu) każdy gracz
                    otrzymuje ranę
                </li>
                <li className={styles.tip}>Dach nie ulega zniszczeniom.</li>
            </ul>

            <Resource
                type={"roof"}
                amount={roof.lvl}
                overallWeather={props.overallWeather}
                subtrahends={subtrahends.roof}
                resolved={props.resolved}
            />
            <Resource
                type={"palisade"}
                amount={palisade.lvl}
                overallWeather={props.overallWeather}
                subtrahends={subtrahends.palisade}
                resolved={props.resolved}
            />
            <Resource
                type={"weapon"}
                amount={weapon.lvl}
                overallWeather={props.overallWeather}
                subtrahends={new Map()}
                resolved={props.resolved}
            />
            <Resource
                type={"wood"}
                amount={props.resources.wood}
                overallWeather={props.overallWeather}
                subtrahends={subtrahends.wood}
                resolved={props.resolved}
            />
            <Resource
                type={"food"}
                amount={props.resources.food}
                overallWeather={props.overallWeather}
                subtrahends={subtrahends.food}
                resolved={props.resolved}
            />
        </div>
    );
};
