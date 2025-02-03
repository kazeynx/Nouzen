const { readdirSync } = require('fs');
const path = require('path');

module.exports = (client) => {
  const eventFolders = readdirSync(path.join(__dirname, '../../events'));

  for (const folder of eventFolders) {
    const eventFiles = readdirSync(path.join(__dirname, `../../events/${folder}`)).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      const event = require(`../../events/${folder}/${file}`);
      const eventName = file.split('.')[0];
      client.on(eventName, (...args) => event.execute(client, ...args));
    }
  }
};