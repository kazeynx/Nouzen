const { EmbedBuilder } = require('discord.js');
const Stats = require('../../database/models/stats'); 
const { discord, colorsHex, activity } = require('../../config/bot');
const colors = require('colors');
const packageJson = require('../../../package.json');
module.exports = async (client) => {
  let stats = await Stats.findOne();
  if (!stats) {
      stats = await Stats.create({ totalMessages: 0, totalCommandsUsed: 0 });
  }

  const startLogChannel = client.channels.cache.get(activity.onlineID);
  if (!startLogChannel) {
      console.error(`${colors.cyan(colors.bold(client.user.username))} | ${colors.red('Failed to find the specified channel.')}`);
      return;
  }
  const developer = await client.users.fetch(discord.developer);
  const startEmbed = new EmbedBuilder()
    .setTitle(`Yokso, watashi no Soul Society!`)
    .setColor(`${colorsHex.blue}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**
〔<a:announcement:1034742298149404672>〕${client.user.tag} Status!
〔<a:crown_uo:1034744865998778378>〕Developer : <@${developer.id}>
〔<a:DIAMOND:1034743982216990730>〕Bot Status : Online <a:onlinePing:1034699594036166656>
〔<a:Emoji_Snumpus:1034699499744018432>〕Start Date : <t:${Math.floor(Date.now() / 1000)}:f>
〔<a:campfire:1034699838547304540>〕Ping : ${client.ws.ping} ms
〔<a:slashcommands:1034743128915189770>〕Total Commands : ${client.commands.size} 
〔<a:computer:1034748631045111839>〕Total Servers : ${client.guilds.cache.size} 
〔<a:birthdaycake:1034742361227542579>〕Total Channels : ${client.channels.cache.size} 
〔<a:doll:1034750230278721577>〕Total Users : ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} 
〔<a:5565cloud:1333420883984908329>〕Total Messages : ${stats.totalMessages}
〔<a:planet:1333319647826546688>〕Total Commands Used : ${stats.totalCommandsUsed}
〔<a:94857gg:1333425680603418708>〕largest Server : ${client.guilds.cache.reduce((max, guild) => guild.memberCount > max.memberCount ? guild : max, { memberCount: 0 }).name} (${client.guilds.cache.reduce((max, guild) => guild.memberCount > max.memberCount ? guild : max, { memberCount: 0 }).memberCount} members)
〔<a:Boost:1034700239254339604>〕Bot Version : ${packageJson.version}
〔<a:Discord:1034700333886214265>〕Discord.js Version : ${packageJson.dependencies['discord.js'].replace('^', '')}
〔<a:node:1325102796827263087>〕Node.js Version : ${process.version}**`)
    .setImage(`${discord.botBanner}`)
    .setTimestamp()
    .setFooter({ text: `${discord.footer}` });
    try {
      await startLogChannel.send({ embeds: [startEmbed] });
    } catch (error) {
      console.error(
        `${colors.cyan(colors.bold(client.user.username))} | ${colors.red('Failed to send startLog embed:')}`,
        colors.red(error)
      );
      const errorLogChannel = client.channels.cache.get(activity.errorID);
      if (!errorLogChannel) {
        console.error(
          `${colors.cyan(colors.bold(client.user.username))} | ${colors.red('Failed to find the error log channel.')}`
        );
        return;
      }
  
      const startErrorEmbed = new EmbedBuilder()
        .setTitle('〔<a:attention:1034700131393609818>〕Error Occurred!')
        .setColor(colorsHex.red)
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`An error occurred while sending the startLog embed:\n\`\`\`${error.message}\`\`\``)
        .setImage(discord.errorBanner)
        .setTimestamp()
        .setFooter({ text: discord.footer });
      try {
        await errorLogChannel.send({ embeds: [startErrorEmbed] });
      } catch (innerError) {
        console.error(
          `${colors.cyan(colors.bold(client.user.username))} | ${colors.red('Failed to send the error embed:')}`,
          colors.red(innerError)
        );
      }
    }
};