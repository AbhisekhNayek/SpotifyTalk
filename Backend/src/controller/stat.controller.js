import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

// Controller to fetch statistics about songs, albums, users, and unique artists
export const getStats = async (req, res, next) => {
	try {
		// Fetch multiple statistics in parallel using Promise.all
		const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
			// Count total number of songs in the database
			Song.countDocuments(),
			// Count total number of albums in the database
			Album.countDocuments(),
			// Count total number of users in the database
			User.countDocuments(),

			// Aggregation to count unique artists from songs and albums
			Song.aggregate([
				{
					$unionWith: {
						coll: "albums", // Union with albums collection to account for artists there as well
						pipeline: [], // No additional pipeline stages, just combine collections
					},
				},
				{
					$group: {
						_id: "$artist", // Group by artist field to find unique artists
					},
				},
				{
					$count: "count", // Count the number of unique artists
				},
			]),
		]);

		// Respond with the collected statistics
		res.status(200).json({
			totalAlbums,
			totalSongs,
			totalUsers,
			// If there are unique artists, send their count, else default to 0
			totalArtists: uniqueArtists[0]?.count || 0,
		});
	} catch (error) {
		// Handle any errors and pass them to the next middleware
		next(error);
	}
};
