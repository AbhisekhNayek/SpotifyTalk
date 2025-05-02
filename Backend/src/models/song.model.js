import mongoose from "mongoose";

// Define the schema for the Song collection
const songSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true, 
		},
		artist: {
			type: String,
			required: true, 
		},
		imageUrl: {
			type: String,
			required: true, 
		},
		audioUrl: {
			type: String,
			required: true, 
		},
		duration: {
			type: Number,
			required: true,
		},
		albumId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album",     
			required: false,  
		},
	},
	{
		timestamps: true, 
	}
);

// Create and export the Song model
export const Song = mongoose.model("Song", songSchema);
