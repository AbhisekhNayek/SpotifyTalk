import mongoose from "mongoose";

// Define the schema for the User collection
const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true, 
		},
		imageUrl: {
			type: String,
			required: true, 
		},
		clerkId: {
			type: String,
			required: true, 
			unique: true,
		},
	},
	{
		timestamps: true, 
	}
);

// Create and export the User model
export const User = mongoose.model("User", userSchema);
