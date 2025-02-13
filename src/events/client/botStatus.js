const Stats = require('../../database/models/stats'); 
module.exports = async (client) => {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({ totalMessages: 0, totalCommandsUsed: 0 });
    }
    function formatUptime(ms) {
      const seconds = Math.floor(ms / 1000) % 60;
      const minutes = Math.floor(ms / (1000 * 60)) % 60;
      const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      return [
        days > 0 ? `${days}d` : null,
        hours > 0 ? `${hours}h` : null,
        minutes > 0 ? `${minutes}m` : null,
        `${seconds}s`
      ]
        .filter(Boolean)
        .join(' ');
    }
// Auto status rotation 0: Playing | 1: Streaming | 2: Listening | 3: Watching
const statuses = [
    { activity: { name: 'Yokso, watashi no Soul Society...', type: 1 }, status: 'dnd' },
    { activity: { name: `You're still lagging behind... Mine’s at ${client.ws.ping}ms`, type: 3 }, status: 'online' },
    { activity: { name: () => `Unyielding for ${formatUptime(client.uptime)}... You’ll never outlast me.`,  type: 3 }, status: 'idle' },
    { activity: { name: `Managing ${client.commands.size} commands... Can you keep up?`, type: 2 }, status: 'dnd' },  
    { activity: { name: `Maintaining control over ${client.guilds.cache.size} territories.`, type: 3 }, status: 'online' },  
    { activity: { name: `Overseeing ${client.channels.cache.size} channels... More than you can manage?`, type: 1 }, status: 'online' },
    { activity: { name: `Serving ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} members... I’m everywhere.`, type: 0 }, status: 'online' },
    { activity: { name: `Commanding the mightiest realm: ${client.guilds.cache.reduce((max, guild) => guild.memberCount > max.memberCount ? guild : max, { memberCount: 0 }).name} (${client.guilds.cache.reduce((max, guild) => guild.memberCount > max.memberCount ? guild : max, { memberCount: 0 }).memberCount} members)... Watch it bend to my will.`, type: 0 }, status: 'idle' },
    { activity: { name: `Watching over ${client.users.cache.size} pieces on my board... Are you one of them?`, type: 0 }, status: 'online'},
    { activity: { name: `Tracking ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} lives... Yours included.`, type: 1 }, status: 'dnd' },
    { activity: { name: `everyone triggered ${stats.totalCommandsUsed} commands... Every step you take is part of my design.`, type: 2 }, status: 'online' },
    { activity: { name: `Messages passed? ${stats.totalMessages}... Every word, a step closer to the inevitable.`, type: 1 }, status: 'dnd' }

  ];
  let index = 0;
  setInterval(() => {
    const status = statuses[index];
    const activity = {
      name: typeof status.activity.name === 'function' ? status.activity.name() : status.activity.name,
      type: status.activity.type
    };
    try {
      client.user.setPresence({ activities: [activity], status: status.status });
    } catch (error) {
      console.error(`${colors.cyan(colors.bold(client.user.username))} | ${colors.red(colors.bold(`Failed to change status : ${error}`))}`);
      if (error.message.includes("You are being rate limited")) {
        console.log(`${colors.cyan(colors.bold(client.user.username))} | ${colors.red(colors.bold(`Rate limit hit. Consider slowing down status changes.`))}`);
      }
    }
    index = (index + 1) % statuses.length; 
  }, 10000); 
};