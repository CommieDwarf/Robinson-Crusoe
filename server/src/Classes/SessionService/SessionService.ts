import { SessionBasicInfo, SessionData } from "@shared/types/Session/Session";
import { Session } from "../Session/Session";
import { SCENARIO } from "@shared/types/Game/ScenarioService/SCENARIO";
import { SessionSettings } from "@shared/types/SessionSettings";
import { UserDocument } from "../../Models/User";
import { User } from "../User/User";
import { SessionConnectError } from "../../Errors/Session/SessionConnectError";
import { SESSION_CONNECTION_ERROR_CODE } from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
import { Socket } from "socket.io";
import { SaveGameDocument } from "../../Models/SaveGame";
import { ISessionService } from "@shared/types/SessionService";
import { IUser } from "@shared/types/User/IUser";
import { sharedConfig } from "@shared/config/sharedConfig";

export class SessionService implements ISessionService {
	private _sessions = new Map<SessionData["id"], SessionData>();
	private _users = new Map<IUser["id"], IUser>();

	constructor() {
		setInterval(() => {
			console.log("ACTIVE SESSIONS", this._sessions.size);
			console.log("ACTIVE USERS", this._users.size);
		}, 10000);
	}

	public createSession(
		userId: string,
		settings: SessionSettings,
		loadData?: SaveGameDocument
	): SessionData {
		const user = this.getUser(userId);
		user.leaveLobbies();
		const session: SessionData = new Session(this, user, settings, loadData);
		this._sessions.set(session.id, session);
		return session;
	}

	public createQuickGameSession(userId: string): SessionData {
		const session = this.createSession(userId, {
			password: "",
			quickGame: true,
			private: true,
			scenario: SCENARIO.CASTAWAYS,
			maxPlayers: 1,
			name: "quick game",
		});
		session.startGame();
		return session;
	}

	public joinSession(user: IUser, sessionId: string, password: string) {
		const session = this.findSession(sessionId);
		if (!session) {
			throw new SessionConnectError(
				"Can't find session with id: " + sessionId,
				SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND
			);
		}
		if (session.settings.password !== password) {
			throw new SessionConnectError(
				"Passwords don't match.",
				SESSION_CONNECTION_ERROR_CODE.INCORRECT_PASSWORD
			);
		}

		if (session.players.length >= session.settings.maxPlayers) {
			throw new SessionConnectError(
				"Server is full",
				SESSION_CONNECTION_ERROR_CODE.SESSION_FULL
			);
		}

		session.joinSession(user, session.isLoadMode);
	}

	public leaveSession(user: IUser, sessionId: string) {
		const session = this.getSession(sessionId);
        console.log("leaveSession from Service")
        session.leaveSession(user);
        if (session.usersInSession === 0) {
            this.removeSession(session.id);
        }
		return sessionId;
	}

	public removeSession(sessionId: string): void {
		const session = this.getSession(sessionId);
		session.onSessionRemove();
        session.players.map((player) => this._users.get(player.user.id)).forEach((user) => user?.removeSession(sessionId));
		this._sessions.delete(sessionId);
	}

	public findSession(sessionId: string): SessionData | null {
		const session = this._sessions.get(sessionId);
		return session || null;
	}

	public findSessionByInvitationCode(invitationCode: string) {
		for (const session of this._sessions.values()) {
			if (session.invitationCode === invitationCode) {
				return session;
			}
		}
	}

	public getOrCreateUser(userDocument: UserDocument, socket: Socket): IUser {
		let user = this._users.get(userDocument._id.toString());
		if (!user) {
			user = new User(userDocument, socket, this);
			this._users.set(user.id, user);
			return user;
		} else {
			user.addSocket(socket);
		}
		return user;
	}

	public removeUser(userId: string) {
		this._users.delete(userId);
	}

	public getPublicSessionList(userId: string): SessionBasicInfo[] {
		return Array.from(this._sessions.values())
			.filter(
				(session) =>
					!session.settings.private && !session.isGameInProgress
			)
			.filter(
				(session) =>
					!session.isLoadMode ||
					(session.isLoadMode && session.usersPlayerExist(userId))
			)
			.map((session) => session.getBasicInfo());
	}

	public userInSession(userId: string, sessionId: string): boolean {
		return (
			this.findSession(sessionId)?.isUserInSession(userId) ||
			false
		);
	}

	public addMessage(userId: string, message: string, sessionId: string) {
		const session = this.findSession(sessionId);
		if (!session) {
			throw new Error("Session not found");
		}
		session.addMessage(userId, message);
	}

	public updateSessionSettings(
		userId: string,
		sessionId: string,
		settings: Partial<SessionSettings>
	) {
		const session = this.findSession(sessionId);
		if (!session || session.host.id !== userId) {
			return;
		}
		session.updateSettings(settings);
	}

	public startGame(userId: string, sessionId: string) {
		const session = this.getSession(sessionId);
		if (
			!session.isHost(userId) ||
			!session.canStart() ||
			session.isGameInProgress
		) {
			return;
		}
		session.startGame();
	}

    public getAllUsersFromSession(sessionId: string) {
        return this.getSession(sessionId).players.map((player) => this._users.get(player.user.id)).filter((user) => user !== undefined) as IUser[];
    }

	private getUser(userId: string): IUser {
		const user = this._users.get(userId);
		if (!user) {
			throw new Error("Can't find user with id: " + userId);
		}
		return user;
	}

	private getSession(sessionId: string) {
		const session = this._sessions.get(sessionId);
		if (!session) {
			throw new Error("Can't find session with id: " + sessionId);
		}

		return session;
	}

	public generateUniqueInvitationCode() {
		let code: string;
		do {
			code = this.generateInvitationCode(sharedConfig.session.invitationCodeLength);
		} while (!this.isInvitationCodeUnique(code));

		return code;
	}

	private generateInvitationCode(length: number): string {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let sessionCode = "";
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			sessionCode += characters[randomIndex];
		}
		return sessionCode;
	}

	private isInvitationCodeUnique(code: string) {
		return !Array.from(this._sessions.values()).find(
			(session) => session.invitationCode === code
		);
	}

   
}
