import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import styles from "./DynamicImage.module.css";

interface Props extends ImageProps {
  src: string | StaticImageData;
  scale?: number;
  className?: string;
  style?: CSSProperties;
}

export default function DynamicImage(props: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      setContainerWidth(entries[0].contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const scale = props.scale || 1;

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${props.className}`}
    >
      <Image
        fill
        draggable={false}
        sizes={`${containerWidth * scale}px`}
        {...props}
        className={`${props.className} ${styles.preventSelect}`}
      ></Image>
    </div>
  );
}
