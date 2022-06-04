import Image from 'next/image';
import React from 'react'
import styles from "./Map.module.css";

export default function Map() {

    let hex = [];
  let beehive = [
    [false, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true],
    [false, true, true, true],
  ];

  const hexes: JSX.Element[] = [];

  let top = 17;
  let startLeft = 22;
  for (let row of beehive) {
    let left = startLeft;
    console.log(left);
    for (let hex of row) {
      if (hex) {
        const style = { left: left + "%", top: top + "%" };
        console.log(style);
        let div = (
          <div className={styles.hex} style={style}>
            <Image src="/hex1.png" width="100%" height="100%" />
          </div>
        );
        hexes.push(div);
      }
      left += 16;
    }
    top += 13.5;
    startLeft = startLeft === 22 ? 14 : 22;
  }





  return (
    <div className={styles.container}>
        <div className={styles.map}>
            <Image src="/interface/map/map.png" layout="fill" alt="map"/>
            {hexes}
        </div>
    </div>
  )
}
