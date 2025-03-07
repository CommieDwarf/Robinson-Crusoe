import React, { useEffect, useRef, useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import styles from "./DynamicImage.module.css";

interface Props extends ImageProps {
	src: string | StaticImageData;
	alt: string;
	scale?: number;
}

export default function ResizableImage(props: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		if (!containerRef.current) return;
	
		// Tworzymy obserwatora do śledzenia zmian szerokości kontenera
		const observer = new ResizeObserver((entries) => {
		  if (!entries[0]) return;
		  setContainerWidth(entries[0].contentRect.width);
		});
		
		observer.observe(containerRef.current);
		
		return () => observer.disconnect(); // Odłącz obserwator przy odmontowaniu
	  }, []);


	return (
		<div
			ref={containerRef}
			className={`${styles.container} ${props.className}`}
		>
			<Image
				{...props}
				alt={props.alt}
				fill
				className={styles.preventSelect}
				draggable={false}
				sizes={`${containerWidth}px`}
			></Image>
		</div>
	);
}
