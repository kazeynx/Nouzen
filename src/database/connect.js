const colors = require("colors");
const mongoose = require('mongoose');
const { mongoUri } = require('../config/config.json');
const { discord } = require('../config/bot.js')
module.exports = async (client) => {
  try {
    const now = new Date();
    const dateTime = 
                 `${now.getHours().toString().padStart(2, '0')}:` +
                 `${now.getMinutes().toString().padStart(2, '0')}:` +
                 `${now.getSeconds().toString().padStart(2, '0')} ` +
                 `${(now.getMonth() + 1).toString().padStart(2, '0')}/` +
                 `${now.getDate().toString().padStart(2, '0')}/` +
                 `${now.getFullYear()}`;

    const developer = await client.users.fetch(discord.developer);
    await mongoose.connect(mongoUri);
    const centerText = (text) => {
           const terminalWidth = process.stdout.columns;
           const textLength = text.replace(/\x1B\[\d+m/g, "").length;
           const padding = Math.max((terminalWidth - textLength) / 2, 0);
           return " ".repeat(Math.floor(padding)) + text;};
           const kazeynx =`${colors.cyan(colors.bold(`|`))} ${colors.white(colors.bold(`Successfully connected to MongoDB `))}${colors.cyan(colors.bold(`|`))}
${colors.cyan(colors.bold(`|`))} ${colors.white(colors.bold(`Hi ${developer.username} I'm online! `))}${colors.cyan(colors.bold(`|`))}
${colors.cyan(colors.bold(`|`))} ${colors.white(colors.bold(`${dateTime} `))}${colors.cyan(colors.bold(`|`))}

`;
           const kazeynxTerm = kazeynx
                  .split("\n")
                  .map((line) => centerText(line))
                  .join("\n");
           console.log(kazeynxTerm);
    //console.log(`${colors.cyan(colors.bold(client.user.username))} | Successfully connected to MongoDB`);
    //console.log(`${colors.cyan(colors.bold(client.user.username))} | Hi ${developer.username}! I'm online!`);
  } catch (error) {
    console.error(`${colors.cyan(colors.bold(client.user.username))} | Failed to connect to MongoDB\n`, error);
  }
};
