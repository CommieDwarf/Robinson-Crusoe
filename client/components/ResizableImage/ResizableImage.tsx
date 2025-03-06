import React, { useEffect, useRef, useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import styles from "./ResizableImage.module.css";

interface Props extends ImageProps {
	src: string | StaticImageData;
	alt: string;
	scale?: number;
}

export default function ResizableImage(props: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState<number>(0);

	const scale = props.scale ?? 1;

	useEffect(() => {
		const parentWidth =
			containerRef.current?.getBoundingClientRect().width ?? 0;
		setContainerWidth(parentWidth * scale);
	}, [scale]);

	const sizes = `(max-width: ${containerWidth}px) 100vw, ${containerWidth}px`;

	return (
		<div
			ref={containerRef}
			className={`${styles.container} ${props.className}`}
		>
			<Image
				{...props}
				alt={props.alt}
				fill
				sizes={sizes}
				className={styles.preventSelect}
				draggable={false}
			></Image>
		</div>
	);
}
