import Image from "next/image";
import React from "react";
import styles from "./Resources.module.css";

export default function Resources() {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Image src="/interface/resources/board.jpg" layout="fill" />
      </div>
      <div className={styles.leftBar}>
        <Image src="/interface/resources/boardVert.jpg" layout="fill" />
      </div>
      <div className={styles.futureResources}>
          Przyszłe surowce
          <br />
          <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src="/interface/resources/food.png" layout="fill" />
            </div>
            <div className={styles.label}>Żywność:</div>
            
            <div className={styles.value}>0</div>
          </div>
          <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src="/interface/resources/dry-food.png" layout="fill" />
            </div>
            <div className={styles.label}>Suchy prowiant:</div>
            
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src="/interface/resources/wood.png" layout="fill" />
            </div>
            <div className={styles.label}>Drewno:</div>
            
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src="/interface/resources/leather.png" layout="fill" />
            </div>
            <div className={styles.label}>Skóry:</div>
            
            <div className={styles.value}>10</div>
          </div>
      </div>
      <div className={styles.rightBar}>
        <Image src="/interface/resources/boardVert.jpg" layout="fill" />
      </div>
      <div className={styles.botBar}>
        <Image src="/interface/resources/board.jpg" layout="fill" />
      </div>
      <div className={styles.midBar}>
        <Image src="/interface/resources/board.jpg" layout="fill" />
        <div className={styles.barDecoration}>
          <div className={styles.productionIcon}>
            <Image src="/interface/resources/production.png" layout="fill" />
          </div>
        </div>
      </div>
      <div className={styles.futureResources}>
          Posiadane surowce
          <br />
          <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src="/interface/resources/food.png" layout="fill" />
            </div>
            <div className={styles.label}>Żywność:</div>
            
            <div className={styles.value}>0</div>
          </div>
          <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src="/interface/resources/dry-food.png" layout="fill" />
            </div>
            <div className={styles.label}>Suchy prowiant:</div>
            
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src="/interface/resources/wood.png" layout="fill" />
            </div>
            <div className={styles.label}>Drewno:</div>
            
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src="/interface/resources/leather.png" layout="fill" />
            </div>
            <div className={styles.label}>Skóry:</div>
            
            <div className={styles.value}>10</div>
          </div>
      </div>
    </div>
  );
}
