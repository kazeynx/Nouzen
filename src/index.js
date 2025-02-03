const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { token } = require('./config/config.json');
const mongoose = require('./database/connect');
const loadHandlers = require('./handlers/loader/handlerloader');
const interactionCreateHandler = require('./events/client/interactioncreate'); 
const Stats = require('./database/models/stats'); 
const mentionBotHandler = require('./events/client/mentionBot');
const statusBot = require('./events/client/botStatus');
const onlineMessage = require('./events/client/onlineMsg');
const mentionInterac = require('./interactions/mentionInteraction');
let totalMessages = 0;
let totalCommandsUsed = 0;
client.commands = new Collection();

loadHandlers(client);

global.formatUptime = function (ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return [
    days > 0 ? `${days}d` : null,
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    `${seconds}s`
  ]
    .filter(Boolean)
    .join(' ');
};

client.once('ready', async () => {
  mongoose(client);
  statusBot(client);
  onlineMessage(client);
  try {
    const stats = await Stats.findOne();
    if (stats) {
      totalMessages = stats.totalMessages;
      totalCommandsUsed = stats.totalCommandsUsed;
    } else {
      await Stats.create({ totalMessages: 0, totalCommandsUsed: 0 });
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    totalCommandsUsed++; 
    try {
      await Stats.findOneAndUpdate({}, { totalCommandsUsed }, { upsert: true });
    } catch (error) {
      console.error('Error updating totalCommandsUsed in database:', error);
    }
  }
  if (interaction.isStringSelectMenu()) {
    mentionInterac(client, interaction); 
}
if (interaction.isModalSubmit()) {
  mentionInterac(client, interaction);
}
  interactionCreateHandler.execute(client, interaction); 
});

client.on('messageCreate', async (message) => {
  mentionBotHandler(client, message);
  let stats;
  try {
    stats = await Stats.findOne();
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
  totalMessages++; 
  try {
    await Stats.findOneAndUpdate({}, { totalMessages }, { upsert: true }); 
  } catch (error) {
    console.error('Error updating totalMessages in database:', error);
  }
});

client.login(token);
module.exports = client;