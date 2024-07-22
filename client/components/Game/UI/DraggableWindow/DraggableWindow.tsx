import styles from "./DraggableWindow.module.css";
import Draggable from "react-draggable";
import sharedStyles from "../../../../styles/shared.module.css";
import {useLayoutEffect, useRef, useState} from "react";
import {ViewStyleProps} from "@react-types/shared";


interface Props {
    width?: number,
    height?: number,
    children?: string | JSX.Element | JSX.Element[],
    padding?: number,
}

export function DraggableWindow(props: Props) {

    const [containerSize, setContainerSize] = useState({x: props.width || 0, y: props.height || 0});

    const containerRef = useRef<HTMLDivElement>(null);

    const style: ViewStyleProps = {
        padding: props.padding
    }


    if (containerSize.x > 0 && containerSize.y > 0) {
        style.top = `calc(50% - ${containerSize.y}px / 2)`;
        style.left = `calc(50% - ${containerSize.x}px / 2)`
    }

    useLayoutEffect(() => {
        const current = containerRef.current;
        if (!current) {
            return;
        }
        if (containerSize.x === 0) {
            setContainerSize(prev => {
                return {
                    ...prev,
                    x: current.clientWidth
                }
            })
        }
        if (containerSize.y === 0) {
            setContainerSize(prev => {
                return {
                    ...prev,
                    y: current.clientHeight
                }
            })
        }
    }, [containerRef])


    return <Draggable bounds="parent" defaultClassNameDragging={sharedStyles.grabbing}
    >
        <div className={styles.container} style={style} ref={containerRef}>
            {props.children}
        </div>
    </Draggable>

}
