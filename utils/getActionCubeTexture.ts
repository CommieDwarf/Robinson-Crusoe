import * as THREE from "three";
import { RollResult } from "../interfaces/RollDice/RollDice";

interface DiceStructure {
  hurt: RollResult[];
  mystery: RollResult[];
  success: RollResult[];
}

export function getActionTextures(
  loader: THREE.TextureLoader,
  structure: DiceStructure
) {
  return {
    hurt: structure.hurt.map((h) => {
      return new THREE.MeshBasicMaterial({
        map: loader.load(h + ".png"),
      });
    }),
    mystery: structure.mystery.map((m) => {
      return new THREE.MeshBasicMaterial({
        map: loader.load(m + ".png"),
      });
    }),
    success: structure.success.map((s) => {
      return new THREE.MeshBasicMaterial({
        map: loader.load(s + ".png"),
      });
    }),
  };
}
