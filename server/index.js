const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Connection = require('./db.js');
const Chat = require('./models/Chat.js');

const app = express();
app.use(express.json());

// Connect to MongoDB
Connection();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // or specify your frontend: "http://localhost:5173"
    methods: ["GET", "POST"]
  }
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("✅ Client connected");

  // Load existing messages on new connection
  const loadMessages = async () => {
    try {
      const messages = await Chat.find().sort({ timeStamp: 1 }).exec();
      socket.emit("chat", messages); // Send message history to connected client
    } catch (err) {
      console.error("❌ Error loading messages:", err);
    }
  };

  loadMessages();

  // Handle new incoming message
  socket.on("newMessage", async (msg) => {
    try {
      // Ensure timestamp exists
      if (!msg.timeStamp) {
        msg.timeStamp = new Date().toISOString();
      }

      // Save to DB
      const newMessage = new Chat(msg);
      await newMessage.save();

      // Emit to all connected clients
      io.emit("message", msg);
      console.log("📤 Message broadcasted:", msg);
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected");
  });
});

// Start server
server.listen(3002, () => {
  console.log("🚀 Server running on port 3002");
});
