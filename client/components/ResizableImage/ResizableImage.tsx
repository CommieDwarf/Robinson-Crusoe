import React, {useLayoutEffect, useRef, useState} from 'react';
import Image, {ImageProps, StaticImageData} from 'next/image';
import styles from "./ResizableImage.module.css";

interface Props extends ImageProps {
    src: string | StaticImageData;
    alt: string;
    scale?: number;
}

export default function ResizableImage(props: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    // const [containerHeight, setContainerHeight] = useState<number>(0);

    const scale = props.scale ?? 1;

    useLayoutEffect(() => {
        const parentWidth = containerRef.current?.getBoundingClientRect().width ?? 0;
        setContainerWidth(parentWidth * scale);
        // setContainerHeight(containerHeight);
    }, []);

    const sizes = `(max-width: ${containerWidth}px) 100vw, ${containerWidth}px`;


    // const startTime = performance.now();
    //
    // function onLoad() {
    //     const endTime = performance.now();
    //     const loadingTime = endTime - startTime;
    //
    //     console.log("loading time", alt, loadingTime)
    // }

    let blurDataURL = typeof props.src === "string" ? props.src : props.src.src;


    return (
        <div ref={containerRef} className={`${styles.container}`}>
            <Image {...props}
                   alt={props.alt}
                   fill
                   sizes={sizes}
                   placeholder={"blur"}
                   blurDataURL={blurDataURL}
                   className={styles.preventSelect}
                   draggable={false}
            >
            </Image>
        </div>
    );
};
