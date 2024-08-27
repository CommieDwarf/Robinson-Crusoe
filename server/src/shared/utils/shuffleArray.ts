export default function shuffle<T>(array: T[], rngFunc: () => number): T[] {
    let shuffled: T[] = [...array];
    for (let i = 0; i < shuffled.length; i++) {
        let temp = shuffled[i];
        const random = Math.floor(rngFunc() * (shuffled.length - 1));
        shuffled[i] = shuffled[random];
        shuffled[random] = temp;
    }

    return shuffled;
}
