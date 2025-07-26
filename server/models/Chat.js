const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  username: String,
  message: String,
  avatar: String,
  timeStamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', ChatSchema);
