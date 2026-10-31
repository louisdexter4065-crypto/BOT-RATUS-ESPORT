const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannit un membre du serveur Ratus Esport')
        .addUserOption(opt => opt.setName('cible').setDescription('Le membre à bannir').setRequired(true))
        .addStringOption(opt => opt.setName('raison').setDescription('Raison du bannissement'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('cible');
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie.';
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) return interaction.reply({ content: 'Membre introuvable.', ephemeral: true });
        if (!member.bannable) return interaction.reply({ content: 'Impossible de bannir ce membre (Permissions insuffisantes).', ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setTitle('🔴 Membre Banni')
            .addFields(
                { name: 'Utilisateur', value: `${user.tag}`, inline: true },
                { name: 'Modérateur', value: `${interaction.user.tag}`, inline: true },
                { name: 'Raison', value: reason, inline: false }
            )
            .setColor(0xff0000)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};