const { Client, GatewayIntentBits, Collection, EmbedBuilder, WebhookClient } = require('discord.js');
const { token, prefix } = require('./config/config.json');
const mongoose = require('./database/connect');
const loadHandlers = require('./handlers/handlerloader');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { discord, colorsHex } = require(`./config/bot.js`);
const { startLog, startError } = require('./config/webhook.json');
const packageJson = require('../package.json');
const colors = require("colors");
client.commands = new Collection();

loadHandlers(client);

client.once('ready', async () => {
  mongoose(client);
  // send startLog webhook
  if (startLog) {
    const developer = await client.users.fetch(discord.developer);
    const startWebhook = new EmbedBuilder()
      .setTitle(`Yokso, watashi no Soul Society!`)
      .setColor(`${colorsHex.blue}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`**
〔<a:announcement:1034742298149404672>〕${client.user.tag} Status!
〔<a:crown_uo:1034744865998778378>〕Developer : <@${developer.id}>
〔<a:DIAMOND:1034743982216990730>〕Bot Status : Online <a:onlinePing:1034699594036166656>
〔<a:Emoji_Snumpus:1034699499744018432>〕Start Date : ${`<t:${Math.floor(new Date().getTime() / 1000)}:R>`}
〔<a:campfire:1034699838547304540>〕Ping : ${client.ws.ping} ms
〔<a:slashcommands:1034743128915189770>〕Total Commands : ${client.commands.size} 
〔<a:computer:1034748631045111839>〕Total Servers : ${client.guilds.cache.size} 
〔<a:birthdaycake:1034742361227542579>〕Total Channels : ${client.channels.cache.size} 
〔<a:doll:1034750230278721577>〕Total Users : ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} 
〔<a:Boost:1034700239254339604>〕Bot Version : ${packageJson.version}
〔<a:Discord:1034700333886214265>〕Discord.js Version : ${packageJson.dependencies['discord.js'].replace('^', '')}
〔<a:node:1325102796827263087>〕Node.js Version : ${process.version}**`)
      .setImage(`${discord.botBanner}`)
      .setTimestamp()
      .setFooter({ text: `${discord.footer}` });
    try {
      await new WebhookClient({ url: startLog }).send({ embeds: [startWebhook] });
    } catch (error) {
      console.error(`${colors.cyan(colors.bold(client.user.username))} | ${colors.red(colors.bold(`Failed to send startLog embed :\n`))}`, colors.red(colors.bold(error)));
      const startErrorEmbed = new EmbedBuilder()
        .setTitle('〔<a:attention:1034700131393609818>〕Error Occurred!')
        .setColor(`${colorsHex.red}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`An error occurred while sending the startLog webhook :\n\`\`\`${error.message}\`\`\``)
        .setImage(`${discord.errorBanner}`)
        .setTimestamp()
        .setFooter({ text: `${discord.footer}` });
      try {
        await new WebhookClient({ url: startError }).send({ embeds: [startErrorEmbed] });
      } catch (innerError) {
        console.error(`${colors.cyan(colors.bold(client.user.username))} | ${colors.red(colors.bold(`Failed to send the error startLog embed :\n`))}`, colors.red(colors.bold(innerError)));
      }
    }
  }
});
  
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
    console.log(
      `${colors.cyan(colors.bold(client.user.username))} | Command Executed: ${interaction.commandName}`
    );
    
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
  }
});

client.on('messageCreate', async (message) => {
  if (message.mentions.has(client.user)) {
    const time = `<t:${Math.floor(new Date().getTime() / 1000)}:R>`
    const developer =await client.users.fetch(discord.developer);
    const mentionEmbed = new EmbedBuilder()
	.setColor(colorsHex.black)
	.setTitle(`${client.user.tag} Profile`)
	.setURL('https://kazeynx.com')
	.setDescription(`**
    〔<a:announcement:1324031496490713128>〕Yokoso, watashi no Soul Society!
    〔<a:crown_uo:1034744865998778378>〕Developed By : ${developer.username}
    〔<a:DIAMOND:1034743982216990730>〕Using Slash Commands
    〔<a:Discord:1034700333886214265>〕[Discord Bot Invite Link](https://discord.gg/79zBcrXbTP)
    〔<a:slashcommands:1034743128915189770>〕[Discord Support Server](https://Kazeynx.com)**`)
	.setThumbnail(`${client.user.displayAvatarURL()}`)
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
  .setImage(`https://cdn.discordapp.com/attachments/1322940109036851282/1322941409711620136/standard_5.gif?ex=6779f4f3&is=6778a373&hm=b6eca227d16cf1fbe8de63f0088529d5c16aa0c5fd723254a4ce56492126fde1&`)
	.setTimestamp()
	.setFooter({ text: discord.footer});
    await message.reply({ embeds: [mentionEmbed] });
    await message.react(`<a:developer:1325048087403827271>`);
  }

  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing that command!');
  }
});

client.login(token);
module.exports = client;