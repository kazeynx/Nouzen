const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const { token } = require('./config/config.json');
const mongoose = require('./database/connect');
const loadHandlers = require('./handlers/loader/handlerloader');
const interactionCreateHandler = require('./events/client/interactioncreate'); 
const Stats = require('./database/models/stats'); 
const mentionBotHandler = require('./events/client/mentionBot');
const statusBot = require('./events/client/botStatus');
const onlineMessage = require('./events/client/onlineMsg');

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
    try {
        await interactionCreateHandler.execute(client, interaction);
    } catch (error) {
        console.error('Error handling interaction:', error);
    }
});

client.on('messageCreate', async (message) => {
    mentionBotHandler(client, message);
    totalMessages++; 
    try {
        await Stats.findOneAndUpdate({}, { totalMessages }, { upsert: true }); 
    } catch (error) {
        console.error('Error updating totalMessages in database:', error);
    }
});

client.login(token);
module.exports = client;
