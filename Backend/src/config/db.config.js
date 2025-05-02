import mongoose from "mongoose";

// Function to establish a connection to MongoDB
export const connectDB = async () => {
	try {
		// Check if MongoDB URI is provided in environment variables
		if (!process.env.MONGODB_URI) {
			console.error("MONGODB_URI is not defined in environment variables");
			process.exit(1); 
		}

		// Attempt to connect to MongoDB with recommended options
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Log success message with connected host
		console.log(`Connected to MongoDB: ${conn.connection.host}`);
	} catch (error) {
		// Log and handle any connection errors
		console.error("Failed to connect to MongoDB:", error);
		process.exit(1); 
	}
};
