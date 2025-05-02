import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../config/cloudinary.config.js";

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (file) => {
	try {
		// Upload file to Cloudinary with auto-resource type (image or audio)
		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			resource_type: "auto",
		});
		return result.secure_url;
	} catch (error) {
		console.log("Error in uploadToCloudinary", error);
		throw new Error("Error uploading to cloudinary"); 
	}
};



// Controller to create a new song
export const createSong = async (req, res, next) => {
	try {
		// Check if all necessary files are uploaded
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload all files" });
		}

		// Extract data from request
		const { title, artist, albumId, duration } = req.body;
		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		// Upload audio and image files to Cloudinary
		const audioUrl = await uploadToCloudinary(audioFile);
		const imageUrl = await uploadToCloudinary(imageFile);

		// Create new song document
		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration,
			albumId: albumId || null, 
		});

        // Save the song to the database
		await song.save(); 

		// If song belongs to an album, update the album's songs array
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			});
		}

		// Return the created song object
		res.status(201).json(song);
	} catch (error) {
		console.log("Error in createSong", error);
		next(error); 
	}
};



// Controller to delete a song
export const deleteSong = async (req, res, next) => {
	try {
		const { id } = req.params;

		// Find the song to be deleted
		const song = await Song.findById(id);

		// If the song belongs to an album, remove it from the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		// Delete the song from the database
		await Song.findByIdAndDelete(id);

		// Return success message
		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.log("Error in deleteSong", error);
		next(error); 
	}
};



// Controller to create a new album
export const createAlbum = async (req, res, next) => {
	try {
		// Extract album data from request body and uploaded image file
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		// Upload album image to Cloudinary
		const imageUrl = await uploadToCloudinary(imageFile);

		// Create new album document
		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		// Save album to the database
		await album.save();

		// Return the created album object
		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};



// Controller to delete an album and its associated songs
export const deleteAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;

		// Delete all songs that belong to the album
		await Song.deleteMany({ albumId: id });

		// Delete the album
		await Album.findByIdAndDelete(id);

		// Return success message
		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.log("Error in deleteAlbum", error);
		next(error);
	}
};



// Admin check route
export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};
