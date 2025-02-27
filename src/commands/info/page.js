const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const pagination = require('../../interactions/pagination')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('page')
    .setDescription('[pages]'),
  async execute(interaction) {
    
    const embeds = [];
    for (var i = 0; i < 4; i++) {
      embeds.push(new EmbedBuilder().setDescription(`page ${i + 1}`).setColor("Blurple"));
    }

    await pagination(interaction,embeds);
  }
};