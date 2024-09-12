import mongoose, { Schema } from "mongoose";

import bcrypt from "bcryptjs";

export interface UserDocument {
	_id: string;
	email: string;
	username: string;
	password: string;
  	emailVerified: boolean;
}

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	emailVerified: {
		type: Boolean,
    default: false,
	},
});

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	}
	next();
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const user = this;
	return bcrypt.compare(candidatePassword, user.password);
};
const User = mongoose.model<UserDocument>("User", userSchema, "users");
export { User };
