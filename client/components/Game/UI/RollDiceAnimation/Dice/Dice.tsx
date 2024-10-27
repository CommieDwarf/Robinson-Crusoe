import {ActionDice, ActionDiceResult, WeatherDice, WeatherDiceResult} from "@shared/types/Game/RollDice/RollDice";
import * as THREE from "three";
import {RoundedBoxGeometry} from "three/examples/jsm/geometries/RoundedBoxGeometry";
import {degreesToRadians} from "../../../../../utils/degreesToRadians";
import {SpotLight} from "three";
import {AdventureAction} from "@shared/types/Game/ACTION";
import {kebabCase} from "lodash";
import styles from "../RollDiceAnimation.module.css";
import * as React from "react";
import {gather} from "@shared/constants/diceStructures/gather";
import {explore} from "@shared/constants/diceStructures/explore";
import {build} from "@shared/constants/diceStructures/build";
import {weather} from "@shared/constants/diceStructures/weather";
import {IDice} from "../../../../../@types/Dice/Dice";


const structures = {
    gather,
    explore,
    build,
    weather,
};


export class Dice implements IDice {
    private _result: WeatherDiceResult | ActionDiceResult;
    private readonly _mesh: THREE.Mesh<RoundedBoxGeometry, THREE.MeshPhysicalMaterial[]>;
    private readonly _name: WeatherDice | ActionDice;
    private readonly _light = new THREE.SpotLight(0xffffff, 0);
    private _finished = false;
    private _axesFinished = {x: false, y: false, z: false};

    constructor(
        result: WeatherDiceResult | ActionDiceResult,
        diceName: WeatherDice | ActionDice,
        cubeSize: number,
        translateX: number,
        type: "weather" | AdventureAction,
    ) {
        this._result = result;
        this._name = diceName;
        this._mesh = createMesh(type, diceName, translateX, cubeSize);
        this._light.position.set(translateX * 0.9, 0, 3);
        this._light.target = this._mesh;
        this._light.penumbra = 1;
    }


    get finished(): boolean {
        return this._finished;
    }


    get axesFinished(): { x: boolean; y: boolean; z: boolean } {
        return this._axesFinished;
    }


    get light(): SpotLight {
        return this._light;
    }


    get result(): WeatherDiceResult | ActionDiceResult {
        return this._result;
    }

    get mesh() {
        return this._mesh;
    }

    get name(): WeatherDice | ActionDice {
        return this._name;
    }

    public setNewResult(result: WeatherDiceResult | ActionDiceResult) {
        this._result = result;
        this.resetAnimation();
    }

    private resetAnimation() {
        this._axesFinished = {x: false, y: false, z: false};
        this._finished = false;
        this.resetRotations();
    }

    private resetRotations() {
        this._mesh.rotation.set(0, 0, 0);
    }


    public onMouseEnter() {
        this.light.intensity = 0.7;
        this._mesh.material.forEach((material) => {
            material.reflectivity = 0.2;
        });
    }

    public onMouseLeave() {
        this.light.intensity = 0;
        this._mesh.material.forEach((material) => {
            material.reflectivity = 0.5;
        });
    }

    rotate() {
        this.rotateAxis("x", this._result.axes.x);
        this.rotateAxis("y", this._result.axes.y);
        this.rotateAxis("z", this._result.axes.z);
        if (this._axesFinished.x && this._axesFinished.y && this._axesFinished.z) {
            this._finished = true;
        }
    }

    private rotateAxis(axis: "x" | "y" | "z", degrees: number) {
        let radians = degreesToRadians(degrees);
        const diff = radians - this._mesh.rotation[axis];
        if (diff > 0.01) {
            this._mesh.rotation[axis] += diff / 16;
        } else {
            this._axesFinished[axis] = true;
        }
    }
}


function createMesh(
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


