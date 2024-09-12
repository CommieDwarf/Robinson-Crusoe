import {Request, Response} from "express";



export interface UserExistsBody {
	username: string;
}

export interface GetUserAvatarRequest extends Request {
	params: {
		username: string;
	};
}

export interface GetUserAvatarResponse {
	svg: string;
}

