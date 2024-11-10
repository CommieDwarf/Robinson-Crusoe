import mongoose, { Schema } from "mongoose";
import { config } from "../config/config"




interface PasswordResetCodeDocument {
    userId: mongoose.Schema.Types.ObjectId;
    code: string;
    expiresAt: {
        type: Date,
        expires: number,
    },
}


const passwordResetCodeSchema = new Schema<PasswordResetCodeDocument>({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        index: true,
    },
    code: {
        required: true,
        type: String
    },
    expiresAt: { type: Date, expires: config.expiration.passwordResetCodeMs / 1000 }
})


const PasswordResetCode = mongoose.model<PasswordResetCodeDocument>("PasswordResetCode", passwordResetCodeSchema);

export { PasswordResetCode }