export function isInRange(number: number, min: number, max: number) {
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return number >= min && number <= max;
}