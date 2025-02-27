const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { discord, colorsHex } = require(`../../config/bot`);
const packageJson = require('../../../package.json');
const Stats = require('../../database/models/stats'); 

module.exports = async (client, message) => {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({ totalMessages: 0, totalCommandsUsed: 0 });
    }
    if (message.mentions.has(client.user) && !message.mentions.everyone && message.mentions.roles.size === 0) {
        message.react(`<a:loading:1333394652451045456>`);
        const uptimeTimestamp = Math.floor(Date.now() / 1000 - client.uptime / 1000);
        const mentionEmbed = new EmbedBuilder()
          .setColor(colorsHex.blue)
          .setDescription(`
    ### **✮*•̩̩͙✧•̩̩͙*˚✧*˚〔<a:54139umbrella:1333424364510773319>｜INFORMATION｜<a:54139umbrella:1333424364510773319>〕˚*✧˚*•̩̩͙✧•̩̩͙*˚✮**
    <a:1968myaowlcatpeek:1333419214505250827>**[Nouzen](<https://discord.com/users/1231245685467119796>)** is an existence that helps you make your server more automatic by simplifying tasks, managing roles, moderating chats, and providing seamless integration of powerful features <a:10107melodysmart:1333422941848862740>. With **[Nouzen](<https://discord.com/users/1231245685467119796>)**, you can create a highly efficient and engaging environment for your community, ensuring that everything runs smoothly while you focus on building connections and growing your server <a:gura:1333393351730528287>. 
            
    <a:1639spoopypepe:1333419051569119363>_You thought you were in control? Let me correct that misconception <a:2560luffy12:1333419451902853181>. Every move you make, every command you type, every second you spend here—it’s all part of my design I’ve already set in motion.._ <a:4310peepomindblown:1333420310183280671>
    
    ### **✮*•̩̩͙✧•̩̩͙*˚✧*˚〔<a:5565cloud:1333420883984908329>｜DEVELOPERS｜<a:5565cloud:1333420883984908329>〕˚*✧˚*•̩̩͙✧•̩̩͙*˚✮**
    
    <a:52563totoropeeking:1333424335544647710> Hey there! I’m **[Kazeynx](<https://discord.com/users/1138837639382966384>)**, the mind behind **[Nouzen](<https://discord.com/users/1231245685467119796>)** <a:2356luffy24:1333419403538202656>. Every line of code was built with dedication to help you master your server effortlessly <a:3683girlsleep:1333419908834398219>. Got ideas or noticed something off? Share them with me <a:39554katherinespinunreliable:1333423934049226803>. Together, we’ll push **[Nouzen](<https://discord.com/users/1231245685467119796>)** to new heights—because perfection is always within reach <a:8276pepecaught:1333422120637562942>.
    
    ### **✮*•̩̩͙✧•̩̩͙*˚✧*˚〔<a:17033vaporeon:1333423139232677888>｜FEATURE LIST｜<a:17033vaporeon:1333423139232677888>〕˚*✧˚*•̩̩͙✧•̩̩͙*˚✮**
**\`\`\`╦═══════════════════════════════════════════╦
    〔👑〕Administration  〔💵〕Economy          
    〔⚙️〕Customizable    〔🎮〕Games            
    〔✨〕Moderation      〔🧰〕Utility           
    〔💻〕Automation      〔🎉〕Fun              
    〔📖〕Information     〔🔊〕Music            
    〔🌸〕Anime           〔🧸〕And More                 
╩═══════════════════════════════════════════╩\`\`\`**
### **✮*•̩̩͙✧•̩̩͙*˚✧*˚〔<a:65023lightning:1333424783752302715>｜BOT STATISTICS｜<a:65023lightning:1333424783752302715>〕˚*✧˚*•̩̩͙✧•̩̩͙*˚✮**
    **〔<a:DIAMOND:1034743982216990730>〕**Bot Status : **Online <a:uptime:1333386432018124850>**
    **〔<a:setting:1324015494768103556>〕**Bot Version : **v${packageJson.version}**
    **〔<a:99609calendar:1333425836853952622>〕**Bot Uptime : **<t:${uptimeTimestamp}:R>**
    **〔<a:campfire:1034699838547304540>〕**Bot Ping : **${client.ws.ping} ms**
    **〔<a:52563totoropeeking:1333424335544647710>〕**Total Users : **${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} **
    **〔<a:computer:1034748631045111839>〕**Total Servers : **${client.guilds.cache.size} **
    **〔<a:55376thering:1333424401273716839>〕**Total Channels : **${client.channels.cache.size} **
    **〔<a:5565cloud:1333420883984908329>〕**Total Messages : **${stats.totalMessages}**
    **〔<a:slashcommands:1034743128915189770>〕**Total Commands : **${client.commands.size} **
    **〔<a:planet:1333319647826546688>〕**Total Commands Used : **${stats.totalCommandsUsed}**
    **〔<a:94857gg:1333425680603418708>〕**largest Server : **${client.guilds.cache.reduce((max, guild) => guild.memberCount > max.memberCount ? guild : max, { memberCount: 0 }).name} (${client.guilds.cache.reduce((max, guild) => guild.memberCount > max.memberCount ? guild : max, { memberCount: 0 }).memberCount} members)**
    
    ### **✮*•̩̩͙✧•̩̩͙*˚✧*˚〔<a:65268sleeplunarcow:1333424804576890981>｜GET READY NOW｜<a:65268sleeplunarcow:1333424804576890981>〕˚*✧˚*•̩̩͙✧•̩̩͙*˚✮**
    <a:59754gojocatvibe:1333424555124985947> Ready to unlock **[Nouzen’s](<https://discord.com/users/1231245685467119796>)** magic? Type **</help:1337792324176056432>** and discover all the commands, or click the **\`selection panel\`** bellow and feel the power at your fingertips <a:9114skillissuepeepo:1333422371562061898>. The possibilities are limitless—let's elevate your server to new heights, effortlessly <a:4969myaowlcatnod:1333420589091651624>.
    `)
          .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1336790298520715314/lv_0_20250206030032.gif?ex=67ac56bb&is=67ab053b&hm=83b34092d541f867e91c55921c50e0882cb693d0be6812d83bc9769f12c1dc85&`)
          .setTimestamp()
          .setFooter({ text: discord.footer });
    
        const row1 = new ActionRowBuilder()
          .addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('mentionInteraction')
              .setPlaceholder('Choose Your Path')
              .addOptions([
                {
                  label: 'Commands',
                  description: 'Discover all the Commands you need to make your server thrive.',
                  emoji: '<a:65023lightning:1333424783752302715>',
                  value: 'commands',
                },
                {
                  label: 'Essential Links',
                  description: 'Quick access to important resources and essentials.',
                  emoji: '<a:65268sleeplunarcow:1333424804576890981>',
                  value: 'links',
                },
                {
                  label: 'Donations',
                  description: 'Help us grow and improve with your support.',
                  emoji: '<a:84765birthdaygift:1333425451342762045>',
                  value: 'donations',
                },
                {
                  label: 'Updates & News',
                  description: 'Stay informed about the latest features and improvements.',
                  emoji: '<a:59754gojocatvibe:1333424555124985947>',
                  value: 'updates_news',
                },
                {
                  label: 'Premium Features',
                  description: 'Upgrade your experience with exclusive features.',
                  emoji: '<a:68842universebox:1333424907169697832>',
                  value: 'premium_features',
                },
                {
                  label: 'FAQ',
                  description: 'Get answers to common questions with ease.',
                  emoji: '<a:8171lobo:1333422073921671269>',
                  value: 'faq',
                },
                {
                  label: 'Tutorials',
                  description: 'Step-by-step guides to help you get started.',
                  emoji: '<a:32241hotairballoon:1333423668478607400>',
                  value: 'tutorials',
                },
                {
                  label: 'Bot Feedback',
                  description: 'Share your thoughts to help us improve.',
                  emoji: '<a:27134heartletter:1333423366475878431>',
                  value: 'bot_feedback',
                },
                {
                  label: 'Report',
                  description: 'Report issues so we can keep things running smoothly.',
                  emoji: '<a:29950amongusinspace:1333423450467074068>',
                  value: 'report',
                },
                {
                  label: 'Suggestion',
                  description: 'Have an idea? Let us know and make a difference.',
                  emoji: '<a:29821lightbulb:1333423432918110318>',
                  value: 'suggestion',
                },
              ])
          );
        await message.channel.send({ embeds: [mentionEmbed], components: [row1] });
        await message.reactions.removeAll()
        .catch(error => console.error('Failed to clear reactions: ', error));
      }
};