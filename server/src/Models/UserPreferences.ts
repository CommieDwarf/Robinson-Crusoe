import mongoose, { Schema } from "mongoose";
import { UserPreferencesData } from "@shared/types/UserData/UserData";

const userPreferencesSchema = new Schema({
	userId: {
		unique: true,
		index: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	skipUITour: {
		type: Boolean,
		default: false,
	},
});

export const UserPreferences = mongoose.model<UserPreferencesData>(
	"UserPreferences",
	userPreferencesSchema
);
