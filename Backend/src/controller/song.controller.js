import { Song } from "../models/song.model.js";

// Controller to get all songs sorted by creation date (newest to oldest)
export const getAllSongs = async (req, res, next) => {
	try {
		// -1 = Descending => newest -> oldest
		// 1 = Ascending => oldest -> newest
		const songs = await Song.find().sort({ createdAt: -1 });
		// Return the list of songs
		res.json(songs);
	} catch (error) {
		// Pass any error to the next middleware for handling
		next(error);
	}
};



// Controller to get 6 featured random songs
export const getFeaturedSongs = async (req, res, next) => {
	try {
		// Fetch 6 random songs using MongoDB's aggregation pipeline
		const songs = await Song.aggregate([
			{
				$sample: { size: 6 }, // Randomly sample 6 songs
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1, 
				},
			},
		]);

		// Return the featured songs
		res.json(songs);
	} catch (error) {
		// Pass any error to the next middleware for handling
		next(error);
	}
};



// Controller to get 4 "Made for You" random songs
export const getMadeForYouSongs = async (req, res, next) => {
	try {
		// Fetch 4 random songs using MongoDB's aggregation pipeline
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 }, // Randomly sample 4 songs
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1, 
				},
			},
		]);

		// Return the "Made for You" songs
		res.json(songs);
	} catch (error) {
		// Pass any error to the next middleware for handling
		next(error);
	}
};



// Controller to get 4 trending random songs
export const getTrendingSongs = async (req, res, next) => {
	try {
		// Fetch 4 random songs using MongoDB's aggregation pipeline
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 }, // Randomly sample 4 songs
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		// Return the trending songs
		res.json(songs);
	} catch (error) {
		// Pass any error to the next middleware for handling
		next(error);
	}
};
