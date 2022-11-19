// @flow
import * as React from 'react';
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {inspect} from "util";
import styles from "./AnimationWindow.module.css"
import {useRef} from "react";

type Props = {
    color: "orange" | "yellow";
};
export const Test = (props: Props) => {


    const camera = new THREE.PerspectiveCamera(
        80,
        240 / 130,
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

    const ref = React.createRef<HTMLDivElement>();


    return (
        <div className={styles.container} ref={ref}>

        </div>
    );
};