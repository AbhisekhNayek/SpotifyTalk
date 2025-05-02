// Importing required dependencies
import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import { createServer } from "http";
import cron from "node-cron";

// Importing custom libraries and routes
import { initializeSocket } from "./config/socket.config.js";
import { connectDB } from "./config/db.config.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

dotenv.config(); 

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer); 

// CORS configuration to allow requests from specific origin
app.use(
	cors({
	  origin: process.env.CORS_ORIGIN,
	  credentials: true,
	})
  );

// Middleware setup
app.use(express.json()); 
app.use(clerkMiddleware()); 
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, 
		},
	})
);

// Cron job to clean up temporary files every hour
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {}); 
			}
		});
	}
});

// Route setup
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../Frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../Frontend", "dist", "index.html"));
	});
}

// Error handler for unhandled errors
app.use((err, req, res, next) => {
	res.status(500).json({ message: "Internal server error" });
});

// Starting the server and connecting to the database
httpServer.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
	connectDB(); 
});
