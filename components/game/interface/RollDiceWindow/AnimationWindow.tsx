// @flow
import * as React from "react";
import * as THREE from "three";
import { useEffect } from "react";
import styles from "./AnimationWindow.module.css";

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { degreesToRadians } from "../../../../utils/degreesToRadians";
import { Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { gather } from "./diceStructures/gather";
import { explore } from "./diceStructures/explore";
import { build } from "./diceStructures/build";
import { weather } from "./diceStructures/weather";

const structures = {
  gather,
  explore,
  build,
  weather,
};
import {
  ActionCubeSide,
  ActionDice,
  ActionRollDiceInfo,
  ActionType,
  WeatherRollDiceInfo,
} from "../../../../interfaces/RollDice/RollDice";

type Props = {
  rollDiceInfo: ActionRollDiceInfo;
};

const actionTypes = ["build", "explore", "gather"];
const weatherTypes = ["rain", "snow", "animals"];

export const AnimationWindow = (props: Props) => {
  const containerRef = React.createRef<HTMLCanvasElement>();

  useEffect(() => {
    const { current } = containerRef;
    if (!current) {
      return;
    }
    const camera = new THREE.PerspectiveCamera(
      80,
      current.width / current.height,
      0.01,
      10
    );
    camera.position.z = 4;
    camera.position.x = 0;
    camera.position.y = 0;

    const scene = new THREE.Scene();
    const cubeSize = 2;
    const cubeTranslateX = 2.5;
    const controls = new OrbitControls(camera, current);
    controls.target.set(0, 0, 0);
    controls.update();
    const hurtObjects = getCube(
      props.rollDiceInfo.type,
      "hurt",
      -cubeTranslateX,
      cubeSize
    );
    const mysteryObjects = getCube(
      props.rollDiceInfo.type,
      "mystery",
      0,
      cubeSize
    );
    const successObjects = getCube(
      props.rollDiceInfo.type,
      "success",
      cubeTranslateX,
      cubeSize
    );

    const backgroundGeometry = new THREE.BoxGeometry(19, 11, 1);
    const backgroundTexture = new THREE.TextureLoader().load(
      "/interface/dice/background.png"
    );
    const backgroundMaterial = new THREE.MeshPhongMaterial({
      map: backgroundTexture,
      transparent: true,
      shininess: 0,
    });

    const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    background.receiveShadow = true;
    background.position.x = 0;
    background.position.y = 0;
    background.position.z = -2;

    scene.add(...hurtObjects, ...mysteryObjects, ...successObjects, background);

    const directionalLightColor = 0xffffff;
    const directionalLightIntensity = 0.5;
    const directionalLight = new THREE.SpotLight(
      directionalLightColor,
      directionalLightIntensity
    );
    directionalLight.castShadow = true;
    directionalLight.position.set(2, 3, 9);
    directionalLight.target.position.set(0, 0, -1);
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const ambientLightColor = 0xffffff;
    const ambientLightIntensity = 0.6;
    const ambientLight = new THREE.AmbientLight(
      ambientLightColor,
      ambientLightIntensity
    );
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: current,
    });
    renderer.shadowMap.enabled = true;
    renderer.setAnimationLoop(animation);

    function animation(time: number) {
      Object.entries(props.rollDiceInfo.results.hurt.axes).forEach(
        ([axis, degrees]) => {
          rotateMesh(hurtObjects, axis as unknown as "y" | "x" | "z", degrees);
        }
      );
      Object.entries(props.rollDiceInfo.results.mystery.axes).forEach(
        ([axis, degrees]) => {
          rotateMesh(
            mysteryObjects,
            axis as unknown as "y" | "x" | "z",
            degrees
          );
        }
      );
      Object.entries(props.rollDiceInfo.results.success.axes).forEach(
        ([axis, degrees]) => {
          rotateMesh(
            successObjects,
            axis as unknown as "y" | "x" | "z",
            degrees
          );
        }
      );
      renderer.render(scene, camera);
    }
  });

  function getCube(
    type: ActionType,
    dice: ActionDice,
    x: number,
    size: number
  ) {
    const textureCube = getActionTextures(type, dice);
    const geometry = new RoundedBoxGeometry(size, size, size, 2, 0.4);

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: "#565655" })
    );
    const mesh = new THREE.Mesh(geometry, textureCube);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.x = x;
    line.position.x = x;

    return [mesh];
  }

  function getActionTextures(type: ActionType, dice: ActionDice) {
    const loader = new THREE.TextureLoader();
    const basePath = "/interface/dice";
    const path = actionTypes.includes(props.rollDiceInfo.type)
      ? basePath + "/action/" + props.rollDiceInfo.type
      : basePath + "/weather";
    loader.setPath(path);

    return Object.entries(structures[type][dice]).map(([key, side]) => {
      return new THREE.MeshPhysicalMaterial({
        map: loader.load(`/${side}.png`),
        clearcoat: 0,
        clearcoatRoughness: 0,
        metalness: 0,
        roughness: 0.2,
      });
    });
  }

  return <canvas ref={containerRef} className={styles.container}></canvas>;
};

function rotateMesh(
  objects3D: Object3D[],
  axis: "x" | "y" | "z",
  degrees: number
) {
  let radians = degreesToRadians(degrees);
  objects3D.forEach((object) => {
    const diff = radians - object.rotation[axis];
    if (diff > 0.01) {
      object.rotation[axis] += diff / 16;
    }

    // if (object.rotation[axis] < radians / 4) {
    //   object.rotation[axis] += 0.6;
    // } else if (object.rotation[axis] < radians / 3.5) {
    //   object.rotation[axis] += 0.5;
    // } else if (object.rotation[axis] < radians / 2.5) {
    //   object.rotation[axis] += 0.4;
    // } else if (object.rotation[axis] < radians / 2) {
    //   object.rotation[axis] += 0.4;
    // } else if (object.rotation[axis] < radians / 1.4) {
    //   object.rotation[axis] += 0.3;
    // } else if (object.rotation[axis] < radians) {
    //   object.rotation[axis] += 0.1;
    // }
  });
}
