require("dotenv").config(); // Załaduj zmienne środowiskowe

import nodemailer from "nodemailer";
import path from "path";
import hbs from 'nodemailer-express-handlebars';

const dev = process.env.NODE_ENV !== "production";

console.log(dev);

const config = {
	server: {
		port: process.env.PORT || 3000,
		jwtSecret: process.env.JWT_SECRET || "your-secret-key",
		clientUrls: dev ? [(process.env.CLIENT_DEV_URL || "")]:  process.env.CLIENT_PROD_URLS?.split(",").map((url => url.trim())) || [""]
	},
	database: {
		uri:
			process.env.MONGODB_URI ||
			"mongodb://localhost:27017/your-database",
	},
	expiration: {
		passwordResetCodeMs: 15 * 60 * 1000, // 15 min
		passwordResetTokenMs: 15 * 60 * 1000 // 15 min
	},

	email: {
		service: process.env.EMAIL_SERVICE || "gmail",
		user: process.env.EMAIL_USER || "your-email@gmail.com",
		password: process.env.EMAIL_PASSWORD || "your-email-password",
		from: process.env.EMAIL_FROM || "no-reply@yourdomain.com",

	},
	ping: {
		frequency:
			(process.env.PING_FREQUENCY &&
				parseInt(process.env.PING_FREQUENCY)) ||
			1000,
		sendLatencyFrequency:
			(process.env.SEND_LATENCY_FREQUENCY &&
				parseInt(process.env.SEND_LATENCY_FREQUENCY)) ||
			1000,
		timeout:
			(process.env.PING_TIMEOUT && parseInt(process.env.PING_TIMEOUT)) ||
			1500,
	},

	logLevel: "info",
	requestLimiter: {
		httpWindowMs: minToMs(parseInt(process.env.HTTP_RATE_LIMIT_WINDOW_MS || "1")),
		httpRate: minToMs(parseInt(process.env.HTTP_RATE_LIMIT_PER_WINDOW || "100")),
		socketWindowMs: minToMs(parseInt(process.env.SOCKET_RATE_LIMIT_WINDOWS_MS || "1")),
		socketRate: minToMs(parseInt(process.env.SOCKET_RATE_LIMIT_PER_WINDOW || "100")),
		httpLoginRate: minToMs(parseInt(process.env.FAILED_LOGIN_RATE_LIMIT_PER_WINDOW || "10")),
		httpLoginWindowMs: minToMs(parseInt(process.env.FAILED_LOGIN_RATE_LIMIT_WINDOW_MS || "1")),
		httpResendMailRate: minToMs(parseInt(process.env.EMAIL_RESENT_LIMIT_PER_WINDOW || "5")),
		httpResendMailWindowMs: minToMs(parseInt(process.env.EMAIL_RESEND_LIMIT_WINDOW_MS || ""))
	}
};

const transporter = nodemailer.createTransport({
	service: config.email.service,
	auth: {
		user: config.email.user,
		pass: config.email.password,
	},
});

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        partialsDir: path.resolve('./src/views/email-templates/'),
        defaultLayout: "",
    },
    viewPath: path.resolve('./src/views/email-templates/'),
    extName: '.hbs',
}));


export { config, transporter };

function minToMs(min: number) {
	return min * 1000 * 60;
}
