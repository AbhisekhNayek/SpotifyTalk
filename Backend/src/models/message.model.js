import mongoose from "mongoose";

// Define the schema for the Message collection
const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: String,
			required: true, 
		},
		receiverId: {
			type: String,
			required: true, 
		},
		content: {
			type: String,
			required: true, 
		},
	},
	{
		timestamps: true, 
	}
);

// Create and export the Message model
export const Message = mongoose.model("Message", messageSchema);
