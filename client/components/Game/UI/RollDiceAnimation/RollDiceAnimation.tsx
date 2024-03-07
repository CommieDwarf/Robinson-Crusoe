import * as React from "react";
import {useLayoutEffect, useState} from "react";
import * as THREE from "three";
import {SpotLight} from "three";
import styles from "./RollDiceAnimation.module.css";

import {RoundedBoxGeometry} from "three/examples/jsm/geometries/RoundedBoxGeometry";
import {kebabCase} from "lodash";
import {explore} from "@shared/constants/diceStructures/explore";
import {AdventureAction} from "@shared/types/Game/ACTION";
import {isActionDice} from "@shared/utils/typeGuards/isActionDice";
import {build} from "@shared/constants/diceStructures/build";
import {IDice} from "@shared/types/Game/Dice/Dice";
import {weather} from "@shared/constants/diceStructures/weather";
import {gather} from "@shared/constants/diceStructures/gather";
import {degreesToRadians} from "../../../../utils/degreesToRadians";
import {
    ActionDice,
    ActionDiceResult,
    ActionDiceResults,
    WeatherDice,
    WeatherDiceResult
} from "@shared/types/Game/RollDice/RollDice";

const structures = {
    gather,
    explore,
    build,
    weather,
};

type Props = {
    name: string;
    results:
        | Map<WeatherDice, WeatherDiceResult | null>
        | Map<keyof ActionDiceResults, ActionDiceResult>;
    type: "weather" | AdventureAction;
    onFinish: (name: string) => void;
    // @ts-ignore
    reRolledDice: ActionDice | null;
    fixed: boolean;
    // @ts-ignore
    reRoll: (dice: ActionDice) => void | ((dice: WeatherDice) => void);

};

export const RollDiceAnimation = (props: Props) => {
    const containerRef = React.createRef<HTMLDivElement>();
    const [renderer, setRenderer] = useState(
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        })
    );

    useLayoutEffect(() => {
        const {current} = containerRef;
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

        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.target.set(0, 0, 0);
        // controls.update();

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
            let fixed =
                (props.reRolledDice && key !== props.reRolledDice) || props.fixed;
            if (value && key) {
                dices.set(key, new Dice(value, key, cubeSize, translateX[index], fixed));
                index++;
            }

        });

        dices.forEach((dice) => {
            scene.add(dice.mesh);
            scene.add(dice.light);
            scene.add(dice.light.target);
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

        function getDiceFromOffset(
            current: HTMLDivElement,
            dices: IDice[],
            event: MouseEvent
        ) {
            const width = current.offsetWidth / dices.length;
            const height = current.offsetHeight / 3;
            dices.forEach((dice) => dice.onMouseLeave());
            if (event.offsetY < height || event.offsetY > height * 2) {
                return null;
            }

            if (event.offsetX < width) {
                return diceArr[0];
            } else if (event.offsetX < width * 2) {
                return diceArr[1];
            } else {
                return diceArr[2];
            }
        }

        function handleMouseMove(event: MouseEvent) {
            if (!current || !props.fixed) {
                return;
            }
            getDiceFromOffset(current, diceArr, event)?.onMouseEnter();
        }

        function handleMouseLeave(event: MouseEvent) {
            dices.forEach((dice) => {
                dice.onMouseLeave();
            });
        }

        function handleMouseClick(event: MouseEvent) {
            if (!current || !props.fixed) {
                return;
            }
            const dice = getDiceFromOffset(current, diceArr, event);
            if (dice && isActionDice(dice.name)) {
                props.reRoll(dice.name);
            }
        }

        current.addEventListener("mousemove", handleMouseMove);
        current.addEventListener("mouseleave", handleMouseLeave);
        current.addEventListener("click", handleMouseClick);

        return () => {
            scene.children = [];
            current.removeEventListener("mousemove", handleMouseMove);
            current.removeEventListener("mouseleave", handleMouseLeave);
            current.removeEventListener("click", handleMouseClick);
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

        name: WeatherDice | ActionDice;

        constructor(
            result: WeatherDiceResult | ActionDiceResult,
            diceName: WeatherDice | ActionDice,
            cubeSize: number,
            translateX: number,
            fixed: boolean
        ) {
            this.result = result;
            this.name = diceName;
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
        const textureCube = getCubeTextures(type, dice);
        const geometry = new RoundedBoxGeometry(size, size, size, 2, 0.4);

        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({color: "#565655"})
        );
        const mesh = new THREE.Mesh(geometry, textureCube);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.x = x;
        line.position.x = x;

        return mesh;
    }

    function getCubeTextures(
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

        const structure =
            type === "weather"
                ? structures.weather[dice as WeatherDice]
                : structures[type][dice as ActionDice];

        return Object.entries(structure).map(([key, side]) => {
            return new THREE.MeshPhysicalMaterial({
                map: loader.load(`/${kebabCase(side)}.png`),
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
        prevProps.reRolledDice === nextProps.reRolledDice &&
        prevProps.fixed === nextProps.fixed
    );
}

export default React.memo(RollDiceAnimation, areEqual);
