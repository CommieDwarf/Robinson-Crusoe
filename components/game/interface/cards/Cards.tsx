import Image from "next/image";
import React from "react";
import styles from "./Cards.module.css";
import { Scrollbars } from "react-custom-scrollbars";

export default function Cards() {
  return (
    <div className={styles.container}>
      <div className={styles.event}>
        <div className={styles["event-card-slot"]}>
          <Image
            src="/interface/cards/wreckage/supply-crates.png"
            layout="fill"
            alt="skrzynie z jedzeniem"
          />
        </div>
        <div className={styles["event-card-slot"]}></div>
        <div className={styles["left-arrow"]}>
          <Image
            src="/interface/cards/red-arrow.png"
            layout="fill"
            alt="strzałka"
          />
        </div>
        <div className={styles["curved-arrow"]}>
          <Image
            src="/interface/cards/red-arrow-curved.png"
            layout="fill"
            alt="strzałka"
          />
        </div>
        <div className={styles["event-character-slots"]}>
          <div className={styles["event-character-slot"]}></div>
          <div className={styles["event-character-slot"]}></div>
        </div>
        <div className={styles["event-character-slots"]}>
          <div className={styles["event-character-slot"]}></div>
          <div className={styles["event-character-slot"]}></div>
        </div>
      </div>
      <div className={styles.bottomRect}>
        <div className={styles.activities}>
          <div className={styles.arrangeCamp + " " + styles.activity}>
            <div className={styles.activityName}>Porządkowanie obozu</div>
            <div className={styles.activityReward}>
              <div className={styles.determinationReward}>
                <div className={styles.determinationValue}>2</div>
                <div className={styles.moraleIcon}>
                  <Image
                    src="/interface/cards/morale-icon.png"
                    layout="fill"
                    alt="token determinacji"
                  />
                </div>
              </div>
              <div className={styles.moraleReward}>
                <div className={styles.moraleArrow}>
                  <Image
                    src="/interface/cards/morale-arrow.png"
                    layout="fill"
                    alt="strzałka morali"
                  />
                </div>
              </div>
            </div>
            <Scrollbars
              className={styles.slotsScrollbar}
              universal={true}
              hideTracksWhenNotNeeded={true}
              renderTrackHorizontal={(props) => (
                <div {...props} className={styles["track-h"]} />
              )}
              renderThumbHorizontal={(props) => (
                <div {...props} className={styles["thumb-h"]} />
              )}
              renderTrackVertical={(props) => (
                <div {...props} className={styles["track-v"]} />
              )}
              renderThumbVertical={(props) => (
                <div {...props} className={styles["thumb-v"]} />
              )}
            > 
              <div className={styles.activitySlots}>
                <div className={styles.activitySlot}></div>
                <div className={styles.activitySlot}></div>
                <div className={styles.activitySlot}></div>

              </div>
            </Scrollbars>
          </div>
          <div className={styles.rest + " " + styles.activity}>
            <div className={styles.activityName}>Odpoczynek</div>
            <div className={styles.activityReward}>
                <div className={styles.plus}>+</div>
                <div className={styles.heart}>
                  <Image src="/interface/cards/heart.png" layout="fill" alt="serce"/>
                </div>
           
            </div>
            <Scrollbars
              className={styles.slotsScrollbar}
              universal={true}
              hideTracksWhenNotNeeded={true}
              renderTrackHorizontal={(props) => (
                <div {...props} className={styles["track-h"]} />
              )}
              renderThumbHorizontal={(props) => (
                <div {...props} className={styles["thumb-h"]} />
              )}
              renderTrackVertical={(props) => (
                <div {...props} className={styles["track-v"]} />
              )}
              renderThumbVertical={(props) => (
                <div {...props} className={styles["thumb-v"]} />
              )}
            > 
              <div className={styles.activitySlots}>
                <div className={styles.activitySlot+ " " + styles.restSlot}></div>
                <div className={styles.activitySlot+ " " + styles.restSlot}></div>
                <div className={styles.activitySlot+ " " + styles.restSlot}></div>

              </div>
            </Scrollbars>
          </div>
        </div>
        <Scrollbars
          className={styles.scroll}
          universal={true}
          renderTrackHorizontal={(props) => (
            <div {...props} className={styles["track-horizontal"]} />
          )}
          renderThumbHorizontal={(props) => (
            <div {...props} className={styles["thumb-horizontal"]} />
          )}
          renderTrackVertical={(props) => (
            <div {...props} className={styles["track-vertical"]} />
          )}
          renderThumbVertical={(props) => (
            <div {...props} className={styles["thumb-vertical"]} />
          )}
        >
          <div className={styles.equipment}>
            <div className={styles.item}>
              <Image
                src="/interface/cards/equipment/flask-of-rum.png"
                layout="fill"
                alt="flaszka rumu"
              />
            </div>
            <div className={styles.item}>
              <Image
                src="/interface/cards/equipment/flask-of-rum.png"
                layout="fill"
                alt="flaszka rumu"
              />
            </div>
            <div className={styles.item}>
              <Image
                src="/interface/cards/equipment/flask-of-rum.png"
                layout="fill"
                alt="flaszka rumu"
              />
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
}
