const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('test'),
    permissions: ['ManageMessages'], // Example permission
    cooldown: 5,
  async execute(interaction) {
    await interaction.reply('testomg mw!');
  }
};
