// Importing required dependencies and functions
import { Router } from "express"; 
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js"; 
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"; 

const router = Router();

// Route to get all songs, protected by authentication and requiring admin role
router.get("/", protectRoute, requireAdmin, getAllSongs);

// Route to get featured songs (no authentication required)
router.get("/featured", getFeaturedSongs);

// Route to get "made for you" songs (no authentication required)
router.get("/made-for-you", getMadeForYouSongs);

// Route to get trending songs (no authentication required)
router.get("/trending", getTrendingSongs);

// Exporting the router for use in other parts of the application
export default router;
