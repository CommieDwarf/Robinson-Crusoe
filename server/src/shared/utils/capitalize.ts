export default function capitalize(string: string) {
    if (string.length == 0) {
        return string;
    }
    return string[0].toUpperCase() + string.slice(1);
}
