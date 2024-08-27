import {UserPlaceHolder} from "../../Classes/Player/Player";
import {IUser} from "../../types/UserData/IUser";

export function isUser(candidate: IUser | UserPlaceHolder): candidate is IUser {
    return "sockets" in candidate;
}
