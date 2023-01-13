import {
  ActionDice,
  ActionDiceResult,
  ActionDiceSide,
  WeatherDice,
  WeatherDiceResult,
  WeatherDiceSide,
} from "../RollDice/RollDice";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { DirectionalLight, SpotLight } from "three";

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
