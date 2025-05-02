// Importing required dependencies and functions
import { Router } from "express"; 
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js"; 
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"; 

const router = Router();

// Protecting all routes and requiring admin privileges
router.use(protectRoute, requireAdmin);

// Route to check if the user is an admin
router.get("/check", checkAdmin);

// Route to create a new song (admin only)
router.post("/songs", createSong);

// Route to delete a song by ID (admin only)
router.delete("/songs/:id", deleteSong);

// Route to create a new album (admin only)
router.post("/albums", createAlbum);

// Route to delete an album by ID (admin only)
router.delete("/albums/:id", deleteAlbum);

// Exporting the router for use in other parts of the application
export default router;
