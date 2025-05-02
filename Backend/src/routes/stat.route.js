// Importing required dependencies and functions
import { Router } from "express"; 
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"; 
import { getStats } from "../controller/stat.controller.js"; 

const router = Router();

// Route to get statistics, protected by authentication and requiring admin role
router.get("/", protectRoute, requireAdmin, getStats);

// Exporting the router for use in other parts of the application
export default router;
