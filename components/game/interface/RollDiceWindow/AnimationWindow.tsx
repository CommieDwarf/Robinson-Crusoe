// @flow
import * as React from "react";
import * as THREE from "three";
import { useEffect } from "react";
import styles from "./AnimationWindow.module.css";

import { gatherStructure } from "./diceStructures/gatherStructure";

import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { degreesToRadians } from "../../../../utils/degreesToRadians";
import { getActionTextures } from "../../../../utils/getActionCubeTexture";
import { Object3D } from "three";
import { RollActionDiceInfo } from "../../../../interfaces/RollDice/RollDice";

type DiceType =
  | "gather"
  | "build"
  | "explore"
  | "rain"
  | "snow"
  | "hungryAnimals";

type Props = {
  rollDiceInfo: RollActionDiceInfo;
};
export const AnimationWindow = (props: Props) => {
  const containerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const { current } = containerRef;
    if (!current) {
      return;
    }
    const camera = new THREE.PerspectiveCamera(70, 1, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    let x = -1;
    const hurtObjects = getCube(props.rollDiceInfo.category, "hurt", -0.5);
    const mysteryObjects = getCube(props.rollDiceInfo.category, "mystery", 0);
    const successObjects = getCube(props.rollDiceInfo.category, "success", 0.5);

    scene.add(...hurtObjects, ...mysteryObjects, ...successObjects);

    scene.children.forEach((child) => {
      child.rotation.x = 0;
      child.rotation.y = 0;
      child.rotation.z = 0;
    });

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setAnimationLoop(animation);
    renderer.setSize(300, 300);

    current.appendChild(renderer.domElement);

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

    return () => {
      current.removeChild(renderer.domElement);
    };
  });

  return <div ref={containerRef} className={styles.container}></div>;
};

function rotateMesh(
  objects3D: Object3D[],
  axis: "x" | "y" | "z",
  degrees: number
) {
  let radians = degreesToRadians(degrees);
  objects3D.forEach((object) => {
    if (object.rotation[axis] < radians / 4) {
      object.rotation[axis] += 0.6;
    } else if (object.rotation[axis] < radians / 3.5) {
      object.rotation[axis] += 0.5;
    } else if (object.rotation[axis] < radians / 2.5) {
      object.rotation[axis] += 0.4;
    } else if (object.rotation[axis] < radians / 2) {
      object.rotation[axis] += 0.4;
    } else if (object.rotation[axis] < radians / 1.4) {
      object.rotation[axis] += 0.3;
    } else if (object.rotation[axis] < radians) {
      object.rotation[axis] += 0.1;
    }
  });
}

const cubeTextures = {
  gather: gatherStructure,
};

function getCube(
  CubeType: DiceType,
  type: "hurt" | "mystery" | "success",
  x: number
) {
  const loader = new THREE.TextureLoader();
  loader.setPath(`/interface/dice/${CubeType}/`);
  const textureCube = getActionTextures(loader, cubeTextures[CubeType])[type];
  const geometry = new RoundedBoxGeometry(0.2, 0.2, 0.2, 0.01, 0.09);
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: "#565655" })
  );
  const mesh = new THREE.Mesh(geometry, textureCube);

  mesh.position.x = x;
  line.position.x = x;

  return [mesh, line];
}
