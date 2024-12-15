import {ActionDice, ActionDiceResult, WeatherDice, WeatherDiceResult,} from "@shared/types/Game/RollDice/RollDice";
import * as THREE from "three";
import {SpotLight} from "three";
import {RoundedBoxGeometry} from "three/examples/jsm/geometries/RoundedBoxGeometry";

export interface IDice {
    result: ActionDiceResult | WeatherDiceResult;
    finished: boolean;
    name: WeatherDice | ActionDice;
    axesFinished: {
        x: boolean;
        y: boolean;
        z: boolean;
    };
    mesh: THREE.Mesh<RoundedBoxGeometry, THREE.MeshPhysicalMaterial[]>;
    light: SpotLight;
    rotate: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;

    setNewResult: (result: WeatherDiceResult | ActionDiceResult) => void;
}
