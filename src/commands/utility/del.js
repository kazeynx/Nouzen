const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('del')
        .setDescription('Delete multiple messages with advanced filters.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Number of messages to delete (max 100)')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Delete messages from a specific user'))
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Delete messages containing a specific keyword'))
        .addBooleanOption(option =>
            option.setName('pinned')
                .setDescription('Include pinned messages (default: false)')),
    
    async execute(interaction) {
        const { channel, options } = interaction;
        const amount = options.getInteger('amount');
        const user = options.getUser('user');
        const keyword = options.getString('keyword');
        const includePinned = options.getBoolean('pinned') || false;

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Please provide a number between 1 and 100.', flags: MessageFlags.Ephemeral });
        }

        let messages = await channel.messages.fetch({ limit: 100 });

        if (user) {
            messages = messages.filter(m => m.author.id === user.id);
        }

        if (keyword) {
            messages = messages.filter(m => m.content.includes(keyword));
        }

        if (!includePinned) {
            messages = messages.filter(m => !m.pinned);
        }

        messages = messages.first(amount); // Fixes slice error

        if (messages.length === 0) {
            return interaction.reply({ content: 'No messages found matching the criteria.', flags: MessageFlags.Ephemeral });
        }

        await channel.bulkDelete(messages, true).catch(err => console.log(err));

        interaction.reply({ content: `Successfully deleted ${messages.length} messages.`, flags: MessageFlags.Ephemeral });
    }
};
