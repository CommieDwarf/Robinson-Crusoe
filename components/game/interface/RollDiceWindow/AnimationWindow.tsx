// @flow
import * as React from "react";
import * as THREE from "three";
import { useEffect } from "react";
import styles from "./AnimationWindow.module.css";

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { degreesToRadians } from "../../../../utils/degreesToRadians";
import { Object3D } from "three";
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
  ActionRollDiceInfo,
  DiceActionType,
} from "../../../../interfaces/RollDice/RollDice";
import { IResolvableItemRenderData } from "../../../../interfaces/ActionService/IResolvableItem";

type Props = {
  item: IResolvableItemRenderData;
  setResolved: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
};

const actionTypes = ["build", "explore", "gather"];
const weatherTypes = ["rain", "snow", "animals"];

export const AnimationWindow = (props: Props) => {
  const containerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const { current } = containerRef;
    if (!current) {
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

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    const scene = new THREE.Scene();
    const cubeSize = 2;
    const cubeTranslateX = 2.5;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    let hurtObjects: Object3D[] | undefined;
    let mysteryObjects: Object3D[] | undefined;
    let successObjects: Object3D[] | undefined;

    if (props.item?.diceRoll) {
      hurtObjects = getCube(
        props.item.diceRoll.type,
        "hurt",
        -cubeTranslateX,
        cubeSize
      );
      mysteryObjects = getCube(
        props.item.diceRoll.type,
        "mystery",
        0,
        cubeSize
      );
      successObjects = getCube(
        props.item.diceRoll.type,
        "success",
        cubeTranslateX,
        cubeSize
      );
    }

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
    if (hurtObjects && mysteryObjects && successObjects) {
      scene.add(...hurtObjects, ...mysteryObjects, ...successObjects);
      renderer.setAnimationLoop(animation);
    }

    const finished = {
      x: false,
      y: false,
      z: false,
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
        } else {
          finished[axis] = true;
          if (finished.x && finished.y && finished.z) {
            props.setResolved((old) => {
              const copy = new Map(old);
              copy.set(props.item.droppableId, true);
              return copy;
            });
          }
        }
      });
    }

    function animation() {
      Object.entries(props.item.diceRoll.results.hurt.axes).forEach(
        ([axis, degrees]) => {
          rotateMesh(hurtObjects, axis as unknown as "y" | "x" | "z", degrees);
        }
      );
      Object.entries(item.results.mystery.axes).forEach(([axis, degrees]) => {
        rotateMesh(mysteryObjects, axis as unknown as "y" | "x" | "z", degrees);
      });
      Object.entries(rollDiceInfo.results.success.axes).forEach(
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

    current.appendChild(renderer.domElement);

    return () => {
      current.removeChild(renderer.domElement);
    };
  });

  function getCube(
    type: DiceActionType,
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

  function getActionTextures(type: DiceActionType, dice: ActionDice) {
    const loader = new THREE.TextureLoader();
    const basePath = "/interface/dice";
    const path = actionTypes.includes(rollDiceInfo.type)
      ? basePath + "/action/" + rollDiceInfo.type
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

  return <div ref={containerRef} className={styles.container}></div>;
};
