import * as React from "react";
import * as THREE from "three";
import { useEffect, useState } from "react";
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
  DiceActionType,
} from "../../../../interfaces/RollDice/RollDice";
import { IResolvableItemRenderData } from "../../../../interfaces/ActionService/IResolvableItem";
import { cancelAnimationFrame, requestAnimationFrame } from "dom-helpers";

type Props = {
  item: IResolvableItemRenderData;
  setResolved: React.Dispatch<React.SetStateAction<Map<string, boolean>>>;
  resolved: Map<string, boolean>;
};

const actionTypes = ["build", "explore", "gather"];
const weatherTypes = ["rain", "snow", "animals"];

export const AnimationWindow = (props: Props) => {
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
    const cubeSize = 2;
    const cubeTranslateX = 2.5;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const dices = new Map<string, Object3D>();

    if (props.item?.diceRoll) {
      dices.set(
        "hurt",
        getCube(props.item.diceRoll.type, "hurt", -cubeTranslateX, cubeSize)
      );

      dices.set(
        "mystery",
        getCube(props.item.diceRoll.type, "mystery", 0, cubeSize)
      );
      dices.set(
        "success",
        getCube(props.item.diceRoll.type, "success", cubeTranslateX, cubeSize)
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

    dices.forEach((dice) => {
      scene.add(dice);
    });

    const rollDiceFinished = {
      hurt: false,
      mystery: false,
      success: false,
    };

    function rotateMeshDecorator() {
      const axesFinished = {
        x: false,
        y: false,
        z: false,
      };
      return function rotateMesh(
        objects3D: Object3D[],
        axis: "x" | "y" | "z",
        degrees: number,
        diceName: ActionDice
      ) {
        let radians = degreesToRadians(degrees);
        objects3D.forEach((object) => {
          const diff = radians - object.rotation[axis];
          if (diff > 0.01) {
            object.rotation[axis] += diff / 16;
          } else {
            axesFinished[axis] = true;
            if (axesFinished.x && axesFinished.y && axesFinished.z) {
              rollDiceFinished[diceName] = true;
            }
          }
        });
      };
    }

    const rotateMesh = rotateMeshDecorator();

    function animation() {
      if (
        rollDiceFinished.hurt &&
        rollDiceFinished.mystery &&
        rollDiceFinished.success
      ) {
        props.setResolved((old) => {
          const copy = new Map(old);
          copy.set(props.item.droppableId, true);
          return copy;
        });
      }

      if (props.item?.diceRoll) {
        Object.entries(props.item.diceRoll.results.hurt.axes).forEach(
          ([axis, degrees]) => {
            const hurtDice = dices.get("hurt");
            if (hurtDice) {
              rotateMesh(
                [hurtDice],
                axis as unknown as "y" | "x" | "z",
                degrees,
                "hurt"
              );
            }
          }
        );
        Object.entries(props.item.diceRoll.results.mystery.axes).forEach(
          ([axis, degrees]) => {
            const mysteryDice = dices.get("mystery");
            if (mysteryDice) {
              rotateMesh(
                [mysteryDice],
                axis as unknown as "y" | "x" | "z",
                degrees,
                "mystery"
              );
            }
          }
        );

        Object.entries(props.item.diceRoll.results.success.axes).forEach(
          ([axis, degrees]) => {
            const successDice = dices.get("success");
            if (successDice) {
              rotateMesh(
                [successDice],
                axis as unknown as "y" | "x" | "z",
                degrees,
                "success"
              );
            }
          }
        );
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animation);
    }

    let animationId = 0;
    if (!props.resolved.get(props.item.droppableId)) {
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

    return mesh;
  }

  function getActionTextures(type: DiceActionType, dice: ActionDice) {
    if (!props.item.diceRoll?.type) {
      throw new Error("props.item.diceRoll is undefined");
    }
    const loader = new THREE.TextureLoader();
    const basePath = "/interface/dice";
    const path = actionTypes.includes(props.item?.diceRoll?.type)
      ? basePath + "/action/" + props.item.diceRoll.type
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
