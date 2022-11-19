import style from "./AnimationWindow.module.css";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

import * as React from "react";
import {Dice} from "./Dice/Dice";
import {TextureLoader} from "three";
import * as THREE from "three";

type Props = {};
export const Animation = (props: Props) => {


    return (
        <Canvas>
            <Dice/>
            {/*<directionalLight color={0xffffff} intensity={0.5} position={[2, 3, 9]} />*/}
            <ambientLight color={"white"} intensity={0.5}/>
            <OrbitControls/>
        </Canvas>
    );
};

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
