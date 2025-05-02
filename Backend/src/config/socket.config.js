import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

// Function to initialize and configure Socket.IO with a given HTTP server
export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  // In-memory maps to track user socket connections and their activities
  const userSockets = new Map(); // Maps userId -> socketId
  const userActivities = new Map(); // Maps userId -> activity string

  // Event listener for new socket connections
  io.on("connection", (socket) => {
    // Handle user connection
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      // Notify all clients that a new user has connected
      io.emit("user_connected", userId);

      // Send current list of online users to the newly connected client
      socket.emit("users_online", Array.from(userSockets.keys()));

      // Broadcast all users' activities
      io.emit("activities", Array.from(userActivities.entries()));
    });

    // Handle real-time activity updates
    socket.on("update_activity", ({ userId, activity }) => {
      console.log("activity updated", userId, activity);
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    // Handle sending messages between users
    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        // Save message to the database
        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        // If receiver is online, emit the message to them
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        // Acknowledge to sender that message was sent
        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Message error:", error);
        socket.emit("message_error", error.message);
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      let disconnectedUserId;

      // Find and remove the disconnected user from the maps
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }

      // Notify others that this user has disconnected
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
