import * as React from "react";
import * as THREE from "three";
import { useEffect, useState } from "react";
import styles from "./RollDiceAnimation.module.css";

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { degreesToRadians } from "../../../../utils/degreesToRadians";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { gather } from "../../../../constants/diceStructures/gather";
import { explore } from "../../../../constants/diceStructures/explore";
import { build } from "../../../../constants/diceStructures/build";
import { weather } from "../../../../constants/diceStructures/weather";

const structures = {
  gather,
  explore,
  build,
  weather,
};
import {
  ActionDice,
  ActionDiceSide,
  ActionResults,
  DiceActionType,
  RollDiceResult,
  WeatherDice,
  WeatherDiceSide,
  WeatherResults,
} from "../../../../interfaces/RollDice/RollDice";
import { cancelAnimationFrame, requestAnimationFrame } from "dom-helpers";
import { IDice } from "../../../../interfaces/Dice/Dice";

type Props = {
  name: string;
  results:
    | Map<keyof WeatherResults, RollDiceResult<WeatherDiceSide>>
    | Map<keyof ActionResults, RollDiceResult<ActionDiceSide>>;
  type: "weather" | DiceActionType;
  setResolved: (name: string) => void;
  resolved: boolean;
};

export const RollDiceAnimation = (props: Props) => {
  const containerRef = React.createRef<HTMLDivElement>();
  const [renderer, setRenderer] = useState(
    new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
  );

  useEffect(() => {
    const { current } = containerRef;
    if (!current || !renderer) {
      return;
    }
    const camera = new THREE.PerspectiveCamera(
      80,
      current.offsetWidth / current.offsetHeight,
      0.01,
      10
    );
    camera.position.z = 4;
    camera.position.x = 0;
    camera.position.y = 0;

    const scene = new THREE.Scene();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const backgroundGeometry = new THREE.BoxGeometry(19, 11, 1);
    const backgroundTexture = new THREE.TextureLoader().load(
      "/UI/dice/background.png"
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
    scene.add(background);

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

    renderer.shadowMap.enabled = true;

    let translateX: number[] = [];

    switch (props.results.size) {
      case 1:
        translateX = [0];
        break;
      case 2:
        translateX = [-1.5, 1.5];
        break;
      default:
        translateX = [-3, 0, 3];
    }

    const cubeSize = 2;

    const dices = new Map<ActionDice | WeatherDice, IDice>();
    let index = 0;
    props.results.forEach((value, key) => {
      dices.set(key, new Dice(value, key, cubeSize, translateX[index]));
      index++;
    });

    dices.forEach((dice) => {
      scene.add(dice.mesh);
    });

    function animation() {
      let finished = true;
      dices.forEach((dice) => {
        if (!dice.finished) {
          finished = false;
          dice.rotate();
        }
      });

      if (finished) {
        props.setResolved(props.name);
      } else {
        animationId = requestAnimationFrame(animation);
      }

      renderer.render(scene, camera);
    }

    let animationId = 0;
    if (!props.resolved) {
      animationId = requestAnimationFrame(animation);
    }

    current.appendChild(renderer.domElement);
    renderer.setSize(current.offsetWidth, current.offsetHeight);

    return () => {
      scene.children = [];
      current.removeChild(renderer.domElement);
      cancelAnimationFrame(animationId);
    };
  });

  class Dice implements IDice {
    result: RollDiceResult<WeatherDiceSide> | RollDiceResult<ActionDiceSide>;
    finished = false;
    axesFinished = {
      x: false,
      y: false,
      z: false,
    };
    mesh: THREE.Mesh<RoundedBoxGeometry, THREE.MeshPhysicalMaterial[]>;

    constructor(
      result: RollDiceResult<WeatherDiceSide> | RollDiceResult<ActionDiceSide>,
      diceName: WeatherDice | ActionDice,
      cubeSize: number,
      translateX: number
    ) {
      this.result = result;
      this.mesh = getCube(props.type, diceName, translateX, cubeSize);
    }

    private rotateAxis(axis: "x" | "y" | "z", degrees: number) {
      let radians = degreesToRadians(degrees);
      const diff = radians - this.mesh.rotation[axis];
      if (diff > 0.01) {
        this.mesh.rotation[axis] += diff / 16;
      } else {
        this.axesFinished[axis] = true;
      }
    }

    rotate() {
      this.rotateAxis("x", this.result.axes.x);
      this.rotateAxis("y", this.result.axes.y);
      this.rotateAxis("z", this.result.axes.z);
      if (this.axesFinished.x && this.axesFinished.y && this.axesFinished.z) {
        this.finished = true;
      }
    }
  }

  function getCube(
    type: DiceActionType | "weather",
    dice: ActionDice | WeatherDice,
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

    return mesh;
  }

  function getActionTextures(
    type: DiceActionType | "weather",
    dice: ActionDice | WeatherDice
  ) {
    const loader = new THREE.TextureLoader();
    const basePath = "/UI/dice";
    const path =
      type === "weather"
        ? basePath + "/weather/" + dice
        : basePath + "/action/" + type;
    loader.setPath(path);

    const construction =
      type === "weather"
        ? structures.weather[dice as WeatherDice]
        : structures[type][dice as ActionDice];

    return Object.entries(construction).map(([key, side]) => {
      return new THREE.MeshPhysicalMaterial({
        map: loader.load(`/${side}.png`),
        clearcoat: 0,
        clearcoatRoughness: 0,
        metalness: 0,
        roughness: 0.2,
      });
    });
  }

  return <div ref={containerRef} className={styles.container}></div>;
};
