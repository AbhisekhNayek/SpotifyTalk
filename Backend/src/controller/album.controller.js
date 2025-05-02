import { Album } from "../models/album.model.js";

// Controller to get all albums from the database
export const getAllAlbums = async (req, res, next) => {
	try {
		// Fetch all albums from the database
		const albums = await Album.find();
		// Return the fetched albums as response
		res.status(200).json(albums);
	} catch (error) {
		// Pass any error to the next middleware for handling
		next(error);
	}
};



// Controller to get a specific album by its ID
export const getAlbumById = async (req, res, next) => {
	try {
		// Extract albumId from request parameters
		const { albumId } = req.params;

		// Find album by its ID and populate the songs array with song details
		const album = await Album.findById(albumId).populate("songs");

		// If no album is found, return a 404 error
		if (!album) {
			return res.status(404).json({ message: "Album not found" });
		}

		// Return the album with its songs in the response
		res.status(200).json(album);
	} catch (error) {
		// Pass any error to the next middleware for handling
		next(error);
	}
};
