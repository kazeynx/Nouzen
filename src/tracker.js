const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const tracker = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences]
});

const NOUZEN_ID = '1231245685467119796'; // Ganti dengan ID bot Nouzen
const DEVELOPER_ID = '1138837639382966384'; // Ganti dengan ID kamu sendiri
const CHANNEL_ID = '1338903076052008970'; // Ganti dengan ID channel tujuan

let lastStatus = {}; // Simpan status terakhir dari masing-masing user

tracker.once('ready', () => {
    console.log(`Bot tracker ready as ${tracker.user.tag}`);
});

tracker.on('presenceUpdate', (oldPresence, newPresence) => {
    const userId = newPresence.userId;
    if (userId !== NOUZEN_ID && userId !== DEVELOPER_ID) return; // Cek hanya untuk Nouzen & developer

    const status = newPresence.status; // online, idle, dnd, offline
    if (lastStatus[userId] === status) return; // Kalau statusnya sama, gak perlu update

    lastStatus[userId] = status; // Update status terakhir

    // Bikin embed
    const embed = new EmbedBuilder()
        .setTitle('Status Update')
        .setDescription(`<@${userId}> is now **${status.toUpperCase()}**`)
        .setColor(status === 'online' ? 'Green' : status === 'offline' ? 'Red' : 'Yellow')
        .setTimestamp();

    const channel = tracker.channels.cache.get(CHANNEL_ID);
    if (channel) channel.send({ embeds: [embed] });
});

tracker.login(``);
