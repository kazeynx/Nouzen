const colors = require("colors");
const mongoose = require('mongoose');
const { mongoUri } = require('../config/config.json');
const { discord } = require('../config/bot.js')
module.exports = async (client) => {
  try {
    const developer = await client.users.fetch(discord.developer);
    await mongoose.connect(mongoUri);
    console.log(`${colors.cyan(colors.bold(client.user.username))} | Successfully connected to MongoDB`);
    console.log(`${colors.cyan(colors.bold(client.user.username))} | Hi ${developer.username}! I'm online!`);
  } catch (error) {
    console.error(`${colors.cyan(colors.bold(client.user.username))} | Failed to connect to MongoDB\n`, error);
  }
};
