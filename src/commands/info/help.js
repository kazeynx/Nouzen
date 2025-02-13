const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('commands help'),
  async execute(interaction) {
    await interaction.reply(`${interaction.user.username} : Where are the commands?  \nNouzen : <a:3683girlsleep:1333419908834398219> \n\nThat’s it for the short convo, thank you.`);
  }
};