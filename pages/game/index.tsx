import React from 'react'
import Phase from '../../components/game/interface/phase/Phase';
import Morale from '../../components/game/interface/morale/Morale';
import styles from "./Game.module.css"
import Resources from '../../components/game/interface/resources/Resources';
import Structures from '../../components/game/interface/structures/Structures';
import Map from '../../components/game/interface/map/Map';
import Inventions from '../../components/game/interface/inventions/Inventions';
import Character from '../../components/game/interface/character/Character';
import Health from '../../components/game/interface/character/Health';

export default function Game() {
  return (
    <div className={styles.game}>
      <Phase phase="production"/>
      <Morale />
      <Resources />
      <Structures />
      <Map />
      <div className={styles.dupa1}></div>
      <div className={styles.dupa2}></div>
      <div className={styles.dupa3}></div>
      <Inventions/>
      <Character />
      <Health />
    </div>
  )
}
