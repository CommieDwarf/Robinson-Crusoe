"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const isSystemMsg_1 = require("@shared/utils/typeGuards/isSystemMsg");
class ChatService {
    constructor(session) {
        this._messages = [];
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
                };
            })
        };
    }
    addMsg(author, content, subject1) {
        if (content === "-save") {
            this._session.save();
        }
        this._messages.push({
            date: new Date(),
            author,
            content
        });
    }
    addSystemMsg(code, subject1) {
        this._messages.push({
            date: new Date(),
            author: "system",
            content: code,
            subject1
        });
    }
    clearSystemMessages() {
        this._messages = this._messages.filter((msg) => !(0, isSystemMsg_1.isSystemMsg)(msg));
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=ChatService.js.map