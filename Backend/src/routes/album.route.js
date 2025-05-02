// Importing required dependencies and functions
import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js"; 

const router = Router();

// Route to get all albums
router.get("/", getAllAlbums);

// Route to get a specific album by ID
router.get("/:albumId", getAlbumById);

// Exporting the router for use in other parts of the application
export default router;
