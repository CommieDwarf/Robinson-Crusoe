export function getDuplicatedElements<T>(arr: T[]): T[] {
    return arr.filter((element, index) => arr.indexOf(element) !== index);
}
