import {UserPlaceHolder} from "../../Classes/Player/Player";
import {IUser} from "../../shared/types/User/IUser";

export function isUser(candidate: IUser | UserPlaceHolder): candidate is IUser {
    return "sockets" in candidate;
}
