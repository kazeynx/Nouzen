const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('you will see the truth'),
  async execute(interaction) {
    await interaction.reply(`good boy `);
  }
};