const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences, 
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.GuildExpressions,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildScheduledEvents,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.AutoModerationConfiguration,
      GatewayIntentBits.AutoModerationExecution,
  ],
  partials: [ Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember, Partials.ThreadMember,]
});
const { token } = require('./config/config.json');
const mongoose = require('./database/connect');
const loadHandlers = require('./handlers/loader/handlerloader');
const interactionCreateHandler = require('./events/client/interactioncreate'); 
const Stats = require('./database/models/stats'); 
const mentionBotHandler = require('./events/client/mentionBot');
const statusBot = require('./events/client/botStatus');
const onlineMessage = require('./events/client/onlineMsg');
const mentionInterac = require('./interactions/client/mention/mentionInteraction');
//const donateInterac = require ('./interactions/client/mention/donateInteraction')
let totalMessages = 0;
let totalCommandsUsed = 0;
client.commands = new Collection();

loadHandlers(client);

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
if (interaction.isButton()) {
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