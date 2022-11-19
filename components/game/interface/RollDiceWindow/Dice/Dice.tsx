import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ReactRef } from "@nextui-org/react/types/utils/refs";
import { RoundedBox, useTexture } from "@react-three/drei";
import { TextureLoader } from "three";

interface Props {}

export function Dice(props: Props) {
  const texture = useLoader(
    TextureLoader,
    "/interface/dice/action/explore/hurt.png"
  );

  const texture2 = useLoader(
    TextureLoader,
    "/interface/dice/action/explore/success.png"
  );

  return (
    <mesh {...props}>
      <RoundedBox args={[2, 2, 2]} radius={0.5}>
        <meshStandardMaterial map={texture} attach="material-0" />
        <meshPhysicalMaterial map={texture} attach="material-1" />
        <meshPhysicalMaterial map={texture} attach="material-2" />
        <meshPhysicalMaterial map={texture2} attach="material-3" />
        <meshPhysicalMaterial map={texture2} attach="material-4" />
        <meshPhysicalMaterial map={texture2} attach="material-5" />
      </RoundedBox>
    </mesh>
  );
}
