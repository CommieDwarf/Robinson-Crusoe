import ResizableImage from "../components/ResizableImage/ResizableImage";

const icons = [
    "determination",
    "heart",
    "reroll",
    "rain-cloud",
    "snow-cloud",
    "food",
];

export function insertIconsIntoText(string: string, className: string) {
    const array = string.split("$");

    return array.map((str, i) => {
        if (icons.includes(str)) {
            return (
                <div className={className} key={i}>
                    <ResizableImage
                        src={`/UI/icons/${str}.png`}
                        fill
                        alt={str}
                    />
                </div>
            );
        } else {
            return <span key={i}>{str}</span>;
        }
    });
}
