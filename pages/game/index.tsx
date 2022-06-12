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
import Cards from '../../components/game/interface/cards/Cards';
import ActionsOrder from '../../components/game/interface/actionsOrder/ActionsOrder';
import Chat from '../../components/game/interface/chat/Chat';
import Tokens from '../../components/game/interface/tokens/Tokens';
import ScenarioButton from '../../components/game/interface/scenario/ScenarioButton';
import Players from '../../components/game/interface/players/Players';

export default function Game() {
  return (
    <div className={styles.game}>
      <Phase phase="production"/>
      <Morale />
      <Resources />
      <Structures />
      <Map />
      <Inventions/>
      <Character />
      <Health />
      <Cards />
      <ActionsOrder />
      <Chat />
      <Tokens />
      <ScenarioButton />
      <Players />
    </div>
  )
}
