export default function shuffle<T>(array: T[]): T[] {
  let shuffled: T[] = array;

  for (let i = 0; i < shuffled.length - 1; i++) {
    let temp = shuffled[i];
    const random = Math.floor(Math.random() * (shuffled.length - 1));
    shuffled[i] = shuffled[random];
    shuffled[random] = temp;
  }

  return shuffled;
}
