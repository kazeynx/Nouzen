const loadCommands = require('./commandhandler');
const loadEvents = require('./eventhandler');

module.exports = (client) => {
  loadCommands(client);
  loadEvents(client);
};