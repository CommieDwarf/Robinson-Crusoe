import * as React from "react";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
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
  ActionDiceResult,
  ActionDiceResults,
  WeatherDice,
  WeatherDiceResult,
} from "../../../../interfaces/RollDice/RollDice";
import { cancelAnimationFrame, requestAnimationFrame } from "dom-helpers";
import { IDice } from "../../../../interfaces/Dice/Dice";
import { SpotLight } from "three";
import { AdventureAction } from "../../../../interfaces/ACTION";

type Props = {
  name: string;
  results:
    | Map<keyof WeatherDice, WeatherDiceResult>
    | Map<keyof ActionDiceResults, ActionDiceResult>;
  type: "weather" | AdventureAction;
  onFinish: (name: string) => void;
  // animationLocked: boolean;
  reRolledDice: string;
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
    props.results.forEach((value: any, key: any) => {
      let fixed = !!(props.reRolledDice && key !== props.reRolledDice);
      dices.set(key, new Dice(value, key, cubeSize, translateX[index], fixed));
      index++;
    });

    dices.forEach((dice) => {
      scene.add(dice.mesh);
      scene.add(dice.light);
      scene.add(dice.light.target);
      const helper = new THREE.SpotLightHelper(dice.light);
      // scene.add(helper);
    });

    function animation() {
      let finished = true;
      dices.forEach((dice) => {
        if (!dice.finished && !dice.fixed) {
          finished = false;
          dice.rotate();
        }
      });

      if (finished) {
        props.onFinish(props.name);
      }

      animationId = requestAnimationFrame(animation);

      renderer.render(scene, camera);
    }

    let animationId = 0;
    // if (!props.animationLocked) {

    animationId = requestAnimationFrame(animation);
    // }
    current.appendChild(renderer.domElement);
    renderer.setSize(current.offsetWidth, current.offsetHeight);
    const diceArr: IDice[] = [];
    dices.forEach((dice) => diceArr.push(dice));

    function handleMouseMove(event: MouseEvent) {
      if (!current) {
        return;
      }
      const width = current.offsetWidth / dices.size;
      const height = current.offsetHeight / 3;
      dices.forEach((dice) => dice.onMouseLeave());
      if (event.offsetY < height || event.offsetY > height * 2) {
        return;
      }
      if (event.offsetX < width) {
        diceArr[0].onMouseEnter();
      } else if (event.offsetX < width * 2) {
        diceArr[1].onMouseEnter();
      } else {
        diceArr[2].onMouseEnter();
      }
    }

    function handleMouseLeave(event: MouseEvent) {
      dices.forEach((dice, string) => {
        dice.onMouseLeave();
      });
    }

    current.addEventListener("mousemove", handleMouseMove);
    current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scene.children = [];
      current.removeEventListener("mousemove", handleMouseMove);
      current.removeEventListener("mouseleave", handleMouseLeave);
      current.removeChild(renderer.domElement);
      cancelAnimationFrame(animationId);
    };
  });

  class Dice implements IDice {
    get light(): SpotLight {
      return this._light;
    }

    result: WeatherDiceResult | ActionDiceResult;
    finished = false;
    axesFinished = {
      x: false,
      y: false,
      z: false,
    };
    mesh: THREE.Mesh<RoundedBoxGeometry, THREE.MeshPhysicalMaterial[]>;
    _light = new THREE.SpotLight(0xffffff, 0);
    fixed: boolean;

    public onMouseEnter() {
      this.light.intensity = 0.7;

      this.mesh.material.forEach((material) => {
        material.reflectivity = 0.2;
      });
    }

    public onMouseLeave() {
      this.light.intensity = 0;
      this.mesh.material.forEach((material) => {
        material.reflectivity = 0.5;
      });
    }

    constructor(
      result: WeatherDiceResult | ActionDiceResult,
      diceName: WeatherDice | ActionDice,
      cubeSize: number,
      translateX: number,
      fixed: boolean
    ) {
      this.result = result;
      this.mesh = getCube(props.type, diceName, translateX, cubeSize);
      this._light.position.set(translateX * 0.9, 0, 3);
      this._light.target = this.mesh;
      // this._light.castShadow = true;
      this._light.penumbra = 1;
      this.fixed = fixed;
      if (fixed) {
        this.mesh.rotation.set(
          degreesToRadians(result.axes.x),
          degreesToRadians(result.axes.y),
          degreesToRadians(result.axes.z)
        );
      }
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
    type: AdventureAction | "weather",
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
    type: AdventureAction | "weather",
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

function areEqual(prevProps: Props, nextProps: Props) {
  return (
    prevProps.name === nextProps.name &&
    prevProps.reRolledDice === nextProps.reRolledDice
  );
}

export default React.memo(RollDiceAnimation, areEqual);
