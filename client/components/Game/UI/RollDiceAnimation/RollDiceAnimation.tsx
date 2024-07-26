import * as React from "react";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import * as THREE from "three";
import styles from "./RollDiceAnimation.module.css";
import {AdventureAction} from "@shared/types/Game/ACTION";
import {isActionDice} from "@shared/utils/typeGuards/isActionDice";
import {
    ActionDice,
    ActionDiceResult,
    ActionDiceResults,
    WeatherDice,
    WeatherDiceResult
} from "@shared/types/Game/RollDice/RollDice";
import {getObjectsComparator} from "../../../../utils/getObjectsComparator";
import {Dice} from "./Dice/Dice";
import {IDice} from "../../../../types/Dice/Dice";


type Props = {
    name: string;
    results:
        | Map<WeatherDice, WeatherDiceResult | null>
        | Map<keyof ActionDiceResults, ActionDiceResult>;
    type: "weather" | AdventureAction;
    onFinish: (name: string) => void;
    reRolledDice: ActionDice | null;
    reRoll: (dice: ActionDice) => void | ((dice: WeatherDice) => void);

};

export const RollDiceAnimation = (props: Props) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const diceMapRef = useRef<Map<ActionDice | WeatherDice, IDice>>(new Map());


    const [animationDone, setAnimationDone] = useState(false);

    useEffect(() => {

        if (!props.reRolledDice) {
            return;
        }
        const dice = diceMapRef.current.get(props.reRolledDice);
        if (!dice) {
            return;
        }
        // @ts-ignore
        const result = props.results.get(props.reRolledDice);
        if (!result) {
            throw new Error("result is " + result);
        }

        console.log("SETTING NEW RESULT +++++++++++", result);
        dice.setNewResult(result);
        setAnimationDone(false);
        // @ts-ignore
    }, [props.reRolledDice, props.results]);

    useEffect(() => {
        const {current} = containerRef;
        if (!current) {
            return;
        }
        const diceArr: IDice[] = Array.from(diceMapRef.current.values());

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
            if (!current) {
                return;
            }
            getDiceFromOffset(current, diceArr, event)?.onMouseEnter();
        }

        function handleMouseLeave(event: MouseEvent) {
            diceArr.forEach((dice) => {
                dice.onMouseLeave();
            });
        }

        function handleMouseClick(event: MouseEvent) {
            if (!current) {
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
            current.removeEventListener("mousemove", handleMouseMove);
            current.removeEventListener("mouseleave", handleMouseLeave);
            current.removeEventListener("click", handleMouseClick);
        }


    }, [containerRef.current])

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const currentContainer = containerRef.current;

        const currentDiceMap = diceMapRef.current;

        if (!rendererRef.current) {
            rendererRef.current = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            rendererRef.current.setSize(currentContainer.offsetWidth, currentContainer.offsetHeight);
            currentContainer.appendChild(rendererRef.current.domElement);
        }

        if (!cameraRef.current) {
            cameraRef.current = new THREE.PerspectiveCamera(
                80,
                currentContainer.offsetWidth / currentContainer.offsetHeight,
                0.01,
                10
            );
            cameraRef.current.position.z = 4;
        }

        if (!sceneRef.current) {
            sceneRef.current = new THREE.Scene();
            // Tutaj dodajemy wszystkie elementy, które są stałe w scenie (np. światło, tło)
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
            background.position.set(0, 0, -2);
            sceneRef.current.add(background);

            const directionalLight = new THREE.SpotLight(0xffffff, 0.5);
            directionalLight.castShadow = true;
            directionalLight.position.set(2, 3, 9);
            directionalLight.target.position.set(0, 0, -1);
            directionalLight.shadow.mapSize.set(1024, 1024);
            sceneRef.current.add(directionalLight);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            sceneRef.current.add(ambientLight);
        }

        const renderer = rendererRef.current;
        const scene = sceneRef.current;
        const camera = cameraRef.current;

        // Aktualizacja kości
        const translateX: number[] = props.results.size === 1 ? [0] : props.results.size === 2 ? [-1.5, 1.5] : [-3, 0, 3];
        let index = 0;

        props.results.forEach((value, key) => {

            if (value && key) {
                if (!diceMapRef.current.has(key)) {
                    const dice = new Dice(value, key, 2, translateX[index], props.type);
                    diceMapRef.current.set(key, dice);
                    scene.add(dice.mesh);
                    scene.add(dice.light);
                    scene.add(dice.light.target);
                } else {
                    const dice = diceMapRef.current.get(key);
                    if (dice) {
                        dice.result = value;
                    }
                }
                index++;
            }
        });

        function animate() {
            let finished = true;
            diceMapRef.current.forEach((dice) => {
                if (!dice.finished) {
                    console.log(dice);
                    finished = false;
                    dice.rotate();
                }
            });

            if (finished && !animationDone) {
                props.onFinish(props.name);
                setAnimationDone(true);
            }

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            currentDiceMap.forEach((dice) => {
                scene.remove(dice.mesh);
                scene.remove(dice.light);
                scene.remove(dice.light.target);
            });

            currentDiceMap.clear();
        };
    }, []);

    return <div ref={containerRef} className={styles.container}></div>;
}


function areEqual(prevProps: Props, nextProps: Props) {
    const areResultsEqual = resultsEqual(prevProps, nextProps);
    return (
        getObjectsComparator(["onFinish", "reRoll", "results"])(prevProps, nextProps) &&
        areResultsEqual
    );
}

export default React.memo(RollDiceAnimation, areEqual);

function resultsEqual(prevProps: Props, nextProps: Props) {
    let resultsEqual = true;
    prevProps.results.forEach((value, key) => {
        if (value?.result !== nextProps.results.get(key)?.result) {
            resultsEqual = false;
        }
    });
    return resultsEqual;
}
