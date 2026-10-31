const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Met un membre en sourdine temporaire')
        .addUserOption(opt => opt.setName('cible').setDescription('Membre').setRequired(true))
        .addIntegerOption(opt => opt.setName('duree').setDescription('Durée en minutes').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('cible');
        const duration = interaction.options.getInteger('duree');
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) return interaction.reply({ content: 'Membre introuvable.', ephemeral: true });

        await member.timeout(duration * 60 * 1000, 'Sanction modération');
        await interaction.reply({ content: `🔇 **${user.tag}** a été mis en sourdine pour **${duration}** minute(s).` });
    }
};