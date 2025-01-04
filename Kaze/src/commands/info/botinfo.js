const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');
const fs = require('fs');
const moment = require('moment');
require('moment-duration-format');
const packageJson = require('../../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Displays detailed information about the bot'),
    async execute(interaction) {
        const client = interaction.client;

        // Bot Stats
        const totalCommands = client.commands.size; // Dynamic command count
        const totalGuilds = client.guilds.cache.size;
        const totalChannels = client.channels.cache.size;
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

        // WebSocket & Shard Info
        const ping = client.ws.ping;
        const shards = client.options.shards ? client.options.shards.length : 1;

        // Bot Process Info
        const uptime = moment
            .duration(client.uptime)
            .format('D [days], H [hours], m [minutes], s [seconds]');
        const processUptime = moment
            .duration(process.uptime(), 'seconds')
            .format('D [days], H [hours], m [minutes], s [seconds]');
        const memoryUsage = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`;

        // System Info
        const platform = os.platform(); // e.g., linux, win32
        const arch = os.arch(); // e.g., x64
        const cpu = os.cpus()[0].model;
        const cores = os.cpus().length;
        const systemUptime = moment
            .duration(os.uptime(), 'seconds')
            .format('D [days], H [hours], m [minutes], s [seconds]');

        // Project Info
        const files = fs.readdirSync('./').length;
        const botVersion = packageJson.version;
        const nodeVersion = process.version;
        const discordJsVersion = packageJson.dependencies['discord.js'].replace('^', '');

        // Embed for bot info
        const embed = new EmbedBuilder()
            .setColor('#0099FF')
            .setTitle('🤖 Advanced Bot Information')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`Here is all the detailed information about **${client.user.username}**!`)
            .addFields(
                // Bot Stats
                { name: '🛠 Developer', value: 'Kazeynx', inline: true },
                { name: '📜 Bot Version', value: botVersion, inline: true },
                { name: '📦 Discord.js Version', value: discordJsVersion, inline: true },
                { name: '📂 Total Commands', value: `${totalCommands}`, inline: true },
                { name: '🌐 Servers', value: `${totalGuilds}`, inline: true },
                { name: '📨 Channels', value: `${totalChannels}`, inline: true },
                { name: '👥 Users', value: `${totalUsers}`, inline: true },

                // Performance & Uptime
                { name: '⏳ Bot Uptime', value: uptime, inline: true },
                { name: '🖥 System Uptime', value: systemUptime, inline: true },
                { name: '📶 WebSocket Latency', value: `${ping} ms`, inline: true },

                // System Info
                { name: '🖥 Platform', value: platform, inline: true },
                { name: '⚙️ Architecture', value: arch, inline: true },
                { name: '💾 Memory Usage', value: memoryUsage, inline: true },
                { name: '⚡ CPU', value: `${cpu} (${cores} cores)`, inline: false },

                // Process Info
                { name: '🔧 Node.js Version', value: nodeVersion, inline: true },
                { name: '🌀 Shards', value: `${shards}`, inline: true },
                { name: '🗂 Files in Project', value: `${files}`, inline: true },

                // Extra Info
                { name: '📆 Process Uptime', value: processUptime, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `${client.user.username} | Created by Kazeynx` });

        await interaction.reply({ embeds: [embed] });
    },
};
