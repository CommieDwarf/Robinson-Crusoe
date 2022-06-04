import Image from "next/image";
import React from "react";
import Structure from "./Structure";
import styles from "./Structures.module.css";
import { structureType } from "./Structure";
import Weapon from "./Weapon";

interface IStructure {
        type: structureType,
        level: number,
        commitedResources: {
            type: null | "wood" | "leather"
            quantity: number,
        },
        woodCost: number,
        leatherCost: number,
        locked: boolean,
        builder: boolean,
        helper: boolean,
}

export default function Structures() {

  const structures: IStructure[] = [
      {
          type: "shelter",
          level: 0,
          commitedResources: {
              type: null,
              quantity: 0,
          },
          woodCost: 3,
          leatherCost: 2,
          locked: false,
          builder: false,
          helper: false
      },
      {
        type: "roof",
        level: 0,
        commitedResources: {
            type: null,
            quantity: 0,
        },
        woodCost: 3,
        leatherCost: 2,
        locked: true,
        builder: false,
          helper: false
    },
    {
        type: "palisade",
        level: 0,
        commitedResources: {
            type: null,
            quantity: 0,
        },
        woodCost: 3,
        leatherCost: 2,
        locked: true,
        builder: false,
          helper: false
    }
  ]

  const divs = structures.map((struct, i) => {
    return (
      <Structure
        type={struct.type}
        level={struct.level}
        woodCost={struct.woodCost}
        leatherCost={struct.leatherCost}
        builder={struct.builder}
        helper={struct.helper}
        commitedResources={struct.commitedResources}
        key={i}
        locked={struct.locked}
      />
    );
  });

  return (
    <div className={styles.container}>
      {divs}
      <Weapon
        level={0}
        woodCost={0}
        leatherCost={0}
        builder={false}
        helper={false}
        commitedResources={{
          type: "wood",
          quantity: 1,
        }}
      />
    </div>
  );
}
