// Importing required dependencies and functions
import { Router } from "express"; 
import { protectRoute } from "../middleware/auth.middleware.js"; 
import { getAllUsers, getMessages } from "../controller/user.controller.js";

// Creating a new Router instance
const router = Router();

// Route to get all users, protected by authentication middleware
router.get("/", protectRoute, getAllUsers);

// Route to get messages for a specific user, protected by authentication middleware
router.get("/messages/:userId", protectRoute, getMessages);

// Exporting the router so it can be used in other parts of the application
export default router;
