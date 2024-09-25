"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailLog = exports.EMAIL_TYPE = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var EMAIL_TYPE;
(function (EMAIL_TYPE) {
    EMAIL_TYPE["ACTIVATION"] = "activation";
    EMAIL_TYPE["PASSWORD_RESET"] = "password reset";
    EMAIL_TYPE["NOTIFICATION"] = "notification";
})(EMAIL_TYPE || (exports.EMAIL_TYPE = EMAIL_TYPE = {}));
const emailLogSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emailType: {
        type: String,
        enum: EMAIL_TYPE,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
});
const EmailLog = mongoose_1.default.model('EmailLog', emailLogSchema);
exports.EmailLog = EmailLog;
//# sourceMappingURL=EmailLog.js.map