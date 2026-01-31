const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  message: String,
  timeStamp: String
});

module.exports = mongoose.model('Chat', chatSchema);
