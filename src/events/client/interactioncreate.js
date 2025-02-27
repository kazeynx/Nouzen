const colors = require("colors");
const cooldowns = new Map();
const donateInterac = require('../../interactions/client/mention/donateInteraction');
const mentionInterac = require('../../interactions/client/mention/mentionInteraction');

module.exports = {
  async execute(client, interaction) {
    try {
      // Handle Slash Commands
      if (interaction.isCommand()) {
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

        // Cooldown system
        if (!cooldowns.has(interaction.commandName)) {
          cooldowns.set(interaction.commandName, new Map());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(interaction.commandName);
        const cooldownAmount = (command.cooldown || 3) * 1000;

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

        await command.execute(interaction);
        console.log(
          `${colors.cyan(colors.bold(client.user.username))} | Command Executed: ${interaction.commandName} by ${interaction.user.tag}`
        );
      }

      // Handle String Select Menu
      else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'donationInteraction') {
          await donateInterac(client, interaction);
        } else {
          await mentionInterac(client, interaction);
        }
      }

      // Handle Buttons
      else if (interaction.isButton()) {
        await donateInterac(client, interaction);
      }

      // Handle Modals
      else if (interaction.isModalSubmit()) {
        await mentionInterac(client, interaction);
      }

    } catch (error) {
      console.error(`${colors.red("[ERROR]")} An error occurred:`, error);
      if (!interaction.replied) {
        await interaction.reply({
          content: 'There was an error processing your interaction. Please try again later!',
          ephemeral: true,
        });
      }
    }
  },
};
