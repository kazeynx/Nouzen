const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType  } = require('discord.js');
const { discord, colorsHex, activity } = require('../../../config/bot');
const { guildId, githubUsername, githubAuth } = require('../../../config/config.json');
const { getMentionEmbed, getMentionComponents } = require('../../../events/client/mentionBot');
const Stats = require('../../../database/models/stats');
const Feedback = require('../../../database/models/feedback');
const pagination = require('../../pagination');
const updates = require('../../../config/updates');
const packageJson = require('../../../../package.json');

module.exports = async (client, interaction) => {
    const stats = await Stats.findOne();
    if (!stats) {
        stats = await Stats.create({ totalMessages: 0, totalCommandsUsed: 0 });
    }
    const guild = interaction.client.guilds.cache.get(guildId);
    if (!guild) return interaction.reply({ content: 'Guild not found!', ephemeral: true });
    const uptimeTimestamp = Math.floor(Date.now() / 1000 - client.uptime / 1000);
    const LinksText = (`
### ˚✧༺〔<a:65268sleeplunarcow:1333424804576890981>｜MAIN LINKS｜<a:65268sleeplunarcow:1333424804576890981>〕༻✧˚\nYour all-in-one access to **[Nouzen](<https://discord.com/users/1231245685467119796>)** <a:cattap:1333393401017794560>. Summon the bot, join the support server, explore the documentation, or connect with the project across multiple platforms <a:gensin:1333393320403271721>. Whether you’re here to integrate, learn, or stay updated—everything you need is just one click away <a:1653filmezinho:1333419064403558512>.\n
**〔<a:60711imloved5:1333424575635132498>〕[Summon Nouzen](https://discord.com/users/1231245685467119796)**
**〔<a:discord:1324024721955885116>〕[Join Support Server](https://discord.gg/vAkuwxrHcm)**
**〔<a:54139umbrella:1333424364510773319>〕[Official Website](https://kazeynx.com)**
**〔<a:6112pepenoted:1333421268413710417>〕[Terms of Service (ToS)](https://discord.gg/vAkuwxrHcm)**
**〔<a:BlueBook:1339508240500916235>〕[Privacy Policy](https://discord.gg/vAkuwxrHcm)**
**〔<a:plus1:1322981868282581003>〕[Vote For Nouzen](https://top.gg/bot/1231245685467119796)**
**〔<:github:1339530439093915748>〕[Check Out My GitHub](https://github.com/kazeynx)**
**〔<a:tiktok:1339522023436849152>〕[Follow On Tiktok](https://www.tiktok.com/@kazeynx)**`)
    const LinksOption = [
        { label: 'About Nouzen', value: 'nouzen', description: `Total server: ${client.guilds.cache.size}｜Total user: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}｜Total commands: ${client.commands.size}`, emoji: '<a:60711imloved5:1333424575635132498>' },
        { label: 'Support Server', value: 'server', description: `Members: ${guild.memberCount}｜Online: ${guild.members.cache.filter(m => ['online', 'idle', 'dnd'].includes(m.presence?.status)).size}｜Boosts: ${guild.premiumSubscriptionCount || 0} (${guild.premiumTier ? `Level ${guild.premiumTier}` : "Level 0" }) `, emoji: '<a:discord:1324024721955885116>' },
        { label: 'Official Website', value: 'website', description: 'Total visits: 34.5K｜Unique users: 7.1K｜Active Users: 512', emoji: '<a:54139umbrella:1333424364510773319>' },
        { label: 'Terms of Service (ToS)', value: 'ToS', description: 'Last updated: 12 Mar 2025｜Changes: 4', emoji: '<a:6112pepenoted:1333421268413710417>' },
        { label: 'Privacy Policy', value: 'privacy', description: 'Last reviewed: 15 Feb 2025｜Compliance: 100%', emoji: '<a:BlueBook:1339508240500916235>' },
        { label: 'Vote For Nouzen', value: 'vote', description: 'Total Voter: 125｜Total votes: 2.3K｜Ranking: #7', emoji: '<a:plus1:1322981868282581003>' },
        { label: 'Check Out My GitHub', value: 'gitHub', description: 'Repos: 15｜Stars: 1.1K｜Forks: 284', emoji: '<:github:1339530439093915748>' },
        { label: 'Follow On Tiktok', value: 'tiktok', description: 'Followers: 23.8K｜Likes: 187.5K｜Total Views: 21M', emoji: '<a:tiktok:1339522023436849152>' },
    ];
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'mentionInteraction') {
            let embed = new EmbedBuilder()
                .setColor(colorsHex.blue)
                .setImage(discord.botBanner)
                .setFooter({ text: discord.footer })
                .setTimestamp();
            switch (interaction.values[0]) {
                case 'commands':
                    embed.setTitle('Commands')
                        .setDescription('test')
                        .addFields([{ name: 'lazy to do it bruh', value: 'yea whatever' }]);
                    break;
                case 'links': {
                    embed.setDescription(LinksText)
                        .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1339526241723748393/links.gif?ex=67af0a87&is=67adb907&hm=8a64a472e7afe5542fffae14e6e66f0965cae3d1dd7f1273a21d176c996de9ab&`)
                    const linkInformation = new StringSelectMenuBuilder()
                        .setCustomId('linkInformation')
                        .setPlaceholder('see more information')
                        .addOptions(LinksOption);
                    const homeButton = new ButtonBuilder()
                        .setCustomId('home')
                        .setLabel('Domain')
                        .setEmoji('<a:house:1354060003040034900>')
                        .setStyle(ButtonStyle.Secondary);
                    const actionRow = new ActionRowBuilder().addComponents(linkInformation);
                    const buttonRow = new ActionRowBuilder().addComponents(homeButton);
                    await interaction.update({
                        embeds: [embed],
                        components: [actionRow, buttonRow], 
                    });
                
                    return;
                }
                case 'donations': {
                    embed.setDescription(`
### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:84765birthdaygift:1333425451342762045>｜DONATIONS｜<a:84765birthdaygift:1333425451342762045>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
Alright <a:gojo:1340170971390279690>, let’s be real, **[Nouzen](<https://discord.com/users/1231245685467119796>)** isn’t just some bot. It’s a project built with care, designed to make automation smoother  <a:61703throwingmoney:1333424613455302710>, smarter, and actually useful <a:6157gawrgurapopcorn:1333895755194306801>. But good things don’t just happen on their own <a:58668pixelpikachu:1333424537609703447>. Keeping **[Nouzen](<https://discord.com/users/1231245685467119796>)** online, adding new features, and making sure everything runs flawlessly takes time, effort, and, yeah… money <a:HutaoMoneyy:1340206306417578075>.  
If you’ve ever used **[Nouzen](<https://discord.com/users/1231245685467119796>)** and thought, *"Damn, this bot is actually solid"* <a:3073gawrgurafingerguns:1333895541360169031> or if you just want to see it grow, this is your chance to be part of something bigger <a:41519headpat6:1333423950994215024>.  

### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:nerd_glasses:1340213623154282526>｜WHY DONATE｜<a:nerd_glasses:1340213623154282526>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
**〔<a:uptime:1333386432018124850>〕Keeps Nouzen Online**
Servers don’t run on dreams, and uptime isn’t free.  
**〔<a:59754gojocatvibe:1333424555124985947>〕Brings New Features to Life**
More updates, better automation, fewer bugs.  
**〔<a:gojo:1340170971390279690>〕Improves Performance**
Faster responses, better stability, smoother experience.  
**〔<a:dev:1324026614987624529>〕Supports the Dev**
Every bit of support helps free up time to make Nouzen even better. 

### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:money:1333386445142102038>｜DONATE NOW｜<a:money:1333386445142102038>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
Pick an option from the **\`selection panel\`** below <a:mlem:1340171022464319588> and choose how you want to support <a:3452gawrgurasinganimated:1333895660113629315> . Whether it’s a one-time donation, monthly backing, or another way to contribute, every bit helps keep Nouzen alive and evolving.`)
                        .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1339526241723748393/links.gif?ex=67af0a87&is=67adb907&hm=8a64a472e7afe5542fffae14e6e66f0965cae3d1dd7f1273a21d176c996de9ab&`)
                    const supportMenu = new StringSelectMenuBuilder()
                        .setCustomId('donationInteraction')
                        .setPlaceholder('Choose Your Options')
                        .addOptions([
                            { label: 'Nouzen’s Vanguard ', value: 'vanguard', description: 'A list of those who funded Nouzen’s future.', emoji: '<a:LightBlueFlower:1340171052961107978>' },
                            { label: 'Crypto', value: 'crypto', description: 'Donate using cryptocurrency', emoji: '<:Binance:1340300959233998909>' },
                            { label: 'Patreon', value: 'patreon', description: 'Donate using patreon', emoji: '<:patreoniconfilled256:1340303337748172861>'},
                            { label: 'PayPal', value: 'paypal', description: 'Donate using PayPal', emoji: '<:paypal:1340300959888310373>' },
                            { label: 'QRIS', value: 'qris', description: 'Donate using QRIS', emoji: '<:qris:1341319327864983552>' },
                            { label: 'Trakteer', value: 'trakteer', description: 'Donate using Trakteer', emoji: '<:trakteer:1342457798616940564>' },
                            { label: 'Ko-fi', value: 'kofi', description: 'Donate using Ko-fi', emoji: '<:Kofi_pixel:1340302960915386439>' },
                        ]);
                    const homeButton = new ButtonBuilder()
                        .setCustomId('home')
                        .setLabel('Domain')
                        .setEmoji('<a:house:1354060003040034900>')
                        .setStyle(ButtonStyle.Secondary);
                    const actionRow = new ActionRowBuilder().addComponents(supportMenu);
                    const buttonRow = new ActionRowBuilder().addComponents(homeButton);
                    await interaction.update({
                        embeds: [embed],
                        components: [actionRow, buttonRow], 
                    });
                
                    return;
                }
                case 'updates_news': {
                    if (updates.length === 0) 
                        return interaction.reply({ content: 'No updates available.', ephemeral: true });
                
                    const pages = updates.map(update => 
                        new EmbedBuilder()
                            .setDescription(`### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:59754gojocatvibe:1333424555124985947>｜UPDATES ${update.version}｜<a:59754gojocatvibe:1333424555124985947>〕˚✧˚•̩̩͙✧•̩̩͙˚✮\n\n\n**〔<a:announcement:1324031496490713128>〕${update.title}**\n${update.description}\n**〔<a:3511gawrgurashyanimated:1333895696486498416>〕Internal Notes** \n${update.notes}\n**〔<a:99609calendar:1333425836853952622>〕**${update.date}`)
                            .setImage(update.image || null)
                            .setColor(colorsHex.blue)
                            .setFooter({ text: discord.footer})
                            .setTimestamp()
                        );
                        
                        return pagination(interaction, pages, 30 * 1000);
                    }
                case 'premium_features':
                    embed.setTitle('Premium Features')
                        .setDescription('Premium Thing')
                        .addFields([{ name: 'p', value: 'p' }]);
                    break;
                case 'faq':
                    embed.setTitle('FAQ')
                        .setDescription('faq thing')
                        .addFields([{ name: 'f', value: 'f' }]);
                    break;
                case 'tutorials':
                    embed.setTitle('Tutorials')
                        .setDescription('Tutorial Things')
                        .addFields([{ name: 'tu', value: 'tu' }]);
                    break;
                case 'bot_feedback': {
                    const modal = new ModalBuilder()
                        .setCustomId('feedbackModal')
                        .setTitle('Submit Your Feedback');
                    const anonymousInput = new TextInputBuilder()
                        .setCustomId('anonymousInput')
                        .setLabel('Submit feedback anonymously? (Yes/No)')
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder('Yes or No')
                        .setRequired(false);
                    const feedbackInput = new TextInputBuilder()
                        .setCustomId('feedbackInput')
                        .setLabel('What’s your feedback?')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder('Type your feedback here...')
                        .setRequired(true);
                    const feedbackStar = new TextInputBuilder()
                        .setCustomId('feedbackStar')
                        .setLabel('Rate your feedback (1-5 stars)')
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder('Enter a number between 1 and 5')
                        .setRequired(true);
                    const actionRow1 = new ActionRowBuilder().addComponents(anonymousInput);
                    const actionRow2 = new ActionRowBuilder().addComponents(feedbackInput);
                    const actionRow3 = new ActionRowBuilder().addComponents(feedbackStar);
                    modal.addComponents(actionRow1, actionRow2, actionRow3);
                    await interaction.showModal(modal);
                    return;
                }
                case 'report':
                    embed.setTitle('Report')
                        .setDescription('Report Details')
                        .addFields([{ name: 'a', value: 'r' }]);
                    break;
                case 'suggestion':
                    embed.setTitle('Suggestions')
                        .setDescription('Suggestions Details')
                        .addFields([{ name: 't', value: 't' }]);
                    break;
                default:
                    embed.setColor(colorsHex.red)
                        .setTitle('Error')
                        .setDescription('Invalid selection, please try again.');
                    break;
            }

            await interaction.update({
                embeds: [embed],
            });
        } else if (interaction.customId === 'linkInformation') {
            let embed = new EmbedBuilder().setColor(colorsHex.blue).setFooter({ text: discord.footer }).setTimestamp();
            switch (interaction.values[0]) {
                case 'nouzen': {
                    embed.setDescription(`
### ˚✧༺〔<a:65023lightning:1333424783752302715>｜NOUZEN STATS｜<a:65023lightning:1333424783752302715>〕༻✧˚
**〔<a:DIAMOND:1034743982216990730>〕**Bot Status : **Online <a:uptime:1333386432018124850>**
**〔<a:setting:1324015494768103556>〕**Bot Version : **v${packageJson.version}**
**〔<a:Peepo_Rich:1340205904452255844>〕**Total Donate : **0$**
**〔<a:99609calendar:1333425836853952622>〕**Bot Uptime : **<t:${uptimeTimestamp}:R>**
**〔<a:campfire:1034699838547304540>〕**Bot Ping : **${client.ws.ping} ms**
**〔<a:52563totoropeeking:1333424335544647710>〕**Total Users : **${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} **
**〔<a:computer:1034748631045111839>〕**Total Servers : **${client.guilds.cache.size} **
**〔<a:55376thering:1333424401273716839>〕**Total Channels : **${client.channels.cache.size} **
**〔<a:LightBlueFlower:1340171052961107978>〕**Total Emojis : **${client.emojis.cache.size}**
**〔<a:5565cloud:1333420883984908329>〕**Total Messages : **${stats.totalMessages}**
**〔<a:slashcommands:1034743128915189770>〕**Total Commands : **${client.commands.size} **
**〔<a:planet:1333319647826546688>〕**Total Commands Used : **${stats.totalCommandsUsed}**
**〔<a:94857gg:1333425680603418708>〕**largest Server : **${client.guilds.cache.reduce((max, guild) => guild.memberCount > max.memberCount ? guild : max, { memberCount: 0 }).name}**
**〔<a:ClubPenguinMop:1340170986925981696>〕**CPU Usage : **${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%**
**〔<a:gojo:1340170971390279690>〕**Memory Usage : **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB**
**〔<a:94065pizzadrip:1333425657467895882>〕**Disk Usage : **${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB**`)
                    .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1355210145113706667/links.png?ex=67e8194d&is=67e6c7cd&hm=cc171b9660b23c1abca937b7adbcf9f70d761b152546ac5f7c8bc97bac2ab68d&`);
                const LinksOptions = new StringSelectMenuBuilder()
                    .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                const homeButton = new ButtonBuilder()
                    .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                const LinksBack = new ButtonBuilder()
                    .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                const inviteNouzen = new ButtonBuilder()
                    .setLabel('Invite Nouzen').setURL('https://discord.com/users/1231245685467119796').setStyle(ButtonStyle.Link);
                const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, inviteNouzen);
                await interaction.update({
                    embeds: [embed],
                    components: [linksOption, homeButtons],
                });
                return;
            }
            case 'server': {
                const guild = interaction.client.guilds.cache.get(guildId);
                if (!guild) return interaction.reply({ content: 'Guild not found!', ephemeral: true });

                embed.setDescription(`
### ˚✧༺〔<a:discord:1324024721955885116>｜SERVER STATS｜<a:discord:1324024721955885116>〕༻✧˚
**〔<a:crown:1324024281184604252>〕**Server Founder : **<@${await guild.fetchOwner().then(o => o.user.id)}>**
**〔<a:discord:1324024721955885116>〕**Server Name : **${guild.name}**
**〔<a:BlueBook:1339508240500916235>〕**Server ID : **${guildId}**
**〔<a:62566blackops:1333424650902048799>〕**Community Server : **${guild.features.includes("COMMUNITY") ? "Yes" : "No"}**
**〔<a:61280globalwarming:1333424595814060064>〕**Discoverable : **${guild.features.includes("DISCOVERABLE") ? "Yes" : "No"}**
**〔<a:44748faceidsuccess:1333424140169904178>〕**Verification Level : **${["None", "Low", "Medium", "High", "Very High"][guild.verificationLevel]}**
**〔<a:58668pixelpikachu:1333424537609703447>〕**MFA Level : **${guild.mfaLevel ? "Required (2FA for admins)" : "Not Required"}**
**〔<a:boost:1324024861311504447>〕**Boosts : **${guild.premiumSubscriptionCount || 0} (${guild.premiumTier ? `Level ${guild.premiumTier}` : "Level 0" })**
**〔<a:InfinityAdminPower:1343875246578601994>〕**Roles : **${guild.roles.cache.size}**
**〔<a:PinkCherryBlossom:1340171097479319593>〕**Emoji : **${guild.emojis.cache.size}**
**〔<a:mlem:1340171022464319588>〕**Animated Emoji : **${guild.emojis.cache.filter(e => e.animated).size}**
**〔<a:60711imloved5:1333424575635132498>〕**Sticker : **${guild.stickers.cache.size}**
**〔<a:Star:1333806741720141868>〕**Webhook : **${(await guild.fetchWebhooks()).size}**
**〔<a:94065pizzadrip:1333425657467895882>〕**Integration : **${(await guild.fetchIntegrations()).size}**
**〔<a:95719paimonnomming:1333425698580332574>〕**Events : ${guild.scheduledEvents.cache.map(event => `**${event.name}** - <t:${Math.floor(event.scheduledStartTimestamp / 1000)}:R>`).join("\n") || "**No scheduled events.**"}
**〔<a:99609calendar:1333425836853952622>〕**Created Date : <t:${Math.floor(guild.createdTimestamp / 1000)}:f>
### ˚✧༺〔<a:PinkCherryBlossom:1340171097479319593>｜MEMBER STAT｜<a:PinkCherryBlossom:1340171097479319593>〕༻✧˚
**〔<a:gojo:1340170971390279690>〕**Total Member : **${guild.memberCount}**
**〔<a:5849gawrgurascaredanimated:1333895817437909143>〕**Total User : **${guild.memberCount - guild.members.cache.filter(m => m.user.bot).size}**
**〔<a:79265skellydance:1333425224699351081>〕**Total Bot : **${guild.members.cache.filter(m => m.user.bot).size}**
**〔<a:clapping:1340171010107768913>〕**Member Online : **${guild.members.cache.filter(m => ['online', 'idle', 'dnd'].includes(m.presence?.status)).size}**
**〔<a:Bang_Cry:1340213607442415626>〕**Member Offline : **${guild.memberCount - guild.members.cache.filter(m => ['online', 'idle', 'dnd' ].includes(m.presence?.status)).size}**
**〔<a:3452gawrgurasinganimated:1333895660113629315>〕**Member On Voice : **${guild.voiceStates.cache.filter(v => v.channelId).size}**
**〔<a:56286banhammer:1333424434584879174>〕**Member Banned : **${await guild.bans.fetch().then(b => b.size)}**
**〔<a:99168xmasangryleave:1333425791853264937>〕**Member Timeout : **${guild.members.cache.filter(m => m.communicationDisabledUntilTimestamp).size}**
### ˚✧༺〔<a:60711imloved5:1333424575635132498>｜CHANNEL STAT｜<a:60711imloved5:1333424575635132498>〕༻✧˚
**〔<a:55376thering:1333424401273716839>〕**Total Channel : **${guild.channels.cache.size}**
**〔<a:32241hotairballoon:1333423668478607400>〕**Category Channel :  **${guild.channels.cache.filter(c => c.type === ChannelType.GuildCategory).size}**
**〔<a:75929slimemonster:1333425090599194655>〕**Text Channel : **${guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size}**
**〔<a:30485marshmallow:1333423468364173403>〕**Voice Channel : **${guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size}**
**〔<a:34167potofgold:1333423777651888210>〕**Forum Channel : **${guild.channels.cache.filter(c => c.type === ChannelType.GuildForum).size}**
**〔<a:20177ghostcry:1333423175731777667>〕**Stage Channel : **${guild.channels.cache.filter(c => c.type === ChannelType.GuildStageVoice).size}**
**〔<a:9861vvblueheart:1333422925956780072>〕**Thread Channel : **${guild.channels.cache.filter(c => c.isThread()).size}**
**〔<a:announcement:1324031496490713128>〕**Announcement Channel : **${guild.channels.cache.filter(c => c.type === ChannelType.GuildAnnouncement).size}**`)
                    .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1355210145113706667/links.png?ex=67e8194d&is=67e6c7cd&hm=cc171b9660b23c1abca937b7adbcf9f70d761b152546ac5f7c8bc97bac2ab68d&`);
                const LinksOptions = new StringSelectMenuBuilder()
                    .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                const homeButton = new ButtonBuilder()
                    .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                const LinksBack = new ButtonBuilder()
                    .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                const SupportServer = new ButtonBuilder()
                    .setLabel('Join Server').setURL('https://discord.gg/yzPqdnnpju').setStyle(ButtonStyle.Link);
                const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, SupportServer);
                await interaction.update({
                    embeds: [embed],
                    components: [linksOption, homeButtons],
                });
                return;
            }
                case 'website': {
                    embed.setDescription(`
### ˚✧༺〔<a:54139umbrella:1333424364510773319>｜WEBSITE STATS｜<a:54139umbrella:1333424364510773319>〕༻✧˚
**〔<a:13969niebieskipiorun:1333423030101348402>〕**Total Visits: **34.5K**
**〔<a:20177ghostcry:1333423175731777667>〕**Unique Users: **7.1K**
**〔<a:4455lightbluefire:1333420400855748638>〕**Daily Active Users: **512**
**〔<a:1707jellyfish:1333419072817332305>〕**Pages Indexed: **124**
**〔<a:gura:1333393351730528287>〕**Server Response Time: **87ms**
**〔<a:6112pepenoted:1333421268413710417>〕**Database Queries Processed: **243K**
-# All the stats are fake since I don’t have a website yet.`)
                    .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1355210145113706667/links.png?ex=67e8194d&is=67e6c7cd&hm=cc171b9660b23c1abca937b7adbcf9f70d761b152546ac5f7c8bc97bac2ab68d&`);
                const LinksOptions = new StringSelectMenuBuilder()
                    .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                const homeButton = new ButtonBuilder()
                    .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                const LinksBack = new ButtonBuilder()
                    .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                const WebsiteLink = new ButtonBuilder()
                    .setLabel('Visit Website').setURL('https://kazeynx.com').setStyle(ButtonStyle.Link);
                const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, WebsiteLink);
                await interaction.update({
                    embeds: [embed],
                    components: [linksOption, homeButtons],
                });
                return;
            }
                case 'ToS': {
                    embed.setDescription(`
### ˚✧༺〔<a:6112pepenoted:1333421268413710417>｜TERM SERVICE｜<a:6112pepenoted:1333421268413710417>〕༻✧˚
Read the terms of service to learn about the rules and guidelines for using Nouzen.
**〔<a:99609calendar:1333425836853952622>〕**Last Updated: **<t:1740762000:f>**
**〔<a:planet:1333319647826546688>〕**Changes Made: **4**
**〔<a:6567blah:1333421392393273504>〕**Total Words: **3.2K**
**〔<a:boost:1324024861311504447>〕**Sections: **15**
**〔<a:dool:1324028892939419792>〕**Accepted By Users: **9.5K**
**〔<a:4455lightbluefire:1333420400855748638>〕**Most Recent Clause: **User Data Protection**
-# I don’t have Terms of Service yet.`)
                    .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1355210145113706667/links.png?ex=67e8194d&is=67e6c7cd&hm=cc171b9660b23c1abca937b7adbcf9f70d761b152546ac5f7c8bc97bac2ab68d&`);
                    const LinksOptions = new StringSelectMenuBuilder()
                        .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                    const homeButton = new ButtonBuilder()
                        .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                    const LinksBack = new ButtonBuilder()
                        .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                    const ToSLink = new ButtonBuilder()
                        .setLabel('Check Terms of Service').setURL('https://kazeynx.com').setStyle(ButtonStyle.Link);
                    const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                    const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, ToSLink);
                    await interaction.update({
                        embeds: [embed],
                        components: [linksOption, homeButtons],
                    });
                    return;
                }
                case 'privacy': {
                    embed.setDescription(`
### ˚✧༺〔<a:BlueBook:1339508240500916235>｜PRIVACY DATA｜<a:BlueBook:1339508240500916235>〕༻✧˚
Read the privacy policy to learn about how your data is collected, used, and protected by Nouzen.
**〔<a:99609calendar:1333425836853952622>〕**Last Reviewed: **<t:1740762000:f>**
**〔<a:firstplace:1344403586473525298>〕**Compliance Score: **100%**
**〔<a:BlueBook:1339508240500916235>〕**Data Types Collected: **7**
**〔<a:ClubPenguinMop:1340170986925981696>〕**Encryption Standard: **AES-256**
**〔<a:94065pizzadrip:1333425657467895882>〕**Retention Period: **6 Months**
**〔<a:65023lightning:1333424783752302715>〕**GDPR Compliant: **Yes**
**〔<a:55854pain:1333424414204891196>〕**Total Data Removal Requests: **97**
-# I don’t have Privacy Policy yet.`)
                    .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1355210145113706667/links.png?ex=67e8194d&is=67e6c7cd&hm=cc171b9660b23c1abca937b7adbcf9f70d761b152546ac5f7c8bc97bac2ab68d&`);
                    const LinksOptions = new StringSelectMenuBuilder()
                        .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                    const homeButton = new ButtonBuilder()
                        .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                    const LinksBack = new ButtonBuilder()
                        .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                    const PrivacyLink = new ButtonBuilder()
                        .setLabel('Check Privacy Policy').setURL('https://kazeynx.com').setStyle(ButtonStyle.Link);
                    const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                    const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, PrivacyLink);
                    await interaction.update({
                        embeds: [embed],
                        components: [linksOption, homeButtons],
                    });
                    return;
                }
                case 'vote': {
                    embed.setDescription(`
### ˚✧༺〔<a:plus1:1322981868282581003>｜VOTE NOUZEN｜<a:plus1:1322981868282581003>〕༻✧˚
**〔<a:17033vaporeon:1333423139232677888>〕**Total Voter: **125**
**〔<a:4455lightbluefire:1333420400855748638>〕**Total Votes: **2.3K**
**〔<a:firstplace:1344403586473525298>〕**Ranking: **#7**
**〔<a:LightBlueFlower:1340171052961107978>〕**Votes This Week: **123**
**〔<a:32241hotairballoon:1333423668478607400>〕**Upvote Percentage: **97%**
**〔<a:clapping:1340171010107768913>〕**Most Active Voter: **orca**
-# All the stats are fake since top.gg not accept my request`)
                    .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1355210145113706667/links.png?ex=67e8194d&is=67e6c7cd&hm=cc171b9660b23c1abca937b7adbcf9f70d761b152546ac5f7c8bc97bac2ab68d&`);
                    const LinksOptions = new StringSelectMenuBuilder()
                        .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                    const homeButton = new ButtonBuilder()
                        .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                    const LinksBack = new ButtonBuilder()
                        .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                    const VoteNouzen = new ButtonBuilder()
                        .setLabel('Vote Nouzen').setURL('https://kazeynx.com').setStyle(ButtonStyle.Link);
                    const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                    const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, VoteNouzen);
                    await interaction.update({
                        embeds: [embed],
                        components: [linksOption, homeButtons],
                    });
                    return;
                }
                case 'gitHub': {
                    const { Octokit } = await import("@octokit/rest");
                    const octokit = new Octokit({ auth: githubAuth });
                
                    try {
                        const { data: user } = await octokit.rest.users.getByUsername({
                            username: githubUsername
                        });
                
                        let repos = [];
                        let page = 1;
                        let fetchedRepos;

                        do {
                            fetchedRepos = await octokit.rest.repos.listForUser({
                                username: githubUsername,
                                per_page: 1000,
                                page: page++
                            });
                            repos.push(...fetchedRepos.data);
                        } while (fetchedRepos.data.length > 0);

                        let totalStars = repos.length > 0 ? repos.reduce((acc, repo) => acc + repo.stargazers_count, 0) : 0;
                        let totalForks = repos.length > 0 ? repos.reduce((acc, repo) => acc + repo.forks_count, 0) : 0;
                        let totalWatchers = repos.length > 0 ? repos.reduce((acc, repo) => acc + repo.watchers_count, 0) : 0;

                        let latestRepo = repos
                            .filter(repo => repo.pushed_at)
                            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))[0] || null;
                
                        let repoList = latestRepo 
                            ? `[${latestRepo.name}](${latestRepo.html_url}) - ${latestRepo.stargazers_count} <a:Star:1333806741720141868> | ${latestRepo.forks_count} <a:94065pizzadrip:1333425657467895882>` 
                            : "No repositories found.";
                
                        let latestCommit = "No commits found.";
                        if (latestRepo) {
                            try {
                                const { data: commits } = await octokit.rest.repos.listCommits({
                                    owner: githubUsername,
                                    repo: latestRepo.name,
                                    per_page: 1
                                });
                                if (commits.length > 0) {
                                    latestCommit = `**〔<a:17033vaporeon:1333423139232677888>〕**Latest Commit: **[${commits[0].commit.message}](${commits[0].html_url}) - ${commits[0].commit.author.name}**`;
                                }
                            } catch (commitError) {
                                latestCommit = "Failed to fetch latest commit.";
                            }
                        }
                
                        let languageUsage = {};
                        for (let repo of repos) {
                            if (repo.language) {
                                languageUsage[repo.language] = (languageUsage[repo.language] || 0) + 1;
                            }
                        }
                        let topLanguages = Object.entries(languageUsage)
                            .sort((a, b) => b[1] - a[1])
                            .map(([lang, count]) => `${lang} - ${count} <a:BlueBook:1339508240500916235>`)
                            .join("\n") || "No language data.";
                
                        const mostStarredRepo = repos.length > 0 ? repos.reduce((max, repo) => repo.stargazers_count > max.stargazers_count ? repo : max, repos[0]) : null;
                        const mostForkedRepo = repos.length > 0 ? repos.reduce((max, repo) => repo.forks_count > max.forks_count ? repo : max, repos[0]) : null;
                        const mostWatchedRepo = repos.length > 0 ? repos.reduce((max, repo) => repo.watchers_count > max.watchers_count ? repo : max, repos[0]) : null;
                        
                        embed.setDescription(`
### ˚✧༺〔<:github:1339530439093915748>｜GITHUB STATS｜<:github:1339530439093915748>〕༻✧˚
**〔<a:crown:1324024281184604252>〕**Username: **${user.login}**
**〔<a:LightBlueFlower:1340171052961107978>〕**Bio: **${user.bio || "No bio available"}**
**〔<a:99609calendar:1333425836853952622>〕**Joined: **${new Date(user.created_at).toDateString()}**
**〔<a:4455lightbluefire:1333420400855748638>〕**Followers: **${user.followers}**
**〔<a:9861vvblueheart:1333422925956780072>〕**Following: **${user.following}**
**〔<a:BlueBook:1339508240500916235>〕**Total Repositories: **${user.public_repos}**
**〔<a:84765birthdaygift:1333425451342762045>〕**Total Gists: **${user.public_gists}**
**〔<a:Star:1333806741720141868>〕**Total Stars: **${totalStars}**
**〔<a:94065pizzadrip:1333425657467895882>〕**Total Forks: **${totalForks}**
**〔<a:6515kazuhapixelleafgif:1333421373665579008>〕**Total Watchers: **${totalWatchers}**
**〔<a:65023lightning:1333424783752302715>〕**Latest Repository: **${repoList}**
**〔<a:firstplace:1344403586473525298>〕**Most Languages Used: **${topLanguages}**
${mostStarredRepo ? `**〔<a:60711imloved5:1333424575635132498>〕**Most Starred Repo: **[${mostStarredRepo.name}](${mostStarredRepo.html_url}) - ${mostStarredRepo.stargazers_count} <a:Star:1333806741720141868>**` : ""}
${mostForkedRepo ? `**〔<a:54139umbrella:1333424364510773319>〕**Most Forked Repo: **[${mostForkedRepo.name}](${mostForkedRepo.html_url}) - ${mostForkedRepo.forks_count} <a:94065pizzadrip:1333425657467895882>**` : ""}
${mostWatchedRepo ? `**〔<a:20177ghostcry:1333423175731777667>〕**Most Watched Repo: **[${mostWatchedRepo.name}](${mostWatchedRepo.html_url}) - ${mostWatchedRepo.watchers_count} <a:6515kazuhapixelleafgif:1333421373665579008>**` : ""}
${latestCommit}`)
                        .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1355210145113706667/links.png`);
                        const LinksOptions = new StringSelectMenuBuilder()
                            .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                        const homeButton = new ButtonBuilder()
                            .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                        const LinksBack = new ButtonBuilder()
                            .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                        const GithubProfile = new ButtonBuilder()
                            .setLabel('Github Profile').setURL('https://github.com/kazeynx').setStyle(ButtonStyle.Link);
                        const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                        const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, GithubProfile);
                        await interaction.update({ embeds: [embed], components: [linksOption, homeButtons] });
                
                    } catch (error) {
                        console.error("GitHub API Error:", error);
                        embed.setDescription(`❌ **Error fetching GitHub data: ${error.response?.data?.message || error.message}**`);
                        const LinksOptions = new StringSelectMenuBuilder()
                            .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                        const homeButton = new ButtonBuilder()
                            .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                        const LinksBack = new ButtonBuilder()
                            .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                        const GithubProfile = new ButtonBuilder()
                            .setLabel('Github Profile').setURL('https://github.com/kazeynx').setStyle(ButtonStyle.Link);
                        const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                        const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, GithubProfile);
                        await interaction.update({ embeds: [embed], components: [linksOption, homeButtons] });
                    }
                    return;
                }
                case 'tiktok': {
                    embed.setDescription(`
### ˚✧༺〔<:github:1339530439093915748>｜TIKTOK STATS｜<:github:1339530439093915748>〕༻✧˚
**〔<a:LightBlueFlower:1340171052961107978>〕**Followers: **23.8K**
**〔<a:94857gg:1333425680603418708>〕**Likes: **187.5K**
**〔<a:32241hotairballoon:1333423668478607400>〕**Total Videos: **215**
**〔<a:4455lightbluefire:1333420400855748638>〕**Total Views: **21M**
**〔<a:firstplace:1344403586473525298>〕**Most Viewed Video: **3.2M**
**〔<a:5925vct2021spray:1333421169201774642>〕**Total Comments: **5.4K**
**〔<a:6515kazuhapixelleafgif:1333421373665579008>〕**Shares: **2.1K**
-# All stats are fake since i dont have tiktok api key yet :(`)
                    .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1355210145113706667/links.png?ex=67e8194d&is=67e6c7cd&hm=cc171b9660b23c1abca937b7adbcf9f70d761b152546ac5f7c8bc97bac2ab68d&`);
                    const LinksOptions = new StringSelectMenuBuilder()
                        .setCustomId('linkInformation').setPlaceholder('Choose Your Options').addOptions(LinksOption);
                    const homeButton = new ButtonBuilder()
                        .setCustomId('home').setLabel('Domain').setEmoji('<a:house:1354060003040034900>').setStyle(ButtonStyle.Secondary);
                    const LinksBack = new ButtonBuilder()
                        .setCustomId('LinksBack').setLabel('Previous').setEmoji('<a:arrowreverse:1342004555805888523>').setStyle(ButtonStyle.Secondary);
                    const FollowTiktok = new ButtonBuilder()
                        .setLabel('Follow On Tiktok').setURL('https://tiktok.com/@kazeynx').setStyle(ButtonStyle.Link);
                    const linksOption = new ActionRowBuilder().addComponents(LinksOptions);
                    const homeButtons = new ActionRowBuilder().addComponents(homeButton, LinksBack, FollowTiktok);
                    await interaction.update({
                        embeds: [embed],
                        components: [linksOption, homeButtons],
                    });
                    return;
                }
                default:
                    embed.setColor(colorsHex.red).setTitle('Error').setDescription('Invalid selection, try again.');
                    break;
            }

            await interaction.update({
                embeds: [embed],
            });
            return;

        }else if (interaction.customId === 'donationInteraction') { 
            let embed = new EmbedBuilder().setColor(colorsHex.blue).setFooter({ text: discord.footer }).setTimestamp();
            switch (interaction.values[0]) {
                case 'vanguard':
                    embed.setTitle('Nouzen’s Vanguard').setDescription('List of those who contributed.');
                    break;
                case 'crypto':
                    embed.setTitle('Crypto Donations').setDescription('Bitcoin: `3FZbgi...`\nEthereum: `0x742d...`');
                    const cryptoButtons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('btc')
                            .setLabel('Bitcoin')
                            .setEmoji('<a:BitCoin:1340205948056113204>')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('eth')
                            .setLabel('Ethereum')
                            .setEmoji('<:Ethereum:1344396102329434152>')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('xmr')
                            .setLabel('Monero')
                            .setEmoji('<:Monero:1344396096767655967>')
                            .setStyle(ButtonStyle.Danger)
                    );
                
                    return interaction.update({ embeds: [embed], components: [cryptoButtons] });
                case 'patreon':
                    embed.setTitle('Support via Patreon').setDescription('[Click here](https://www.patreon.com/kazeynx).');
                    break;
                case 'paypal':
                    embed.setTitle('Support via PayPal').setDescription('[Click here](https://www.paypal.me/kazeynx).');
                    break;
                case 'qris':
                    embed.setTitle('Donate via QRIS').setDescription('Scan the QR code below.').setImage('https://example.com/qris-code.png');
                    break;
                case 'trakteer':
                    embed.setTitle('Support via Trakteer').setDescription('[Click here](https://trakteer.id/kazeynx).');
                    break;
                case 'kofi':
                    embed.setTitle('Support via Ko-fi').setDescription('[Click here](https://ko-fi.com/kazeynx).');
                    break;
                default:
                    embed.setColor(colorsHex.red).setTitle('Error').setDescription('Invalid selection, try again.');
                    break;
            }
            await interaction.update({
                embeds: [embed],
                components: [],
            });
            return;
        }
    } else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'feedbackModal') {
            const feedbackContent = interaction.fields.getTextInputValue('feedbackInput');
            const feedbackStarRating = parseInt(interaction.fields.getTextInputValue('feedbackStar'), 10);
            if (isNaN(feedbackStarRating) || feedbackStarRating < 1 || feedbackStarRating > 5) {
                return interaction.reply({
                    content: 'Please enter a valid rating between 1 and 5 stars.',
                    ephemeral: true,
                });
            }
            const isAnonymousInput = interaction.fields.getTextInputValue('anonymousInput').toLowerCase();
            /**if (isAnonymousInput !== 'yes' && isAnonymousInput !== 'no') {
                return interaction.reply({
                    content: 'Please respond with "Yes" or "No" for the anonymous feedback option.',
                    ephemeral: true,
                });}*/
            const isAnonymous = isAnonymousInput === 'yes';
            const userTag = isAnonymous ? 'Anonymous' : interaction.user.tag;
            //const userProfile = isAnonymous ? 'https://cdn.discordapp.com/attachments/1322940109036851282/1333814281845608458/anonimus.jpg?ex=679a42d9&is=6798f159&hm=c261c43028e6264349e553e76ce02665fc5c0280885d60fe37fb6fea8a9c1a79&' : interaction.user.displayAvatarURL();
            const feedbackChannel = client.channels.cache.get(activity.feedbackID);
              if (!feedbackChannel) {
                  console.error(`${colors.cyan(colors.bold(client.user.username))} | ${colors.red('Failed to find the specified channel.')}`);
                  return;
              }
            const newFeedback = new Feedback({
                userId: interaction.user.id,
                feedback: feedbackContent,
                rating: feedbackStarRating,
                isAnonymous: isAnonymous,});
            try {
                await newFeedback.save();
            } catch (error) {
                console.error('Error saving feedback:', error);
                return interaction.reply({
                    content: 'There was an error submitting your feedback. Please try again later.',
                    ephemeral: true,
                });
            }
            const allFeedbacks = await Feedback.find();
            const totalRatings = allFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
            const averageRating = (totalRatings / allFeedbacks.length).toFixed(1);
            const feedbackCount = allFeedbacks.length;
            const userFeedbackCount = await Feedback.countDocuments({ userId: interaction.user.id });
            const uniqueUserIds = await Feedback.distinct('userId'); 
            const totalUsers = uniqueUserIds.length;
            let feedbackLink = '';
            if (feedbackChannel) {
                const feedbackEmbed = new EmbedBuilder()
                    .setColor(colorsHex.blue)
                    .setDescription(`### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:65268sleeplunarcow:1333424804576890981>｜FEEDBACK INFO｜<a:65268sleeplunarcow:1333424804576890981>〕˚✧˚•̩̩͙✧•̩̩͙˚✮\n〔<a:yesir:1333386507838554133>〕Username : **${userTag}**\n〔<a:type:1333393442285551668>〕Feedback : ${feedbackContent}\n〔<a:65023lightning:1333424783752302715>〕Rating : ${'<a:Star:1333806741720141868>'.repeat(feedbackStarRating)}\n〔<a:99609calendar:1333425836853952622>〕Submissions Date : ${newFeedback.createdAt.toLocaleString()}\n〔<a:32241hotairballoon:1333423668478607400>〕User Submissions : **${userFeedbackCount}** submissions.\n\n### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:dool:1324028892939419792>｜FEEDBACK STAT｜<a:dool:1324028892939419792>〕˚✧˚•̩̩͙✧•̩̩͙˚✮\n〔<a:diamond:1324024435887312967>〕Average Rating : **${averageRating}/5** <a:Star:1333806741720141868>\n〔<a:59754gojocatvibe:1333424555124985947>〕Total User Submissions : **${totalUsers}** Contributor\n〔<a:5565cloud:1333420883984908329>〕Total Feedbacks : **${feedbackCount}** submissions so far\n`)
                    .setFooter({ text: discord.footer})
                    .setTimestamp()
                    .setImage(`https://cdn.discordapp.com/attachments/1322940109036851282/1333838130838634516/feedback.gif?ex=679a590f&is=6799078f&hm=d969a3ee0adf6b623dbb66f5d58f6712c8eea8db707509e29e208b29146fbd2a&`);
                const feedbackMessage = await feedbackChannel.send({ embeds: [feedbackEmbed] });
                feedbackLink = `https://discord.com/channels/${feedbackChannel.guildId}/${feedbackChannel.id}/${feedbackMessage.id}`;
            }
            let thankYouMessage;
            if (feedbackStarRating === 5) {
                thankYouMessage = `Wow, 5 stars? You’ve got great taste. Thanks for the feedback! We’ll keep pushing to make things even better.\n[Click Here](${feedbackLink}) if you want to see your feedback`;
            } else if (feedbackStarRating >= 3) {
                thankYouMessage = 'Thanks for the feedback! We’re always aiming higher, and your thoughts help fuel that journey.';
            } else {
                thankYouMessage = 'Appreciate the feedback! We’re already looking at how we can turn things up a notch.';
            }
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({ content: thankYouMessage, ephemeral: true });
            } else {
                await interaction.reply({ content: thankYouMessage, ephemeral: true });
            }
        }
    }
    if (interaction.isButton() && interaction.customId === 'home') {
        await interaction.update({
            embeds: [getMentionEmbed(client, stats)],
            components: [getMentionComponents()]
        });
    }
    if (interaction.isButton() && interaction.customId === 'LinksBack') {
        let embed = new EmbedBuilder()
            .setColor(colorsHex.blue)
            .setFooter({ text: discord.footer })
            .setTimestamp()
            .setDescription(LinksText)
            .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1339526241723748393/links.gif?ex=67af0a87&is=67adb907&hm=8a64a472e7afe5542fffae14e6e66f0965cae3d1dd7f1273a21d176c996de9ab&`);

        const LinksOptions = new StringSelectMenuBuilder()
            .setCustomId('linkInformation')
            .setPlaceholder('Choose Your Options')
            .addOptions(LinksOption);
        const homeButton = new ButtonBuilder()
            .setCustomId('home')
            .setLabel('Domain')
            .setEmoji('<a:house:1354060003040034900>')
            .setStyle(ButtonStyle.Secondary);
        const homeButtons = new ActionRowBuilder().addComponents(homeButton);
        const actionRow = new ActionRowBuilder().addComponents(LinksOptions);
    
        await interaction.update({
            embeds: [embed],
            components: [actionRow, homeButtons],
        });
        return;
    }
};
