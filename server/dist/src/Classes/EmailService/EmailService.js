"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EmailLog_1 = require("../../Models/EmailLog");
const config_1 = require("../../config/config");
class EmailService {
    constructor() { }
    sendActivationMail(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: config_1.config.email.from,
                to: userData.email,
                subject: "Weryfikacja konta",
                template: "verification",
                context: {
                    username: userData.username,
                    activationLink: this.prepareVerificationLink(userData.id)
                }
            };
            config_1.transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return console.log("Błąd: " + error);
                }
            });
            yield EmailLog_1.EmailLog.create({
                userId: userData.id,
                emailType: EmailLog_1.EMAIL_TYPE.ACTIVATION,
                sentAt: new Date(),
            }).then((log) => {
                log.save();
            });
        });
    }
    reSendActivationEmail(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitReached = yield this.isEmailLimitReached(userData.id, EmailLog_1.EMAIL_TYPE.ACTIVATION);
            if (limitReached) {
                throw new Error("Activation e-mail limit reached!");
            }
            this.sendActivationMail(userData);
        });
    }
    isEmailLimitReached(userId, emailType) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date(Date.now() - config_1.config.email.limits.resendCooldown);
            try {
                const emailCount = yield EmailLog_1.EmailLog.countDocuments({
                    emailType: emailType,
                    userId: userId,
                    sentAt: { $gte: startTime },
                });
                return emailCount >= config_1.config.email.limits.maxEmailsPerDay;
            }
            catch (error) {
                console.error("Error checking email limit:", error);
                throw new Error("Error checking email limit.");
            }
        });
    }
    prepareVerificationLink(userId) {
        console.log("preparing verification link");
        const token = jsonwebtoken_1.default.sign({ userId }, config_1.config.server.jwtSecret, {
            expiresIn: "1h",
        });
        return `${config_1.config.server.clientUrl}/email-activation/${token}`;
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=EmailService.js.map