const { readdirSync } = require('fs');
const path = require('path');
const colors = require("colors");
const { SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { clientId, guildId } = require('../config/config.json');

module.exports = (client) => {
  const commandFolders = readdirSync(path.join(__dirname, '../commands'));

  const commands = [];

  for (const folder of commandFolders) {
    const commandFiles = readdirSync(path.join(__dirname, `../commands/${folder}`)).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      const commandName = command.data?.name || command.name;
      client.commands.set(commandName, command);
      commands.push(command.data.toJSON());
    }
  }

  client.once('ready', async () => {

    const rest = new REST({ version: '10' }).setToken(client.token);

  (async () => {
      try {
        await rest.put(
          Routes.applicationCommands(clientId),
          { body: commands }
        );        
        console.log(`${colors.cyan(colors.bold(client.user.username))} | Started refreshing application (/) commands.`);
        console.log(`${colors.cyan(colors.bold(client.user.username))} | Successfully reloaded application (/) commands.`);
      } catch (error) {
        console.error('Error reloading commands:', error);
      }
    })();
  });
};
