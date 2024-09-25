"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.config = void 0;
require("dotenv").config(); // Załaduj zmienne środowiskowe
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const config = {
    server: {
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET || "your-secret-key",
        clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
    },
    database: {
        uri: process.env.MONGODB_URI ||
            "mongodb://localhost:27017/your-database",
    },
    email: {
        service: process.env.EMAIL_SERVICE || "gmail",
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        password: process.env.EMAIL_PASSWORD || "your-email-password",
        from: process.env.EMAIL_FROM || "no-reply@yourdomain.com",
        limits: {
            maxEmailsPerDay: (process.env.MAX_ACTIVATION_EMAILS_PER_DAY &&
                parseInt(process.env.MAX_ACTIVATION_EMAILS_PER_DAY)) ||
                3,
            resendCooldown: (process.env.ACTIVATION_EMAILS_RESEND_COOLDOWN &&
                parseInt(process.env.ACTIVATION_EMAILS_RESEND_COOLDOWN)) ||
                24 * 60 * 60 * 1000,
        },
    },
    ping: {
        frequency: (process.env.PING_FREQUENCY &&
            parseInt(process.env.PING_FREQUENCY)) ||
            1000,
        sendLatencyFrequency: (process.env.SEND_LATENCY_FREQUENCY &&
            parseInt(process.env.SEND_LATENCY_FREQUENCY)) ||
            1000,
        timeout: (process.env.PING_TIMEOUT && parseInt(process.env.PING_TIMEOUT)) ||
            1500,
    },
    logLevel: process.env.LOG_LEVEL || "info",
};
exports.config = config;
const transporter = nodemailer_1.default.createTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.password,
    },
});
exports.transporter = transporter;
transporter.use('compile', (0, nodemailer_express_handlebars_1.default)({
    viewEngine: {
        extname: '.hbs',
        partialsDir: path_1.default.resolve('./src/views/email-templates/'),
        defaultLayout: "",
    },
    viewPath: path_1.default.resolve('./src/views/email-templates/'),
    extName: '.hbs',
}));
//# sourceMappingURL=config.js.map