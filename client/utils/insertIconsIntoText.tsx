import ResizableImage from "../components/ResizableImage/ResizableImage";

const icons = [
    "determination",
    "heart",
    "reroll",
    "rain-cloud",
    "snow-cloud",
    "food",
    "discovery",
    "wood",
    "weapon",
    "palisade",
];

export function insertIconsIntoText(string: string, elementClassName: string) {
    const array = string.split("$");


    return array.map((str, i) => {
        if (icons.includes(str.toLowerCase())) {
            return (
                <div key={i} className={elementClassName}>
                    <ResizableImage
                        src={`/UI/icons/${str.toLowerCase()}.png`}
                        alt={str}
                    />
                </div>
            );
        } else {
            return <span key={i}>{str}</span>;
        }
    });
}
