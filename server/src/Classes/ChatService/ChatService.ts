import {SessionData} from "@shared/types/Session/Session";
import {IChatMessage, IChatService} from "@shared/types/ChatService/ChatService";


export class ChatService implements IChatService {

    private readonly _session: SessionData;
    private _messages: IChatMessage[] = [];

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
                }

            })
        }
    }

    public addMsg(author: string, content: string) {
        this._messages.push({
            date: new Date(),
            author,
            content
        })
    }

}
