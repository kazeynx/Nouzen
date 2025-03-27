const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { discord, colorsHex } = require('../../../config/bot');

module.exports = async (client, interaction) => {
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'donationInteractions') {
            let embed = new EmbedBuilder()
                .setColor(colorsHex.blue)
                .setImage(discord.botBanner)
                .setFooter({ text: discord.footer })
                .setTimestamp();

            switch (interaction.values[0]) {
                case 'vanguard':
                    embed.setTitle('Vanguards')
                        .setDescription('Vanguards thing');
                    break;
                case 'crypto':
                    embed.setDescription(`
### ✮•̩̩͙✧•̩̩͙˚✧˚〔<:Binance:1340300959233998909>｜NOUZENVERSE｜<:Binance:1340300959233998909>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
<a:luv:1333393383670153226> Nouzen doesn’t run on thin air—servers cost money, and keeping it online takes real support. If you want to help keep it going strong, crypto is the way <a:3149gawrgurasmuganimated:1333895646117363713>. Let’s push Nouzen to the next level together <a:79265skellydance:1333425224699351081>.

### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:actually:1340213623154282526>｜WHY CRYPTO?｜<a:actually:1340213623154282526>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
**〔<a:5262albedoflowerhappygif:1333420629533392988>〕Fast AF : **No banks, no delays.
**〔<a:29950amongusinspace:1333423450467074068>〕Lowkey Anonymous : **Donate without the hassle.
**〔<a:gojo:1340170971390279690>〕Global Flex : **Send crypto from anywhere, anytime.

### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:4455lightbluefire:1333420400855748638>｜CRYPTOWALLET｜<a:4455lightbluefire:1333420400855748638>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
〔<a:BitCoin:1340205948056113204>〕**Bitcoin (BTC)**
〔<:Ethereum:1344396102329434152>〕**Ethereum (ETH)**
〔<:Monero:1344396096767655967>〕**Monero (XMR)**

### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:planet:1333319647826546688>｜DONATE NOW｜<a:planet:1333319647826546688>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
1. Click one of the buttons below to get the wallet address & QR code.
2. Send BTC, ETH, XMR, or whatever crypto you’re holding.
3. Boom! You’re a legend now.`);

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
                    
                        return interaction.update({ embeds: [embed], components: [...interaction.message.components, cryptoButtons] });
                case 'patreon':
                    embed.setTitle('Patreon').setDescription('Patreon Details');
                    break;
                case 'paypal':
                    embed.setTitle('PayPal').setDescription('PayPal Details');
                    break;
                case 'qris':
                    embed.setTitle('QRIS').setDescription('QRIS Details');
                    break;
                case 'trakteer':
                    embed.setTitle('Trakteer').setDescription('Trakteer Details');
                    break;
                case 'kofi':
                    embed.setTitle('Ko-fi')
                         .setDescription('Ko-fi Details')
                         .addFields([{ name: 'Fields', value: 'Fields Detail' }]);
                    break;
                default:
                    embed.setColor(colorsHex.red)
                        .setTitle('Error')
                        .setDescription('Invalid selection, please try again.');
                    break;
            }
            return interaction.update({ embeds: [embed] });
        }
    }

// Handler buat button crypto
if (interaction.isButton()) {
    let embed = new EmbedBuilder().setColor(colorsHex.blue);
    let homeButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('crypto')
            .setLabel('Home')
            .setStyle(ButtonStyle.Secondary)
    );

    switch (interaction.customId) {
        case 'btcs':
            embed.setDescription(`### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:BitCoin:1340205948056113204>｜BITCOIN (BTC)｜<a:BitCoin:1340205948056113204>〕˚✧˚•̩̩͙✧•̩̩͙˚✮\n\`\`\`bc1q6pysg2x4hdrxk0fsnsx69r7cc3t82waeh9utq3\`\`\``)
                .setImage('https://cdn.discordapp.com/attachments/1344352803082207313/1344356617218686986/bitcoin_add.png');
            break;
        case 'eths':
            embed.setDescription(`### ✮•̩̩͙✧•̩̩͙˚✧˚〔<:Ethereum:1344396102329434152>｜ETHEREUM(ETH)｜<:Ethereum:1344396102329434152>〕˚✧˚•̩̩͙✧•̩̩͙˚✮\n\`\`\`0xB7C6A2F0C25190C0002820E91bc126a6321BbF1b\`\`\``)
                .setImage('https://cdn.discordapp.com/attachments/1344352803082207313/1344356636164231248/ethereum_add.png');
            break;
        case 'xmrs':
            embed.setDescription(`### ✮•̩̩͙✧•̩̩͙˚✧˚〔<:Monero:1344396096767655967>｜MONERO (XMR)｜<:Monero:1344396096767655967>〕˚✧˚•̩̩͙✧•̩̩͙˚✮\n\`\`\`45td5msnzVM5MvkGfKvNqfNrJfeQL21H7SK4vqFEss1339WGz2T9acbJX7e4RL3z9gKZVYkPfdzdWci95VM5gSrZHhJrEUT\`\`\``)
                .setImage('https://cdn.discordapp.com/attachments/1344352803082207313/1344356659618910282/monero_add.png');
            break;
        case 'cryptos': // Balik ke menu Crypto
            embed.setDescription(`
### ✮•̩̩͙✧•̩̩͙˚✧˚〔<:Binance:1340300959233998909>｜NOUZENVERSE｜<:Binance:1340300959233998909>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
<a:luv:1333393383670153226> Nouzen doesn’t run on thin air—servers cost money, and keeping it online takes real support. If you want to help keep it going strong, crypto is the way <a:3149gawrgurasmuganimated:1333895646117363713>. Let’s push Nouzen to the next level together <a:79265skellydance:1333425224699351081>.

### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:actually:1340213623154282526>｜WHY CRYPTO?｜<a:actually:1340213623154282526>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
**〔<a:5262albedoflowerhappygif:1333420629533392988>〕Fast AF : **No banks, no delays.
**〔<a:29950amongusinspace:1333423450467074068>〕Lowkey Anonymous : **Donate without the hassle.
**〔<a:gojo:1340170971390279690>〕Global Flex : **Send crypto from anywhere, anytime.

### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:4455lightbluefire:1333420400855748638>｜CRYPTOWALLET｜<a:4455lightbluefire:1333420400855748638>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
〔<a:BitCoin:1340205948056113204>〕**Bitcoin (BTC)**
〔<:Ethereum:1344396102329434152>〕**Ethereum (ETH)**
〔<:Monero:1344396096767655967>〕**Monero (XMR)**

### ✮•̩̩͙✧•̩̩͙˚✧˚〔<a:planet:1333319647826546688>｜DONATE NOW｜<a:planet:1333319647826546688>〕˚✧˚•̩̩͙✧•̩̩͙˚✮
1. Click one of the buttons below to get the wallet address & QR code.
2. Send BTC, ETH, XMR, or whatever crypto you’re holding.
3. Boom! You’re a legend now.`);

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
    }
    
    return interaction.update({ embeds: [embed], components: [homeButton] });
}

};
