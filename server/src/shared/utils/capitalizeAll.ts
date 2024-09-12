import capitalize from "./capitalize";

export function capitalizeAll(str: string) {
    return str.split(" ").map((word) => capitalize(word)).join(" ");
}