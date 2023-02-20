import {
  ActionDice,
  ActionDiceResult,
  WeatherDice,
  WeatherDiceResult,
} from "../RollDice/RollDice";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { SpotLight } from "three";

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
  fixed: boolean;
}
