import jdenticon from "jdenticon";




const SIZE = 200;

export function generateAvatar(username: string) {
    return jdenticon.toSvg(username, SIZE);
}
