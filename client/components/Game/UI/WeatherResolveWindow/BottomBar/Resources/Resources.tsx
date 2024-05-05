// @flow
import * as React from "react";
import styles from "./Resources.module.css";
import {Resource} from "./Resource/Resource";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";
import {OverallWeather} from "@shared/types/Game/Weather/Weather";
import {IConstructionServiceRenderData} from "@shared/types/Game/ConstructionService/IConstructionService";
import {useAppSelector} from "../../../../../../store/hooks";
import {selectGame} from "../../../../../../reduxSlices/gameSession";


type Props = {
    overallWeather: OverallWeather;
    storm: boolean;
    resolved: boolean;
};

export type Subtrahend = "snow" | "roof" | "cloud" | "storm";

export const Resources = (props: Props) => {

    const constructionService = useAppSelector((state) => selectGame(state).constructionService!)
    const ownedResourcesAmount = useAppSelector((state) => selectGame(state).resourceService.owned.basic!)

    function getConstruct(construct: CONSTRUCTION) {
        const construction = constructionService.constructions.find(
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
                    Za każdy brakujący surowiec <br/>
                    i strukturę (oprócz dachu) każdy gracz
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
                amount={ownedResourcesAmount.wood}
                overallWeather={props.overallWeather}
                subtrahends={subtrahends.wood}
                resolved={props.resolved}
            />
            <Resource
                type={"food"}
                amount={ownedResourcesAmount.food}
                overallWeather={props.overallWeather}
                subtrahends={subtrahends.food}
                resolved={props.resolved}
            />
        </div>
    );
};
