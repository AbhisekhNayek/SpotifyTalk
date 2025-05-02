// Importing required dependencies and functions
import { Router } from "express"; 
import { authCallback } from "../controller/auth.controller.js"; 

const router = Router();

// Route to handle authentication callback
router.post("/callback", authCallback);

// Exporting the router for use in other parts of the application
export default router;
