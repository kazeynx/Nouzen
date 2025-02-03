const mongoose = require('mongoose');  // Ensure mongoose is imported

const statsSchema = new mongoose.Schema({
  totalMessages: {
    type: Number,
    default: 0
  },
  totalCommandsUsed: {
    type: Number,
    default: 0
  }
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;