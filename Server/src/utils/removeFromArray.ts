export function removeFromArray<T>(array: T[], element: T): T[] {
    const i = array.indexOf(element);
    if (i !== -1) {
        return array.slice(0, i).concat(array.slice(i + 1, array.length));
    }
    return array;
}
