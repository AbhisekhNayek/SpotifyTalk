import { clerkClient } from "@clerk/express";

// Middleware to protect routes by ensuring the user is logged in
export const protectRoute = async (req, res, next) => {
	// Check if userId exists in the request's authentication data
	// If not, the user is unauthorized
	if (!req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	// Proceed to the next middleware or route handler
	next();
};



// Middleware to ensure the user is an admin based on their email
export const requireAdmin = async (req, res, next) => {
	try {
		// Fetch the current user's details from Clerk using their userId
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		
		// Check if the current user's email matches the predefined admin email
		const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

		// If not an admin, return a forbidden status
		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}

		// Proceed to the next middleware or route handler if user is an admin
		next();
	} catch (error) {
		// Pass any errors to the next error handler
		next(error);
	}
};
