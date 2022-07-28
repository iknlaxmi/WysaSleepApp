const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  duration: {
    type: Number,
  },
  bedTime: {
    type: Number,
  },
});

module.exports = mongoose.model('Sleep', sleepSchema);
