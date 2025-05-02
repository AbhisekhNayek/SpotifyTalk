import { User } from "../models/user.model.js";

// Controller to handle user authentication callback
export const authCallback = async (req, res, next) => {
	try {
		// Extract user data from the request body
		const { id, firstName, lastName, imageUrl } = req.body;

		// Check if the user already exists in the database based on Clerk ID
		const user = await User.findOne({ clerkId: id });

		if (!user) {
			// If user does not exist, create a new user in the database
			await User.create({
				clerkId: id, 
				fullName: `${firstName || ""} ${lastName || ""}`.trim(), 
				imageUrl, 
			});
		}

		// Respond with a success message after checking or creating the user
		res.status(200).json({ success: true });
	} catch (error) {
		// Log error and pass it to the next middleware for handling
		console.log("Error in auth callback", error);
		next(error);
	}
};
