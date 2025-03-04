const colors = require("colors");
const cooldowns = new Map();
// add owner only commands || bot premission || modals handle || button handle || select menu handle
module.exports = {
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      console.log(`${colors.yellow("[WARNING]")} Unknown command: ${interaction.commandName}`);
      return;
    }

    // Check user permissions
    if (command.permissions) {
      const missingPermissions = command.permissions.filter(perm => !interaction.member.permissions.has(perm));
      if (missingPermissions.length) {
        return interaction.reply({
          content: `You lack the following permissions to use this command: ${missingPermissions.join(", ")}`,
          ephemeral: true,
        });
      }
    }

    // Cooldown implementation
    if (!cooldowns.has(interaction.commandName)) {
      cooldowns.set(interaction.commandName, new Map());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(interaction.commandName);
    const cooldownAmount = (command.cooldown || 3) * 1000; // Default to 3 seconds if no cooldown is specified

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
        return interaction.reply({
          content: `Please wait ${timeLeft} more second(s) before reusing the \`${interaction.commandName}\` command.`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      // Execute the command
      await command.execute(interaction);
      console.log(
        `${colors.cyan(colors.bold(client.user.username))} | Command Executed: ${interaction.commandName} by ${interaction.user.tag}`
      );
    } catch (error) {
      console.error(`${colors.red("[ERROR]")} An error occurred while executing ${interaction.commandName}:`, error);
      await interaction.reply({
        content: 'There was an error executing this command. Please try again later!',
        ephemeral: true,
      });
    }
  },
};