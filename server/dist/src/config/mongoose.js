"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://tosiek22:okrutnik22@cluster0.parqk0n.mongodb.net/UserData?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.connect(uri);
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});
exports.default = db;
//# sourceMappingURL=mongoose.js.map