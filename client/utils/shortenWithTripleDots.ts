export function shortenWithTripleDots(string: string, strLength: number) {
	return string.slice(0, strLength) + String.fromCharCode(8230);
}
