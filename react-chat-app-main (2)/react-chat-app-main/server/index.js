console.log("✅ index.js has started");

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const Chat = require('./models/Chat');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// HTTP + Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Socket events
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);

  Chat.find().sort({ timeStamp: 1 }).then(messages => {
    socket.emit('chat', messages);
  });

  socket.on('newMessage', async (msg) => {
    const newMsg = new Chat(msg);
    await newMsg.save();
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
});

// Start server
server.listen(3002, () => {
  console.log('🚀 Server running at http://localhost:3002');
});
