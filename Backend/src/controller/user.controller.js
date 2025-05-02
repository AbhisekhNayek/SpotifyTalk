import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

// Controller to get all users except the current logged-in user
export const getAllUsers = async (req, res, next) => {
	try {
		// Get the current user's ID from the authentication middleware
		const currentUserId = req.auth.userId;

		// Find all users except the current user by filtering out their clerkId
		const users = await User.find({ clerkId: { $ne: currentUserId } });

		// Respond with the list of users
		res.status(200).json(users);
	} catch (error) {
		// Pass any errors to the error handling middleware
		next(error);
	}
};



// Controller to get all messages between two users
export const getMessages = async (req, res, next) => {
	try {
		// Get the current user's ID from the authentication middleware (req.auth.userId)
		const myId = req.auth.userId;

		// Extract the target userId from the request parameters
		const { userId } = req.params;

		// Query the messages collection to find all messages between the two users
		const messages = await Message.find({
			$or: [
				// Messages where the current user is the receiver or sender
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		// Respond with the messages between the two users
		res.status(200).json(messages);
	} catch (error) {
		// Pass any errors to the error handling middleware
		next(error);
	}
};
