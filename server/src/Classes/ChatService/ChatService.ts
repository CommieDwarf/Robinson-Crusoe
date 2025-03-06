import {SessionData} from "@shared/types/Session/Session";
import {
    IChatMessage,
    IChatService,
    SYSTEM_MSG,
    SystemMessage
} from "@shared/types/ChatService/ChatService";
import {isSystemMsg} from "@shared/utils/typeGuards/isSystemMsg";


export class ChatService implements IChatService {

    private readonly _session: SessionData;
    private _messages: (IChatMessage | SystemMessage)[] = [];

    constructor(session: SessionData) {
        this._session = session;
    }

    get messages() {
        return this._messages;
    }

    get renderData() {
        return {
            messages: this._messages.map((msg) => {
                return {
                    timestamp: msg.date.valueOf(),
                    author: msg.author,
                    content: msg.content,
                    subject1: "subject1" in msg ? msg.subject1 : null
                }
            })
        }
    }

    public addMsg(author: string, content: string, subject1?: string) {
        if (content === "-save") {
            this._session.save();
        }
        this._messages.push({
            date: new Date(),
            author,
            content
        })
    }

    public addSystemMsg(code: SYSTEM_MSG, subject1: string) {
        this._messages.push({
            date: new Date(),
            author: "system",
            content: code,
            subject1
        })
    }

    public clearSystemMessages() {
        this._messages = this._messages.filter((msg) => !isSystemMsg(msg))
    }

}
