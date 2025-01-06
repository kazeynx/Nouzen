const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('information here maderpaker'),
  async execute(interaction) {
    await interaction.reply(`hello my name is Nouzen`);
  }
};
