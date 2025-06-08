import { StaticImageData } from "next/image";

export function isStaticImageData(
  candidate: unknown | StaticImageData,
): candidate is StaticImageData {
  return (
    typeof candidate === "object" &&
    "src" in candidate &&
    "width" in candidate &&
    "width" in candidate
  );
}
