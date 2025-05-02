import mongoose from "mongoose";

// Define the schema for the Album collection
const albumSchema = new mongoose.Schema(
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
		releaseYear: {
			type: Number,
			required: true, 
		},
		songs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Song", 
			},
		],
	},
	{
		timestamps: true, 
	}
);

// Create and export the Album model
export const Album = mongoose.model("Album", albumSchema);
