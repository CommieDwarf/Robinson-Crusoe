


export function darkenColor(hex: string, factor = 0.8): string {
	const [r, g, b] = hexToRgb(hex).map((val) => Math.floor(val * factor));
	return `rgb(${r}, ${g}, ${b})`;
  }

function hexToRgb(hex: string): [number, number, number] {
	const bigint = parseInt(hex.replace("#", ""), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
}