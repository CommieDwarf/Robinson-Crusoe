import ResizableImage from "../components/ResizableImage/ResizableImage";

const icons = [
    "determination",
    "heart",
    "reroll",
    "rain-cloud",
    "snow-cloud",
    "food",
    "discovery",
];

export function insertIconsIntoText(string: string, className: string) {
    const array = string.split("$");


    return array.map((str, i) => {
        if (icons.includes(str)) {
            return (
                <div key={i} className={className}>
                    <ResizableImage
                        src={`/UI/icons/${str}.png`}
                        alt={str}
                    />
                </div>
            );
        } else {
            return <span key={i}>{str}</span>;
        }
    });
}
