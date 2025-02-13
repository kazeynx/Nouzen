const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { discord, colorsHex, activity } = require('../../config/bot');
const Feedback = require('../../database/models/feedback'); 
module.exports = async (client, interaction) => {
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'mentionIntraction') {
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
                case 'links':
                    embed.setDescription(`
### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:65268sleeplunarcow:1333424804576890981>｜ESSENTIAL LINK｜<a:65268sleeplunarcow:1333424804576890981>〕˚✧˚•̩̩͙✧•̩̩͙˚✮\nYour all-in-one access to **[Nouzen](<https://discord.com/users/1231245685467119796>)**. Summon the bot, join the support server, explore the documentation, or connect with the project across multiple platforms. Whether you’re here to integrate, learn, or stay updated—everything you need is just one click away.\n
**〔<a:60711imloved5:1333424575635132498>〕[Summon Nouzen](https://discord.com/users/1231245685467119796)**
**〔<a:discord:1324024721955885116>〕[Join Support Server](https://discord.gg/vAkuwxrHcm)**
**〔<a:54139umbrella:1333424364510773319>〕[Official Website](https://kazeynx.com)**
**〔<a:6112pepenoted:1333421268413710417>〕[Terms of Service (ToS)](https://discord.gg/vAkuwxrHcm)**
**〔<a:BlueBook:1339508240500916235>〕[Privacy Policy](https://discord.gg/vAkuwxrHcm)**
**〔<a:computer:1339530970810028122>〕[Read Documentation](https://discord.gg/vAkuwxrHcm)**
**〔<a:plus1:1322981868282581003>〕[Vote For Nouzen](https://top.gg/bot/1231245685467119796)**
**〔<:github:1339530439093915748>〕[Check Out My GitHub](https://github.com/kazeynx)**
**〔<a:tiktok:1339522023436849152>〕[Follow On Tiktok](https://www.tiktok.com/@kazeynx)**
**〔<a:youtube:1339522035373576202>〕[Subscribe On Youtube](https://www.youtube.com/@kazeynx)**
                        `)
                        .setImage(`https://cdn.discordapp.com/attachments/1334509081788153866/1339526241723748393/links.gif?ex=67af0a87&is=67adb907&hm=8a64a472e7afe5542fffae14e6e66f0965cae3d1dd7f1273a21d176c996de9ab&`)
                    break;
                case 'support':
                    embed.setTitle('Support')
                        .setDescription('Support Thing')
                        .addFields([{ name: 's', value: 's' }]);
                    break;
                case 'updates_news':
                    embed.setTitle('Update and News')
                        .setDescription('update and news thing')
                        .addFields([{ name: 'u', value: 'u' }]);
                    break;
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

            await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
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
};
