import {
  ActionDiceSide,
  ActionResults,
  RollDiceResult,
  WeatherDiceSide,
  WeatherResults,
} from "../RollDice/RollDice";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";

export interface IDice {
  result: RollDiceResult<WeatherDiceSide> | RollDiceResult<ActionDiceSide>;
  finished: boolean;
  axesFinished: {
    x: boolean;
    y: boolean;
    z: boolean;
  };
  mesh: THREE.Mesh<RoundedBoxGeometry, THREE.MeshPhysicalMaterial[]>;
  rotate: () => void;
}
