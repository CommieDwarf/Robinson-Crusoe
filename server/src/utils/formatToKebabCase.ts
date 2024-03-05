export function formatToKebabCase(name: string) {
    let imgName = name.replace(/ /g, "-");
    return imgName.replace(/([a-z])([A-Z])/g, (match, group) => {
        return match.charAt(0) + '-' + match.charAt(1).toLowerCase();
    })
}
